const CustomerModel = require("../models/customerModel");
const customerModel = new CustomerModel();

const MenuModel = require("../models/menuModel");
const menuModel = new MenuModel();

const NormalReservation = require("./NormalReservation");
const SpecialReservation = require("./SpecialReservation");

const MenuViewer = require("./MenuViewer");

class Customer extends MenuViewer {
  constructor() {
    super();
    this.normalReservation = new NormalReservation();
    this.specialReservation = new SpecialReservation();
  }
  viewMenu() {
    return menuModel.getAllMealsForCustomer();
  }

  async addCustomerData(req, res) {
    try {
      const customerData = req.body;
      const checkCustomerEmail = await customerModel.getCustomerByEmail(
        customerData.email
      );
      if (checkCustomerEmail.length > 0) {
        return res.status(404).json("this email is already exist");
      }
      const checkPhoneNumber = await customerModel.getCustomerPhoneNumber(
        customerData.phoneNumber,
        customerData.email
      );
      if (checkPhoneNumber.length > 0) {
        return res.status(404).json("this phoneNumber is already exist");
      }
      await customerModel.addCustomer(customerData);
      return res.status(200).json("the data of customer is added");
    } catch (err) {
      return res.status(404).json(err);
    }
  }

  async updateCustomerData(req, res) {
    try {
      const oldEmail = req.body.oldEmail;
      const customerData = req.body;
      const checkCustomerEmail = await customerModel.getCustomerByEmail(
        oldEmail
      );
      if (checkCustomerEmail.length === 0) {
        return res.status(404).json("this email is not exist");
      }
      const checkPhoneNumber = await customerModel.getCustomerPhoneNumber(
        customerData.phoneNumber,
        oldEmail
      );
      if (checkPhoneNumber.length > 0) {
        return res.status(404).json("this phoneNumber is already exist");
      }
      if (customerData.email == oldEmail) {
        const newCustomerData = {
          phoneNumber: req.body.phoneNumber,
          name: req.body.name,
        };
        await customerModel.updateCustomer(oldEmail, newCustomerData);
        return res.status(200).json("the customer data is updated");
      }
      const newCustomerData = {
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
      };
      const checkNewCustomerEmail = await customerModel.getCustomerByEmail(
        newCustomerData.email
      );
      if (checkNewCustomerEmail.length > 0) {
        return res.status(404).json("this email is already exist");
      }
      await customerModel.updateCustomer(oldEmail, newCustomerData);
      return res.status(200).json("the customer data is updated");
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
module.exports = Customer;
