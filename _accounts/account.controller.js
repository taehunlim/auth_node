
const express = require('express');
const router = express.Router();
const Joi = require('joi');


const accountService = require('./account.service');
const validRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helper/role')

router.post('/register', registerSchema, register)
router.post('/verify-email', verifyEmailSchema, verifyEmail)
router.post('/authenticate', authenticateSchema, authenticate)
router.post('/forgot-password', forgotPasswordSchema, forgotPassword)
router.put('/reset-password', resetPasswordSchema, resetPassword)

//Admin
router.get('/', authorize(Role.Admin), getAllUser)
router.get('/:userId', authorize(Role.Admin), getUserById)


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

function authenticateSchema (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    validRequest(req, next, schema)
}

function authenticate (req, res, next) {

    const {email, password} = req.body
    const ipAddress = req.ip

    accountService
        .authenticate({email, password, ipAddress})
        .then(account => {
            res.json(account)
        })
        .catch(next)
}

function forgotPasswordSchema (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })

    validRequest(req, next, schema)
}

function forgotPassword (req, res, next) {

    accountService
        .forgotPassword(req.body, req.get('origin'))
        .then(() => {
            res.json("Please check your email for password reset")
        })
        .catch(next)
}

function resetPasswordSchema (req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

    validRequest(req, next, schema)
}

function resetPassword (req, res, next) {
    accountService
        .resetPassword(req.body)
        .then(() => {
            res.json("successful change password, you can now log in")
        })
        .catch(next)
}

function getAllUser (req, res, next) {
    accountService
        .getAllUser()
        .then(accounts => {
            res.json(accounts)
        })
        .catch(next)
}

function getUserById (req, res, next) {
    accountService
        .getUserById(req.params)
        .then(detail => [
            res.json(detail)
        ])
        .catch(next)
}
