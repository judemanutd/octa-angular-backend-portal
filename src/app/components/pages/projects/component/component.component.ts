import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';
import { ComponentsService } from '~app/services/components.service';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  panelOpenState = false;
  param1: any;
  toppings = new FormControl();
  technologies: any = [];
  components: any = [];
  categories: any = [];
  ComponentFormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(''),
    summary: new FormControl(''),
    description: new FormControl(''),
    technologyId: new FormControl(''),
    links: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
    private componentService: ComponentsService,
  ) {
    this.param1 = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getTechnologies();
    this.getCategories();
    this.getProjectComponents();
  }

  getTechnologies() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.technologiesService.getTechnologies().subscribe((result: any) => {
      this.technologies = result.payload;
    });
  }

  getCategories() {
    /* Calls the getCategories function in the categories service and updates the
     * dataSource variable which has 2 way binding wih view layer
     * This enables the table component to update with the new data
     * Paginator and Sorting is loaded to the dataSource object
     */
    this.categoriesService.getCategories().subscribe((result: any) => {
      this.categories = result.payload;
    });
  }

  editComponent(id) {
    this.componentService.getSingleComponent(this.param1, id).subscribe((result: any) => {
      this.ComponentFormGroup.controls['name'].setValue(result.payload.name);
      this.ComponentFormGroup.controls['summary'].setValue(result.payload.summary);
      this.ComponentFormGroup.controls['description'].setValue(result.payload.description);
      this.ComponentFormGroup.controls['categoryId'].setValue(result.payload.categoryId);
      this.ComponentFormGroup.controls['technologyId'].setValue(result.payload.technologyId);
      // this.ComponentFormGroup.controls['currency'].setValue(result.payload.currency);
      // this.logoImage = result.payload.logo.link;
      // this.coverImage = result.payload.cover.link;
    });
  }

  addComponent() {
    const name = this.ComponentFormGroup.value.name;
    const categoryId = this.ComponentFormGroup.value.categoryId;
    const summary = this.ComponentFormGroup.value.summary;
    const description = this.ComponentFormGroup.value.description;
    const technologyId = this.ComponentFormGroup.value.technologyId;
    const links = this.ComponentFormGroup.value.links;
    const payload = {
      name: name,
      summary: summary,
      description: description,
      categoryId: categoryId,
      technologyId: technologyId,
      links: links,
    };
    this.componentService.addComponent(this.param1, payload).subscribe((result: any) => {
      /* Successful call send "refresh" to modal close event binder
       * which allows us to refresh the table
       */
    });
  }

  getProjectComponents() {
    this.componentService.getcomponents(this.param1).subscribe((result: any) => {
      this.components = result.payload;
    });
  }
}
