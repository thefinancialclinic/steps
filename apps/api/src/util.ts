export const placeholders = (start: number, count: number): string => {
  if (count === 0) {
    return '';
  }
  var out = [];
  const end = start + count;
  for (var i = start; i < end; i++) {
    out.push('$' + i);
  }
  return out.join(', ');
};

// If 'a' is truthy evaluate the provided callback for its truth value. If 'a'
// is falsy, then the whole expression is true.
//
// (T, T) => T; (F, T) => T; (F, F) => T; (T, F) => F
export const check_if_present = (
  a: any,
  callback: (() => boolean),
): boolean => {
  if (Boolean(a)) {
    return callback();
  } else {
    return true;
  }
};
