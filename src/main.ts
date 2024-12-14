import './style.css';
import p5 from 'p5';
import { CirclePacker } from './CirclePacker';
import { FileUpload } from './components/FileUpload';
import { Controls } from './components/Controls';
import { CanvasService } from './services/CanvasService';
import { PreviewService } from './services/PreviewService';

const sketch = (p: p5) => {
  let circlePacker: CirclePacker;
  let controls: Controls;
  let canvasService: CanvasService;
  let previewService: PreviewService;

  p.setup = () => {
    canvasService = new CanvasService(p);
    canvasService.setupCanvas();
    
    previewService = new PreviewService(p);
    previewService.showPreview();
    
    circlePacker = new CirclePacker(p);
    
    // Initialize UI components
    new FileUpload(p, (img) => {
      previewService.hidePreview();
      circlePacker.loadImage(img);
      controls.setButtonsEnabled(false);
    });
    
    controls = new Controls(
      () => {
        if (circlePacker.hasImage()) {
          controls.setButtonsEnabled(false);
          circlePacker.restart();
        }
      },
      () => p.saveCanvas('clickart-mosaic', 'png')
    );

    // Handle window resize
    window.addEventListener('resize', () => {
      canvasService.handleResize();
      if (!circlePacker.hasImage()) {
        previewService.showPreview();
      }
    });
  };

  p.draw = () => {
    if (circlePacker.hasImage()) {
      if (!circlePacker.isComplete()) {
        circlePacker.update();
        circlePacker.draw();
      } else {
        controls.setButtonsEnabled(true);
      }
    }
  };
};

new p5(sketch);