import { Component, OnInit } from '@angular/core';
import { Menuitem } from '../menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menuitems: Menuitem[];

  constructor() {
    this.menuitems = [
      {
        text: "Dashboard",
        isExtLink: false,
        isRoute: true,
        isFunction: false,
        href: "/",
        action: undefined
      },
      {
        text: "Hosts",
        isExtLink: false,
        isRoute: true,
        isFunction: false,
        href: "hosts",
        action: undefined
      }
    ];
  }

  ngOnInit() {
  }

}
