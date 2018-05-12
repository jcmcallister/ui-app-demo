import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HostConfiguration } from '../hostconfiguration';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {

  public theHosts : HostConfiguration[] = null;
  public isLoading: boolean = false;
  private retryFlag : boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadConfigs();
  }

  loadConfigs() {
    this.isLoading = true;
    this.fetchAttempt();
  }

  success() {
    this.isLoading = false;
    this.retryFlag = false;
  }

  fetchAttempt() {
    this.dataService.getConfigurations('request', 2)
      .subscribe(resp => {
        if (resp.status == 200) {
          this.theHosts = { ... resp.body };
          this.success();
        }else {
          this.retryFlag = true;
        }
      });
  }

}
