import  express  from "express";
import homeController from "../controller/homeController"
import apiController from '../controller/apiController'
const router = express.Router();

/**
 *  express app
 */



 const initWebRouters = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWord)
    router.get("/user", homeController.handleUserPage )
    router.post("/users/create-user", homeController.handleCreateUser)
    router.post("/delete-user/:id",homeController.handleDeleteUser)
    router.get("/updateUser/:id", homeController.handleGetUserById)
    router.post("/user/updateUser", homeController.handleUpdateUserPage)



    //rest api
    router.get("/api/test-api", apiController.testApi)
    return app.use("/", router);
}

export default initWebRouters;

