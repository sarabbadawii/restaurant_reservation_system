const MenuControl = require("./MenuControl");
const MenuViewer = require("./MenuViewer");

const AdminModel = require("../models/adminModel");
const adminModel = new AdminModel();

const MenuModel = require("../models/menuModel");
const menuModel = new MenuModel();

const ReservationModel = require("../models/reservationModel");
const reservationModel = new ReservationModel();

const ReservationApproval = require("../controllers/ReservationsApproval");


const bycrypt =require("bcrypt");
const crypto = require("crypto");
const { validationResult } = require("express-validator");


class Admin extends MenuViewer {
  constructor() {
    super();
    this.menuControl = new MenuControl();
    this.approval = new ReservationApproval();
  }

  async getAllAdmins(req, res) {
    try {
      const admins = await adminModel.getAllAdmins();
      res.status(200).json(admins)
    } catch (err) {
      res.status(404).json(err);
    }
  }

  async addAdmin(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }

      const { name, password, phoneNumber, email } = req.body;
      const token = crypto.randomBytes(16).toString("hex");

      const existingAdmin = await adminModel.getAdminByEmail(email);
      if (existingAdmin.length > 0) {
        return res.json("Admin already exists");
      }
      const existingPhone = await adminModel.getAdminByPhone(phoneNumber,email);
      if (existingPhone.length > 0) {
        return res.status(409).json("Admin phone number is already exist");
      }
      const hashedPassword = await bycrypt.hash(password, 10);
      const adminData = { name, password: hashedPassword, phoneNumber, email, token };
      await adminModel.addAdmin(adminData);
      res.status(200).json("Admin added successfully!");

    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  }

  async updateAdmin(req, res) {
    try {
      const { name, password, phoneNumber, email, oldEmail } = req.body;

      const existingAdmin = await adminModel.getAdminByEmail(oldEmail);
      if (existingAdmin.length === 0) {
        return res.status(404).json("There is no such old email exists");
      }
      const anotherAdmin = await adminModel.getAdminByEmail(email);
      if (anotherAdmin.length > 0 && email !== oldEmail) {
          return res.json("Admin already exists");
        }
      const existingPhone = await adminModel.getAdminByPhone(phoneNumber,oldEmail);
      if (existingPhone.length > 0) {
        return res.status(409).json("Admin phone number is already exist");
      }
      const hashedPassword = await bycrypt.hash(password, 10);
      const adminData = { name, password: hashedPassword, phoneNumber, email };
      await adminModel.updateAdmin(adminData, oldEmail);
      res.status(200).json("Updated successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async deleteAdmin(req, res) {
    try {
      const adminEmail = req.body.email;
      const existingAdmin = await adminModel.getAdminByEmail(adminEmail);
      if (existingAdmin.length === 0) {
        return res.status(404).json("Admin doesn't exist");
      }

      await adminModel.deleteAdminByEmail(adminEmail);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(404).json(err);
    }
  }
  viewMenu() {
    return menuModel.getAllMealsForAdmin();
  }
  
}
module.exports = Admin;
