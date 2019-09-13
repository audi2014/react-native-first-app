import {getByKeyFromCache, removeFromCache, setToCache} from "./cache";
import {
    getItemAsync,
    multiGetAsync,
    removeAsync,
    writeAsync
} from "./storage";


export const writeByKeyToStoreAsync = async (key, value) => {
    setToCache(key, value);
    await writeAsync(key, value);
    return value;
};
export const removeByKeyFromStoreAsync = async (key) => {
    removeFromCache(key);
    return await removeAsync(key);
};

export const fetchByKeyFromStoreAsync = async (key) => {
    const cachedValue = getByKeyFromCache(key);
    if (cachedValue !== undefined) {
        return cachedValue
    } else {
        const initialValue = await getItemAsync(key);
        return setToCache(key, initialValue);
    }
};

export const fetchByKeysFromStoreAsync = async (keys) => {
    const cachedKV = {};
    const storeKeys = [];
    keys.forEach(key => {
        const cachedValue = getByKeyFromCache(key);
        if (cachedValue !== undefined) {
            cachedKV[key] = cachedValue;
        }
        else {
            storeKeys.push(key);
        }
    });

    const entriesFromStore = await multiGetAsync(storeKeys);
    entriesFromStore.forEach(([key, value]) => setToCache(key, value));

    return {...cachedKV, ...Object.fromEntries(entriesFromStore)};
};