import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import {} from '~app/interfaces/Project';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
// import { map } from 'rxjs/operators';
import { ProjectsService } from '~app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '~app/services/clients.service';
import { ImageModalComponent } from './image.modal/image.modal.component';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss'],
})
export class EditProjectModalComponent implements OnInit {
  progressRef: NgProgressRef;
  items: [];
  private project: any;
  private logoImage: any;
  private coverImage: any;
  private clients: [];
  EditFormGroup = new FormGroup({
    name: new FormControl(),
    client: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    cost: new FormControl(''),
    currency: new FormControl(''),
    logo: new FormControl(''),
  });
  fileToUpload: File = null;
  param1: any;
  client: any;
  gal: any;
  uploadForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private progress: NgProgress,
    private snackBar: MatSnackBar,
    public gallery: Gallery, //
  ) {
    this.param1 = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    // this.items = data.map(item =>
    //   new ImageItem({ src: item.link, name: item.name, desc: item.description })
    // );

    // Load items into the lightbox
    this.basicLightboxExample();
    this.getProjects();

    // Load item into different lightbox instance
    // With custom gallery config
    // this.withCustomGalleryConfig();
    this.getClients();
    this.projectsService.getSingleProject(this.param1).subscribe((result: any) => {
      this.project = result.payload;
      this.EditFormGroup.controls['name'].setValue(result.payload.name);
      this.EditFormGroup.controls['client'].setValue(result.payload.client.name);
      this.EditFormGroup.controls['start'].setValue(result.payload.startDate);
      this.EditFormGroup.controls['end'].setValue(result.payload.endDate);
      this.EditFormGroup.controls['cost'].setValue(result.payload.cost);
      this.EditFormGroup.controls['currency'].setValue(result.payload.currency);
      if (result.payload.logo) {
        this.logoImage = result.payload.logo.link;
      }
      this.client = result.payload.client;
      if (result.payload.cover) {
        this.coverImage = result.payload.cover.link;
      }
      this.progressRef.complete();
    });
    console.log('TCL: EditProjectModalComponent -> ngOnInit -> this.project', this.project);

    this.uploadForm = this.fb.group({
      logo: [''],
      cover: [''],
    });
  }
  basicLightboxExample() {}

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

  editProjectsImages() {
    this.progressRef.start();
    const formData = new FormData();
    formData.append('logo', this.uploadForm.get('logo').value);
    // formData.append('file', this.uploadForm.get('cover').value);

    const formData2 = new FormData();
    formData2.append('cover', this.uploadForm.get('cover').value);

    this.projectsService.addLogo(this.param1, formData).subscribe((result: any) => {
      console.log(result);
      this.logoImage = result.payload.link;
    });

    this.projectsService.addCover(this.param1, formData2).subscribe((result: any) => {
      console.log(result);
      this.coverImage = result.payload.link;
    });
    this.progressRef.complete();
  }

  editProjectsDetails() {
    this.progressRef.start();
    const projectName = this.EditFormGroup.value.name;
    const clientId = this.EditFormGroup.value.client;
    const startDate = this.EditFormGroup.value.start;
    const endDate = this.EditFormGroup.value.end;
    const cost = this.EditFormGroup.value.cost;
    const currency = this.EditFormGroup.value.currency;
    const payload = {
      name: projectName,
      clientId: clientId,
      startDate: startDate,
      endDate: endDate,
      cost: cost,
      currency: currency,
    };
    this.projectsService.editProject(this.param1, payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
      this.progressRef.complete();
    });
  }

  editLogoCover() {}

  uploadFileLogo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('logo').setValue(file);
    }
  }

  getProjects() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.projectsService.getSingleProject(this.param1).subscribe((result: any) => {
      this.gal = result.payload.gallery;
      console.log('TCL: EditProjectModalComponent -> getProjects -> this.gal', this.gal);
      this.items = this.gal.map(
        item =>
          new ImageItem({
            src: item.link,
            thumb: item.link,
            name: item.name,
            id: item.id,
          }),
      );
      this.gallery.ref().load(this.items);
      console.log('TCL: EditProjectModalComponent -> getProjects -> this.items', this.items);
      this.progressRef.complete();
    });
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '40rem',
      data: {
        projectImage: true,
        project: this.param1,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.snackBar.open('Image Added', '', {
          duration: 3000,
        });
        this.getProjects();
      }
    });
  }

  uploadFileCover(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('cover').setValue(file);
    }
  }

  getClients() {
    this.clientService.getClient().subscribe((result: any) => {
      this.clients = result.payload;
    });
  }

  deleteLogo() {
    this.progressRef.start();
    console.log('sdsd');
    this.projectsService.deleteLogo(this.param1).subscribe((result: any) => {
      this.logoImage = null;
      this.progressRef.complete();
    });
  }

  deleteCover() {
    this.progressRef.start();
    this.projectsService.deleteCover(this.param1).subscribe((result: any) => {
      this.coverImage = null;
      this.progressRef.complete();
    });
  }

  deleteGallery(id) {
    this.progressRef.start();
    this.projectsService.deleteGallery(this.param1, id).subscribe((result: any) => {
      this.getProjects();
      this.progressRef.complete();
    });
  }
}
