require('dotenv').config()

import express from "express"
import conFigViewEngine from "./config/viewEng";
import initWebRouters from "./routes/web";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";
const app = express();
const PORT = process.env.PORT || 8080;
//config view engine
conFigViewEngine(app);


//config body-parser
// Thư viện này giúp chuyển data được gửi từ client lên server thành dạng JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//test connection
// connection();

//init web router
initWebRouters(app)



app.listen(PORT, ()=> {
    console.log(`Server is running in http://localhost:${PORT}`);
})
