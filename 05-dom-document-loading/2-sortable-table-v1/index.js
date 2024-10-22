export default class SortableTable {
	element;
	subElements;

  constructor(headerConfig = [], data = []) {

    this.headerConfig = headerConfig;
    this.data = data;
		this.element =	this.createElement();
		this.subElements = this.getSubElements(this.element);
  }

	createElement() {
    const div = document.createElement("div");
		div.innerHTML = this.createTemplate();

    return div;
	}

	getSubElements(element) {

		const arrSubElem = {};
		const elements = element.querySelectorAll('[data-element]');

		for (const subElement of elements) {
			const name = subElement.dataset.element;
			arrSubElem[name] = subElement;
		}
		// console.log('subElements: ', arrSubElem);
		return arrSubElem;
	}

  createTemplate() {
    const tmpl = `
    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.createHeader().join('')}
    </div>

    <div data-element="body" class="sortable-table__body">
    ${this.createData().join('')}

    </div>

    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>`;
		return tmpl;
  }

  createHeader() {
    return this.headerConfig.map(({id, title, sortable})=>`
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
        <span>${title}</span>
      </div>`);

  }

	createCells(row) {
		return this.headerConfig.map((config)=>
		{
			if (config['template']) {
				return config['template'](row[config['id']]);
			}
			return `<div class="sortable-table__cell">${row[config['id']]}</div>`;
		});
	}

	createRow(row) {
    const rowElement = document.createElement('a');
    rowElement.className = "sortable-table__row";
    rowElement.innerHTML = this.createCells(row).join('');

    return rowElement.outerHTML;
  }

	createData() {
    return this.data.map((row)=>this.createRow(row));
  }

  sort(field, order) {

		const sortingHeader = this.headerConfig.filter(conf => conf['id'] == field)[0];

    let sortDesc, sortAsc;

    if (sortingHeader['sortType'] == 'string') {

      const locales = ["ru", "en"];
      const options = { sensitivity: "variant", caseFirst: "upper" };
      const collator = new Intl.Collator(locales, options);

      sortDesc = (a, b) => collator.compare(b[field], a[field]);
      sortAsc = (a, b) => collator.compare(a[field], b[field]);

    } else if (sortingHeader['sortType'] == 'number') {

      sortDesc = (a, b) => {return b[field] - a[field]};
      sortAsc = (a, b) => {return a[field] - b[field]};

    }

    if (order == 'desc') {
      this.data = [...this.data].sort(sortDesc);
    } else if (order == 'asc') {
      this.data = [...this.data].sort(sortAsc);
		}
		this.update();
  }
	update() {
		this.element.className = "sortable-table";
		this.element.innerHTML = this.createTemplate();
		this.subElements = this.getSubElements(this.element);
	}
  remove() {

    if (this.element.firstElementChild) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
  }
}