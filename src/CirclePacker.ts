import p5 from 'p5';
import { Circle } from './types/Circle';
import { CIRCLE_PACKING_CONFIG as CONFIG } from './config/constants';
import { RenderService } from './services/RenderService';
import { CircleGenerationService } from './services/CircleGenerationService';

export class CirclePacker {
  private circles: Circle[] = [];
  private img?: p5.Image;
  private originalImg?: p5.Image;
  private attempts = 0;
  private isActive = false;
  private complete = false;
  private renderService: RenderService;
  private circleGenerationService: CircleGenerationService;
  protected p: p5;

  constructor(p: p5) {
    this.p = p;
    this.renderService = new RenderService(p);
    this.circleGenerationService = new CircleGenerationService(p);
  }

  loadImage(img: p5.Image) {
    this.originalImg = img.get();
    this.img = img.get();
    this.img.loadPixels();
    this.restart();
  }

  hasImage(): boolean {
    return !!this.img;
  }

  isComplete(): boolean {
    return this.complete;
  }

  restart() {
    this.circles = [];
    this.attempts = 0;
    this.isActive = true;
    this.complete = false;
  }

  update() {
    if (!this.img || !this.isActive) return;

    for (let i = 0; i < CONFIG.ATTEMPTS_PER_FRAME; i++) {
      if (this.attempts < CONFIG.MAX_ATTEMPTS) {
        const newCircle = this.circleGenerationService.generateCircle(this.img, this.circles);
        if (newCircle) {
          this.circles.push(newCircle);
        }
        this.attempts++;
      } else {
        this.complete = true;
        this.isActive = false;
        break;
      }
    }

    this.circleGenerationService.growCircles(this.img, this.circles);
  }

  draw() {
    if (!this.img || !this.originalImg) return;
    
    // Draw the original image as background
    this.renderService.drawBackground(this.originalImg);
    // Draw circles on top
    this.renderService.drawCircles(this.circles);
  }
}