import p5 from 'p5';

export function getPixelColor(img: p5.Image, x: number, y: number): string {
  const index = 4 * (Math.floor(y) * img.width + Math.floor(x));
  
  const r = img.pixels[index];
  const g = img.pixels[index + 1];
  const b = img.pixels[index + 2];
  
  return `rgb(${r},${g},${b})`;
}

export function isPixelEmpty(img: p5.Image, x: number, y: number): boolean {
  const index = 4 * (Math.floor(y) * img.width + Math.floor(x));
  return img.pixels[index + 3] < 127; // Check alpha channel
}