const AdminModel = require("../models/adminModel");
const adminModel = new AdminModel();

const MenuModel = require("../models/menuModel");
const menuModel = new MenuModel();
class MenuControl {
  async addMeal(req, res) {
    try {
      const adminToken = req.headers.token;
      const admin = await adminModel.getAdminByToken(adminToken);
      if (!admin) {
        return res.status(404).json("Admin doesn't exist");
      }

      const mealData = {
        mealName: req.body.mealName,
        description: req.body.description,
        price: req.body.price,
        adminID: admin[0].id,
      };

      if (mealData.price === 0) {
        return res.status(403).json("You can't set any meal price to zero.");
      }

      const existingMeal = await menuModel.getMealData(mealData.mealName);
      if (existingMeal.length > 0) {
        return res.status(400).json("Meal already exists");
      }

      await menuModel.addMeal(mealData);
      return res.status(200).json("Meal added successfully");
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async updateMeal(req, res) {
    try {
      const adminToken = req.headers.token;
      const admin = await adminModel.getAdminByToken(adminToken);
      if (!admin) {
        return res.status(404).json("Admin doesn't exist");
      }

      const oldName = req.body.oldName;
      const existingOldMeal = await menuModel.getMealData(oldName);
      if (existingOldMeal.length === 0) {
        return res.status(404).json("There is no such old meal exist");
      }

      const mealData = {
        mealName: req.body.mealName,
        description: req.body.description,
        price: req.body.price,
        adminID: admin[0].id,
      };

      const existingNewMeal = await menuModel.getMealData(mealData.mealName);
      if (existingNewMeal.length > 0 && mealData.mealName !== oldName) {
        return res.status(400).json("Meal already exists");
      }

      if (mealData.price === 0) {
        return res.status(403).json("You can't set any meal price to zero.");
      }

      await menuModel.updateMeal(mealData, oldName);
      return res.status(200).json("Meal updated successfully");
    } catch (err) {
      return res.status(404).json(err);
    }
  }

  async deleteMeal(req, res) {
    try {
      const mealName = req.body.mealName;

      const existingMeal = await menuModel.getMealData(mealName);
      if (existingMeal.length === 0) {
        return res.status(404).json("Meal doesn't exist");
      }

      const menu = await menuModel.getAllMealsForAdmin();
      if (menu.length <= 5) {
        return res
          .status(403)
          .json(
            "You can't delete the meal, you have reached the limit of meals in menu which is 5 meals"
          );
      }

      await menuModel.deleteMeal(mealName);
      return res.status(200).json("Meal deleted successfully");
    } catch (err) {
      return res.status(404).json(err);
    }
  }
}

module.exports = MenuControl;
