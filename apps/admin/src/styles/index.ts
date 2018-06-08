export const svgBackgroundImageUrl = svgPath => {
  const svg = require(`../assets/${svgPath}`);
  const encodedSvg = encodeURIComponent(svg);

  return `url("data:image/svg+xml;utf8,${encodedSvg}")`;
};
