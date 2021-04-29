interface Options {
  limit: number;
  page: number;
  sort: object;
}

abstract class DAO {
  abstract model: any;

  /**
   * Get al data
   *
   * @param {object} query.
   * @param {string} fields.
   * @param {object} options.
   * @return { object}
   */
  fnGetAll = (query?: object, fields?: string, options?: Options) => {
    const _query = query || {};
    const _fields = fields || "";

    return new Promise((resolve, reject) => {
      this.model.find(_query, _fields).exec((err, docs) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  };

  /**
   * Fetch one record from DB
   * 
   @param {string} id.
   @param {string} fields.
   @return {object}
   */
  fnGet = (id?: string, fields?: string) => {
    const _fields = fields || "";
    return new Promise((resolve, reject) => {
      this.model.findById({ _id: id }, _fields).exec((err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  };

  /**
   * Insert new record in DB
   *
   * @return {object}
   */
  fnInsert = (body?: object) => {
    return new Promise((resolve, reject) => {
      const obj = new this.model(body);
      obj.save((err, item) => {
        if (err) {
          reject(err);
        }
        resolve(item);
      });
    });
  };

  /**
   * Update existing record in DB
   *
   * @param {string} id.
   * @param {object} body.
   * @return {object}
   */
  fnUpdate = (id?: string, body?: object) => {
    return new Promise((resolve, reject) => {
      this.model.findOneAndUpdate(
        { _id: id },
        body,
        { new: true },
        (err, obj) => {
          if (err) {
            reject(err);
          }
          resolve(obj);
        }
      );
    });
  };

  /**
   * Remove one record from DB
   *
   * @param {string} id.
   * @return {object}
   */
  fnDelete = (id?: string) => {
    return new Promise((resolve, reject) => {
      this.model.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
          reject(err);
        }
        resolve(204);
      });
    });
  };

  /**
   * Count all data
   *
   * @return {number}
   */
  fnCount = () => {
    return new Promise((resolve, reject) => {
      this.model.count((err, count) => {
        if (err) {
          reject(err);
        }
        resolve(count);
      });
    });
  };
}

export default DAO