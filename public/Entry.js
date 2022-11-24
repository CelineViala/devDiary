class Entry {
  static async getOne(id) {
    const response = await Utils.fetchData(`http://localhost:4000/api/entry/${id}`, 'GET', null);
    console.log(response);
    const entry = await response.json();

    if (!response.ok) {
      throw new Error(response.status);
    }
    return entry;
  }

  static setColorCategory(elm, entry) {
    if (entry.category === 'bug') {
      elm.classList.add('is-danger');
    } else if (entry.category === 'veille') {
      elm.classList.add('is-primary');
    } else if (entry.category === 'astuce') {
      elm.classList.add('is-info');
    } else {
      elm.classList.add('is-warning');
    }
  }

  static hide(elm) {
    elm?.classList.add('is-hidden');
  }

  static async getAll() {
    const response = await Utils.fetchData('http://localhost:4000/api/entries', 'GET', null);

    // Si je suis ici, c'est que tout va bien, je vais donc récupérer le contenu de ma réponse
    const entries = await response.json();

    return entries;
  }

  static makeEntryAbstractInDOM(entry) {
    const entryTemplateElm = document.querySelector('#entryTemplate');
    // clone template
    const cloneEntryElm = document.importNode(entryTemplateElm.content, true);

    // update data template
    const titleElm = cloneEntryElm.querySelector('.title');
    const paramsString = `entry.html?id=${entry.id}`;
    titleElm.setAttribute('href', paramsString);
    titleElm.textContent = entry.title;
    const dateElm = cloneEntryElm.querySelector('.date');
    const date = new Date(entry.date);
    dateElm.textContent = date.toLocaleDateString('fr-FR', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
    const contextElm = cloneEntryElm.querySelector('.context');
    contextElm.textContent = entry.context;
    if (!entry.context) this.hide(contextElm.parentElement);
    const categoryElm = cloneEntryElm.querySelector('.category');
    this.setColorCategory(categoryElm, entry);

    categoryElm.textContent = entry.category;
    const keywordsContainerElm = cloneEntryElm.querySelector('.keywords');
    if (entry.keywords) {
      Object.entries(entry.keywords)?.forEach(([key, value]) => {
        const spanElm = document.createElement('span');
        spanElm.classList.add('tag');
        spanElm.classList.add('is-light');
        spanElm.classList.add('mr-1');
        spanElm.classList.add('keyword');
        spanElm.textContent = `${value} `;
        keywordsContainerElm.appendChild(spanElm);
      });
    }
    // update id data-attribute of EntryElm
    // document.querySelector('form .maclass #monid [monAttribut="LaValeurDeMonAttribut"]');
    const entryElm = cloneEntryElm.querySelector('[data-entry-id]');
    entryElm.dataset.entryId = entry.id;

    // Add clone to DOM
    const containerElm = document.querySelector('.containerEntries');
    containerElm.append(cloneEntryElm);
  }

  static displayOneEntry(entry) {
    console.log(entry)
    const paragraphsContainerElm = document.querySelector('.paragraphs');
    const keywordsContainerElm = document.querySelector('.keywords');
    const linksContainerElm = document.querySelector('.links');
    // const capturesContainerElm = document.querySelector('.captures');
    const titleElm = document.querySelector('.title');
    const dateElm = document.querySelector('.date');
    const categoryElm = document.querySelector('.category');
    this.setColorCategory(categoryElm, entry);
    const contextElm = document.querySelector('.context');
    const date = new Date(entry.date).toLocaleDateString('fr-FR', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
    dateElm.textContent = date;
    titleElm.textContent = entry.title;
    contextElm.textContent = entry.context;
    if (!entry.context) this.hide(contextElm.parentElement);
    categoryElm.textContent = entry.category;

    if (entry.paragraphs) {
      Object.entries(entry.paragraphs)?.forEach(([key, value]) => {
        const paragraphElm = document.createElement('p');
        paragraphElm.classList.add('paragraph');
        paragraphElm.textContent = value;

        paragraphsContainerElm.appendChild(paragraphElm);
      });
    }
    if (entry.keywords) {
      Object.entries(entry.keywords)?.forEach(([key, value]) => {
        const keywordElm = document.createElement('span');
        keywordElm.classList.add('keyword');
        keywordElm.classList.add('tag');
        keywordElm.classList.add('m-1');
        keywordElm.classList.add('is-light');
        keywordElm.classList.add('keyword');
        keywordElm.textContent = `${value} `;
        keywordsContainerElm.appendChild(keywordElm);
      });
    } else this.hide(keywordsContainerElm.firstElementChild);
    if (entry.links) {
      Object.entries(entry.links)?.forEach(([key, value]) => {
        const pElm = document.createElement('p');
        const linkElm = document.createElement('a');
        linkElm.classList.add('link');
        linkElm.textContent = `${value} `;

        linkElm.setAttribute('href', value);
        pElm.appendChild(linkElm);
        linksContainerElm.appendChild(pElm);
      });
    }
  }
}
