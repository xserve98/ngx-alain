import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { deepCopy } from '@delon/util';
import {
  builder,
  TestFormComponent,
  SFPage,
  SCHEMA,
} from '@delon/form/spec/base.spec';
import { SFSchema } from '@delon/form/src/schema';
import { SFUISchemaItem, SFUISchema } from '@delon/form/src/schema/ui';

describe('form: widget: custom', () => {
  let fixture: ComponentFixture<TestFormComponent>;
  let dl: DebugElement;
  let context: TestFormComponent;
  let page: SFPage;
  const schema: SFSchema = {
    properties: { a: { type: 'string', ui: { widget: 'custom' } } },
  };

  function detectChanges(path = '/a') {
    context.comp.rootProperty.searchProperty(path).widget.detectChanges();
    return page;
  }

  it('should be custom widget', () => {
    ({ fixture, dl, context, page } = builder({
      detectChanges: false,
      template: `<sf [schema]="schema" #comp><ng-template sf-template="/a">custom:<div class="custom-el">{{ id }}</div></ng-template></sf>`
    }));
    page.newSchema(schema);
    detectChanges().checkCount('.custom-el', 1);
  });

  it('should be auto fix path when not start with /', () => {
    ({ fixture, dl, context, page } = builder({
      detectChanges: false,
      template: `<sf [schema]="schema" #comp><ng-template sf-template="a">custom:<div class="custom-el">{{ id }}</div></ng-template></sf>`
    }));
    page.newSchema(schema);
    detectChanges().checkCount('.custom-el', 1);
  });

  it('should be throw error when not found path', () => {
    spyOn(console, 'warn');
    ({ fixture, dl, context, page } = builder({
      detectChanges: false,
      template: `<sf [schema]="schema" #comp><ng-template sf-template="invalud_a">custom:<div class="custom-el">{{ id }}</div></ng-template></sf>`
    }));
    page.newSchema(schema);
    expect(console.warn).toHaveBeenCalled();
  });

  it('#ng-alain-issues-492: should changed default data', () => {
    ({ fixture, dl, context, page } = builder({
      detectChanges: false,
      template: `<sf [schema]="schema" [formData]="formData" #comp><ng-template sf-template="/a">custom:<div class="custom-el">{{ id }}</div></ng-template></sf>`
    }));
    page.newSchema(schema);
    detectChanges().checkCount('.custom-el', 1);
    context.formData = { a: 'test' };
    fixture.detectChanges();
    detectChanges().checkCount('.custom-el', 1);
  });
});
