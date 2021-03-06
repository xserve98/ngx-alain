export const tplMainIndexActionHTML = {
  event: ``,
  search: ``
};

export const tplMainIndexTreeHTML =
  `
  <div class="alain-default__content-title">
  <h1>
    {{pageTitle}}
    <small></small>
  </h1>
  <div>
    ${tplMainIndexActionHTML.event}
  </div>
</div>

<sf #sf mode="search" [schema]="schemaData.search" [formData]="tableReq.params" (formSubmit)="st.reset($event)" (formReset)="st.reset(tableReq.params)" class="search-form" [button]="'none'">
  <nz-form-item class="sf-btns">
    <nz-form-control class="ant-form-item-control-wrapper">
      <div class="ant-form-item-control">
        <button type="submit" nz-button [nzType]="'primary'">查询</button>
      </div>
    </nz-form-control>
  </nz-form-item>
  ${tplMainIndexActionHTML.search}
  <nz-form-item class="sf-btns">
    <nz-form-control class="ant-form-item-control-wrapper">
      <div class="ant-form-item-control">
        <button nz-button (click)="appCase.exportXlsFromServer()">导出</button>
      </div>
    </nz-form-control>
  </nz-form-item>
</sf>

<div nz-row nzGutter="16">
  <div nz-col nzSpan="4">
    <nz-card>
      <p>
        <nz-tree 
          [(nzData)]="treeCompany" 
          [nzShowLine]="true" 
          [nzDefaultExpandedKeys]="treeCompanyExpandKeys" 
          (nzClick)="mouseTreeAction('click',$event)" 
          (nzContextMenu)="mouseTreeAction('click',$event)">
        </nz-tree>
      </p>
    </nz-card>
  </div>
  <div nz-col nzSpan="20">
    <st #st class="simple-table" [data]="dataSource.url" [columns]="tableData.col" [req]="tableReq"></st>
  </div>
</div>


`;

