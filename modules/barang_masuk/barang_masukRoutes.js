var express = require('express');
var router = express.Router();
var barang_masukController = require('./barang_masukController.js');

/*
 * GET
 */
router.get('/', barang_masukController.list);

/*
 * GET
 */
router.get('/:id', barang_masukController.show);

/*
 * POST
 */
router.post('/', barang_masukController.create);

/*
 * PUT
 */
router.put('/:id', barang_masukController.update);

/*
 * DELETE
 */
router.delete('/:id', barang_masukController.remove);

module.exports = router;
