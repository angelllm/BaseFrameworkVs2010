import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { SlideMenuComponent } from './slide-menu/slide-menu.component';
import { ContentComponent } from './content/content.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { SmallHeaderComponent } from './small-header/small-header.component';
import { AboutContentComponent } from './about-content/about-content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { ViewArticleDataService } from './view-article-data.service';

const RouterConfig = RouterModule.forRoot([

  {
    path: '',
    component: ArticleListComponent
  },
  {
    path: 'home',
    component: ArticleListComponent
  },
  {
    path: 'about',
    component: AboutContentComponent
  },
  {
    path: 'category/:name',
    component: ArticleListComponent
  },
  {
    path: 'tag/:tagName',
    component: ArticleListComponent
  },
  {
    path: 'view/:id',
    component: ArticleItemComponent
  },
  { path: '**', component: PageNotFoundComponent }
],{useHash:true})

//RouterConfig.useHash = true

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    LeftBarComponent,
    SlideMenuComponent,
    ContentComponent,
    ArticleListComponent,
    ArticleItemComponent,
    SmallHeaderComponent,
    AboutContentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterConfig,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
