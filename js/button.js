function Button(initClass, initText) {
    this.container = document.createElement('div');
    this.container.classList.add(initClass);
    this.container.textContent += initText;
    return (this.container);
}