import express from 'express';

import { getDrugs, createDrug, deleteDrug, updateDrug } from '../controllers/drugs.js'; 

const router = express.Router();

router.get('/getDrugs', getDrugs );
router.post('/createDrug', createDrug);
router.delete("/:id", deleteDrug);
router.patch("/:id", updateDrug);

export default router;