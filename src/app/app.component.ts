import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'digital-relay';
  containerClass = 'container';

  constructor(private router: Router) {
    console.log(this.router.url);
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.containerClass = 'container-fluid';
    }
  }
}
