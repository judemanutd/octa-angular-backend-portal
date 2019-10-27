import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  title: string;

  routeTitles = {
    categories: {name: 'Categories'},
    technologies: {name: 'Technologies'},
    dashboard: {name: 'Dashboard'}
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPageTitle();
  }

  getPageTitle(): void {
    const url = this.route.snapshot.url.join().split(',')[0];
    this.title = this.routeTitles[url];
  }
}
