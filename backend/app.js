const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const corsConfig = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.json());
app.use(corsConfig);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
