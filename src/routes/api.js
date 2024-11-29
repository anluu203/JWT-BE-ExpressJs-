import  express  from "express";
import apiController from '../controller/apiController'
import apiUserController from '../controller/apiUserController'
import apiPositionController from '../controller/apiPositionController'
import {checkUserJWT, checkUserPermission} from '../middleware/jwtActions'
const router = express.Router();

/**
 *  express app
 */



 const initApiRouters = (app) => {
    
    router.all("*", checkUserJWT, checkUserPermission)  // áp dụng cho tất cả các route xem đã đăng nhập hay có quyền [thêm/ sửa/ xóa / xem] không?
    //rest api
    // get -R, post -C, put -U, delete -D

    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout )
    router.get("/account", apiUserController.getUserAccount)
    //api thêm sửa xóa người dùng
    router.get("/user/getAllUser", apiUserController.handleGetUser)
    router.delete("/user/delete",apiUserController.handleDeleteUser)
    router.post("/user/create", apiUserController.handleCreateUser)
    router.put("/user/update", apiUserController.handleUpdateUser)
    
    //api lấy dữ liệu của position table
    router.get("/position/read", apiPositionController.readPosition)

    return app.use("/api/v1/", router);

}

export default initApiRouters;

