const {
  DiaryEntry, Paragraph, Keyword, Link,
} = require('../models');

module.exports = {
  async getAllEntries(req, res) {
    const rows = await DiaryEntry.findAll();
    return res.json(rows);
  },
  async findOneEntry(req, res) {
    const { id } = req.params;
    const row = await DiaryEntry.findByPk(id);
    console.log(row);
    return res.json(row);
  },
  async createNewEntry(req, res) {
    const {
      title, date, context, paragraphs, keywords, links, categoryId,
    } = req.body;
    const row = await DiaryEntry.create({
      title, date, context, category_id: categoryId,
    });
    links.forEach(async (link) => {
      await Link.create({ address: link.address, diary_entry_id: row.id });
    });
    keywords.forEach(async (keyword) => {
      let k = await Keyword.findByProperty('keyword', 'label', keyword.label);
      if (!k) k = await Keyword.create({ label: keyword.label });
      await DiaryEntry.associateKeyword(row, k);
    });
    paragraphs.forEach(async (p) => {
      await Paragraph.create({ content: p.content, diary_entry_id: row.id });
    });

    return res.json(row);
  },
  async deleteEntry(req, res) {
    const entryId = Number(req.params.id);
    console.log(entryId);
    await DiaryEntry.deleteByPk(entryId);
    return res.json('OK');
  },
  async deleteEntries(req, res) {
    await DiaryEntry.deleteAllEntries();
    return res.json('OK');
  },
  async updateEntry(req, res) {
    const params = req.body;
    console.log(params);
    const { id } = req.params;
    const row = await DiaryEntry.update(Number(id), params);
    return res.json(row);
  },

};