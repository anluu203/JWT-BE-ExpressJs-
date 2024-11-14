import apiPositionService from '../service/apiPositionService'
const readPosition = async (req, res) =>{
    try {
        let data = await apiPositionService.handleReadPosition(req)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
           })
    } catch (error) {
        return res.status(500).json({
            EM: 'Error from sever',
            EC: '-1',
            DT: ''
         })
    }
}

module.exports = {
    readPosition
}