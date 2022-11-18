const { Cars } = require('../models');
const cloudinary = require('../utils/cloudinary');

function createHandler(req, res) {
  const { name, price, size } = req.body;

  if (!name || !price || !size) {
    res.status(400).json({
      status: 'BAD_REQUEST',
      message: 'name, price, size and image should not be empty',
      data: null,
    });
  }

  const fileToUpload = req.file;
  const filebase64 = fileToUpload.buffer.toString('base64');
  const file = `data:${fileToUpload.mimetype};base64,${filebase64}`;

  cloudinary.uploader.upload(file, (err, result) => {
    if (err) {
      res.status(400).send(`Failed to upload: ${err.message}`);
      return;
    }

    Cars.create({
      name,
      price,
      size,
      image: result.url,
    })
      .then((car) => {
        res.status(200).json({ status: 'OK', message: 'success create', data: car });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'INTERNAL_SERVER_ERROR',
          message: err.message,
          data: null,
        });
      });
  });
}

function getAllCarsHandler(req, res) {
  Cars.findAll({
    attributes: ['id', 'name', 'price', 'size', 'image', 'updatedAt'],
  }).then((cars) => {
    res.json({
      status: 'OK',
      message: 'success retriving data',
      data: cars,
    });
  });
}

function updateCarsHandler(req, res) {
  const { name, price, size } = req.body;
  const fileToUpload = req.file;
  // validasi
  if (!name || !price || !size || !fileToUpload) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      message: 'name, price, size and image should not be empty',
      data: null,
    });

    return;
  }

  // Upload file to cloudinary

  const fileBase64 = fileToUpload.buffer.toString('base64');
  const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, (err, result) => {
    console.log(result);
    if (err) {
      res.status(400).send(`Failed to upload: ${err.message}`);

      return;
    }

    Cars.update(
      {
        name,
        price,
        size,
        image: result.url,
      },
      {
        where: { id: req.params.id },
      }
    )
      .then((car) => {
        res.status(201).json({ status: 'OK', message: 'Success create', data: car });
      })
      .catch((err) => {
        res.status(500).json({
          status: 'INTERNAL_SERVER_ERROR',
          message: err.message,
          data: null,
        });
      });
  });
  return;
}

function deleteCarshandler(req, res) {
  Cars.destroy({
    where: { id: req.params.id },
  }).then((car) => {
    console.log(car);
    if (car !== 0) {
      res.status(200).json({
        status: 'OK',
        message: 'Deleted',
        data: car,
      });
    } else {
      res.status(404).json({
        status: 'NOT_FOUND',
        message: 'Data Not Found',
        data: null,
      });
    }
  });

  return;
}

module.exports = {
  createHandler,
  getAllCarsHandler,
  updateCarsHandler,
  deleteCarshandler,
};
