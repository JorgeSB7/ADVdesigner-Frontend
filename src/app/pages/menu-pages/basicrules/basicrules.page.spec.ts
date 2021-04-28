import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BasicrulesPage } from './basicrules.page';

describe('BasicrulesPage', () => {
  let component: BasicrulesPage;
  let fixture: ComponentFixture<BasicrulesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicrulesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BasicrulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
