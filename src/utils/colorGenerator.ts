// @ts-nocheck
export function generatePastelColor(): string {
  // Generate random values for RGB
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Convert RGB to HSL
  var hsl = rgbToHsl(r, g, b);

  // Modify saturation and lightness to create pastel effect
  var pastelHsl = [
    hsl[0],
    Math.min(hsl[1] * 1.5, 1.0),
    Math.min(hsl[2] * 1.2, 1.0),
  ];

  // Convert HSL back to RGB
  var pastelRgb = hslToRgb(pastelHsl[0], pastelHsl[1], pastelHsl[2]);

  // Convert RGB values to hex format
  var hexColor = rgbToHex(pastelRgb[0], pastelRgb[1], pastelRgb[2]);

  return hexColor;
}

function rgbToHsl(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(
  h: number | undefined,
  s: number | undefined,
  l: number | undefined
) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function componentToHex(c: { toString: (arg0: number) => any }) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Generate a palette with 5 pastel colors
function generatePastelPalette(numColors: number) {
  var palette = [];
  for (var i = 0; i < numColors; i++) {
    palette.push(generatePastelColor());
  }
  return palette;
}

// Example usage
var pastelPalette = generatePastelPalette(5);
console.log(pastelPalette);
