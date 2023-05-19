const conn = require("../connection");
const util = require("util");
const query = util.promisify(conn.query).bind(conn);

class CustomerModel {
    addCustomer(data){
        const queryString = "insert into customer set ?";
        const result = query(queryString , data);
        return result;
    }
    getCustomerByEmail(email){
        const queryString ="select * from customer where email = ?";
        const result = query(queryString ,email);
        return result;
    }
    getCustomerById(id){
        const queryString ="select * from customer where id = ?";
        const result = query(queryString ,id);
        return result;
    }
    updateCustomer(email,newData){
        const queryString ="update customer set ? where email = ?";
        const result = query(queryString ,[newData ,email]);
        return result;
    }
    getCustomerPhoneNumber(phoneNumber,email){
        const queryString ="select * from customer where phoneNumber = ? and email not in(?)";
        const result = query (queryString,[phoneNumber,email]);
        return result;
    }

}

module.exports = CustomerModel;
