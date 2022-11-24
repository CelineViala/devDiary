const { Link } = require('../models');

module.exports = {

  async deleteLink(req, res) {
    const linkId = Number(req.params.id);

    await Link.deleteByPk(linkId);
    return res.json('OK');
  },
  async createLink(req, res) {
    const row = await Link.create(req.body);
    return res.json(row);
  },

};
