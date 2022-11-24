const CoreDatamapper = require('./coreDatamapper');
const client = require('../config/db');

module.exports = class DiaryEntry extends CoreDatamapper {
  static tableName = 'diary_entry';

  static async findAll() {
    const result = await client.query('SELECT * FROM "entry"');
    return result.rows;
  }

  static async findByPk(id) {
    const preparedQuery = {
      text: 'SELECT * FROM "entry" WHERE id=$1',

      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) return null;
    return result.rows[0];
  }

  static async update(id, obj) {
    const preparedQuery = {
      text: `
      SELECT * FROM update_entry($1,$2)
      `,
      values: [id, obj],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }

  static async associateKeyword(entry, keyword) {
    const preparedQuery = {
      text: `
                INSERT INTO "diary_entry_has_keyword" ("diary_entry_id","keyword_id")
                VALUES ($1,$2)
                RETURNING *
            `,
      values: [entry.id, keyword.id],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }

  static async deleteAllEntries() {
    await client.query(`
            DELETE FROM "${this.tableName}"
        `);
    return 200;
  }
};
