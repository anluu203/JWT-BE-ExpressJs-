import db from "../models"

const getPositionWithRole = async (user) =>{
    let roles = await db.position.findOne({
    where: {id: user.positionID},
    attributes: ["id", "name", "description"],
    include: {
        model: db.role, 
        attributes: ["id", "url", "description"],
        through: { attributes: []}
        },
    })
    return roles ? roles : {}

}

module.exports ={getPositionWithRole}