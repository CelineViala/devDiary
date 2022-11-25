(async () => {
  const entries = await Entry.getAll();
  console.log(entries);
  entries.forEach((entry) => Entry.makeEntryAbstractInDOM(entry));
})();

const searchFormElm = document.querySelector('.searchForm');
const selectElm = document.querySelector('.searchSelect');
const query = 'http://localhost:4000/api/entries/searchBy/';
let prop = 'title';
let val;

selectElm.addEventListener('change', (e) => {
  const fieldsElms = document.querySelectorAll('.fieldSearch');
  fieldsElms.forEach((elm) => {
    elm.classList.add('is-hidden');
  });

  console.log(e.target.value);
  if (e.target.value === 'title') {
    document.querySelector('.inputTitle').classList.remove('is-hidden');
    prop = 'title';
  } else if (e.target.value === 'date') {
    document.querySelector('.inputDate').classList.remove('is-hidden');
    prop = 'date';
  } else if (e.target.value === 'keyword') {
    document.querySelector('.inputKeyword').classList.remove('is-hidden');
    prop = 'keyword';
  } else if (e.target.value === 'category') {
    document.querySelector('.inputCategory').classList.remove('is-hidden');
    prop = 'category';
  }
});

searchFormElm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let query = 'http://localhost:4000/api/entries/searchBy/';
  query += prop;
  const obj = {};
  if (prop === 'title') {
    console.log(document.querySelector('.inputTitle'));
    obj.filter = document.querySelector('.inputTitle').value;
  } else if (prop === 'date') {
    obj.filter = document.querySelector('.inputDate').value;
  } else if (prop === 'keyword') {
    obj.filter = document.querySelector('.inputKeyword').value;
  } else if (prop === 'category') {
    obj.filter = document.querySelector('.inputCategory').value;
  }
  const response = await Utils.fetchData(query, 'POST', JSON.stringify(obj));
  const entries = await response.json();
  console.log(obj, query, prop, entries);
  const containerElm = document.querySelector('.containerEntries');
  containerElm.innerHTML = '';
  entries.forEach((entry) => Entry.makeEntryAbstractInDOM(entry));
});
const indexes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function randomItem(items) {
  let index = Math.floor(Math.random() * items.length);
  while (indexes[index]) {
    index = Math.floor(Math.random() * items.length);
  }
  indexes[index] = 1;
  return items[index];
}
(async () => {
  const res = await Utils.fetchData('http://localhost:4000/api/getNews');
  const news = await res.json();
  const newsContainer = document.querySelector('.newsContainer');

  const articles = [];
  while (articles.length < news.results.length && articles.length < 3) {
    articles.push(randomItem(news.results));
  }
  articles.forEach((item) => {
    const newTemplate = document.querySelector('#newsTemplate');
    const clone = document.importNode(newTemplate.content, true);
    const titleElm = clone.querySelector('.titleNews');
    const linkElm = clone.querySelector('.linkNews');
    console.log(linkElm);
    linkElm.setAttribute('href', item.link);
    linkElm.textContent = 'Lire';
    titleElm.textContent = item.title;
    newsContainer.appendChild(clone);
  });
})();
