import Users from "./model";
import DAO from "../../services/dao";

import mongoose from "mongoose";

export default class UsersDAO extends DAO {
  model = Users;

  /**
   * Get list of users but
   *
   * @param {object} req - request object.
   */
  fnGetUsers = (req) => {
    return new Promise((resolve, reject) => {
      this.model
        .find(req.query)
        .then((users) => {
          resolve(users);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * Get single user
   * @param {object} req = request object.
   */
  fnGetUser = (req) => {
    return new Promise((resolve, reject) => {
      this.fnGet(req.params.id)
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  };

  /**
   * Create a new user.
   * @param {object} req - request object.
   */
  fnCreateUser = (req) => {
    const _user = new Users(req.body);
    return new Promise((resolve, reject) => {
      this.fnInsert(_user)
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  };

  /**
   * Update user
   * @param {object} req - request object.
   */
  fnUpdateUser = (req) => {
    return new Promise((resolve, reject) => {
      this.fnUpdate(req.params.id, req.params.body)
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  };
}
