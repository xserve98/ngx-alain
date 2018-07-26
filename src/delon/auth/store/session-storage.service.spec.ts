import { SessionStorageStore } from '@delon/auth/store/session-storage.service';
import { ITokenModel } from '@delon/auth/token/interface';

describe('auth: session-storage', () => {
  const store = new SessionStorageStore();
  const KEY = 'token';
  const VALUE: ITokenModel = <ITokenModel>{
    token: 'token data',
  };

  beforeEach(() => {
    let data = {};

    spyOn(sessionStorage, 'getItem').and.callFake((key: string): string => {
      return data[key] || null;
    });
    spyOn(sessionStorage, 'removeItem').and.callFake((key: string): void => {
      delete data[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (data[key] = <string>value);
      },
    );
    spyOn(sessionStorage, 'clear').and.callFake(() => {
      data = {};
    });
  });

  it('should be never return null', () => {
    store.set(KEY, null);
    const ret = store.get(KEY);
    expect(ret).not.toBeNull();
  });

  describe('[property]', () => {
    it('#get', () => {
      store.set(KEY, VALUE);
      const ret = store.get(KEY);
      expect(ret).not.toBeNull();
      expect(ret.token).toBe(VALUE.token);
      const invalidRet = store.get('asdf');
      expect(invalidRet).not.toBeNull();
      expect(invalidRet.token).toBeUndefined();
    });

    it('#set', () => {
      store.set(KEY, VALUE);
      const ret = store.get(KEY);
      expect(ret).not.toBeNull();
      expect(ret.token).toBe(VALUE.token);
    });

    it('#remove', () => {
      store.set(KEY, VALUE);
      store.remove(KEY);
      const ret = store.get(KEY);
      expect(ret).not.toBeNull();
      expect(ret.token).toBeUndefined();
    });
  });
});