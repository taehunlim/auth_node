
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const accountService = require('./account.service');
const validRequest = require('_middleware/validate-request');

router.post('/register', registerSchema, register)
router.post('/verify-email', verifyEmailSchema, verifyEmail)


module.exports = router;

function registerSchema (req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    })

    validRequest(req, next, schema)
}

function register(req, res, next) {
    accountService
        .register(req.body, req.get('origin'))
        .then(() => {
            res.json({
                message: "Successful Register"
            })
        })
        .catch(next);
}

function verifyEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    })

    validRequest(req, next, schema)
}

function verifyEmail(req, res, next) {
    accountService
        .verifyEmail(req.body)
        .then(() => {
            res.json({
                message: "Verification Successful, you can now login"
            })
        })
        .catch(next)
}
