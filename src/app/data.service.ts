import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HostConfiguration } from './hostconfiguration';

@Injectable()
export class DataService {

  // TODO: something to hold any requested data for the duration of the logged in session
  public sessionData: Object = {};
  private endpoint_downloads: string = "download";

  constructor(private http: HttpClient) { }

  public getConfigurations(api_method: string, hostcount: number) : Observable<HttpResponse<HostConfiguration[]>> {
    return this.http.get<HostConfiguration[]>(
      this.endpoint_downloads + "/" + api_method + "?host=" + hostcount, { observe: 'response' }
    );
  }



}
