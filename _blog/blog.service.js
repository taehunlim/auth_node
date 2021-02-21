const blogModel = require('./blog.model');

module.exports = {
    posting,
    getPost,
    getPostDetail,
    comments
}

async function posting ({title, content, image, writer}) {

    const blog = await new blogModel({
        title, content, image, writer
    })

    // blog.image.data = fs.readFileSync('imgPath');
    // blog.image.contentsType = 'image/png';

    blog.datePublished = Date.now();

    await blog.save();

    return {
        blog
    }
}

async function getPost () {
    const blog = await blogModel.find();

    return blog.map(b => b)
}

async function getPostDetail ({postId}) {
    const blog = await blogModel.findById({_id: postId});

    return {
        blog
    }
}

async function comments (postId, reply, user, firstName) {
    const blog = await blogModel.findById(postId)

    const newComment = {
        reply: reply,
        user: user,
        name: firstName
    }

    blog.comments.unshift(newComment)

    console.log(blog.comments.user)

    await blog.save()

    return {
        blog
    }
}
