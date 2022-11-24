(async () => {
  const entries = await Entry.getAll();
  console.log(entries)
  entries.forEach((entry) => Entry.makeEntryAbstractInDOM(entry));
})();
