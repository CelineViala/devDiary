const CoreDatamapper = require('./coreDatamapper');

module.exports = class DiaryEntry extends CoreDatamapper {
  static tableName = 'diary_entry';

  static async findAll() {
    const result = await this.client.query('SELECT * FROM "entry" ORDER BY date DESC');
    return result.rows;
  }

  static async searchByTitle(filter) {
    const preparedQuery = {
      text: `
      SELECT * FROM "entry" WHERE "title" ILIKE $1 ORDER BY date DESC
      `,
      values: [`%${filter}%`],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  static async searchByCategory(filter) {
    const preparedQuery = {
      text: `
      SELECT * FROM "entry" WHERE "category"=$1 ORDER BY date DESC
      `,
      values: [filter],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  static async searchByKeyword(filter) {
    const preparedQuery = { // k.keywords->>'2' IS NOT NULL
      text: `
      SELECT * FROM "entry" WHERE "keywords"->>$1 IS NOT NULL ORDER BY date DESC
      `,
      values: [filter],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  static async searchByDate(filter) {
    const preparedQuery = { // k.keywords->>'2' IS NOT NULL
      text: `
      SELECT * FROM "entry" WHERE "date"<=$1 ORDER BY date DESC
      `,
      values: [filter],
    };
    const result = await this.client.query(preparedQuery);
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
    const result = await this.client.query(preparedQuery);
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
    const result = await this.client.query(preparedQuery);
    return result.rows[0];
  }

  static async deleteAllEntries() {
    await this.client.query(`
            DELETE FROM "${this.tableName}"
        `);
    return 200;
  }
};
