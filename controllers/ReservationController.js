const ReservationModel = require("../models/reservationModel")
const reservationModel = new ReservationModel();

const Customer = require("../models/customerModel");
const customer = new Customer();


const Reservation = require("./Reservation");

class ReservationController extends Reservation {
    constructor() {
        super();
    }

    async updateReservation(req, res) {
        try {
            const date = new Date(req.body.date);
            const oldReservationData = {
                date: date.toLocaleDateString(),
                time: req.body.time,
                tableNumber: req.body.tableNumber
            }
            const newReservationData = {
                peopleNumber: req.body.peopleNumber,
            }
            const checkReservationExistance = await reservationModel.getReservation(oldReservationData);

            if (checkReservationExistance.length === 0) {
                return res.status(404).json("sorry cannot find reservation");
            }
            const customerID = checkReservationExistance[0].customerID;
            const customerEmail = await customer.getCustomerById(customerID);
            if (customerEmail[0].email != req.body.email) {
                return res.status(404).json("sorry cannot find your reservation");
            }
            const currentDate = new Date();
            const difference = (date - currentDate) / (1000 * 60 * 60 * 24);
            if (difference < 0 ) {
                return res.status(404).json("sorry cannot update reservation");
            }
            if (newReservationData.peopleNumber > 15) {
                return res.status(404).json("The number of people is more than allowed");
            }
            await reservationModel.updateReservation(newReservationData, checkReservationExistance[0].id);
            return res.status(200).json("Reservation updated");

        } catch (err) {
            console.log(err);
            res.status(404).json(err);
        }
    }


    async cancelReservation(req, res) {
        try {

            const reservationDate = new Date(req.body.date);
            const reservationData = {
                date: reservationDate.toLocaleDateString(),
                time: req.body.time,
                tableNumber: req.body.tableNumber,
                email: req.body.email
            };

            const checkReservationExistance = await reservationModel.getReservation(reservationData);

            if (checkReservationExistance.length === 0) {
                return res.status(404).json("sorry cannot find reservation");
            }
            const customerID = checkReservationExistance[0].customerID;
            const customerData = await customer.getCustomerById(customerID);
            if (customerData[0].email != req.body.email) {
                return res.status(404).json("sorry cannot find your reservation");
            }
            const currentDate = new Date();
            const difference = (reservationDate - currentDate) / (1000 * 60 * 60 * 24);
            if (difference  < 0) {
                return res.status(404).json("sorry cannot cancel reservation");
            }
            await reservationModel.deleteReservation(checkReservationExistance[0].id);
            return res.status(200).json("Reservation canceled");
                
        } catch (err) {
            return res.status(404).json(err);
        }
    }

    async getReservations(req, res) {
        try {
            const date = new Date(req.body.date);
            const data = {
                email: req.body.email,
                date: date.toLocaleDateString(),
            }
            const customerData = await customer.getCustomerByEmail(data.email);
            if (customerData.length === 0) {
                return res.status(404).json("this email is not exist");
            }
            const customerID = customerData[0].id;
            const Reservation = await reservationModel.getReservationByDate(customerID, data.date);
            if (Reservation.length === 0) {
                return res.status(404).json("no reservations found for you");
            }
            if (Reservation[0].isConfirmed == 1) {
                Reservation[0].isConfirmed = "yes";
                return res.status(200).json(Reservation);
            } else {
                Reservation[0].isConfirmed = "not yet";
                return res.status(200).json(Reservation);
            }
        } catch (err) {
            console.log(err);
            res.status(404).json(err);
        }
    }
}

module.exports = ReservationController;