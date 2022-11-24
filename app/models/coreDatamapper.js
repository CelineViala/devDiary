const client = require('../config/db');

module.exports = class CoreDatamapper {
  static client = client;

  static async findAll() {
    const result = await client.query(`
            SELECT * FROM "${this.tableName}"
        `);
    return result.rows;
  }

  static async deleteByPk(id) {
    const preparedQuery = {
      text: `DELETE FROM "${this.tableName}" WHERE id = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  static async create(inputData) {
    const fields = [];
    const placeholders = [];
    const values = [];
    let indexPlaceholder = 1;

    Object.entries(inputData).forEach(([prop, value]) => {
      fields.push(`"${prop}"`);
      placeholders.push(`$${indexPlaceholder}`);
      indexPlaceholder += 1;
      values.push(value);
    });
    const preparedQuery = {
      text: `
            INSERT INTO "${this.tableName}"
            (${fields})
            VALUES (${placeholders})
            RETURNING *
        `,
      values,
    };
    console.log(preparedQuery);
    const result = await this.client.query(preparedQuery);
    const row = result.rows[0];
    return row;
  }

  static async findByPk(id) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE ${id} = $1`,
      values: [id],
    };

    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) return null;
    return result.rows[0];
  }

  static async findByProperty(tableName, property, value) {
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" WHERE ${property} = $1`,
      values: [value],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) return null;
    return result.rows[0];
  }
};
