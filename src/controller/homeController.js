import userService from '../service/userService'




 //path to home.ejs 
const handleHelloWord = (req, res) => {
   const name = "AnLuu"
    return res.render("home.ejs", {name})
}

// path to user page
const handleUserPage = async  (req, res) => {
 let userList = await  userService.getUserList();
return res.render("user.ejs", {userList})
 }


const handleUpdateUserPage = async (req, res) => {
    let id = req.body.id
    let email = req.body.email
    let username = req.body.username
     await userService.updateUser(email, username, id)
    res.redirect("/user")
}


const handleGetUserById = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = {}
    if(user && user.length > 0){
        userData = user[0]
    }
    return res.render("updateUser.ejs", {userData})
}



// create new user 
const handleCreateUser =  (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
   
    userService.CreateNewUser(email, password, username)
    res.redirect("/user")
}

//delete user
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    res.redirect("/user")

}


module.exports = {
    handleHelloWord, handleUserPage,handleCreateUser, handleDeleteUser, handleUpdateUserPage, handleGetUserById
}