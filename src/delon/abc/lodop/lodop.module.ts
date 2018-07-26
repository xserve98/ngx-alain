import { ModuleWithProviders, NgModule } from '@angular/core';
import { DelonUtilModule } from '@delon/util';

import { AdLodopConfig } from '@delon/abc/lodop/lodop.config';
import { LodopService } from '@delon/abc/lodop/lodop.service';

@NgModule({
  imports: [DelonUtilModule],
})
export class AdLodopModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdLodopModule,
      providers: [LodopService, AdLodopConfig],
    };
  }
}
