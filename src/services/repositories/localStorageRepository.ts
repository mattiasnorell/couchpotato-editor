interface ILocalStorageRepository {
  read<T>(key: string): T | null;
  write<T>(key: string, value: T): void;
}

class LocalStorageRepository implements ILocalStorageRepository {
  read<T>(key: string): T | null {
    const lsValue = window.localStorage.getItem(key);

    if (!lsValue) {
      return null;
    }

    return JSON.parse(lsValue) as T;
  }

  write<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  clear(key: string): void {
    window.localStorage.removeItem(key);
  }
}

const $localStorageRepository = new LocalStorageRepository();
export { $localStorageRepository };
