import {createEffect, createEvent, createStore, createStoreObject} from "effector";
import {useStoreMap} from "effector-react";
import * as storage from "./storage";

//=================================
// TOOLS
const isPromise = value => {
    return Promise.resolve(value) == value;
};
const debounce = (fn, wait = 500) => {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
};
//todo: call fn immediately if this is first call by hash
const key_debounceFn = {};
const memoDebounce = (hash, fn, wait) => {
    if (!key_debounceFn[hash]) {
        key_debounceFn[hash] = debounce(fn, wait);
    }
    return key_debounceFn[hash];
};
//=================================
// EVENTS
export const saveAsyncEvent = createEvent('save');
export const removeAsyncEvent = createEvent('remove');

//=================================
// EFFECTS
const writeAsyncEffect = createEffect({
    handler: async ([key, value]) => {
        // console.log('writeAsyncEffect...', key, value);
        const result = await storage.writeAsync(key, value);
        // console.log('...writeAsyncEffect', result);
        return [key, value];
    },
});

const removeAsyncEffect = createEffect({
    handler: async (key) => {
        // console.log('removeAsyncEffect...', key);
        const result = await storage.removeAsync(key);
        // console.log('...removeAsyncEffect', result);
        return key;
    },
});

const readAsyncEffect = createEffect({
    handler: async (key) => {
        // console.log('readAsyncEffect...', key);
        const value = await storage.getItemAsync(key);
        // console.log('...readAsyncEffect', value);
        return value;
    },
});
//watchers
saveAsyncEvent.watch(
    ([key, value]) => memoDebounce(
        'writeAsyncEffect:' + key,
        writeAsyncEffect
    )([key, value])
);
removeAsyncEvent.watch(
    (key) => memoDebounce(
        'removeAsyncEffect:' + key,
        removeAsyncEffect
    )(key)
);

//=================================
// STORE
const store = createStoreObject({})
    .on(readAsyncEffect.done, (state, {params, result}) => {
        return {...state, [params]: result};
    })
    .on(saveAsyncEvent, (state, [key, value]) => {
        return {...state, [key]: value};
    })
    .on(removeAsyncEvent, (state, key) => {
        const next = {...state};
        next[key] = null;``
        return next;
    })
;

//=================================
// EXPORT TO REACT
export const saveAsync = (key, value) => saveAsyncEvent([key, value]);
export const removeAsync = (key) => removeAsyncEvent(key);
export const useStorageSubscription = (key) => {
    const value = useStoreMap({
        store: store,
        keys: [key],
        fn: (store, [key]) => {
            if (store[key] === undefined) {
                return readAsyncEffect(key)
            } else {
                return store[key];
            }
        }
    });
    return isPromise(value) ? undefined : value;
};
