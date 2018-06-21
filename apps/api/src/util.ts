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
