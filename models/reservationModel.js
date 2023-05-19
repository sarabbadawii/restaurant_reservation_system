const conn = require("../connection");
const util = require("util");
const query = util.promisify(conn.query).bind(conn);

class Reservation {
    getReservation(data){
        const queryString = "select * from reservation where date = ? and time = ? and tableNumber = ?";
        const result = query(queryString , [data.date , data.time ,data.tableNumber ]);
        return result;

    }

    addReservation(data){
        const queryString = "insert into reservation set ?";
        const result = query(queryString ,data);
        return result;
    }

    updateReservation(data ,id){
        const queryString = "update reservation set ? where id =?";
        const result = query(queryString ,[data , id]);
        return result;
    }

    deleteReservation(id){
        const queryString = "delete from reservation where id =?";
        const result = query(queryString ,id);
        return result;
    }

    comfirmReservation(id,data){
        const queryString = "update reservation set ? where id =?";
        const result = query(queryString ,[data,id]  );
        return result;
    }

    getAllReservations(){
        const queryString ="select * from reservation";
        const result =query(queryString );
        return result;
    }
    getReservationByDate(id,date){
        const queryString ="select date ,time,tableNumber,peopleNumber ,isConfirmed from reservation where customerID = ? and date =?";
        const result =query(queryString ,[id,date]);
        return result;
    }
    
    addEvent(data){
        const queryString = "insert into reservation set ?";
        const result = query(queryString ,data);
        return result;
    }
    getReservationById(id){
        const queryString ="select * from reservation where id = ?";
        const result =query(queryString ,id);
        return result;
    }
}

module.exports = Reservation;
