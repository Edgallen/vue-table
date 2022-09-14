import Table from "./model.js";

class TableService {
  async create(tableDataBody) {
    const newObjToStore = {
      tableData: tableDataBody,
    };

    console.log(tableDataBody);
  }
}

export default new TableService();
