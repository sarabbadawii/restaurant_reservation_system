class Menu {
  constructor(MenuViewer) {
    this.menuViewer = MenuViewer;
    this.viewAllMeals = async (req, res) => {
      try {
        const menuMeals = await this.menuViewer.viewMenu();
        if (menuMeals.length === 0) {
          return res.json("No Meals To show");
        }
        return res.status(200).json(menuMeals);
      } catch (err) {
        res.status(404).json(err);
      }
    };
  }
}

module.exports = Menu;
