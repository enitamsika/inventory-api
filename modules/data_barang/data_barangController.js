var Data_barangModel = require('./data_barangModel.js');

/**
 * data_barangController.js
 *
 * @description :: Server-side logic for managing data_barangs.
 */
module.exports = {

    /**
     * data_barangController.list()
     */
    list: function (req, res) {
        Data_barangModel.find(function (err, data_barangs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data_barang.',
                    error: err
                });
            }

            return res.json(data_barangs);
        });
    },

    /**
     * data_barangController.total()
     */
     total: function (req, res) {
        Data_barangModel.aggregate([
            {
                $group: {
                    _id: null,
                    barang_masuk: {
                        $sum : "$barang_masuk"
                    },
                    barang_keluar: {
                        $sum : "$barang_keluar"
                    },
                    stock: {
                        $sum : "$stock"
                    },
                }
            }
        ], function (err, data_barangs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data_barang.',
                    error: err
                });
            }

            return res.json(data_barangs);
        });
    },

    /**
     * data_barangController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Data_barangModel.findOne({_id: id}, function (err, data_barang) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data_barang.',
                    error: err
                });
            }

            if (!data_barang) {
                return res.status(404).json({
                    message: 'No such data_barang'
                });
            }

            return res.json(data_barang);
        });
    },

    /**
     * data_barangController.stock()
     */
     stock: function (req, res) {
        var kode_barang = req.params.kode_barang;

        Data_barangModel.findOne({kode_barang: kode_barang}, function (err, data_barang) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data_barang.',
                    error: err
                });
            }

            if (!data_barang) {
                return res.status(404).json({
                    message: 'No such data_barang'
                });
            }

            return res.json(data_barang);
        });
    },

    /**
     * data_barangController.create()
     */
    create: function (req, res) {
        var data_barang = new Data_barangModel({
			kode_barang : req.body.kode_barang,
			nama_barang : req.body.nama_barang,
			barang_masuk : req.body.barang_masuk,
			barang_keluar : req.body.barang_keluar,
			stock : req.body.stock,
			satuan : req.body.satuan
        });

        data_barang.save(function (err, data_barang) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating data_barang',
                    error: err
                });
            }

            return res.status(201).json(data_barang);
        });
    },

    /**
     * data_barangController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Data_barangModel.findOne({_id: id}, function (err, data_barang) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting data_barang',
                    error: err
                });
            }

            if (!data_barang) {
                return res.status(404).json({
                    message: 'No such data_barang'
                });
            }

            data_barang.kode_barang = req.body.kode_barang ? req.body.kode_barang : data_barang.kode_barang;
			data_barang.nama_barang = req.body.nama_barang ? req.body.nama_barang : data_barang.nama_barang;
			data_barang.barang_masuk = req.body.barang_masuk ? req.body.barang_masuk : data_barang.barang_masuk;
			data_barang.barang_keluar = req.body.barang_keluar ? req.body.barang_keluar : data_barang.barang_keluar;
			data_barang.stock = req.body.stock ? req.body.stock : data_barang.stock;
			data_barang.satuan = req.body.satuan ? req.body.satuan : data_barang.satuan;
			
            data_barang.save(function (err, data_barang) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating data_barang.',
                        error: err
                    });
                }

                return res.json(data_barang);
            });
        });
    },

    /**
     * data_barangController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Data_barangModel.findByIdAndRemove(id, function (err, data_barang) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the data_barang.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
