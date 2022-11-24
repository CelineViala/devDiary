const CoreDatamapper = require('./coreDatamapper');
const client = require('../config/db');

module.exports = class Keyword extends CoreDatamapper {
  static tableName = 'keyword';

  static async link(keywordId, entryId) {
    const preparedQuery = {
      text: 'INSERT INTO "diary_entry_has_keyword" ("diary_entry_id","keyword_id") VALUES ($1,$2)',
      values: [entryId, keywordId],
    };
    await client.query(preparedQuery);
  }

  static async unlink(keywordId, entryId) {
    const preparedQuery = {
      text: 'DELETE FROM "diary_entry_has_keyword" WHERE keyword_id=$1 AND diary_entry_id=$2',
      values: [keywordId, entryId],
    };
    await client.query(preparedQuery);
  }
};
