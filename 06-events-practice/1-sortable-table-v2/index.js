import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js'
export default class SortableTable extends SortableTableV1 {

	// defaultSortOrder = 'asc';

  constructor(headersConfig, {
    data = [],
		sorted = {
        id: headersConfig.find((item) => item.sortable).id,
        order: "asc",
      },
		isSortLocally = true,
	} = {}) {

		super(headersConfig, data);

		this.headersConfig = headersConfig;
		this.data = data;
		this.isSortLocally = isSortLocally;
		this.sorted = sorted;
		this.defSortedId = sorted.id;
		this.defSortedOrder = sorted.order;

		this.arrowElement = this.createArrowElement();

		this.appendArrow(this.element.querySelector(`[data-id='${this.defSortedId}']`), this.defSortedOrder);

		this.handleMouseClick = this.handleMouseClick.bind(this);
    this.createListeners();
	}

	createArrowElement() {
		const tmpArrow = document.createElement("div");
		tmpArrow.innerHTML = this._createArrowTemplate();
		return tmpArrow.firstElementChild;
	}

	_createArrowTemplate() {
		return `<span data-element="arrow" class="sortable-table__sort-arrow">
			<span class="sort-arrow"></span>
		</span>
		`
	}

	appendArrow(arrowHeader, sortOrder) {
		arrowHeader.setAttribute("data-order", sortOrder);
		arrowHeader.appendChild(this.arrowElement);
	}

	handleMouseClick(event) {
		const fieldForSort = event.target.closest(".sortable-table__cell");
		if (!fieldForSort) return;
		if (fieldForSort.dataset.sortable === 'false') return;

		this.defSortedId = fieldForSort.dataset.id;
		this.defSortedOrder = this.changeOrder(this.defSortedOrder);

		fieldForSort.dataset.order = this.defSortedOrder;

		this.sort(this.defSortedId, this.defSortedOrder);
		this.appendArrow(fieldForSort, this.defSortedOrder);
}

	changeOrder (order) {
		if (order == 'asc') order = 'desc';
		else order = 'asc';
		return order;
	}

	sortOnClient(field, sortType) {
		super.sort(field, sortType);
	}

	sortOnServer(field, sortType) {
		//
	}

	sort(field, sortType) {
		if (this.isSortLocally) {
			this.sortOnClient(field, sortType);
		} else {
			this.sortOnServer(field, sortType);
		}
	}

	createListeners() {
		this.subElements.header.addEventListener("pointerdown", this.handleMouseClick);
	}

	destroyListeners() {
		this.subElements.header.removeEventListener("pointerdown", this.handleMouseClick);
	}

	destroy() {
		super.destroy();
		this.destroyListeners();
	}

}
