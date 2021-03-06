import { AppControl } from './app.control';
import { of } from 'rxjs';
import { STComponent } from '@delon/abc';
import * as helpers from '../helpers';

export class AppCase {
  private ___appCtl: AppControl = null;

  get appCtl() {
    return this.___appCtl;
  }

  constructor(appCtl: AppControl) {
    this.___appCtl = appCtl;
  }

  /**
   * 写日志
   */
  __logs = (content: string) => {
    const bc = this.appCtl;
    bc.freeData.logs = bc.httpSrv
      .post('/logs', {
        title: bc.titleSrv.getTitle(),
        content: content,
      })
      .toPromise()
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * 根据表格，数据导出到EXCEL
   */
  exportXlsFromSt = (
    __st: STComponent,
    __url?: string,
    __tableParams?: any,
    __body?: any,
    __options?: any,
  ) => {
    const self = this.appCtl;
    __url = __url || self.dataSource.url;
    __body = __body || {};
    __tableParams = __tableParams || self.tableParams;
    const pi = __tableParams.pi;
    const ps = __tableParams.ps;
    __options = __options || {
      filename: (self.titleSrv.getTitle() || '数据导出') + '.xlsx',
      sheetname: '数据导出',
    };
    if (!__st) {
      return self.noticeSrv.noticeError('导出无效！');
    }
    __tableParams.pi = 1;
    __tableParams.ps = 10000;
    __body = Object.assign(__body, __tableParams);

    const finallyFn = (res?: any) => {
      self.freeTimeOut.to = setTimeout(() => {
        __tableParams.pi = pi;
        __tableParams.ps = ps;
      }, 0);
    };
    self.httpSrv.get(__url, __body).subscribe(
      (res: any) => {
        if (res && res.data && res.data.list)
          __st.export(res.data.list, __options);
        finallyFn(res);
      },
      finallyFn,
      finallyFn,
    );
  };

  /**
   * 根据服务器端，数据导出到EXCEL
   */
  exportXlsFromServer = (__url?: string, __body?: any, __options?: any) => {
    const self = this.appCtl;
    __url = __url || self.dataSource.url;
    __body = __body || {};
    __options = __options || {
      filename: self.titleSrv.getTitle() || '数据导出',
      sheetname: '数据导出',
    };

    __url += '/exports';

    // 配置导出数据
    __body.export_file = encodeURI(__body.export_file || '数据导出');
    __body.export_title = encodeURI(__body.export_title || '数据列表');
    if (__body.export_file.indexOf('.') < 1) {
      __body.export_file += '.xlsx';
    }
    let ext = __body.export_file.split('.');
    if (ext.length > 0) {
      ext = ext[ext.length - 1];
    }

    // 配置API ----------------------------
    const header = self.tokenSrv.getRequestHeaders({});
    __url +=
      '/' +
      0 +
      '/' +
      header.get('style') +
      '/' +
      header.get('token') +
      '/' +
      header.get('validate');
    const link = document.createElement('a');
    if (['pdf'].indexOf(ext) == -1) {
      link.download = __body.export_file + '.' + ext;
    }
    link.target = '_blank';
    link.href =
      self.configSrv.api.base + __url + helpers.jsonToURL(__body);
    document.body.appendChild(link);
    console.log(link.href, header.get('validate'));
    link.click();
    return document.body.removeChild(link);
  };

  /**
   * 数据上传
   */
  nzUploadHandleChange = ($event: any, $isMult?: boolean): void => {
    const self = this.appCtl;
    const file = $event.file;
    const fileList: any[] = $event.fileList;
    const status = file.status;
    if ($isMult === undefined) {
      $isMult = true;
    }
    if (status !== 'uploading') {
      // 正在上传
    }
    if (status === 'done') {
      // 上传完成
      file.response.url = self.configSrv.api.show + file.response.url;
      if (!$isMult && fileList.length > 1) {
        fileList.shift();
      }
      fileList[fileList.length - 1].thumbUrl = file.response.url;
      fileList[fileList.length - 1].url = file.response.url;
      console.log(file, fileList);
      self.msgSrv.msgSuccess(`${file.name} 上传成功！`);
    } else if (status === 'error') {
      // 上传失败
      // console.log(file, fileList);
      self.msgSrv.msgError(`${file.name} 上传失败！`);
    }
  };

  /**
   * 地区加载数据
   */
  nzCascaderLoadData = (node: any, index: number): PromiseLike<any> => {
    const self = this.appCtl;
    return new Promise(resolve => {
      const arrCanton = self.stateSrv.cantonList;
      if (index < 0 && arrCanton.length > 0) {
        node.children = arrCanton;
        resolve(true);
        return;
      }
      return self.httpSrv
        .get('/canton/selectTree', { fdn: node.value || '' })
        .subscribe(
          (appdata: any) => {
            appdata.data = appdata.data || [];
            if (appdata.data.length > 0) node.children = appdata.data;
            resolve(true);
          },
          err => {},
        );
    });
  };

  /**
   * 动态表单中的地区加载数据
   */
  nzCascaderLoadDataBySchema = (node?: any): any => {
    const self = this.appCtl;
    if (!node) {
      const arrCanton = self.stateSrv.cantonList;
      if (arrCanton.length > 0) {
        return of(arrCanton);
      } else {
        return of([]);
      }
    }
    return this.nzCascaderLoadData(node, 0);
  };

  /**
   * 删除对话框
   */
  deleteAlert = (
    __mainUrl?: string,
    __record?: Object,
    __primaryKey?: string,
  ): any => {
    const self = this.appCtl;
    return new Promise((resolve, reject?: any) => {
      if (!__mainUrl) {
        __mainUrl = self.dataSource.url;
      }
      if (!__record) {
        __record = self.form.data;
      }
      if (!__primaryKey) __primaryKey = self.dataSource.key;
      const __id = self.appBase.__getPrimaryKeyValue(__record, __primaryKey);
      if (!__id) {
        self.noticeSrv.noticeWarning('删除无效！');
        reject(false);
      } else {
        self.noticeSrv.sweet
          .confirmWait('确定要删除当前数据吗？', res => {
            if (res) {
              return (self.freeData.httpDelAlert = self.httpSrv
                .deleteById(__mainUrl, __id)
                .toPromise());
            } else {
              return reject(false);
            }
          })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };
}
