const { CarRepository } = require('../repository/carsRepository');

class CarsService {
  // -- Service Create
  static create({ name, price, size, image }) {
    try {
      if (!name && !price && !size && !image) {
        return {
          status: false,
          status_code: 400,
          message: 'Please fill in the name, prize, size, and image!',
          data: {
            created_car: null,
          },
        };
      }

      const createdCar = CarRepository.create({
        name,
        price,
        size,
        image,
      });

      return {
        status: true,
        status_code: 201,
        message: 'Car created successfully',
        data: {
          created_car: createdCar,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          created_car: null,
        },
      };
    }
  }

  // -- Service Delete
  static delete({ id }) {
    try {
      const getCar = CarRepository.getById({ id });

      if (getCar) {
        const deletedCar = CarRepository.delete({ id });

        return {
          status: true,
          status_code: 200,
          message: 'Success',
          data: {
            deleted_car: deletedCar,
          },
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: 'User Not Found',
          data: {
            deleted_car: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          deleted_car: null,
        },
      };
    }
  }

  //   -- Service Update
  static update({ id, name, price, size, image }) {
    try {
      const getCar = CarRepository.getById({ id });

      if (getCar.id == id) {
        const updatedCar = CarRepository.update({
          name,
          price,
          size,
          image,
        });

        return {
          status: true,
          status_code: 200,
          message: 'Post updated successfully',
          data: {
            updated_car: updatedCar,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          updated_car: null,
        },
      };
    }
  }

  //   -- Service Read / Select by size
  static getCarBySize({ size }) {
    try {
      const getCarBySize = CarRepository.getCarBySize({ where: { size } });
      return {
        status: true,
        status_code: 200,
        message: 'Success',
        data: {
          cars: getCarBySize,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  //   -- Service Read / Select All
  static getAllCar() {
    try {
      const getAllCar = CarRepository.getCarAll();
      return {
        status: true,
        status_code: 200,
        message: 'Success',
        data: {
          cars: getAllCar,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = CarsService;
