import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate:[AuthService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/index-pages/characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./pages/index-pages/campaigns/campaigns.module').then( m => m.CampaignsPageModule)
  },
  {
    path: 'bestiary',
    loadChildren: () => import('./pages/index-pages/bestiary/bestiary.module').then( m => m.BestiaryPageModule)
  },
  {
    path: 'spells',
    loadChildren: () => import('./pages/index-pages/spells/spells.module').then( m => m.SpellsPageModule)
  },
  {
    path: 'races',
    loadChildren: () => import('./pages/menu-pages/races/races.module').then( m => m.RacesPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./pages/menu-pages/classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'basicrules',
    loadChildren: () => import('./pages/menu-pages/basicrules/basicrules.module').then( m => m.BasicrulesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'newaccount',
    loadChildren: () => import('./pages/newaccount/newaccount.module').then( m => m.NewaccountPageModule)
  },
  {
    path: 'seecharacter',
    loadChildren: () => import('./pages/index-pages/seecharacter/seecharacter.module').then( m => m.SeecharacterPageModule)
  },
  {
    path: 'seecampaign',
    loadChildren: () => import('./pages/index-pages/seecampaign/seecampaign.module').then( m => m.SeecampaignPageModule)
  },
  {
    path: 'tools',
    loadChildren: () => import('./pages/menu-pages/tools/tools.module').then( m => m.ToolsPageModule)
  },
  {
    path: 'seebeast',
    loadChildren: () => import('./pages/index-pages/seebeast/seebeast.module').then( m => m.SeebeastPageModule)
  },
  {
    path: 'seemagic',
    loadChildren: () => import('./pages/index-pages/seemagic/seemagic.module').then( m => m.SeemagicPageModule)
  },
  {
    path: 'formmagic',
    loadChildren: () => import('./pages/index-pages/formmagic/formmagic.module').then( m => m.FormmagicPageModule)
  },
  {
    path: 'formbeast',
    loadChildren: () => import('./pages/index-pages/formbeast/formbeast.module').then( m => m.FormbeastPageModule)
  },
  {
    path: 'beast',
    loadChildren: () => import('./pages/index-pages/beast/beast.module').then( m => m.BeastPageModule)
  },
  {
    path: 'magic',
    loadChildren: () => import('./pages/index-pages/magic/magic.module').then( m => m.MagicPageModule)
  },
  {
    path: 'music',
    loadChildren: () => import('./pages/menu-pages/music/music.module').then( m => m.MusicPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
