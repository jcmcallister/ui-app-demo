import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsComponent } from './hosts.component';

describe('HostsComponent', () => {
  let component: HostsComponent;
  let fixture: ComponentFixture<HostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // tests to write
    // if loading, displays <app-loading> child template
    // if theHosts.length > 0, displays results
    // if theHosts.length > 0  and searchEnabled, displays text input
    // text input for search term should filter result set, mock a set with 2 entries, with 1 valid hit
    // text input search filter, mock a set with 1 entry, with 0 valid hits
    // test for ordering in host results
      // trigger click event on a title row cell, it should sort ascending
      // trigger 2nd click event on a title row cell, it should sort descending
      // trigger 3rd click event on a title row cell, it should sort ascending

    // test for pagination in host results if 50 results in mock set, should be (int)(50 / pageSize) pages
    // test the caching: if user hits the HostsComponent, 1 network request goes out. if they navigate to Dashboard, then back, 0 new network requests
    // test the forced data fetch button: 1 network request is sent on click
});
