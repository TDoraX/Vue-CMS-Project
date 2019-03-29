const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/cate.controller');
router.post('/', dataCtrl.create);
router.put('/:id', dataCtrl.update);
router.delete('/:id', dataCtrl.remove);
router.post('/list/:type', dataCtrl.list);
router.get('/:id', dataCtrl.get);

module.exports = router;

