import bcrypt from 'bcrypt';
import db from '../models';
import { where } from 'sequelize';
// create the connection to database

const salt = bcrypt.genSaltSync(10);
const hashPassWord = (userPassWord) => {
    let hashPassWordCheck = bcrypt.hashSync(userPassWord, salt);
    return hashPassWordCheck;
  }

const CreateNewUser = async (email, password, username ) => {

// check password xem có đúng vs password đã mã hóa hay không
    let hashPass = hashPassWord(password)
    let check = bcrypt.compareSync(password, hashPass); 
    console.log('check pass T or F :', check)

    
    try {
      const results = await db.User.create({
        email: email, 
        password: hashPass, 
        username: username,
      });
      return results;
    } catch (err) {
      console.log(err);

    }    
    
}

const getUserList = async () => {

      try {
       const results = await db.User.findAll();
       return results;
    } catch (err) {
      console.log(err);
    }
}

const deleteUser = async (id) => {
 
    try {
       await db.User.destroy({
        where:{
          id: id,
        }
       });
    } catch (err) {
      console.log(err);
    }
}

const getUserById = async (id) =>{

      try {
       const results = await db.User.findAll({
          where: {
            id: id,
          },
        });
        return results;
    } catch (err) {
      console.log(err);
    }

}

const updateUser = async (email, username, id) => {
  try {
    await db.User.update(
      {
        email: email,
        username: username,
      },
      {
        where: {
          id: id,  // Sử dụng id để xác định bản ghi cần cập nhật
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};




module.exports = {
    CreateNewUser, getUserList, deleteUser, updateUser, getUserById
}


