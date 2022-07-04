const data_barangModel = require('../data_barang/data_barangModel.js');
var Barang_keluarModel = require('./barang_keluarModel.js');

/**
 * barang_keluarController.js
 *
 * @description :: Server-side logic for managing barang_keluars.
 */
module.exports = {

    /**
     * barang_keluarController.list()
     */
    list: function (req, res) {
        Barang_keluarModel.find(function (err, barang_keluars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_keluar.',
                    error: err
                });
            }

            res.json(barang_keluars);
        });
    },

    /**
     * barang_keluarController.total()
     */
     total: function (req, res) {
        Barang_keluarModel.aggregate([
            {
                $group : {
                    _id : "$kode_barang",
                    jumlah: {
                        $sum : "$jumlah_barang"
                    }
                }
            }
        ], function (err, barang_keluars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_keluar.',
                    error: err
                });
            }

            res.json(barang_keluars);
        })
    },

    /**
     * barang_keluarController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        Barang_keluarModel.findOne({_id: id}, function (err, barang_keluar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_keluar.',
                    error: err
                });
            }

            if (!barang_keluar) {
                return res.status(404).json({
                    message: 'No such barang_keluar'
                });
            }

            return res.json(barang_keluar);
        });
    },

    /**
     * barang_keluarController.create()
     */
    create: function (req, res) {
        var barang_keluar = new Barang_keluarModel({
			kode_barang : req.body.kode_barang,
			nama_pelanggan : req.body.nama_pelanggan,
			jumlah_barang : req.body.jumlah_barang
        });

        barang_keluar.save(function (err, barang_keluar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating barang_keluar',
                    error: err
                });
            }

            var id = barang_keluar.kode_barang;

            data_barangModel.findOne({kode_barang: id}, function (err, data_barang) {
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

                Barang_keluarModel.aggregate([
                    {
                        $group : {
                            _id : "$kode_barang",
                            total_keluar : {
                                $sum : '$jumlah_barang'
                            } 
                        }
                    }
                ], function(err , bk) {
                   
                    bk.find(data => {
                        if (data._id === barang_keluar.kode_barang) {
                            data_barang.kode_barang = req.body.kode_barang ? req.body.kode_barang : data_barang.kode_barang;
                            data_barang.nama_barang = req.body.nama_barang ? req.body.nama_barang : data_barang.nama_barang;
                            data_barang.barang_masuk = req.body.barang_masuk ? req.body.barang_masuk : data_barang.barang_masuk;
                            data_barang.barang_keluar = req.body.barang_keluar ? req.body.barang_keluar : data.total_keluar;
                            data_barang.stock = data_barang.barang_masuk - data.total_keluar;
                            data_barang.satuan = req.body.satuan ? req.body.satuan : data_barang.satuan;
                            
                            data_barang.save(function (err, data_barang) {
                                if (err) {
                                    return res.status(500).json({
                                        message: 'Error when updating data_barang.',
                                        error: err
                                    });
                                }

                            });
                        }
                    })
                    
                })

                return res.json(barang_keluar);

    
            });
        });
    },

    /**
     * barang_keluarController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        Barang_keluarModel.findOne({_id: id}, function (err, barang_keluar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting barang_keluar',
                    error: err
                });
            }

            if (!barang_keluar) {
                return res.status(404).json({
                    message: 'No such barang_keluar'
                });
            }

            barang_keluar.kode_barang = req.body.kode_barang ? req.body.kode_barang : barang_keluar.kode_barang;
			barang_keluar.nama_pelanggan = req.body.nama_pelanggan ? req.body.nama_pelanggan : barang_keluar.nama_pelanggan;
			barang_keluar.jumlah_barang = req.body.jumlah_barang ? req.body.jumlah_barang : barang_keluar.jumlah_barang;
			
            barang_keluar.save(function (err, barang_keluar) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating barang_keluar.',
                        error: err
                    });
                }

                var id = barang_keluar.kode_barang;

                data_barangModel.findOne({kode_barang: id}, function (err, data_barang) {
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
    
                    Barang_keluarModel.aggregate([
                        {
                            $group : {
                                _id : "$kode_barang",
                                total_keluar : {
                                    $sum : '$jumlah_barang'
                                } 
                            }
                        }
                    ], function(err , bk) {
                       
                        bk.find(data => {
                            if (data._id === barang_keluar.kode_barang) {
                                data_barang.kode_barang = req.body.kode_barang ? req.body.kode_barang : data_barang.kode_barang;
                                data_barang.nama_barang = req.body.nama_barang ? req.body.nama_barang : data_barang.nama_barang;
                                data_barang.barang_masuk = req.body.barang_masuk ? req.body.barang_masuk : data_barang.barang_masuk;
                                data_barang.barang_keluar = req.body.barang_keluar ? req.body.barang_keluar : data.total_keluar;
                                data_barang.stock = data_barang.barang_masuk - data.total_keluar;
                                data_barang.satuan = req.body.satuan ? req.body.satuan : data_barang.satuan;
                                
                                data_barang.save(function (err, data_barang) {
                                    if (err) {
                                        return res.status(500).json({
                                            message: 'Error when updating data_barang.',
                                            error: err
                                        });
                                    }
    
                                });
                            }
                        })
                        
                    })
                });

                return res.json(barang_keluar);
            });
        });
    },

    /**
     * barang_keluarController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        Barang_keluarModel.findByIdAndRemove(id, function (err, barang_keluar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the barang_keluar.',
                    error: err
                });
            }

            var id = barang_keluar.kode_barang;

            data_barangModel.findOne({kode_barang: id}, function (err, data_barang) {
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

                Barang_keluarModel.aggregate([
                    {
                        $group : {
                            _id : "$kode_barang",
                            total_keluar : {
                                $sum : '$jumlah_barang'
                            } 
                        }
                    }
                ], function(err , bk) {
                   
                    bk.find(data => {
                        if (data._id === barang_keluar.kode_barang) {
                            data_barang.kode_barang = req.body.kode_barang ? req.body.kode_barang : data_barang.kode_barang;
                            data_barang.nama_barang = req.body.nama_barang ? req.body.nama_barang : data_barang.nama_barang;
                            data_barang.barang_masuk = req.body.barang_masuk ? req.body.barang_masuk : data_barang.barang_masuk;
                            data_barang.barang_keluar = req.body.barang_keluar ? req.body.barang_keluar : data.total_keluar;
                            data_barang.stock = data_barang.barang_masuk - data.total_keluar;
                            data_barang.satuan = req.body.satuan ? req.body.satuan : data_barang.satuan;
                            
                            data_barang.save(function (err, data_barang) {
                                if (err) {
                                    return res.status(500).json({
                                        message: 'Error when updating data_barang.',
                                        error: err
                                    });
                                }

                            });
                        }
                    })
                    
                })
            });

            return res.status(204).json();
        });
    }
};
