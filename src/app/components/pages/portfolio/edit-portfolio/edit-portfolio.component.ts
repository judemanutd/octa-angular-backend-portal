import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Portfolio } from '~app/interfaces/Portfolio';
import { ClipboardService } from 'ngx-clipboard';
import { PortfolioService } from '~app/services/portfolio.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { TechnologiesService } from '~app/services/technologies.service';
import { ComponentsService } from '~app/services/components.service';
import { ProjectsService } from '~app/services/projects.service';
import { environment } from '~environments/environment';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss'],
})
export class EditPortfolioComponent implements OnInit {
  text1: string;
  text2: string;
  textModal: string;
  isCopied1: boolean;
  progressRef: NgProgressRef;
  EditFormGroup = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
    componentId: new FormControl(this.data.component),
    technologyId: new FormControl(this.data.technology),
    categoryId: new FormControl(this.data.category),
    projectId: new FormControl(this.data.project),
  });
  project: any = [];
  link: any;
  component: any = [];
  technology: any = [];
  category: any = [];
  projectSelect: any;
  componentSelect: any;
  techSelect: any;
  catSelect: any;
  portfolio: any = [];

  constructor(
    private snackBar: MatSnackBar,
    private _clipboardService: ClipboardService,
    public dialogRef: MatDialogRef<EditPortfolioComponent>,
    private portfolioService: PortfolioService,
    private categoriesService: CategoriesService,
    private projectService: ProjectsService,
    private componentsService: ComponentsService,
    private technologiesService: TechnologiesService,
    private progress: NgProgress,
    @Inject(MAT_DIALOG_DATA) public data: Portfolio,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.getProjects();
    this.getTechnologies();
    this.getComponents();
    this.getCategories();

    this.EditFormGroup.controls['title'].setValue(this.data.title);
    this.EditFormGroup.controls['description'].setValue(this.data.description);
    this.EditFormGroup.controls['componentId'].setValue(this.data.component);
    this.EditFormGroup.controls['technologyId'].setValue(this.data.technology);
    this.EditFormGroup.controls['categoryId'].setValue(this.data.category);
    this.EditFormGroup.controls['projectId'].setValue(this.data.project);
    this.link = this.data.id;
    const res = this.data.technology;
    res.forEach(element => {
      this.technology.push(element.id);
      // this.technology = tech;
    });
    const res1 = this.data.category;
    res1.forEach(element => {
      this.category.push(element.id);
      // this.category = cat;
    });

    const res2 = this.data.project;
    res2.forEach(element => {
      this.project.push(element.id);

      // this.project = proj
    });
    const res3 = this.data.component;
    res3.forEach(element => {
      if (element.id !== undefined) {
        this.component.push(element.id);
      }

      // this.component = comp;
    });
    this.progressRef.complete();

    // this.portfolioService.getSinglePortfolio(this.data.id).subscribe((result: any) => {
    //   console.log('TCL: EditPortfolioComponent -> ngOnInit -> result', result);
    //   this.portfolio = result.payload;
    //   console.log('TCL: EditPortfolioComponent -> ngOnInit -> project', this.portfolio);

    //

    //

    // });
    // console.log('TCL: EditPortfolioComponent -> this.data', this.data);
  }

  callServiceToCopy() {
    this._clipboardService.copyFromContent(environment.portfolioUrl + '' + this.link);
    this.snackBar.open('Link copied', '', {
      duration: 3000,
    });
  }

  editPortfolio() {
    this.progressRef.start();
    const portfolio = this.EditFormGroup.value.title;
    const description = this.EditFormGroup.value.description;
    const comp = this.EditFormGroup.value.componentId;
    const tech = this.EditFormGroup.value.technologyId;
    const cat = this.EditFormGroup.value.categoryId;
    const project = this.EditFormGroup.value.projectId;
    const payload = {
      payload: {
        title: portfolio,
        description: description,
        componentId: comp,
        technologyId: tech,
        categoryId: cat,
        projectId: project,
      },
    };
    this.portfolioService.editPortfolio(this.data.id, payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
      this.progressRef.complete();
      this.dialogRef.close();
    });
  }

  getCategories() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.catSelect = result.payload;
      this.progressRef.complete();
    });
  }

  getTechnologies() {
    this.progressRef.start();
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.technologiesService.getTechnologies().subscribe((result: any) => {
      this.techSelect = result.payload;
      this.progressRef.complete();
    });
  }

  getComponents() {
    this.progressRef.start();
    this.componentsService.getAllComponenets().subscribe((result: any) => {
      this.componentSelect = result.payload.results;
      this.progressRef.complete();
    });
  }

  getProjects() {
    this.progressRef.start();
    this.projectService.getProjects().subscribe((result: any) => {
      this.projectSelect = result.payload;
      this.progressRef.complete();
    });
  }
}
