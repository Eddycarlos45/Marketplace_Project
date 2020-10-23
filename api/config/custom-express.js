const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors')

module.exports = () => {
    const app = express();

    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(bodyParser.json())

    consign()
        .include('controllers')
        .then('services')
        .into(app)

    return app

}