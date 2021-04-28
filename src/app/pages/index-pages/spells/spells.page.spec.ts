import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpellsPage } from './spells.page';

describe('SpellsPage', () => {
  let component: SpellsPage;
  let fixture: ComponentFixture<SpellsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpellsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
