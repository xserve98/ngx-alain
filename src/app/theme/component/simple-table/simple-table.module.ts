import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelonUtilModule } from '@delon/util';

import { SimpleTableComponent } from '@theme/component/simple-table/simple-table.component';
import { SimpleTableRowDirective } from '@theme/component/simple-table/simple-table-row.directive';
import { AdSimpleTableConfig } from '@theme/component/simple-table/simple-table.config';

const COMPONENTS = [SimpleTableComponent, SimpleTableRowDirective];

// region: zorro modules

import { NgZorroAntdModule } from 'ng-zorro-antd';

const ZORROMODULES = [NgZorroAntdModule];

// endregion

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [CommonModule, FormsModule, DelonUtilModule, ...ZORROMODULES],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [AdSimpleTableConfig]
})
export class AdSimpleTableModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: AdSimpleTableModule, providers: [AdSimpleTableConfig] };
  }
}
