import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeemagicPage } from './seemagic.page';

describe('SeemagicPage', () => {
  let component: SeemagicPage;
  let fixture: ComponentFixture<SeemagicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeemagicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeemagicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
