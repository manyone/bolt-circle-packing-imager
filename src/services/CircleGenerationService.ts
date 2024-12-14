import p5 from 'p5';
import { Circle } from '../types/Circle';
import { checkCircleCollision, isCircleInBounds } from '../utils/collision';
import { getPixelColor, isPixelEmpty } from '../utils/imageProcessing';
import { CIRCLE_PACKING_CONFIG as CONFIG } from '../config/constants';

export class CircleGenerationService {
  constructor(private p: p5) {}

  generateCircle(img: p5.Image, circles: Circle[]): Circle | null {
    for (let i = 0; i < CONFIG.PLACEMENT_TRIES; i++) {
      const x = this.p.random(img.width);
      const y = this.p.random(img.height);

      if (isPixelEmpty(img, x, y)) continue;

      const newCircle: Circle = {
        x,
        y,
        radius: CONFIG.MIN_RADIUS,
        growing: true,
        color: getPixelColor(img, x, y)
      };

      if (!checkCircleCollision(newCircle, circles)) {
        return newCircle;
      }
    }
    return null;
  }

  growCircles(img: p5.Image, circles: Circle[]) {
    circles.forEach(circle => {
      if (!circle.growing) return;

      circle.radius += CONFIG.GROWTH_RATE;

      if (
        checkCircleCollision(circle, circles) ||
        !isCircleInBounds(circle, img.width, img.height) ||
        circle.radius > CONFIG.MAX_RADIUS
      ) {
        circle.growing = false;
        circle.radius -= CONFIG.GROWTH_RATE;
      }
    });
  }
}