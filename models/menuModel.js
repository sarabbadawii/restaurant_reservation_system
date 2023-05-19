const connection = require("../connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

class MenuModel {
  addMeal(mealData) {
    const queryString = "INSERT INTO menu SET ?";
    const result = query(queryString, mealData);
    return result;
  }
  updateMeal(mealData, mealName) {
    const queryString = "UPDATE menu SET ? WHERE mealName = ?";
    const result = query(queryString, [mealData, mealName]);
    return result;
  }
  deleteMeal(mealName) {
    const queryString = "DELETE FROM menu WHERE mealName = ?";
    const result = query(queryString, mealName);
    return result;
  }
  getMealData(mealName) {
    const queryString = "SELECT * FROM menu WHERE mealName = ?";
    const result = query(queryString, mealName);
    return result;
  }
  getAllMealsForCustomer() {
    const queryString = "SELECT mealName,description,price FROM menu";
    const result = query(queryString);
    return result;
  }
  getAllMealsForAdmin() {
    const queryString = "SELECT * FROM menu";
    const result = query(queryString);
    return result;
  }
}

module.exports = MenuModel;
