import p5 from 'p5';
import { CANVAS_CONFIG as CONFIG } from '../config/canvas';

export class CanvasService {
  private p: p5;
  private container: HTMLElement | null;

  constructor(p: p5) {
    this.p = p;
    this.container = document.getElementById('canvas-container');
  }

  setupCanvas(): p5.Renderer {
    const { width, height } = this.calculateDimensions();
    const canvas = this.p.createCanvas(width, height);
    canvas.parent('canvas-container');
    this.p.background(CONFIG.BACKGROUND_COLOR);
    return canvas;
  }

  handleResize(): void {
    const { width, height } = this.calculateDimensions();
    this.p.resizeCanvas(width, height);
  }

  private calculateDimensions() {
    const containerWidth = this.container?.clientWidth || CONFIG.MAX_WIDTH;
    return {
      width: Math.min(CONFIG.MAX_WIDTH, containerWidth),
      height: Math.min(CONFIG.MAX_HEIGHT, containerWidth * CONFIG.ASPECT_RATIO)
    };
  }
}