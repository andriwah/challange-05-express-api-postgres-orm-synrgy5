const express = require('express');
const app = express();
const upload = require('./helpers/uploadCloudinary');
const controllers = require('./handler/carsHandler');

const port = process.env.PORT || 8000;

app.use(express.json());

app.post('/cars', upload.single('image'), controllers.createHandler);
app.get('/cars', controllers.getAllCarsHandler);
app.put('/cars/:id', upload.single('image'), controllers.updateCarsHandler);
app.delete('/cars/:id', controllers.deleteCarshandler);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
