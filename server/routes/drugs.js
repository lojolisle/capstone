import express from 'express';

import { getDrugs, createDrug, deleteDrug, updateDrug, getDrug } from '../controllers/drugs.js'; 

const router = express.Router();

router.get('/getDrugs', getDrugs );
router.post('/createDrug', createDrug);
router.delete("/:id", deleteDrug);
router.patch("/:id", updateDrug);
router.get("/:id", getDrug);

export default router;