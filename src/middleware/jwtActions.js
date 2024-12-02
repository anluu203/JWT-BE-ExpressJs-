require("dotenv").config()
import jwt from "jsonwebtoken"

const nonSecurePaths = ["/login", "/register"];

const createJwt = (payload) =>{
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
         token = jwt.sign(payload, key,{expiresIn: process.env.JWT_EXPIRES_IN});
         
    } catch (error) {
        console.log('Error in jwtActions: ', error)
    }
    return token
}

// decoded mã token
const verifyToken = (token) =>{
    let key = process.env.JWT_SECRET;
    let decoded = null; 
    try {
         decoded = jwt.verify(token, key);
   } catch (error) {
       console.log('Error in verify token: ', error)
   }
   return decoded;
}


const extractToken = (req) =>{
    if (req.header.authorization && req.header.authorization.split(' ')[0] === 'Bearer') {
        return req.header.authorization.split(' ')[1]
    }
    return null;
}

const checkUserJWT =  (req, res, next) =>{
    if(nonSecurePaths.includes(req.path)) return next();
    let cookies =  req.cookies;
    let tokenFromHeader = extractToken(req)
    if (cookies && cookies.jwt || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user, please login...'
        })
    }
}

const checkUserPermission = (req, res, next) =>{
    if(nonSecurePaths.includes(req.path) || req.path === "/account" || req.path === "/logout" ) return next();
    let user = req.user;
    if (user) {
        let email = req.user.email;
        let roles = req.user.positionWithRoles.roles;
        let currentUrl = req.path;
        if(!roles || roles.length === 0){
            return res.json({
                EC: -1,
                DT: '',
                EM: `you don't permission to access this resource...`
            })
        }
        let canAccess = roles.some( items => items.url === currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.json({
                EC: -1,
                DT: '',
                EM: `you don't have this role...`
            })
        }
    } else {
        return res.json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createJwt, verifyToken, checkUserJWT, checkUserPermission
}

