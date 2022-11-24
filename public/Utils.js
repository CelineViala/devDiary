class Utils {
  static async fetchData(url, method, bodyObject) {
    try {
      const response = await fetch(url, { method, body: bodyObject, headers: { 'Content-type': 'application/json' } });
      if (!response.ok) {
        const result = await response.json();
        console.log(result);
        throw new Error(result.message);
      }
      return response;
    } catch (error) {
      console.log(error);
      const msgElm = document.querySelector('.msg');
      msgElm.textContent = error;
      alert(error);
      return error;
    }
  }

  static setValue(modify, elm, val) {
    const element = elm;
    if (modify) {
      element.value = val;
    } else {
      element.textContent = val;
    }
  }

  static appendTemplate(template, parent) {
    const clone = document.importNode(template.content, true);
    const removeIcon = clone.querySelector('.removeItem');
    removeIcon.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });
    clone.querySelector('.input').addEventListener('change', handleModif);
    parent.append(clone);
  }
}
