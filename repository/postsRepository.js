const { Car } = require('../models/car');

class CarRepository {
  //   -- Create
  static create({ name, price, size, image }) {
    const fileToUpload = req.file;

    const fileBase64 = fileToUpload.buffer.toString('base64');
    const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, (err, result) => {
      if (err) {
        res.status(400).send(`Gagal mengupload file ke cloudinary: ${err.message}`);

        return;
      }

      const createdCar = Car.create({
        name,
        price,
        size,
        image: result.url,
      });

      return createdCar;
    });
  }

  // -- Read All / Get All
  static getAll() {
    const getCar = Car.findAll({
      attributes: ['name', 'price', 'updatedAt', 'image'],
    });

    return getCar;
  }

  // -- Read by size / Get by size
  static getBySize() {
    const getCarBySize = Car.findAll({
      attributes: ['size'],
    });

    return getCarBySize;
  }

  //   -- Read by id / Get by id
  static getByID({ id }) {
    const getCar = Car.findOne({ where: { id } });

    return getCar;
  }

  // -- Update
  static update({ id, name, price, size, image }) {
    const updatedCar = Car.update(
      {
        name,
        price,
        size,
        image: result.url,
      },
      { where: { id } }
    );

    return updatedCar;
  }

  //   -- Delete
  static delete({ id }) {
    const deletedCar = Car.destroy({ where: { id } });

    return deletedCar;
  }
}

module.exports = CarRepository;
