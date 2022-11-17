const { CarRepository } = require('../repository/postsRepository');

class PostsService {
  // -- Service Create
  static create({ name, price, size, image }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: 'Name is required!',
          data: {
            created_car: null,
          },
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: 'Price is required!',
          data: {
            created_car: null,
          },
        };
      }

      if (!size) {
        return {
          status: false,
          status_code: 400,
          message: 'Size must to choose',
          data: {
            created_car: null,
          },
        };
      }

      const createdPost = CarRepository.create({
        name,
        price,
        size,
        image,
      });

      return {
        status: true,
        status_code: 201,
        message: 'Post created successfully',
        data: {
          created_post: createdPost,
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
      const getCar = CarRepository.delete({ id });

      if (!getCar)
        return {
          status: false,
          status_code: 404,
          message: 'User Not Found',
          data: {
            deleted_user: null,
          },
        };

      const deletedUser = CarRepository.delete({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: 'Success',
        data: {
          deleted_user: deletedUser,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          deleted_user: null,
        },
      };
    }
  }

  //   -- Service Update
  static update({ id, name, price, size, image }) {
    try {
      const getCar = CarRepository.getByID({ id });

      if (getCar.id == id) {
        const updatedPost = CarRepository.update({
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
            updated_post: updatedPost,
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: 'Resource Unauthorized',
          data: {
            updated_post: null,
          },
        };
      }
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

  //   -- Service Read / Select by size
  static getCarBySize({ size }) {
    try {
      const getCarBySize = CarRepository.getCarBySize({
        size,
      });
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

module.exports = PostsService;
