const express = require("express");
const Product = require("../models/product")
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { createProduct } = require("../controller/product");
const multer  = require('multer');
// const upload = multer({ dest: 'src/uploads' })
const router = express.Router();
const shortid  = require('shortid')
const path = require('path');

console.log(path.dirname(__dirname))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })
   
 const upload = multer({ storage: storage })


router.post('/product/create',upload.array('productPictures'), requireSignIn,adminMiddleware, createProduct)
// router.get('/category/getCategory', getCategories)

module.exports = router