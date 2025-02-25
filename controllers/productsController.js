
const Product = require("../models/products");
const multer = require("multer");
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // destination folder for storing images
    },
    filename: function (req, file, cb) {
      // generating a unique name for the file
      cb(null, date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({storage: storage});

  const addProduct = async(req,res) => {
    try{
        const {productName, price, category, bestseller, description} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm) {
            return res.status(404).json({error: "No firm found"});
        }
       const product = new Product({
        productName,price, category, bestseller, description, image, firm: firm._id
       })

       const savedProduct = await product.save();
       firm.products.push(savedProduct);
       await firm.save()
       res.status(200).json(savedProduct)

    }catch(error){
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
  }

  const getProductByFirm = async(req,res) => {
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error: "No firm found"});
        }
    
       const restaurentName = firm.firmName;
        const products = await Product.find({firm: firmId});

        res.status(200).json({restaurentName, products});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
  }

  const deleteProductById = async(req,res)=> {
    try{
        const productId = req.params.productId;
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if(!deleteProduct) {
            return res.status(404).json({error: "No product found"})
        }
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"});
    }
  }

  module.exports = {addProduct: [upload.single('image'),addProduct], getProductByFirm, deleteProductById}