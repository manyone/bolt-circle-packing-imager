import p5 from 'p5';

export class FileUpload {
  private input: HTMLInputElement;
  private onImageLoad: (img: p5.Image) => void;
  private p: p5;

  constructor(p: p5, onImageLoad: (img: p5.Image) => void) {
    this.p = p;
    this.onImageLoad = onImageLoad;
    this.input = this.createInputElement();
    this.setupFileUpload();
  }

  private createInputElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.className = 'file-input';
    return input;
  }

  private setupFileUpload(): void {
    const container = document.createElement('div');
    container.className = 'upload-container';

    const label = document.createElement('label');
    label.className = 'upload-label';
    label.innerHTML = '📁 Choose Image';

    label.appendChild(this.input);
    container.appendChild(label);
    document.querySelector('.controls')?.prepend(container);

    this.input.addEventListener('change', (e) => this.handleFileSelect(e));
  }

  private handleFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => this.handleFileLoad(e);
    reader.readAsDataURL(file);
  }

  private handleFileLoad(e: ProgressEvent<FileReader>): void {
    if (!e.target?.result) return;

    this.p.loadImage(e.target.result as string, (img) => {
      const scale = this.calculateImageScale(img);
      this.resizeImage(img, scale);
      this.onImageLoad(img);
    });
  }

  private calculateImageScale(img: p5.Image): number {
    if (img.width >= img.height && img.width > 600) {
      return 600 / img.width;
    } else if (img.height > img.width && img.height > 600) {
      return 600 / img.height;
    } else if (img.width < 600 && img.height < 600) {
      return 600 / Math.max(img.width, img.height);
    }
    return 1;
  }

  private resizeImage(img: p5.Image, scale: number): void {
    const newWidth = Math.round(img.width * scale);
    const newHeight = Math.round(img.height * scale);
    img.resize(newWidth, newHeight);
    this.p.resizeCanvas(newWidth, newHeight);
  }
}