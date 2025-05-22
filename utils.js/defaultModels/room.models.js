import Room from "../../src/room/room.model.js";

let defRoom = new Room({
    type:'SUITE',
    description: 'espacio dividido entre sala de estar y dormitorio, con área de trabajo, diseñada para comodidad y exclusividad.' ,
    amount: 45,
    hotel:'67c20921f0566df5caa4d7c5',
    price: 1050.00,
})
export const alreadyExistRoom = async(hotelId)=>{
    const room = await Room.findOne({
        type: defRoom.type,
        description: defRoom.description,
        amount: defRoom.amount,
        price: defRoom.price,
    })
    if(!room){
        defRoom.hotel = hotelId
        await defRoom.save()
    }
}