import db from "../models"

const handleReadPosition = async () => {
    try {
        let position = await db.position.findAll({
            order: [['name', 'ASC']]
        })
        if (position) {
            return{
                EM: 'Get data successfully',
                EC: 0,
                DT: position
            }
        } else {
            return{
                EM: 'Data in position table is empty',
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

module.exports = {
    handleReadPosition
}