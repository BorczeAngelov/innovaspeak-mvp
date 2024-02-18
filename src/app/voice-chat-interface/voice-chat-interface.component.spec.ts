import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceChatInterfaceComponent } from './voice-chat-interface.component';

describe('VoiceChatInterfaceComponent', () => {
  let component: VoiceChatInterfaceComponent;
  let fixture: ComponentFixture<VoiceChatInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceChatInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoiceChatInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
