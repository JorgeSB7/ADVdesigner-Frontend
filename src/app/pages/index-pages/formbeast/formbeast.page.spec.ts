import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormbeastPage } from './formbeast.page';

describe('FormbeastPage', () => {
  let component: FormbeastPage;
  let fixture: ComponentFixture<FormbeastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormbeastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormbeastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
