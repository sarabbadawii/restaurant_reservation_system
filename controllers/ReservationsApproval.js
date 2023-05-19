const ReservationModel = require("../models/reservationModel")
const reservationModel = new ReservationModel();

const Reservation = require("./Reservation");

const AdminModel = require("../models/adminModel");
const adminModel = new AdminModel();

class ReservationApproval extends Reservation {
    constructor() {
        super();
    }
    async confirmReservation(req, res) {
        try {
            const adminToken = req.headers.token;
            const reservationId=req.body.id;
            const admin = await adminModel.getAdminByToken(adminToken);
            if (admin.length === 0) {
                return res.status(404).json("can not find this email");
            }
            const adminID =admin[0].id;
            const checkReservationExistence= await reservationModel.getReservationById(reservationId);
            if(checkReservationExistence.length === 0){
                return res.status(404).json("can not find this reservation");
            } 
            const newReservationData ={
                isConfirmed : 1,
                adminID : adminID
            }
            await reservationModel.comfirmReservation(reservationId,newReservationData);
            return res.status(200).json("Reservation confirmed");
        } catch (err) {
            console.log(err);
            res.status(404).json(err);
        }
    }
    async getReservations(req,res){
        try{
            const allReservations =await reservationModel.getAllReservations();
            return res.status(200).json(allReservations);
        }catch(err){
            res.status(404).json(err);
        }
    }

}
module.exports = ReservationApproval;