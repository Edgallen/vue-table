import TableDataService from "./service.js";

class TableDataController {
  async create(req, res) {
    try {
      const tableBody = req.body;

      const newTableData = await TableDataService.create(tableBody);
      res.json(newTableData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const { page } = req.query;

      const tableData = await TableDataService.getAll(page);
      res.json(tableData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TableDataController();
