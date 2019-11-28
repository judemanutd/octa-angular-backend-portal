import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  title: string = null;

  routeTitles = {
    categories: { name: 'Categories' },
    technologies: { name: 'Technologies' },
    dashboard: { name: 'Dashboard' },
    user: { name: 'User' },
    clients: { name: 'Clients' },
    projects: { name: 'Projects' },
  };

  @Input()
  hasCrud: boolean;

  @Output() showCallBackPopUp = new EventEmitter();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPageTitle();
  }

  showCallbackToggle() {
    this.showCallBackPopUp.emit();
  }

  getPageTitle(): void {
    const url = this.route.snapshot.url.join().split(',')[0];
    this.title = this.routeTitles[url].name;
  }
}
