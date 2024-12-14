import p5 from 'p5';

export class PreviewService {
  private p: p5;
  private previewText: HTMLElement;

  constructor(p: p5) {
    this.p = p;
    this.previewText = this.createPreviewText();
  }

  private createPreviewText(): HTMLElement {
    const text = document.createElement('div');
    text.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2rem;
      color: #666;
      text-align: center;
      width: 100%;
      padding: 1rem;
    `;
    text.textContent = 'Upload an image to start creating your circle mosaic!';
    document.getElementById('canvas-container')?.appendChild(text);
    return text;
  }

  showPreview(): void {
    this.previewText.style.display = 'block';
    this.p.clear();
    this.p.background(255);
  }

  hidePreview(): void {
    this.previewText.style.display = 'none';
  }
}