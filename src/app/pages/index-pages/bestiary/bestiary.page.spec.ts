import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestiaryPage } from './bestiary.page';

describe('BestiaryPage', () => {
  let component: BestiaryPage;
  let fixture: ComponentFixture<BestiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
