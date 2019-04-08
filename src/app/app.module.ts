import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgoraConfig, NgxAgoraModule } from 'ngx-agora';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const agoraConfig: AgoraConfig = {
  AppID: '9cf6e81e7b204ac3ab4cd0a8988b21ed'
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxAgoraModule.forRoot(agoraConfig)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
