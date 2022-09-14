import TableData from "./model.js";

class TableDataService {
  async create(tableDataBody) {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const constnewdate = day + "." + month + "." + year;

    const newTableBody = {
      ...tableDataBody,
      createdAt: constnewdate,
    };
    const newTableRow = TableData.create(newTableBody)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
        throw new Error("Что-то пошло не так");
      });
    return newTableRow;
  }

  async getAll(page) {
    let pagesCount;

    const tableData = TableData.countDocuments()
      .then((count) => {
        const countedPages = Math.ceil(count / 11);
        pagesCount = countedPages > 0 ? countedPages : 1;

        const foundData = TableData.find()
          .sort({ createdAt: -1 })
          .skip(page > 1 ? 11 * (page - 1) : 0)
          .limit(11)
          .then((tableData) => {
            return { tableData };
          })
          .catch(() => {
            throw new Error("Что-то пошло не так");
          });

        return foundData;
      })
      .then((foundData) => {
        return { ...foundData, pagesCount: pagesCount };
      })
      .catch(() => {
        throw new Error("Что-то пошло не так");
      });

    return tableData;
  }
}

export default new TableDataService();
