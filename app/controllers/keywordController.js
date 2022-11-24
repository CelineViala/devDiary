const { Keyword } = require('../models');

module.exports = {

  async unlinkKeywordAndEntry(req, res) {
    const { keywordId, entryId } = req.params;
    await Keyword.unlink(keywordId, entryId);
    const row = await Keyword.findByProperty('diary_entry_has_keyword', 'keyword_id', keywordId);

    if (!row) Keyword.deleteByPk(keywordId);
    return res.json('OK');
  },
  async createKeyword(req, res) {
    const idEntry = Number(req.params.idEntry);
    // tableName, property, value
    let row;
    row = await Keyword.findByProperty('keyword', 'label', req.body.label);
    if (!row) { row = await Keyword.create({ label: req.body.label }); }
    console.log('row', row);
    await Keyword.link(Number(row.id), idEntry);
    return res.json(row);
  },

};
