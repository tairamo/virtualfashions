import UsersDAO from "./dao";

const usersDAO = new UsersDAO();

export default class UsersController {
  /**
   * Get list of users.
   * @param {object} req - request object.
   * @param {object} res ' response object.
   */
  fnGetUsers = (req, res) => {
    usersDAO
      .fnGetUsers(req)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json(err));
  };

  /**
   * Get a user
   * @param {object} req - request object.
   * @param {object} res - response object.
   */
  fnGetUser = (req, res) => {
    usersDAO
      .fnGetUser(req)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json(err));
  };

  /**
   * Create a new user
   * @param {object} req - request object.
   * @param {object} res - response object.
   */
  fnCreateUser = (req, res) => {
    usersDAO
      .fnCreateUser(req)
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(400).json(err));
  };

  /**
   * Update existing user
   * @param {object} req - request object.
   * @param {object} res - response object.
   */
  fnUpdateUser = (req, res) => {
    usersDAO
      .fnUpdateUser(req)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).json(err));
  };
}

