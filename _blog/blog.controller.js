
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const blogService = require('./blog.service');
const validRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helper/role')

router.get('/', getPost)
router.get('/:postId', getPostDetail)

router.post('/write', authorize(Role.Admin), postingSchema, posting)
router.post('/comments/:postId', authorize([Role.Admin, Role.User]), commentsSchema, comments)

router.put('/:postId/:commentId', authorize([Role.Admin, Role.User]), deleteComment)
router.patch('/edit/:postId', authorize(Role.Admin), editPostSchema, editPost)

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
    const {id, handle} = req.user

    blogService
        .posting({title, content, image, user:id, handle})
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

function getPostDetail (req, res, next) {
    blogService
        .getPostDetail(req.params)
        .then(post => {
            res.json(post)
        })
        .catch(next)
}

function commentsSchema (req, res, next) {
    const schema = Joi.object({
        reply: Joi.string().required()
    })
    validRequest(req, next, schema)
}

function comments (req, res, next) {

    blogService
        .comments(
            req.params.postId,
            req.body.reply,
            req.user.id,
            req.user.handle
        )
        .then(post => {
            res.json(post)
        })
        .catch(next)
}


function deleteComment (req, res, next) {

    blogService
        .deleteComment(req.params, req.user)
        .then(comment => {
            res.json(comment)
        })
        .catch(next)
}

function editPostSchema (req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.string(),
    })

    validRequest(req, next, schema)
}

function editPost (req, res, next) {

    const {title, content, image} = req.body
    const {postId} = req.params

    blogService
        .editPost({postId, title, content, image})
        .then(post => {
            res.json(post)
        })
        .catch(next)
}

module.exports = router;
