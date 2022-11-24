class FormEntry {
  constructor(modify, idEntry) {
    this.modify = modify;
    this.idEntry = idEntry;
    this.keywordInputTemplate = document.querySelector('#keywordInputTemplate');
    this.paragraphTemplate = document.querySelector('#paragraphTemplate');
    this.linkTemplate = document.querySelector('#linkTemplate');
    this.captureTemplate = document.querySelector('#captureTemplate');

    this.categoryElm = document.querySelector('.category');

    this.addKeywordElm = document.querySelector('.addKeyword');

    this.addParagraphElm = document.querySelector('.addParagraph');

    this.addLinkElm = document.querySelector('.addLink');

    this.addCaptureElm = document.querySelector('.addCapture');

    this.formElm = document.querySelector('form');
    this.titleElm = document.querySelector('.title');
    this.dateElm = document.querySelector('.date');
    this.categoryElm = document.querySelector('.category');
    this.contextElm = document.querySelector('.context');
    this.paragraphsContainerElm = document.querySelector('.paragraphs');
    this.keywordsContainerElm = document.querySelector('.keywords');
    this.linksContainerElm = document.querySelector('.links');
    this.capturesContainerElm = document.querySelector('.captures');
    this.inputs = document.querySelectorAll('.inputForm');
    this.entryInputsElm = document.querySelectorAll('[data-entity="entry"]');
    this.addQueries = {};
    this.deleteQueries = [];
    this.updateQueries = {};
    this.paramsCreation = {
      entry: {},
      paragraph: {},
      link: {},
      capture: {},
      keyword: {},
    };
    this.updateParams = {
      entry: {},
      paragraph: {},
      link: {},
      capture: {},
      keyword: {},

    };
    this.addListeners();
  }

  handleModif(e) {
    this.paramsCreation[e.target.dataset.entity][e.target.dataset.field] = e.target.value;
    this.paramsCreation[e.target.dataset.entity].diary_entry_id = this.idEntry;
    this.addQueries[`api/${e.target.dataset.entity}/${this.idEntry}`] = this.paramsCreation[e.target.dataset.entity];
  }

  appendTemplate(template, parent) {
    const clone = document.importNode(template.content, true);
    const removeIcon = clone.querySelector('.removeItem');
    removeIcon.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });
    clone.querySelector('.inputForm').addEventListener('change', this.handleModif.bind(this));
    parent.append(clone);
  }

  addListeners() {
    this.addKeywordElm?.addEventListener('click', () => {
      this.appendTemplate(this.keywordInputTemplate, this.keywordsContainerElm);
    });
    this.addParagraphElm?.addEventListener('click', () => {
      this.appendTemplate(this.paragraphTemplate, this.paragraphsContainerElm);
    });
    this.addLinkElm?.addEventListener('click', () => {
      this.appendTemplate(this.linkTemplate, this.linksContainerElm);
    });
    this.addCaptureElm?.addEventListener('click', () => {
      this.appendTemplate(this.captureTemplate, this.capturesContainerElm);
    });
    this.entryInputsElm?.forEach((input) => {
      input.setAttribute('data-id', id);
    });
    this.inputs?.forEach((input) => {
      input.addEventListener('change', (e) => {
        this.updateParams[e.target.dataset.entity][e.target.dataset.field] = e.target.value;
        this.updateQueries[(`api/${e.target.dataset.entity}/${e.target.dataset.id}`)] = this.updateParams[e.target.dataset.entity];
      });
    });
    this.formElm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!this.modify) {
        const title = this.titleElm.value !== '' ? this.titleElm.value : null;
        const date = this.dateElm.value !== '' ? this.dateElm.value : null;
        console.log(date);
        const context = this.contextElm.value !== '' ? this.contextElm.value : null;
        const categoryId = this.categoryElm.value;
        const keywordInputs = this.keywordsContainerElm.querySelectorAll('.keyword');
        const linksInputs = this.linksContainerElm.querySelectorAll('.link');
        const paragraphsElms = this.paragraphsContainerElm.querySelectorAll('.paragraph');
        const capturesElms = this.capturesContainerElm.querySelectorAll('.capture');
        const keywordsArray = [];
        const paragraphsArray = [];
        const linksArray = [];
        const capturesArray = [];

        keywordInputs.forEach((input) => {
          keywordsArray.push({ label: input.value });
        });
        paragraphsElms.forEach((text) => { if (text.value !== '') paragraphsArray.push({ content: text.value }); });
        capturesElms.forEach((elm) => { if (elm.value !== '') capturesArray.push({ path: elm.value }); });
        linksInputs.forEach((input) => { if (input.value !== '') linksArray.push({ address: input.value }); });
        const bodyObject = JSON.stringify({
          title,
          date,
          context,
          keywords: keywordsArray,
          paragraphs: paragraphsArray,
          links: linksArray,
          categoryId,
        });
        await Utils.fetchData('/api/entries', 'POST', bodyObject);
      } else {
        Object.entries(this.updateQueries).forEach(async ([key, value]) => {
          await Utils.fetchData(`http://localhost:4000/${key}`, 'PATCH', JSON.stringify(value));
        });
        Object.entries(this.addQueries).forEach(async ([key, value]) => {
          await Utils.fetchData(`http://localhost:4000/${key}`, 'POST', JSON.stringify(value));
        });
        this.deleteQueries.forEach(async (query) => {
          await Utils.fetchData(`http://localhost:4000/${query}`, 'DELETE', null);
        });
      }
      document.location.href = 'http://localhost:4000/';
    });
  }

  // return delete icon
  #getDeleteElm() {
    const deleteElm = document.createElement('span');
    deleteElm.textContent = ' x';
    deleteElm.classList.add('delete');

    // in page edit when the user delete an item
    deleteElm.addEventListener('click', (e) => {
      let query = `api/${e.target.parentElement.dataset.entity}/${e.target.parentElement.dataset.id}`;
      if (e.target.parentElement.dataset.entity === 'keyword') {
        query += `/entry/${this.idEntry}`;
      }
      this.deleteQueries.push(query);
      e.target.parentElement.remove();
    });
    return deleteElm;
  }

  fillFields(entry) {
    this.titleElm.value = entry.title;
    this.contextElm.value = entry.context;
    let date = new Date(entry.date).toLocaleDateString('fr-FR').split('/');
    date = `${date[2]}-${date[1]}-${date[0]}`;
    this.dateElm.value = date;
    this.categoryElm.selectedIndex = `${entry.category_id - 1}`;
  }

  createFields(entry) {
    if (entry.paragraphs) {
      Object.entries(entry.paragraphs)?.forEach(([key, value]) => {
        const clone = document.importNode(this.paragraphTemplate.content, true);
        clone.querySelector('.removeItem')?.remove();
        const paragraphElm = clone.querySelector('.paragraph');
        const divElm = clone.querySelector('.form-outline');
        divElm.setAttribute('data-id', key);
        paragraphElm.setAttribute('data-id', key);
        divElm.setAttribute('data-entity', 'paragraph');
        paragraphElm.textContent = value;
        divElm.appendChild(this.#getDeleteElm());
        this.paragraphsContainerElm.appendChild(clone);
      });
    }
    if (entry.keywords) {
      Object.entries(entry.keywords)?.forEach(([key, value]) => {
        const keywordElm = document.createElement('p');
        keywordElm.textContent = `${value} `;
        keywordElm.setAttribute('data-id', key);
        keywordElm.setAttribute('data-entity', 'keyword');
        this.keywordsContainerElm.appendChild(keywordElm);
        const deleteElm = document.createElement('span');
        deleteElm.textContent = ' x';
        keywordElm.appendChild(this.#getDeleteElm());
      });
    }
    if (entry.links) {
      Object.entries(entry.links)?.forEach(([key, value]) => {
        const linkElm = document.createElement('p');
        linkElm.textContent = `${value} `;
        linkElm.setAttribute('href', value);
        linkElm.setAttribute('data-id', key);
        linkElm.setAttribute('data-entity', 'link');
        this.linksContainerElm.appendChild(linkElm);
        linkElm.appendChild(this.#getDeleteElm());
      });
    }
  }
}
