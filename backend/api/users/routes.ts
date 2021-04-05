import UsersController from "./controllers";

export default function fnUsersRoutes(router) {
  const usersCtrl = new UsersController();

  router
    .route("/users")
    .get("/", usersCtrl.fnGetUsers)
    .post("/", usersCtrl.fnCreateUser)
    .put("/:id", usersCtrl.fnUpdateUser);
}
