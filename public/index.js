(async () => {
  const entries = await Entry.getAll();
  entries.forEach((entry) => Entry.makeEntryAbstractInDOM(entry));
})();
