// -- Core Module
const express = require('express');
const app = express();

// -- Upload to Cloud
const upload = require('./helpers/fileUploadCloudinary');

// -- Request and Respons
const cars_controllers = require('./controllers/carsControllers');
app.use(express.json());

app.get('/car', cars_controllers.getAll);
app.post('/car', upload.single('image'), cars_controllers.createCar);
app.get('/car/:size', cars_controllers.getBySize);
app.put('/car/:id', cars_controllers.updateById);
app.delete('/car/:id', cars_controllers.deleteCar);
