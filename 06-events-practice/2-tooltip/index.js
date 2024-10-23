class Tooltip {
	static instance;

	initialize() {
		this.createListeners();
	}

	constructor() {
		if (!Tooltip.instance) {
			Tooltip.instance = this;
		}
		return Tooltip.instance;
		this.element = null;
	}

	render(innertext) {
		const element = document.createElement('div');
		element.className = 'tooltip';
		element.innerHTML = innertext;
		document.body.append(element);
		this.element = element;
	}

	handlerShow = (e) => {
		document.addEventListener('pointerout', this.handlerOut);
		document.addEventListener('pointermove', this.handlerMove);

		if (this.isToolTip(e)) {
			this.render(e.target.dataset.tooltip)
		}
	}

	handlerMove = (e) => {
		this.element.style.left = e.clientX + 10 + 'px';
		this.element.style.top = e.clientY + 10 + 'px';
	}

	handlerOut = (e) => {
		document.removeEventListener('pointermove', this.handlerShow);
		document.removeEventListener('pointerout', this.handlerOut);

		if (this.isToolTip(e) && this.element) {
			this.remove();
		}
	}

	isToolTip(e) {
		return Boolean(e.target.dataset.tooltip)
	}

	destroy() {
		this.destroyListeners();
		this.remove();
	}

	remove() {
		if (this.element) {
			this.element.remove();
		}
	}

	destroyListeners() {
		document.removeEventListener('pointerover', this.handlerShow);
	}

	createListeners() {
		document.addEventListener('pointerover', this.handlerShow);
	}

}

export default Tooltip;
