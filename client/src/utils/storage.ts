import storage from 'localforage';

const PREFIX = 'app@';
const getKey = (key: string) => `${PREFIX}:${key}`;

export const load = async (key: string) => {
  try {
    const data: null | string = await storage.getItem(getKey(key));
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.log('> Could not load items', error);
    return [];
  }
};

export const set = async (key: string, item: any) => {
  try {
    await storage.setItem(getKey(key), JSON.stringify(item));
  } catch (error) {
    console.log('> Could not set item', item, error);
  }
};

export const append = async (key: string, item: any) => {
  try {
    const current = await load(key);
    const items = [...current, item];
    await storage.setItem(getKey(key), JSON.stringify(items));
  } catch (error) {
    console.log('> Could not append item', item, error);
  }
};

export const remove = async (key: string, item: any) => {
  try {
    const current = await load(key);
    const items = current.filter((i: any) => i.id !== item.id);
    await storage.setItem(getKey(key), JSON.stringify(items));
  } catch (error) {
    console.log('> Could not remove item', item, error);
  }
};

export const clear = async () => {
  try {
    await storage.clear();
  } catch (error) {
    console.log('> Could not clear storage', error);
  }
};

export const createStorage = (key: string) => ({
  load: () => load(key),
  set: (item: any) => set(key, item),
  append: (item: any) => append(key, item),
  remove: (item: any) => remove(key, item),
});