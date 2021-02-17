
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const blogService = require('./blog.service');
const validRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helper/role')

router.post('/', authorize(Role.Admin), postingSchema, posting)

function postingSchema (req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.string(),
    })

    validRequest(req, next, schema)
}

function posting (req, res, next) {

    const {title, content, image} = req.body


    console.log(req.account)

    blogService
        .posting({title, content, image})
        .then(posting => {
            res.json(posting)
        })
        .catch(next)
}

module.exports = router;
