import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeebeastPage } from './seebeast.page';

describe('SeebeastPage', () => {
  let component: SeebeastPage;
  let fixture: ComponentFixture<SeebeastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeebeastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeebeastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
