const Order = require('../models/orders');
const users = require('../models/users');
const Product = require('../models/product');
// const { json } = require('express');

// Membuat Pesanan/ Create Order
exports.create = async(req, res) => {
    try {
        const {user, orderItems} = req.body;

        if (!user || !orderItems || orderItems.length === 0) {
            return res.status(400).json({
                status : false,
                Message : "Data  Pesanan Tidak Lengkap"
            });
        }

        //Hitung total Amount Dari orderItems
        const totalAmound = orderItems.reduce((total, item) => {
            return total + (item.priceOrder * item.quantity);
        }, 0);

        const newOrder = new Order({
            user, orderItems, totalAmound
        });

        await newOrder.save();
        res.status(201).json({
            status : true,
            Message : "Pesanan Berhasil Dibuat",
            data : newOrder
        });
    } catch (err) {
        console.error(err);
         console.error('❌ ERROR SAAT CREATE ORDER:', err);
        res.status(500).json({
            status : false,
            Message :  "Terjadi Kesalahan Saat Membuat pesanan"
        });
    }
};

//  Melihat Detail Order/ Get All Orders
exports.all = async (req, res) => {
    try {
        // Hanya Tampilkan field Tertentu Dari User
        const Order = await Order.find().populate('user', 'name email').sort({orderDate: -1 });

        res.status(200).json({
            status : true,
            Message : "Data Semua Pesanan",
            data : Order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status : false,
            Message : "Gagal Mengambil Data Pesanan"
        });
    }
};

//GET Detail Orders/ Mengambil detail Order
exports.detailOrder = async(req, res) => {
    try {
        const {id} = req.params;
        const Orders = await Orders.findById(id).populate('user', 'name email').populate('orderItems.product', 'name  price');

        if (!order) {
            return res.status(404).json({
                status : false,
                Message : "Pesanan Tidak Ditemukan"
            });
        }
        res.status(200).json({
            status : true,
            message : "Detail pesanan",
            data : order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status : false,
            message: "Terjadi kesalahan"
        });
    }
};

//Update Order Status/Update Pesanan
exports.update = async(req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const allowedStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                status : false,
                message : "Status Pesanan Tidak Valid"
            });

            const order = await Orders.findByIdAndUpdate(
                id, {status}, {new: true}
            );

            if (!order) {
                return res.status(404).json({
                    status : false,
                    message : "Pesanan Tidak Ditemukan"
                });
            }

            res.status(200).json({
                status : true,
                message: "Status pesanan Diperbaharui"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status : false,
            message : "Gagal Memuat Status Pesanan"
        });
    }
};




