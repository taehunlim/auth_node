const blogModel = require('./blog.model');

module.exports = {
    posting,
    getPost,
    getPostDetail
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

    return (
        blog
    )
}
