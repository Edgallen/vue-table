import { Router } from "express";
import TableController from "./Table/controller.js";
import TableDataController from "./TableData/controller.js";

const router = new Router();

// Table
router.post("/table", TableController.create);

// TableData
router.post("/tableData", TableDataController.create);
router.get("/tableData", TableDataController.getAll);

export default router;
