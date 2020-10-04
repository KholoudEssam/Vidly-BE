const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
// require('./startup/logging')(app);

const { logger } = require('./middleware/error');

app.use(express.json());

app.listen(3000, () => logger.info('Server is running..'));
