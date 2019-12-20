import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ComponentsService } from '~app/services/components.service';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';
import { ProjectsService } from '~app/services/projects.service';
import { PortfolioService } from '~app/services/portfolio.service';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss'],
})
export class AddPortfolioComponent implements OnInit {
  progressRef: NgProgressRef;
  AddFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    componentId: new FormControl([]),
    technologyId: new FormControl([]),
    categoryId: new FormControl([]),
    projectId: new FormControl([]),
  });
  categories: any;
  technologies: any;
  projects: any;
  components: any;
  data: any;

  constructor(
    public dialogRef: MatDialogRef<AddPortfolioComponent>,
    private projectsService: ProjectsService,
    private progress: NgProgress,
    private componentService: ComponentsService,
    private technologyService: TechnologiesService,
    private categoryService: CategoriesService,
    private portfolioService: PortfolioService,
  ) {}
  public clients: [];

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
    this.getCategories();
    this.getProjects();
    this.getTechnologies();
    this.getProjectComponents();
  }

  onNoClick(): void {
    /* Cancel button */
    this.dialogRef.close();
  }

  // getComp(id) {
  //   this.getProjectComponents(id.value);
  //   console.log('proj id', id.value);
  // }

  addPortfolio() {
    if (this.AddFormGroup.valid) {
      this.progressRef.start();
      /* Onsubmit of add modal form */
      const projectName = this.AddFormGroup.value.projectId;
      const title = this.AddFormGroup.value.title;
      const description = this.AddFormGroup.value.description;
      const categoryId = this.AddFormGroup.value.categoryId;
      const technologyId = this.AddFormGroup.value.technologyId;
      const componentId = this.AddFormGroup.value.componentId;
      const payload = {
        payload: {
          title: title,
          componentId: componentId,
          description: description,
          projectId: projectName,
          categoryId: categoryId,
          technologyId: technologyId,
        },
      };
      this.portfolioService.addPortfolio(payload).subscribe((result: any) => {
        /* Successful call send "refresh" to modal close event binder
         * which allows us to refresh the table
         */
        this.dialogRef.close('refresh');
        this.progressRef.complete();
      });
    }
  }

  getCategories() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.categoryService.getCategories().subscribe((result: any) => {
      this.categories = result.payload;
    });
  }

  getTechnologies() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.technologyService.getTechnologies().subscribe((result: any) => {
      this.technologies = result.payload;
    });
  }

  getProjects() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.projectsService.getProjects().subscribe((result: any) => {
      this.projects = result.payload;
    });
  }

  getProjectComponents() {
    this.componentService.getAllComponenets().subscribe((result: any) => {
      this.components = result.payload.results;
    });
  }
}
