var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'unikom', 
    api_key: '274839742533963', 
    api_secret: '5V_d6UgwQdmYbnGwAMbFLIIWFG8' 
  });

  module.exports = cloudinary;