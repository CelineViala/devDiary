const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const cancelBtn = document.querySelector('.close');
cancelBtn?.addEventListener('click', () => {
  if (id) { document.location.href = `http://localhost:4000/entry.html?id=${id}`; } else { document.location.href = 'http://localhost:4000/index.html'; }
});
// if id : it's the edit case
if (id) {
  // eslint-disable-next-line no-undef
  (async () => {
    const formInstance = new FormEntry(true, id);
    const entry = await Entry.getOne(id);

    formInstance.fillFields(entry);
    formInstance.createFields(entry);
  })();
} else {
  const formInstance = new FormEntry(false, null);
}
