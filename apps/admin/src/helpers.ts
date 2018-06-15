export const findById = (coll, id) => {
  return coll.find(item => item.id == id);
};
