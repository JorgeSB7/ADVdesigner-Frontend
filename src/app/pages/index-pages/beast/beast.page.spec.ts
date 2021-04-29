import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeastPage } from './beast.page';

describe('BeastPage', () => {
  let component: BeastPage;
  let fixture: ComponentFixture<BeastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
