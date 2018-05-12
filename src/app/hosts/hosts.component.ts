import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DataService } from '../data.service';
import { HostConfiguration } from '../hostconfiguration';
import { GetConfigResponse } from '../get-config-response';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {

  public theHosts : HostConfiguration[] = [];
  public isLoading: boolean = false;

  public searchEnabled: boolean = false;
  public term = new FormControl();

  public resultPageSize: number = 24;
  public orderVal: string = "";
  public orderReversed: boolean = false;

  private requestLimit: number = 100; // TODO: num of hosts per fetch request
  private retryFlag : boolean = false;
  private cache_expiry_minutes: number = 5; // number of minutes to cache remote resuls

  constructor(private dataService: DataService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.loadConfigs();
  }

  loadConfigs() {
    this.isLoading = true;

    // unpack sessionStorage so we're not hammering the endpoint
    if(sessionStorage.getItem('hosts')) {
      if(this.cacheIsOK('hosts')) {
        this.theHosts = JSON.parse(sessionStorage.getItem('hosts')) as HostConfiguration[]; // type assertions didn't like my <T>[]...
        this.success();
      } else {
        this.getHostConfigs();
      }
    }else {
      this.getHostConfigs();
    }
  }

  cacheIsOK(keyname) {
    // if date > sessionStorage[keyname + "_expiry"], return false
    let rv = false, val = sessionStorage.getItem(keyname + '_expiry');

    if(val !== null && Date.now() <= parseInt(val)) {
      rv = true;
    }

    return rv;
  }

  forceUpdate() {
    // force ping the endpoint, without first checking the cache
    this.isLoading = true;
    this.getHostConfigs();
    this.saveToCache();
  }

  getHostConfigs() {
    this.dataService.getConfigurations('request.php', 2)
      .subscribe(resp => {
        if (resp.status == 200 && typeof resp.body.configurations !== "undefined") {
          this.theHosts = resp.body.configurations;
          this.success();
          this.saveToCache();

          if(this.theHosts.length > this.resultPageSize) {
            this.searchEnabled = true;
          }
        }else {
          this.retryFlag = true;
        }
      });
  }

  saveToCache() {
    // on success, put theHosts in sessionStorage, with an expiry key/val, too
    sessionStorage.setItem('hosts', JSON.stringify(this.theHosts));
    sessionStorage.setItem('hosts_expiry', (Date.now() + (this.cache_expiry_minutes * 60 * 1000)).toString() );
  }

  success() {
    this.isLoading = false;
    this.retryFlag = false;
    this.searchEnabled = true;
  }

  orderBy(prop: string) {
    if(this.orderVal === this.orderVal) {
      this.orderReversed = true;
    }else {
      this.orderVal = prop;
    }

    // TODO: fix up so we don't mutate the original set
    this.theHosts = this.orderPipe.transform(this.theHosts, prop);
  }

}
