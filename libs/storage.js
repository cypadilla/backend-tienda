const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination:'uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname) )
      }
    // destination: function (req, file, cb) {
    //   cb(null, './storage/imgs')
    // },
    // filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname) )
    // }
  })
  
 const upload = multer({ storage: storage })

 module.exports =upload;