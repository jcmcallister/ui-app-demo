import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router : Router) {
    router.events.subscribe(event => {

      if(event instanceof NavigationEnd) {
        // hook in case we want to do something onViewChange
      }

    });
  }
}
