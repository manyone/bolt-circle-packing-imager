import p5 from 'p5';
import { Circle } from '../types/Circle';

export class RenderService {
  constructor(private p: p5) {}

  drawBackground(img: p5.Image) {
    this.p.image(img, 0, 0);
  }

  drawCircle(circle: Circle) {
    // Draw the black rim
    this.p.stroke(0);
    this.p.strokeWeight(1);
    
    // Draw the filled circle
    this.p.fill(circle.color || '#000');
    this.p.circle(circle.x, circle.y, circle.radius * 2);
  }

  drawCircles(circles: Circle[]) {
    circles.forEach(circle => this.drawCircle(circle));
  }
}