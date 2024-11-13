import  express  from "express";
import apiController from '../controller/apiController'
import apiUserController from '../controller/apiUserController'
const router = express.Router();

/**
 *  express app
 */



 const initApiRouters = (app) => {
   
    //rest api
    // get -R, post -C, put -U, delete -D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    
    //api thêm sửa xóa người dùng
    router.get("/user/getAllUser", apiUserController.handleGetUser)
    router.delete("/user/delete",apiUserController.handleDeleteUser)

    
    return app.use("/api/v1/", router);
}

export default initApiRouters;

