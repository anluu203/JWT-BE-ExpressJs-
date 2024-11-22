require("dotenv").config()
import jwt from "jsonwebtoken"

export const createJwt = (payload) =>{
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
         token = jwt.sign(payload, key);
    } catch (error) {
        console.log('Error in jwtActions: ', error)
    }
    return token
}

