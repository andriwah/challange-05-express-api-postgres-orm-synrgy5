const { Car } = require('../models/car');

class CarRepository {
  //   -- Create
  static create({ name, price, size, image }) {
    const createdCar = Car.create({
      name,
      price,
      size,
      image,
    });

    return createdCar;
  }

  // -- Read All / Get All
  static getAll() {
    const getCar = Car.findAll({
      attributes: ['name', 'price', 'updatedAt', 'image'],
    });

    return getCar;
  }

  // -- Read by size / Get by size
  static getBySize({ size }) {
    const getCarBySize = Car.findAll({ where: { size } });

    return getCarBySize;
  }

  //   -- Read by id / Get by id
  static getById({ id }) {
    const getCar = Car.findOne({ where: { id } });

    return getCar;
  }

  // -- Update Car
  static update({ id, name, price, size, image }) {
    const updatedCar = Car.update(
      {
        name,
        price,
        size,
        image,
      },
      { where: { id } }
    );

    return updatedCar;
  }

  //   -- Delete Car
  static delete({ id }) {
    const deletedCar = Car.destroy({ where: { id } });

    return deletedCar;
  }
}

module.exports = CarRepository;
