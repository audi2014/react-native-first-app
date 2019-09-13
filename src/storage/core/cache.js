const _cache = new Map();
export const setToCache = (key, value) => {
  if (value !== undefined) {
    _cache.set(key, value);
  }
  return value;
};

export const removeFromCache = (key) => {
  return _cache.delete(key);
};


export const getByKeyFromCache = key => _cache.has(key) ? _cache.get(key) : undefined;
