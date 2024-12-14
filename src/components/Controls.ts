export class Controls {
  private resetButton: HTMLButtonElement;
  private saveButton: HTMLButtonElement;

  constructor(
    onReset: () => void,
    onSave: () => void
  ) {
    const buttons = this.createControls(onReset, onSave);
    this.resetButton = buttons.resetButton;
    this.saveButton = buttons.saveButton;
    this.setButtonsEnabled(false);
  }

  private createControls(onReset: () => void, onSave: () => void) {
    const controls = document.createElement('div');
    controls.className = 'controls';

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.className = 'control-button';
    resetButton.addEventListener('click', onReset);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Image';
    saveButton.className = 'control-button';
    saveButton.addEventListener('click', onSave);

    controls.appendChild(resetButton);
    controls.appendChild(saveButton);
    document.getElementById('app')?.appendChild(controls);

    return { resetButton, saveButton };
  }

  setButtonsEnabled(enabled: boolean) {
    this.resetButton.disabled = !enabled;
    this.saveButton.disabled = !enabled;
  }
}