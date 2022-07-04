const data_barangModel = require('../data_barang/data_barangModel.js');
var Barang_masukModel = require('./barang_masukModel.js');

/**
 * barang_masukController.js
 *
 * @description :: Server-side logic for managing barang_masuks.
 */
module.exports = {

    /**
     * barang_masukController.list()
     */
    list: function (req, res) {
        Barang_masukModel.find(function (err, barang_masuks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_masuk.',
                    error: err
                });
            }

            return res.json(barang_masuks);
        });
    },

    /**
     * barang_masukController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Barang_masukModel.findOne({_id: id}, function (err, barang_masuk) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_masuk.',
                    error: err
                });
            }

            if (!barang_masuk) {
                return res.status(404).json({
                    message: 'No such barang_masuk'
                });
            }

            return res.json(barang_masuk);
        });
    },

    /**
     * barang_masukController.create()
     */
    create: function (req, res) {
        var barang_masuk = new Barang_masukModel({
			kode_barang : req.body.kode_barang,
			nama_barang : req.body.nama_barang,
			jumlah : req.body.jumlah,
			satuan : req.body.satuan
        });

        barang_masuk.save(function (err, barang_masuk) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating barang_masuk',
                    error: err
                });
            }

            var data_barang = new data_barangModel({
                kode_barang : req.body.kode_barang,
                nama_barang : req.body.nama_barang,
                barang_masuk : req.body.jumlah,
                barang_keluar : 0,
                stock : req.body.jumlah,
                satuan : req.body.satuan
            });
    
            data_barang.save(function (err, data_barang) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating barang_masuk',
                        error: err
                    });
                }
    
                return res.status(201).json(data_barang);
            });

        });

        
    },

    /**
     * barang_masukController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Barang_masukModel.findOne({_id: id}, function (err, barang_masuk) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_masuk',
                    error: err
                });
            }

            if (!barang_masuk) {
                return res.status(404).json({
                    message: 'No such barang_masuk'
                });
            }

            barang_masuk.kode_barang = req.body.kode_barang ? req.body.kode_barang : barang_masuk.kode_barang;
			barang_masuk.nama_barang = req.body.nama_barang ? req.body.nama_barang : barang_masuk.nama_barang;
			barang_masuk.jumlah = req.body.jumlah ? req.body.jumlah : barang_masuk.jumlah;
			barang_masuk.satuan = req.body.satuan ? req.body.satuan : barang_masuk.satuan;
			
            barang_masuk.save(function (err, barang_masuk) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating barang_masuk.',
                        error: err
                    });
                }

                data_barangModel.findOne({kode_barang: barang_masuk.kode_barang}, function (err, data_barang) {
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
                    data_barang.barang_masuk = req.body.jumlah ? req.body.jumlah : data_barang.barang_masuk;
                    data_barang.barang_keluar = req.body.barang_keluar ? req.body.barang_keluar : data_barang.barang_keluar;
                    data_barang.stock = req.body.jumlah ? req.body.jumlah : data_barang.stock;
                    data_barang.satuan = req.body.satuan ? req.body.satuan : data_barang.satuan;
                    
                    data_barang.save(function (err, data_barang) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating data_barang.',
                                error: err
                            });
                        }
        
                    });
                });

                return res.json(barang_masuk);
            });
        });
    },

    /**
     * barang_masukController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Barang_masukModel.findByIdAndRemove(id, function (err, barang_masuk) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the barang_masuk.',
                    error: err
                });
            }
            
            data_barangModel.findOne({kode_barang: barang_masuk.kode_barang}, function (err, data_barang) {
                data_barangModel.findByIdAndRemove(data_barang._id, function (err, db) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when deleting the Data Barang.',
                            error: err
                        });
                    }
                });
            });

            return res.status(204).json();
        });
    }
};
