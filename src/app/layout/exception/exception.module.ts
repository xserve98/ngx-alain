import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ExceptionRoutingModule, routedComponents } from './exception-routing.module';

@NgModule({
    declarations: [...routedComponents],
    imports: [ExceptionRoutingModule, SharedModule],
    exports: [],
    providers: []
})
export class LayoutExceptionModule { }
