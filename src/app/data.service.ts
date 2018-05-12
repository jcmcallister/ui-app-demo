import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HostConfiguration } from './hostconfiguration';
import { GetConfigResponse } from './get-config-response';

@Injectable()
export class DataService {

  // TODO: something to hold any requested data for the duration of the logged in session
  public sessionData: Object = {};
  private endpoint_downloads: string = "download";

  constructor(private http: HttpClient) { }

  public getConfigurations(api_method: string, hostcount: number) : Observable<HttpResponse<GetConfigResponse>> {
    return this.http.get<GetConfigResponse>(
      this.endpoint_downloads + "/" + api_method + "?host=" + hostcount, { observe: 'response' }
    );
  }



}
