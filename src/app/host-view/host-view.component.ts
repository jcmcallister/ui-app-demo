import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { HostsComponent } from '../hosts/hosts.component';
import { HostConfiguration } from '../hostconfiguration';

@Component({
  selector: 'app-host-view',
  templateUrl: './host-view.component.html',
  styleUrls: ['./host-view.component.css']
})
export class HostViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
