import moment from 'moment';

export const findById = (collection, id, key = 'id') => {
  return collection.find(item => ensureInt(item[key], id));
};

export const filterById = (collection, id, key = 'id') => {
  return collection.filter(item => ensureInt(item[key], id));
};

export const updateById = (collection, id, value, key = 'id') => {
  return collection.map(item => {
    if (ensureInt(item[key], id)) {
      return value;
    } else {
      return item;
    }
  });
};

export const ensureInt = (a, b) => parseInt(a) === parseInt(b);

export interface DateProvider {
  today(): moment.Moment;
}

export class DefaultDateProvider implements DateProvider {
  today(): moment.Moment {
    return moment.utc();
  }
}
