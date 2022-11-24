const { Paragraph } = require('../models');

module.exports = {

  async updateParagraph(req, res) {
    const paragraphId = Number(req.params.id);
    const { content } = req.body;
    const row = await Paragraph.update(paragraphId, content);
    return res.json(row);
  },
  async createParagraph(req, res) {
    const row = await Paragraph.create(req.body);
    return res.json(row);
  },
  async deleteParagraph(req, res) {
    const paragraphId = Number(req.params.id);

    await Paragraph.deleteByPk(paragraphId);
    return res.json('OK');
  },

};
