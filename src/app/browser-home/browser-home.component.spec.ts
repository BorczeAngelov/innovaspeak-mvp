import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserHomeComponent } from './browser-home.component';

describe('BrowserHomeComponent', () => {
  let component: BrowserHomeComponent;
  let fixture: ComponentFixture<BrowserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
