import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HostConfiguration } from '../hostconfiguration';
import { GetConfigResponse } from '../get-config-response';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {

  public theHosts : HostConfiguration[] = [];
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
    this.dataService.getConfigurations('request.php', 2)
      .subscribe(resp => {

        console.log(JSON.stringify(resp));

        if (resp.status == 200 && typeof resp.body.configurations !== "undefined") {
          this.theHosts = resp.body.configurations;
          this.success();
        }else {
          this.retryFlag = true;
        }
      });
  }

}
