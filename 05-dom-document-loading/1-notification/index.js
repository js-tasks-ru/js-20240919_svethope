export default class NotificationMessage {
	static lastShown;
	element;
	timerId;

	constructor(message, {duration = 1000, type = 'success'} = {}) {

		if (NotificationMessage.lastShown) {
      NotificationMessage.lastShown.remove();
    }
		this.message = message;
		this.duration = duration;
		this.type = type;

		this.element = this.createElement();
	}

	createElement() {
		const element = document.createElement('div');
		element.innerHTML = this.createTemplate();
		this.element = element.firstElementChild;
		NotificationMessage.lastShown = this.element;
		const firstElementChild = element.firstElementChild
		const cls = this.type;
		firstElementChild.classList.add(cls);
		return firstElementChild;
	}


	show(container = document.body) {
		container.append(this.element);

			this.timerId = setTimeout(() => {
				this.remove();
			}, this.duration);

			container.appendChild(this.element);
	}

	createTemplate() {
		return `
			<div class="notification" style="--value:20s">
				<div class="timer"></div>
				<div class="inner-wrapper">
					<div class="notification-header">success</div>
					<div class="notification-body">
						${this.message}
					</div>
				</div>
			</div>
		`
	}

	destroy() {
		this.remove();
		this.element = null;

		if (this.timerId) {
			clearTimeout(this.timerId);
		}
	}

	remove() {
		if (this.element) {
			this.element.remove();
		}
	}
}
