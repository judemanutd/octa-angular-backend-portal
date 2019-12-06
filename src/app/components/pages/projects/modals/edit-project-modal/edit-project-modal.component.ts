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

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss'],
})
export class EditProjectModalComponent implements OnInit {
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
  uploadForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public gallery: Gallery, //
  ) {
    this.param1 = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // this.items = data.map(item =>
    //   new ImageItem({ src: item.link, name: item.name, desc: item.description })
    // );

    // Load items into the lightbox
    this.basicLightboxExample();
    this.getProjects();

    // Load item into different lightbox instance
    // With custom gallery config
    this.withCustomGalleryConfig();
    this.getClients();
    this.projectsService.getSingleProject(this.param1).subscribe((result: any) => {
      this.project = result.payload;
      this.EditFormGroup.controls['name'].setValue(result.payload.name);
      this.EditFormGroup.controls['client'].setValue(result.payload.client.name);
      this.EditFormGroup.controls['start'].setValue(result.payload.startDate);
      this.EditFormGroup.controls['end'].setValue(result.payload.endDate);
      this.EditFormGroup.controls['cost'].setValue(result.payload.cost);
      this.EditFormGroup.controls['currency'].setValue(result.payload.currency);
      this.logoImage = result.payload.logo.link;
      this.coverImage = result.payload.cover.link;
    });
    console.log('TCL: EditProjectModalComponent -> ngOnInit -> this.project', this.project);

    this.uploadForm = this.fb.group({
      logo: [''],
      cover: [''],
    });
  }
  basicLightboxExample() {
    this.gallery.ref().load(this.items);
  }

  /**
   * Use custom gallery config with the lightbox
   */
  withCustomGalleryConfig() {
    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  }

  editProjectsImages() {
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
  }

  editProjectsDetails() {
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
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.projectsService.getSingleProject(this.param1).subscribe((result: any) => {
      this.items = result.payload.gallery;
    });
  }

  openAddModal(): void {
    /* Opens a model which contains the AddCategoriesModalComponent defined below */
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '40rem',
      data: this.param1,
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
}
