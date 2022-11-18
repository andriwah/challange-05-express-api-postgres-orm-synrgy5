const express = require('express');
const app = express();
const upload = require('./helpers/uploadCloudinary');
const controllers = require('./handler/carsHandler');
const middleware = require('./middleware/middleware');

const port = process.env.PORT || 8000;

app.use(express.json());

app.post('/cars', upload.single('image'), middleware.isAdmin, controllers.createHandler);
app.get('/cars', controllers.findCarHandler);
app.get('/cars/:id', controllers.getAllCarsHandler);
app.put('/cars/:id', upload.single('image'), controllers.updateCarsHandler);
app.delete('/cars/:id', controllers.deleteCarshandler);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
