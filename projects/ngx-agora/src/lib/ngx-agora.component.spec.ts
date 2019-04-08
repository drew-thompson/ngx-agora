import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAgoraComponent } from './ngx-agora.component';

describe('NgxAgoraComponent', () => {
  let component: NgxAgoraComponent;
  let fixture: ComponentFixture<NgxAgoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAgoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAgoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
