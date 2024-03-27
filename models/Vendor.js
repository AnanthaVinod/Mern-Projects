
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  Username: {
    type:String,
    required:true
  },
  email:{
    type: String,
    required: true,
    unique: true
  }, 
  
  password: {
    type: String,
    required: true
  },
  firm:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm"
    }
  ]
});

const Vender = mongoose.model('Vender',vendorSchema);