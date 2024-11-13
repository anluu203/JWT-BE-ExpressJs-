import apiUserService from '../service/apiUserService'


const handleGetUser = async (req, res) =>{
    try {
        if(req.query.page && req.query.results) {
                let page = req.query.page;
                let results = req.query.results;

                let data = await apiUserService.getUserWithPagination(+page, +results)
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
            })
        }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
        }) 
        }
}
const handleCreateUser =  (req, res) =>{
    
}
const handleUpdateUser = (req, res) =>{

}

const handleDeleteUser = async (req, res) =>{
    try {
        let data = await apiUserService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
    })
    }
}

module.exports = {
    handleCreateUser,
    handleGetUser,
    handleUpdateUser,
    handleDeleteUser
}