import { Router } from "express";
import TableDataController from "./TableData/controller.js";

const router = new Router();

// TableData
router.post("/tableData", TableDataController.create);
router.get("/tableData", TableDataController.getAll);

export default router;
