const express = require('express');
const controllerHandler = require('../helpers/controllerHandler');
const { errorHandler } = require('../helpers/errorHandler');
const { entrySchema, paragraphCreateSchema } = require('../validation/schemas');
const validate = require('../validation/validator');

const router = express.Router();
const {
  entryController, keywordController, paragraphController, linkController, newsController,
} = require('../controllers');

router.get('/api/ping', (req, res) => {
  res.send('pong');
});
router.get('/api/getNews', controllerHandler(newsController.getNews));
router.route('/api/entries')
  .get(controllerHandler(entryController.getAllEntries))
  .post(validate('body', entrySchema), controllerHandler(entryController.createNewEntry))
  .delete(controllerHandler(entryController.deleteEntries));
router.post('/api/entries/searchBy/title', controllerHandler(entryController.searchByTitle));
router.post('/api/entries/searchBy/keyword', controllerHandler(entryController.searchByKeyword));
router.post('/api/entries/searchBy/date', controllerHandler(entryController.searchByDate));
router.post('/api/entries/searchBy/category', controllerHandler(entryController.searchByCategory));
router.route('/api/entry/:id')
  .get(controllerHandler(entryController.findOneEntry))
  .delete(controllerHandler(entryController.deleteEntry))
  .patch(controllerHandler(entryController.updateEntry));
router.route('/api/keyword')
  .post(controllerHandler(keywordController.createNewKeyword));
router.route('/api/keyword')
  .delete(controllerHandler(keywordController.deleteKeyword));
router.route('/api/keyword/:idEntry')
  .post(controllerHandler(keywordController.createKeyword));
router.route('/api/link/:id')
  .delete(controllerHandler(linkController.deleteLink))
  .post(controllerHandler(linkController.createLink));
router.route('/api/paragraph/:id')
  .patch(controllerHandler(paragraphController.updateParagraph))
  .delete(controllerHandler(paragraphController.deleteParagraph))
  .post(validate('body', paragraphCreateSchema), controllerHandler(paragraphController.createParagraph));
router.route('/api/keyword/:keywordId/entry/:entryId')
  .delete(controllerHandler(keywordController.unlinkKeywordAndEntry));
router.use(errorHandler);
router.use((req, res) => { res.sendStatus(404); });

module.exports = router;
