export const svgBackgroundImage = svgPath => {
  const svg = require(`../assets/${svgPath}`);
  return `background-image: url("data:image/svg+xml;utf8,${encodeURIComponent(
    svg,
  )}");`;
};
