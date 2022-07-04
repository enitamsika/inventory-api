var express = require('express');
var router = express.Router();
var barang_keluarController = require('./barang_keluarController.js');

/*
 * GET
 */
router.get('/', barang_keluarController.list);

/*
 * GET
 */
router.get('/total', barang_keluarController.total);

/*
 * GET
 */
router.get('/:id', barang_keluarController.show);

/*
 * POST
 */
router.post('/', barang_keluarController.create);

/*
 * PUT
 */
router.put('/:id', barang_keluarController.update);

/*
 * DELETE
 */
router.delete('/:id', barang_keluarController.remove);

module.exports = router;
