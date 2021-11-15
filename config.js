// config.js
const dotenv = require('dotenv')
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname,'.env.' + process.env.NODE_ENV)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    SECRETKEY: process.env.SECRETKEY,
    KEYONE: process.env.KEYONE,
    KEYTWO: process.env.KEYTWO,
}