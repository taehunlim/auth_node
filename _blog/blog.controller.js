
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const blogService = require('./blog.service');
const validRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helper/role')

router.post('/write', postingSchema, posting)
router.get('/', getPost)

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

    blogService
        .posting({title, content, image})
        .then(posting => {
            res.json(posting)
        })
        .catch(next)
}

function getPost (req, res, next) {

    blogService
        .getPost()
        .then(posts => {
            res.json(posts)
        })
        .catch(next)
}

module.exports = router;
