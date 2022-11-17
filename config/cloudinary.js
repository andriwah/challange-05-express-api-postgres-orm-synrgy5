const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfzpmikql',
  api_key: '695624769724495',
  api_secret: 'XM9I8XSzoUzAhfEZWTXHJ5pbuMw',
  secure: true,
});

module.exports = cloudinary;
