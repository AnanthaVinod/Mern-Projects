
const firmId = require('../models/Firm');
const vendor = require('../models/Vendor');
const  multer = require('multer');

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

const addFirm = async(req, res) => {
   try{
    const{firmName, area, category, region, offer} = req.body
    const image = req.file? req.file.filename: undefined;
    const vendor = await vendor.findById(req.vendorId);

     if(!vendor) {
      res.status(404).json({message:"Vendor not found"})
     }
    const firm = new Firm({
      firmName, area, category, region, offer, image, vendor: vendor._Id
    })

    await firm.save();

    return res.status(200).json({message:"firm added successfully", firmId})
   }catch(error) {
   console.log(error)
   res.status(500).json("internal server errror");
   }
}

const deleteFirmById = async(req,res)=> {
  try{
      const firmId = req.params.firmId;
      const deleteProduct = await Firm.findByIdAndDelete(productId);
      if(!deleteProduct) {
          return res.status(404).json({error: "No product found"})
      }
  } catch(error) {
      console.error(error)
      res.status(500).json({error: "Internal server error"});
  }
}

module.exports = {addFirm:[upload.single('image').addFirm],deleteFirmById}