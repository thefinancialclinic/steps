export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (id: string) => {
  return {
    type: SHOW_MODAL,
    id,
  };
};

export const HIDE_MODAL = 'HIDE_MODAL';
export const hideModal = id => {
  return {
    type: HIDE_MODAL,
    id,
  };
};
