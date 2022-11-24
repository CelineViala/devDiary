// get id from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

(async () => {
  const entry = await Entry.getOne(id);
  Entry.displayOneEntry(entry);
  const modifyBtnElm = document.querySelector('.modify');
  const paramsString = `new.html?id=${id}`;
  modifyBtnElm.setAttribute('href', paramsString);
  const deleteBtnElm = document.querySelector('.deleteEntry');
  deleteBtnElm.addEventListener('click', async () => {
    const isOk = confirm('voulez vous vraiment supprimer?');
    if (isOk) {
      await Utils.fetchData(`http://localhost:4000/api/entry/${id}`, 'DELETE');
      document.location.href = 'http://localhost:4000/';
    }
  });
})();
