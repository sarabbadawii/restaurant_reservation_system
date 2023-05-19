const router = require("express").Router();
const Customer = require("../controllers/CustomerController");
const customer = new Customer();

const Menu = require("../controllers/Menu");
const menu = new Menu(new Customer());

//menu
router.get("/view-menu", menu.viewAllMeals);

//Customer data
router.post("/add-customer-data", customer.addCustomerData);
router.put("/update-customer-data", customer.updateCustomerData);

//reservaton data for normal customer
router.post("/make-reservation", customer.normalReservation.makeReservation);

//reservaton data for special customer
router.post("/add-event", customer.specialReservation.addEvent);

//Update  and delete Reservation
router.put("/update-reservation", customer.normalReservation.updateReservation);
router.delete("/delete-reservation",customer.normalReservation.cancelReservation);

//view reservation by date and time
router.get("/get-my-Reservation",customer.normalReservation.getReservations);

module.exports = router;
