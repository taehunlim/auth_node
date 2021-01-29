
require('dotenv').config();
require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const accountController = require('accounts/account.controller');
const errorHandler = require('_middleware/error-handler');

// DB Connection
require('_middleware/db');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan('dev'));
}


// Routing
app.use('/account', accountController);

//swagger doc router
app.use('/api-docs', require('_helper/swagger'));

// Global Error Handler
app.use(errorHandler);


const port = process.env.PORT

app.listen(port, () => console.log(`server running on ${port}`))
