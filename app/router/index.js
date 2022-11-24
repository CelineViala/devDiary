const express = require('express');
const controllerHandler = require('../helpers/controllerHandler');
const { errorHandler } = require('../helpers/errorHandler');
const { entryCreateSchema, validator } = require('../validation/schemas');
const validate = require('../validation/validator');

const router = express.Router();
const {
  entryController, keywordController, paragraphController, linkController,

} = require('../controllers');

router.get('/api/ping', (req, res) => {
  res.send('pong');
});
router.route('/api/entries')
  .get(controllerHandler(entryController.getAllEntries))
  .post(validate('body', entryCreateSchema), controllerHandler(entryController.createNewEntry))
  .delete(controllerHandler(entryController.deleteEntries));

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
  .post(controllerHandler(paragraphController.createParagraph));
router.route('/api/keyword/:keywordId/entry/:entryId')
  .delete(controllerHandler(keywordController.unlinkKeywordAndEntry));
router.use(errorHandler);
router.use((req, res) => { res.sendStatus(404); });

module.exports = router;
