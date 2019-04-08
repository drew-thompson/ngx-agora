import { ModuleWithProviders, NgModule } from '@angular/core';

import { AgoraConfig } from './models/exports';
import { NgxAgoraComponent } from './ngx-agora.component';
import { NgxAgoraService } from './ngx-agora.service';

@NgModule({
  declarations: [NgxAgoraComponent],
  exports: [NgxAgoraComponent]
})
export class NgxAgoraModule {
  static forRoot(config: AgoraConfig): ModuleWithProviders {
    return {
      ngModule: NgxAgoraModule,
      providers: [NgxAgoraService, { provide: 'config', useValue: config }]
    };
  }
}
