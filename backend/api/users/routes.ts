import { nextTick } from "node:process";
import UsersController from "./controllers";

export default function fnUsersRoutes(router) {
  const usersCtrl = new UsersController();

  router.route("/users")
    .get((req, res, next)=>{
      next()
    }, usersCtrl.fnGetUsers)
    .post(usersCtrl.fnCreateUser);
  router.route("/users/:id")
    .get((req, res, next)=>{
      next()
    }, usersCtrl.fnGetUser)
    .put((req, res, next)=>{
      next()
    }, usersCtrl.fnUpdateUser);
}
