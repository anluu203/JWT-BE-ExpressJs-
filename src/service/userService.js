import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import Bluebird from 'bluebird';
// create the connection to database

const salt = bcrypt.genSaltSync(10);
const hashPassWord = (userPassWord) => {
    let hashPassWordCheck = bcrypt.hashSync(userPassWord, salt);
    return hashPassWordCheck;
  }

const CreateNewUser = async (email, password, username ) => {

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
    });

    let hashPass = hashPassWord(password)
    let check = bcrypt.compareSync(password, hashPass); // check password xem có đúng vs password đã mã hóa hay không
    console.log('check pass T or F :', check)

    
        // A simple SELECT query
    try {
      const [results, fields] = await connection.query(
        'INSERT INTO users (email, password, username) VALUES (?,?,?)', 
        [email, hashPass, username],
      );
      return results
    } catch (err) {
      console.log(err);

    }    
    
}

const getUserList = async () => {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
  });
        
    try {
      const [results, fields] = await connection.query(
        'SELECT * from users'
      );
      return results
    } catch (err) {
      console.log(err);
    }
}

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
  });
        
    try {
      const [results, fields] = await connection.query(
        'DELETE FROM users WHERE id=?',[id]
      );
      return results
    } catch (err) {
      console.log(err);
    }
}

const getUserById = async (id) =>{
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
  });
        
    try {
      const [results, fields] = await connection.query(
        'SELECT * from users WHERE id=?',[id]
      );
      return results
    } catch (err) {
      console.log(err);
    }
}

const updateUser = async (email, username,id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
  });
        
    try {
      const [results, fields] = await connection.query(
        'UPDATE users SET email = ?, username=?  WHERE id = ?',[email, username,id]
      );
      return results
    } catch (err) {
      console.log(err);
    }
}



module.exports = {
    CreateNewUser, getUserList, deleteUser, updateUser, getUserById
}


