var express = require('express');
const { verifyToken } = require('../../middlewares')
var router = express.Router();
var data_barangController = require('./data_barangController.js');

/*
 * GET
 */
router.get('/',[verifyToken] , data_barangController.list);

/*
 * GET TOTAL
 */
router.get('/total',[verifyToken] , data_barangController.total);

/*
 * GET
 */
router.get('/:id', data_barangController.show);

/*
 * GET STOCK
 */
router.get('/stock/:kode_barang', data_barangController.stock);

/*
 * POST
 */
router.post('/', data_barangController.create);

/*
 * PUT
 */
router.put('/:id', data_barangController.update);

/*
 * DELETE
 */
router.delete('/:id', data_barangController.remove);

module.exports = router;
