import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TechnologiesService } from '~app/services/technologies.service';
import { CategoriesService } from '~app/services/categories.service';
import { ComponentsService } from '~app/services/components.service';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss'],
})
export class ComponentComponent implements OnInit {
  progressRef: NgProgressRef;
  panelOpenState = false;
  param1: any;
  editMode: boolean;
  componentId: any;
  editCat: any;
  selectedValue: any[];
  selectedTech: any = [];
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
    private router: Router,
    private technologiesService: TechnologiesService,
    private categoriesService: CategoriesService,
    private componentService: ComponentsService,
    private progress: NgProgress,
  ) {
    this.param1 = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.progressRef = this.progress.ref('myProgress');
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

  clearForm() {
    this.ComponentFormGroup.reset();
    this.editMode = false;
  }

  editComponent(id) {
    this.progressRef.start();
    // this.selectedTech = [''];

    console.log('TCL: ComponentComponent -> editComponent -> selectedTech', this.selectedTech);
    this.componentId = id;
    this.componentService
      .getSingleComponent(this.componentId, this.param1)
      .subscribe((result: any) => {
        console.log('TCL: ComponentComponent -> editComponent -> selectedTech', this.selectedTech);
        this.editMode = true;
        this.ComponentFormGroup.controls['name'].setValue(result.payload.name);
        this.ComponentFormGroup.controls['summary'].setValue(result.payload.summary);
        this.ComponentFormGroup.controls['description'].setValue(result.payload.description);
        // this.ComponentFormGroup.controls['categoryId'].setValue(result.payload.category.id);
        this.ComponentFormGroup.controls['technologyId'].setValue(result.payload.technology.id);
        this.editCat = result.payload.category.name;
        this.selectedValue = result.payload.category;
        let res = result.payload.technology;
        console.log('TCL: ComponentComponent -> editComponent -> res', res);
        res.forEach(element => {
          console.log('TCL: ComponentComponent -> editComponent -> element', element);
          this.selectedTech.push(element.id);
        });
        console.log('TCL: ComponentComponent -> editComponent -> selectedTech', this.selectedTech);
        console.log(
          'TCL: ComponentComponent -> editComponent -> result.payload.category.name',
          result.payload.category.name,
        );
        this.getCategories();
        // this.ComponentFormGroup.controls['currency'].setValue(result.payload.currency);
        // this.logoImage = result.payload.logo.link;
        // this.coverImage = result.payload.cover.link;
        this.progressRef.complete();
      });
  }

  addComponent() {
    const name = this.ComponentFormGroup.value.name;
    const categoryId = this.ComponentFormGroup.value.categoryId;
    const summary = this.ComponentFormGroup.value.summary;
    const description = this.ComponentFormGroup.value.description;
    const technologyId = this.ComponentFormGroup.value.technologyId;
    // const links = this.ComponentFormGroup.value.links;
    const payload = {
      name: name,
      summary: summary,
      description: description,
      categoryId: categoryId,
      technologyId: technologyId,
    };
    if (this.editMode) {
      this.componentService
        .editComponent(this.param1, this.componentId, payload)
        .subscribe((result: any) => {
          this.editMode = false;
          this.getProjectComponents();
          this.ComponentFormGroup.reset();
        });
    } else {
      this.componentService.addComponent(this.param1, payload).subscribe((result: any) => {
        /* Successful call send "refresh" to modal close event binder
         * which allows us to refresh the table
         */
        this.getProjectComponents();
      });
    }
  }

  viewComponent(id) {
    this.router.navigateByUrl(`component/view/${this.param1}/${id}`);
  }

  getProjectComponents() {
    this.progressRef.start();
    this.componentService.getcomponents(this.param1).subscribe((result: any) => {
      this.components = result.payload;
      this.progressRef.complete();
    });
  }
}
