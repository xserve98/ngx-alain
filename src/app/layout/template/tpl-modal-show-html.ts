export const tplModalShowHTML =
  `
  
<div class='modal-header'>
  <div class='modal-title'>查看</div>
</div>

  <div class="sf-view">
    <sf #sf 
        [schema]='schemaData.edit' 
        [ui]='schemaData.editUi' 
        [formData]='form.data'
        [button]="'none'"></sf>
  </div>

<div class='modal-footer'>
  <button nz-button type='button' (click)='modalClose()'>关闭</button>
</div>

`;

