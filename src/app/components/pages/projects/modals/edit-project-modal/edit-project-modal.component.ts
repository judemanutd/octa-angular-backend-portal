import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {} from '@angular/material';
import {} from '~app/interfaces/Project';
import { ProjectsService } from '~app/services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ClientsService } from '~app/services/clients.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss'],
})
export class EditProjectModalComponent implements OnInit {
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
  form: FormGroup;
  fileToUpload: File = null;
  param1: any;
  uploadForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public fb: FormBuilder, // @Inject(MAT_DIALOG_DATA) public data: Project,
  ) {
    this.param1 = this.route.snapshot.params.id;
    this.form = this.fb.group({
      logo: [null],
    });
  }

  ngOnInit() {
    this.getClients();
    const prod = this.projectsService.getSingleProject(this.param1).subscribe((result: any) => {
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

  editProjectsImages() {
    const categoryName = this.EditFormGroup.value.name;
    const file = this.form.value.logo;

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
