require("dotenv").config()
import express from "express"
import conFigViewEngine from "./config/viewEng";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
import bodyParser from "body-parser";
import cors from 'cors'



// import connection from "./config/connectDB";
const app = express();
const PORT = process.env.PORT || 8080;


//config view engine
conFigViewEngine(app);


// Cấu hình CORS để chấp nhận yêu cầu từ localhost:3000
app.use(cors({
    origin: process.env.REACT_URL || 'http://localhost:3000'
}));




//config body-parser
// Thư viện này giúp chuyển data được gửi từ client lên server thành dạng JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//test connection
// connection();

//init web router
initWebRouters(app)
initApiRouters(app)


app.listen(PORT, ()=> {
    console.log(`Server is running in http://localhost:${PORT}`);
})
