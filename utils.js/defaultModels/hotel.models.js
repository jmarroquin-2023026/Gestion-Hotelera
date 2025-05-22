import Hotel from "../../src/hotel/hotel.model.js";
import User from "../../src/user/user.model.js";
import { alreadyExistRoom } from "./room.models.js";

export const alreadyExistHotel =async()=>{
    try {
        const hotelOwner = await User.findOne({
            username:'armas',
            email:'armas@gmail.com',
            role:'HOTELOWNER'
        })
        const defHotel = new Hotel({
            owner:hotelOwner._id,
            name: 'Tikal Futura',
            address: 'Calzada Roosevelt 22-43, Cdad. de Guatemala 01011',
            category: '4 STARS',
            amenities: 'Wi-Fi gratuito, business lounge, gimnasio y spa, piscina cubierta climatizada, salón de belleza, minimarket, sala de coworking, restaurante y bar, servicio a la habitación 24h, estacionamiento gratuito, cambio de moneda, lavandería, recepción 24h, niñera, salas de reuniones y convenciones, transporte aeropuerto, minibar, cafetera, TV LED, caja fuerte, artículos de tocador, acceso para discapacitados, tienda de regalos, terraza y eventos, servicio de despertador y guarda equipaje',
            reviews:[] ,
            reservations: 10000,
            photos: ['https://image-tc.galaxy.tf/wijpeg-cnv55tav06s09en33zht1a2iv/inicio_og-image.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BKHl29OHSBAMjpCKyahzzYjVasxLIBE3mg&usqp=CAU'],
        })
        let hotel = await Hotel.findOne({
            name:defHotel.name,
            address:defHotel.address,
            category:defHotel.category,
            amenities:defHotel.amenities,
            reviews:defHotel.reviews,
            reservations:defHotel.reservations,
            photos:defHotel.photos,
        })
        if(!hotel) await defHotel.save()
        alreadyExistRoom(defHotel._id)
    } catch (error) {
        return error
    }
}

