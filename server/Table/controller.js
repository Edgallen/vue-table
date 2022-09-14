import TableDataService from "./service.js";

class TableController {
  async create(req, res) {
    try {
      const tableBody = req.body;

      const newTableData = await TableDataService.create(tableBody);
      res.json(newTableData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TableController();
