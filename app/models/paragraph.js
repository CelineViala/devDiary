const CoreDatamapper = require('./coreDatamapper');

module.exports = class Paragraph extends CoreDatamapper {
  static tableName = 'paragraph';

  static async update(id, content) {
    const preparedQuery = {
      text: `
        UPDATE paragraph SET content=$1 WHERE id=$2
        `,
      values: [content, id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows[0];
  }
};
