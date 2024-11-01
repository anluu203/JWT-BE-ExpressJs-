import  express  from "express";
import apiController from '../controller/apiController'
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
    
    return app.use("/api/v1/", router);
}

export default initApiRouters;

