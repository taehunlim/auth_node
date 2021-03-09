const blogModel = require('./blog.model');

module.exports = {
    posting,
    getPost,
    getPostDetail,
    comments,
    reply,
    deleteComment,
    editPost,
    editComment,
    editReply
}

async function posting ({title, content, image, user, handle}) {

    const blog = await new blogModel({
        title, content, image, user, handle
    })

    // blog.image.data = fs.readFileSync('imgPath');
    // blog.image.contentsType = 'image/png';

    blog.datePublished = Date.now();

    await blog.save();

    return (
        blog
    )
}

async function getPost () {
    const blog = await blogModel.find();

    return blog.map(b => b)
}

async function getPostDetail ({postId}) {
    const blog = await blogModel.findById({_id: postId});

    return (
        blog
    )
}

async function comments (postId, comment, user, handle) {
    const blog = await blogModel.findById(postId)

    const newComment = {
        comment,
        user,
        handle
    }

    blog.comments.push(newComment)

    await blog.save()

    return (
        blog
    )
}

// async function getTheComment ({commentId}) {
//
//     const blog = await blogModel.findOne({comments: {$elemMatch: {_id: commentId}}})
//
//     if(!blog) throw "The comment does not exists";
//
//     return (
//         blog.comments.filter(cm => cm._id.toString() === commentId )
//     );
// }

async function deleteComment ({commentId}, user) {

    const commentUser = await blogModel.find()

    const blog = await blogModel.update(
        {
            comments: {
                $elemMatch: user.role === "Admin" ? {
                    _id: commentId,
                } : {
                    _id: commentId,
                    user: user.id
                }
            }
        },
        {
            $pull: user.role === "Admin" ? {
                comments: {
                    _id: commentId
                }
            } : {
                comments: {
                    _id: commentId,
                    user: user.id
                }
            }
        }
    );

    const filtering = commentUser.map(post =>
        post.comments.filter(comment =>
            (comment.user.toString() === user.id || user.role === 'Admin') &&
            comment._id.toString() === commentId)
            .find(comment =>
                (comment._id.toString() === commentId))
    ).filter(o => o).length === 0


    if(filtering)
        throw "This comment does not exist or is not your comment."

    else
        return blog

}

async function editPost ({title, content, image}) {
    const blog = await blogModel.update(
        {
            title,
            content,
            image
        }
    )

    return (
        blog
    )
}

async function editComment (postId, commentId, comment, user) {

    const commentUser = await blogModel.find()

    const blog = await blogModel.update(
        {
            comments: {
                $elemMatch: {
                    _id: commentId,
                    user: user
                }
            }
        },
        {
            "comments.$.comment": comment
        }
    )

    const filtering = commentUser.map(post =>
        post.comments.filter(comment =>
            comment.user.toString() === user &&
            comment._id.toString() === commentId)
            .find(comment =>
                (comment._id.toString() === commentId))
    ).filter(o => o).length === 0


    if(filtering)
        throw "This comment does not exist or is not your comment."

    else
        return (
            blog
        )
}

async function reply (postId, commentId, reply, user, handle) {

    const newComment = {
        reply,
        user,
        handle
    }

    const blog = await blogModel.findOne(
        {
            _id: postId,
            comments: {
                $elemMatch: {
                    _id: commentId
                }
            }
        },
        {
            comments: {
                $elemMatch: {
                    _id: commentId
                }
            }
        }
    )


    blog.comments.map(c => c.replies.push(newComment))

    await blog.save()

    return (
        blog
    )
}

async function editReply (postId, commentId, replyId, reply, user) {

    const blog = await blogModel.update(
        {
            comments: {
                $elemMatch: {
                    _id: commentId,
                    replies: {
                        $elemMatch: {
                            _id: replyId,
                            user: user
                        }
                    }
                }
            }
        },
        {
            "comments.$[].replies.$.reply": reply
        }
    );

    return (
        blog
    )
}
