const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);
// require('./startup/logging')(app);

const { logger } = require('./middleware/error');

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info('Server is running..'));
