require("dotenv").config;
const { Op } = require('sequelize');
import bcrypt from 'bcrypt';
import db from '../models/index'
import {getPositionWithRole} from './JWTService'
import { createJwt } from '../middleware/jwtActions';



const salt = bcrypt.genSaltSync(10);
const hashUserPassWord = (userPassWord) => {
    let hashPassWordCheck = bcrypt.hashSync(userPassWord, salt);
    return hashPassWordCheck;
  }

// this func checks if email already exist  
export const checkEmailExist = async (userEmail) =>{
    let user = await db.User.findOne({ 
        where: { 
            email:userEmail 
        } });
    if (user) {
        return true
    }
    return false    
}

export const checkPhoneExist = async (userPhone) =>{
    let user = await db.User.findOne({ 
        where: { 
            phone:userPhone
        } });
    if (user) {
        return true
    }
    return false    
}

// hàm tạo mới người dùng
const RegisterNewUser = async (rawUserData) =>{
    try {
        //check email, phone are existed
    let isExistEmail = await checkEmailExist(rawUserData.email)
    if (isExistEmail === true) {
        return {
            EM:'This email is already exist',
            EC: 1
        }
    }

    let isExistPhone = await checkPhoneExist(rawUserData.phone)
    if (isExistPhone === true) {
        return {
            EM:'This phone number is already exist',
            EC: 1
        }
    }
    if (rawUserData.password < 4) {
        return {
            EM:'Password must be longer than 3 characters',
            EC: 1
        }
    }
    //hash password
    let hashPassWord = hashUserPassWord(rawUserData.password)
    //create newUser
     await db.User.create({
        email: rawUserData.email, 
        password: hashPassWord, 
        username: rawUserData.username,
        phone: rawUserData.phone,
        positionID: 2
    });

    return{
        EM:'User is created successfully',
        EC: 0
    }

    } catch (error) {
        console.log(error)
        return{
            EM:'Something wrongs in service...',
            EC: -2
        }
    }
}

// Hàm kiểm tra mật khẩu
const checkPassword = (inputPassword, hashPassWord) => {
    return bcrypt.compareSync(inputPassword, hashPassWord);
}

// Hàm kiểm tra thông tin tài khoản người dùng, xử lý đăng nhập
const CheckLogin = async (rawUserData) => {
    try {
        // Tìm kiếm người dùng theo email hoặc số điện thoại
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin }
                ],
            }
        });

        // Kiểm tra xem người dùng có tồn tại không
        if (user) {
            let isCorrectPassword = checkPassword(rawUserData.valuePassword, user.password);
            if (isCorrectPassword) {
               let positionWithRoles = await getPositionWithRole(user);
               let payload = {
                email: user.email,
                phone: user.phone,
                positionWithRoles,
                username: user.username
               }
                let token = createJwt(payload)
                return {
                    EM: `Login successfully`,
                    EC: 0,
                    DT: {
                        access_token: token,
                        positionWithRoles,
                        email: user.email,
                        username: user.username
                    }
                };
            }
        }
        return {
            EM: 'Email/Phone number or password is incorrect',
            EC: 1,
            DT: ''
        };

    } catch (error) {
        console.log(error);
        return {
            EM: 'Something went wrong in the service...',
            EC: -2
        };
    }
}


module.exports = {
    RegisterNewUser, CheckLogin
}