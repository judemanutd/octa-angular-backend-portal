import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Gallery, ImageItem } from '@ngx-gallery/core';
import { ImageModalComponent } from '../../modals/edit-project-modal/image.modal/image.modal.component';
import { ComponentsService } from '~app/services/components.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  componentId: any;
  projectId: any;
  uploadForm: FormGroup;
  coverImage: any;
  items: [];
  gal: any;

  constructor(
    private componentService: ComponentsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public gallery: Gallery, //
  ) {
    this.componentId = this.route.snapshot.params.cId;
    console.log('TCL: ViewComponent -> this.componentId', this.componentId);
    this.projectId = this.route.snapshot.params.pId;
    console.log('TCL: ViewComponent -> this.projectId', this.projectId);
    console.log('TCL: ViewComponent -> this.route.snapshot.params', this.route.snapshot.params);
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      cover: [''],
    });
    // this.basicLightboxExample();
    this.getComponent();
    this.getGallery();

    // Load item into different lightbox instance
    // With custom gallery config
    // this.withCustomGalleryConfig();
    console.log('TCL: ViewComponent -> ngOnInit -> this.items', this.items);
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.items);
  }

  /**
   * Use custom gallery config with the lightbox
   */
  // withCustomGalleryConfig() {
  //   // 2. Get a lightbox gallery ref
  //   const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

  //   // (Optional) Set custom gallery config to this lightbox
  //   lightboxGalleryRef.setConfig({
  //     imageSize: ImageSize.Cover,
  //     thumbPosition: ThumbnailsPosition.Top,
  //   });

  //   // 3. Load the items into the lightbox
  //   lightboxGalleryRef.load(this.items);
  // }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '40rem',
      data: {
        projectImage: false,
        component: this.componentId,
        project: this.projectId,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getGallery();
        this.snackBar.open('Image Added', '', {
          duration: 3000,
        });
      }
    });
  }

  uploadFileCover(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('cover').setValue(file);
    }
  }

  uploadCover() {
    const formData2 = new FormData();
    formData2.append('cover', this.uploadForm.get('cover').value);
    console.log('TCL: ViewComponent -> uploadCover -> formData2', formData2);

    this.componentService
      .addCover(this.projectId, this.componentId, formData2)
      .subscribe((result: any) => {
        console.log(result);
        this.coverImage = result.payload.link;
      });
  }

  getComponent() {
    this.componentService
      .getSingleComponent(this.componentId, this.projectId)
      .subscribe((result: any) => {
        console.log('TCL: ViewComponent -> ngOnInit -> result', result);
        this.coverImage = result.payload.cover.link;
        console.log(
          'TCL: ViewComponent -> ngOnInit -> result.payload.gallery',
          result.payload.gallery,
        );
      });
  }

  getGallery() {
    this.componentService
      .getSingleComponent(this.componentId, this.projectId)
      .subscribe((result: any) => {
        this.gal = result.payload.gallery;
        console.log('TCL: EditProjectModalComponent -> getProjects -> this.gal', this.gal);
        this.items = this.gal.map(
          item => new ImageItem({ src: item.link, thumb: item.link, name: item.name, id: item.id }),
        );
        this.gallery.ref().load(this.items);
      });
  }

  deleteCover() {
    this.componentService.deleteCover(this.projectId, this.componentId).subscribe((result: any) => {
      this.coverImage = null;
    });
  }

  deleteGallery(id) {
    this.componentService
      .deleteGallery(this.projectId, this.componentId, id)
      .subscribe((result: any) => {
        this.getGallery();
      });
  }
}
