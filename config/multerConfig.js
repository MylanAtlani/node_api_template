const multer = require('multer');

let storage = multer.memoryStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter=(req, file, cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb(null, false);
    }

}

exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
