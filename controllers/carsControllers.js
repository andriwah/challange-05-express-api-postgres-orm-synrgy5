const { CarService } = require('../service/carsService');
const { cloudinary } = require('../utils/cloudinary');

// -- Get All
const getAll = (req, res, next) => {
  const { status, status_code, message, data } = CarService.getAllCar();

  res.status(status_code).json({
    status: status,
    message: message,
    data: data,
  });
};

// -- Get By Size
const getBySize = (req, res, next) => {
  const { size } = req.params;

  const { status, status_code, message, data } = CarService.getCarBySize({
    size,
  });

  res.status(status_code).json({
    status: status,
    message: message,
    data: data,
  });
};

// -- Delete Car
const deleteCar = (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = CarService.delete({
    id,
  });

  res.status(status_code).json({
    status: status,
    message: message,
    data: data,
  });
};

// -- Create Car
const createCar = async (req, res, next) => {
  const { name, price, size } = req.body;

  const { status, status_code, message, data } = CarService.create({
    name,
    price,
    size,
    image,
  });

  res.status(status_code).json({
    status: status,
    message: message,
    data: data,
  });
};

// -- Update Data Car By ID
const updateById = (req, res, next) => {
  const { id } = req.params;
  const { name, prize, size } = req.body;

  const { status, status_code, message, data } = CarService.update({
    id,
    name,
    prize,
    size,
    image,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  getAll,
  getBySize,
  deleteCar,
  createCar,
  updateById,
};
