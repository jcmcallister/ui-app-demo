import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { DataService } from '../data.service';
import { HostConfiguration } from '../hostconfiguration';
import { GetConfigResponse } from '../get-config-response';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit, OnDestroy {

  public theHosts : HostConfiguration[] = []; // original dataset
  public viewHosts : HostConfiguration[]; // those visible in the view

  public isLoading: boolean = false;

  public searchEnabled: boolean = false;
  public term = new FormControl();

  public resultPageSize: number = 24;
  public orderVal: string = "";
  public orderReversed: boolean = false;

  private requestLimit: number = 100; // TODO: num of hosts per fetch request
  private retryFlag : boolean = false;
  private cache_expiry_minutes: number = 5; // number of minutes to cache remote resuls

  private termSubscription;

  constructor(private dataService: DataService, private orderPipe: OrderPipe) {
    this.termSubscription = this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe( term => {
        // read in our term if field has a value
        let filterBy = term ? term.toLowerCase() : null;

        // filter if needed
        let filteredSet;
        if (filterBy) {
          filteredSet = this.theHosts.filter((host) => {
            return (host.name.toLowerCase().indexOf(filterBy) > -1) ||
              (host.hostname.toLowerCase().indexOf(filterBy) > -1) ||
              (host.port.toString().indexOf(filterBy) > -1) ||
              (host.username.toLowerCase().indexOf(filterBy) > -1);
          });
        } else {
          filteredSet = this.theHosts;
        }

        // assign to visible template
        this.viewHosts = filteredSet;
      } );
  }

  ngOnInit() {
    this.loadConfigs();
  }

  ngOnDestroy(){
    // unsubscribe our local to avoid memory leak
    this.termSubscription.unsubscribe();
  }

  loadConfigs() {
    this.isLoading = true;

    // unpack sessionStorage so we're not hammering the endpoint
    if(sessionStorage.getItem('hosts')) {
      if(this.cacheIsOK('hosts')) {
        this.viewHosts = this.theHosts = JSON.parse(sessionStorage.getItem('hosts')) as HostConfiguration[]; // type assertions didn't like my <T>[]...
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
    // this.dataService.getConfigurations('demo.json', 2)
      .subscribe(resp => {
        if (resp.status == 200 && typeof resp.body.configurations !== "undefined") {
          this.viewHosts = this.theHosts = resp.body.configurations;
          this.success();
          this.saveToCache();
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
    if(this.orderVal === prop) {
      this.orderReversed = !this.orderReversed;
      console.log("HostsCmp :: orderBy : reversed!");
    }else {
      this.orderVal = prop;
      console.log("HostsCmp :: orderBy : new ordering value!");
    }

    // using viewHosts so we don't mutate the original set
    this.viewHosts = this.orderPipe.transform(this.viewHosts, prop);
  }


}
