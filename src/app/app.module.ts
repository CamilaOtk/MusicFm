import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { ContentComponent } from './layout/content/content.component';
import { CardBaseComponent } from './layout/content/components/card-base/cardbase.component';
import { CardbyalbumComponent } from './layout/content/components/card-by-album/cardbyalbum.component';
import { CardbyartistComponent } from './layout/content/components/card-by-artist/cardbyartist.component';
import { LeftmenuComponent } from './layout/content/components/left-menu/leftmenu.component';
import { CardHistoricComponent } from './layout/content/components/card-historic/cardhistoric.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingComponent,
    ContentComponent,
    CardBaseComponent,
    CardbyalbumComponent,
    CardbyartistComponent,
    LeftmenuComponent,
    CardHistoricComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
