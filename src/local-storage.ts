/**
 * html5 本地存储
 */

let Identification = '';

/**
 * 配置 App key
 * @param identification
 * @constructor
 */
export function setIdentification(identification: string): void {
  Identification = identification;
}

export const LocalStorage = {
  // 标识符，用于区分不同的应用
  set(key: string, data: any | any[]): void {
    const storage = typeof window === 'undefined' ? null : window.localStorage;
    if (!storage) {
      return;
    }
    storage.setItem(Identification + '_' + key, JSON.stringify(data));
  },
  get(key: string): any {
    const storage = typeof window === 'undefined' ? null : window.localStorage;
    if (!storage) {
      return null;
    }
    const str = storage.getItem(Identification + '_' + key);
    if (str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  remove(key: string): void {
    const storage = typeof window === 'undefined' ? null : window.localStorage;
    if (!storage) {
      return;
    }
    storage.removeItem(Identification + '_' + key);
  }
};
