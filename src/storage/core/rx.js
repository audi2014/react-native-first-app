import React from "react";
import {
    fetchByKeyFromStoreAsync, writeByKeyToStoreAsync, removeByKeyFromStoreAsync
} from "./storeWithCache";
import {getByKeyFromCache} from "./cache";

const _subscribers = new Map();
const _emmit = (key, value) => {
    if (_subscribers.has(key)) {
        _subscribers.get(key).forEach(cb => cb(value));
    }
};
const _getSubsKeyLength = (key) => {
    if (_subscribers.has(key)) {
        return _subscribers.get(key).size;
    } else return null;
};
const _hasSubs = (key, value) => {
    if (_subscribers.has(key)) {
        return _subscribers.get(key).has(value);
    } else return false;
};
const _pushSubsByKey = (key, value) => {
    if (!_subscribers.has(key)) {
        _subscribers.set(key, new Set());
    }
    _subscribers.get(key).add(value);
    // console.log(key, '+', _getSubsKeyLength(key),);
    return value;
};
const _removeSubsByKey = (key, value) => {
    const set = _subscribers.get(key);
    if (set) {
        set.delete(value);
    }
    // console.log(key, '-', _getSubsKeyLength(key),);
    return value;
};

export const useStorageSubscription = (key) => {
    const [value, setValue] = React.useState(getByKeyFromCache(key));
    React.useEffect(() => {
        _pushSubsByKey(key, setValue);
        fetchByKeyFromStoreAsync(key)
            .then(value => _hasSubs(key, setValue) ? setValue(value) : null);
        return () => {
            _removeSubsByKey(key, setValue);
        }
    });
    return value;
};

export const saveAsync = async (key, value) => {
    try {
        _emmit(key, value);
        await writeByKeyToStoreAsync(key, value);
    } catch (error) {
        console.error('saveAsync', error)
    }
};

export const removeAsync = async (key) => {
    try {
        _emmit(key, null);
        await removeByKeyFromStoreAsync(key);
    } catch (error) {
        console.error('removeAsync', error)
    }
};