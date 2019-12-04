/**
 * html5 本地存储
 */

let Identification = '';

/**
 * 配置 App key
 * @param identification
 * @constructor
 */
export function SetIdentification(identification: string): void {
  Identification = identification;
}

export const LocalStorage = {
  // 标识符，用于区分不同的应用
  set(key: string, data: any | any[]): void {
    return window.localStorage.setItem(Identification + '_' + key, JSON.stringify(data));
  },
  get(key: string): any {
    const str = window.localStorage.getItem(Identification + '_' + key);
    if (str) {
      try {
        return JSON.parse(window.localStorage.getItem(Identification + '_' + key));
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  remove(key: string): void {
    window.localStorage.removeItem(Identification + '_' + key);
  }
};
