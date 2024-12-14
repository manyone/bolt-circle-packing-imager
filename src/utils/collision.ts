import { Circle } from '../types/Circle';

export function checkCircleCollision(circle: Circle, circles: Circle[]): boolean {
  for (const other of circles) {
    if (circle === other) continue;
    
    const d = Math.hypot(circle.x - other.x, circle.y - other.y);
    if (d < circle.radius + other.radius) {
      return true;
    }
  }
  
  return false;
}

export function isCircleInBounds(circle: Circle, width: number, height: number): boolean {
  return (
    circle.x + circle.radius < width &&
    circle.x - circle.radius > 0 &&
    circle.y + circle.radius < height &&
    circle.y - circle.radius > 0
  );
}