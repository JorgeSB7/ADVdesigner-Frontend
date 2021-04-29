import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MagicPage } from './magic.page';

describe('MagicPage', () => {
  let component: MagicPage;
  let fixture: ComponentFixture<MagicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MagicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
