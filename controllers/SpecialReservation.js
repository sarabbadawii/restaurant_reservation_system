const CustomerController = require("./CustomerController");

const ReservationControlWithCode =require("./ReservationControlWithCode");

const ReservationModel = require("../models/reservationModel");
const reservationModel = new ReservationModel();

const Customer = require("../models/customerModel");
const customer = new Customer();

class SpecialReservation extends ReservationControlWithCode{
    async addEvent(req, res) {
        try {
            const data = req.body;
            
            const customerExsisting= await customer.getCustomerByEmail(data.email);
            if (customerExsisting.length === 0) {
                return res.status(404).json("this email is not exist");
            }
            const customerID = customerExsisting[0].id;

            //calculate date difference 
            const date = new Date(data.date);
            const currentDate = new Date();
            const difference = (date - currentDate) / (1000 * 60 * 60 * 24);
            if (!(difference < 30 && difference > 0)) {
                return res.status(404).json("reservation date is not available");
            }
            const eventData =
            {
                date : date.toLocaleDateString(),
                time : data.time,
                tableNumber : data.tableNumber,
                peopleNumber : data.peopleNumber,
                customerID :customerID,
                code : data.code,
                event :data.event
            }
            
            const eventExsisting=await reservationModel.getReservation(eventData);
            if(eventExsisting.length >0){
                return res.status(404).json("reservation date and time are not available");
            }
            
            if(eventData.peopleNumber >15){
                return res.status(404).json("The number of people is more than allowed");
            }
            await reservationModel.addEvent(eventData);
            return res.status(200).json("event reservation successful");
        } catch (err) {
            res.status(404).json(err);
        }
    }
}

module.exports=SpecialReservation;