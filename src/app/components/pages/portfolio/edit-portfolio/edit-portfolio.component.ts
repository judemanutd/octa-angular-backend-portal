import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from '~app/services/categories.service';
import { Portfolio } from '~app/interfaces/Portfolio';
import { PortfolioService } from '~app/services/portfolio.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { TechnologiesService } from '~app/services/technologies.service';
import { ComponentsService } from '~app/services/components.service';
import { ProjectsService } from '~app/services/projects.service';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss'],
})
export class EditPortfolioComponent implements OnInit {
  progressRef: NgProgressRef;
  EditFormGroup = new FormGroup({
    title: new FormControl(this.data.title),
    description: new FormControl(this.data.description),
    componentId: new FormControl(this.data.componentId),
    technologyId: new FormControl(this.data.technologyId),
    categoryId: new FormControl(this.data.categoryId),
    projectId: new FormControl(this.data.projectId),
  });
  project: any = [];
  component: any = [];
  technology: any = [];
  category: any = [];
  projectSelect: any;
  componentSelect: any;
  techSelect: any;
  catSelect: any;

  constructor(
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
    this.getProjects();
    this.getTechnologies();
    this.getComponents();
    this.getCategories();
    this.progressRef = this.progress.ref('myProgress');
    this.progressRef.start();
    this.portfolioService.getSinglePortfolio(this.data.id).subscribe((result: any) => {
      this.project = result.payload;
      this.EditFormGroup.controls['title'].setValue(result.payload.title);
      this.EditFormGroup.controls['description'].setValue(result.payload.description);
      this.EditFormGroup.controls['componentId'].setValue(result.payload);
      this.EditFormGroup.controls['technologyId'].setValue(result.payload);
      this.EditFormGroup.controls['categoryId'].setValue(result.payload);
      this.EditFormGroup.controls['projectId'].setValue(result.payload);
      const res = result.payload.technology;
      // var tech = [], cat = [], proj = [], comp = [];
      console.log('TCL: ComponentComponent -> editComponent -> res', res);
      res.forEach(element => {
        console.log(element.id);
        this.technology.push(element.id);
        // this.technology = tech;
        console.log('TCL: EditPortfolioComponent -> ngOnInit -> technology', this.technology);
      });
      const res1 = result.payload.category;
      res1.forEach(element => {
        this.category.push(element.id);
        // this.category = cat;
        console.log('TCL: EditPortfolioComponent -> ngOnInit -> this.category', this.category);
      });
      const res2 = result.payload.project;
      res1.forEach(element => {
        this.project.push(element.id);
        // this.project = proj
      });
      const res3 = result.payload.component;
      res1.forEach(element => {
        this.component.push(element.id);
        // this.component = comp;
      });
      this.progressRef.complete();
    });
    console.log('TCL: EditPortfolioComponent -> this.data', this.data);
  }

  editCategories() {
    const categoryName = this.EditFormGroup.value.name;
    const id = this.data.id;
    const payload = {
      name: categoryName,
    };
    this.categoriesService.editCategory(id, payload).subscribe((result: any) => {
      this.dialogRef.close('refresh');
    });
  }

  getCategories() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.catSelect = result.payload;
    });
  }

  getTechnologies() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.technologiesService.getTechnologies().subscribe((result: any) => {
      this.techSelect = result.payload;
    });
  }

  getComponents() {
    this.componentsService.getAllComponenets().subscribe((result: any) => {
      this.componentSelect = result.payload.results;
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((result: any) => {
      this.projectSelect = result.payload;
    });
  }
}
