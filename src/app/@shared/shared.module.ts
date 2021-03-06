import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

import { ModalService } from '@core';
import { Directives } from './directives/public-array';

// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
// import { UEditorModule } from 'ngx-ueditor';
// import { NgxTinymceModule } from 'ngx-tinymce';
import { CKEditorModule } from 'ng2-ckeditor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    // UEditorModule,
    // NgxTinymceModule,
    CKEditorModule,
    InfiniteScrollModule,
];
// endregion third

// region: your Modules & componets & directives & providers
const MODULES = [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DelonABCModule,
    DelonChartModule,
    DelonACLModule,
    DelonFormModule,
];
const COMPONENTS = [];
const DIRECTIVES = [...Directives];
const PROVIDERS = [ModalService];
// endregion

@NgModule({
    imports: [
        ...MODULES,
        AlainThemeModule.forChild(),
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    providers: [...PROVIDERS],
    exports: [
        ...MODULES,
        AlainThemeModule,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class SharedModule {}
