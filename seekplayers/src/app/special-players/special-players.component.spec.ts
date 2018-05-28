import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPlayersComponent } from './special-players.component';

describe('SpecialPlayersComponent', () => {
  let component: SpecialPlayersComponent;
  let fixture: ComponentFixture<SpecialPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
