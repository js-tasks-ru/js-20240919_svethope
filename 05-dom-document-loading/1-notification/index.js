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
		const element = document.createElement("div");
		element.innerHTML = this.createTemplate();
		return element.firstElementChild;
	}

	show(divb) {
      if (NotificationMessage.lastShown) {
        NotificationMessage.lastShown.remove();
      }

      this.timerId = setTimeout(() => this.remove(), this.duration);
      if (!divb) {divb = document.body;}
      divb.append(this.element);

      NotificationMessage.lastShown = this;
    }

	createTemplate() {
		return `
			<div class="notification ${this.type}" style="--value:20s">
				<div class="timer"></div>
				<div class="inner-wrapper">
					<div class="notification-header">${this.type}</div>
					<div class="notification-body">
						${this.message}
					</div>
				</div>
			</div>
		`
	}

	destroy() {
		this.remove();
		clearTimeout(this.timerId);
	}

	remove() {
		this.element.remove();
	}
}
