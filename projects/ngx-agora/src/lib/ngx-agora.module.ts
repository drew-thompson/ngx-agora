import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgoraConfig } from './data/models/agora-config.model';
import { NgxAgoraComponent } from './ngx-agora.component';
import { NgxAgoraService } from './ngx-agora.service';

@NgModule({
  declarations: [NgxAgoraComponent],
  exports: [NgxAgoraComponent]
})
export class NgxAgoraModule {
  static forRoot(config: AgoraConfig): ModuleWithProviders<RouterModule> {
    return {
      ngModule: NgxAgoraModule,
      providers: [NgxAgoraService, { provide: 'config', useValue: config }]
    };
  }
}
