require('dotenv').config()

import express from "express"
import conFigViewEngine from "./configs/viewEng";
import initWebRouters from "./routes/web";
import bodyParser from "body-parser";


const app = express();
const PORT = process.env.PORT || 8080;
//config view engine
conFigViewEngine(app);


//config body-parser
// Thư viện này giúp chuyển data được gửi từ client lên server thành dạng JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//init web router
initWebRouters(app)




app.listen(PORT, ()=> {
    console.log(`Server is running in http://localhost:${PORT}`);
})
