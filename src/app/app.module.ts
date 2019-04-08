import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgoraConfig, NgxAgoraModule } from 'ngx-agora';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const agoraConfig: AgoraConfig = {
  AppID: 'f07033f31b7d436ab62d948320dd0a01'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAgoraModule.forRoot(agoraConfig),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
