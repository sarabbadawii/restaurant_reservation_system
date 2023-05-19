const router = require("express").Router();

const Admin = require("../controllers/Admin");
const admin = new Admin();

const Menu = require("../controllers/Menu");
const menu = new Menu(new Admin());

const Approval =require("../controllers/ReservationsApproval");
const approval = new Approval(); 

const Reservation =require("../controllers/Reservation");
const { body } = require("express-validator");
const reservation = new Reservation();

const Login= require("../controllers/Login");
const login =new Login();

const AdminAuth=require("../middleware/AdminAuth");
const adminAuth =new AdminAuth();


//CRUD Admin
router.get("/view-admins",adminAuth.auth, admin.getAllAdmins); //tested
router.post("/add-admin",adminAuth.auth, admin.addAdmin); //tested
router.put("/update-admin",adminAuth.auth, admin.updateAdmin); //tested
router.delete("/delete-admin",adminAuth.auth, admin.deleteAdmin); //tested

//CRUD Meal
router.get("/view-meals",adminAuth.auth, menu.viewAllMeals); //tested
router.post("/add-meal",adminAuth.auth, admin.menuControl.addMeal); //tested
router.put("/update-meal",adminAuth.auth, admin.menuControl.updateMeal); //tested
router.delete("/delete-meal",adminAuth.auth, admin.menuControl.deleteMeal); //tested

//test approval
router.put("/confirm-reservation",adminAuth.auth,admin.approval.confirmReservation);
router.get("/view-all-reservations",adminAuth.auth,admin.approval.getReservations);

//login
router.post("/login",[body("email").isEmail().withMessage("please enter a valid email")],login.login);

module.exports = router;
