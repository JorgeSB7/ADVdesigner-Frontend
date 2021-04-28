import { Component, Input, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input("contentId") contentId;
  
  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {}

}
