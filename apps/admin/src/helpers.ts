export const findById = (collection, id, key = 'id') => {
  return collection.find(item => ensureInt(item[key], id));
};

export const filterById = (collection, id, key = 'id') => {
  return collection.filter(item => ensureInt(item[key], id));
};

export const ensureInt = (a, b) => parseInt(a) === parseInt(b);
