exports.authMiddleware = (req, res, next) => {
    const isAdmin = req.body.isAdmin;
    //Contoh ("isAdmin = true")
    if (isAdmin === true) {
        console.log('Middleware: Akses Admin Diberikan');
        next(); // Lanjutkan
    } else {
        // 401 forbidden
        return res.status(401).json({
            success : false,
            message : "Akses Ditolak, Endpoint ini Membutuhkan Hak Admin"
        });
    }
};