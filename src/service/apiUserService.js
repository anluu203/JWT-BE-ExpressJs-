import bcrypt from "bcrypt";
import db from "../models/index";
import { where } from "sequelize";

// mã hóa password
// const salt = bcrypt.genSaltSync(10);
// const hashPassWord = (userPassWord) => {
//   let hashPassWordCheck = bcrypt.hashSync(userPassWord, salt);
//   return hashPassWordCheck;
// };

const getAllUser = async () =>{
    try {
        let users = await db.User.findAll({
            attributes: ["id", "email", "username", "sex", "phone"],
            include:{model: db.position, attributes:["name","description"]}
        })
        if (users) {
            return{
                EM: 'Get data successfully',
                EC: 0,
                DT: users
            }
        } else {
            return{
                EM: 'User list is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}
const getUserWithPagination = async (page, results) =>{
    try {
        let offset = (page - 1) * results; // offset là vị trí page đang hiển thị DL
        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: results,
            attributes: ["id", "email", "username", "sex", "phone"],
            include:{model: db.position, attributes:["name","description"]}
          });
        
        let totalPages =  Math.ceil(count/results) 
        // hàm làm tròn (VD: Có 31 users, phân thành 
        // 5 users 1 trang, lấy 31 chia 5 = 6.2 (7 trang)


        let data = {
            totalPages: totalPages,
            totalRows:count,
            users: rows
        }
        return{
            EM: 'Get data successfully',
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}

const createUser = async (data) => {
    try {
        
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}



const updateUser = async (data) =>{
    try {
        let user = await db.User.findOne({
            where:{id: data.id}
            
        })
        if (user) {
               // update 
            } else {
                // not found
            }
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}
const deleteUser = async (id) =>{
    try {
        let user = await db.User.findOne({
            where:{
              id: id,
            }
           });
        if (user) {
            await user.destroy()
            return{
                EM: 'Delete user successfully',
                EC: 0,
                DT: []
            }
        } else{
            return{
                EM: 'User is not exist',
                EC: 1,
                DT: []
            }
        }  
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}

module.exports= {
    createUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserWithPagination
}