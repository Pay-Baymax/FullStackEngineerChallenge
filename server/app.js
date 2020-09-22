const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./services/logger');
const auth = require('./middleware/auth');

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set('useCreateIndex', true);

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.authParser);

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/login', require('./routes/login'));
app.use('/users', auth.isLoggedIn, require('./routes/users'));

const listener = app.listen(config.port, () => {
  logger.info(`Listening on port ${listener.address().port}!`);
});
