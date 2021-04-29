import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormmagicPage } from './formmagic.page';

describe('FormmagicPage', () => {
  let component: FormmagicPage;
  let fixture: ComponentFixture<FormmagicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormmagicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormmagicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
