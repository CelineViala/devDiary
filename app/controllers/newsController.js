const fetch = require('node-fetch');

module.exports = {
  async getNews(req, res) {
    const response = await fetch(process.env.DATA_NEWS_URL);
    const news = await response.json();
    return res.json(news);
  },
};
