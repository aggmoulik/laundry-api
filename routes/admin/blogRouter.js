var express = require('express');
var router = express.Router();
var blog = require('../../models/admin/blogModel');


router.get('/', async (req, res, next) => {
    let blogModel = await blog.find();
    return res.status(200).json({ blogModel, message: true });
});

router.post('/', (req, res, next) => {
    let { name, content, image } = req.body;

    let blogModel = new blog({
        "name": name,
        "content": content,
        "image": image
    });

    blogModel.save((error) => {
        if (error) return res.status(401).json({
            message: false,
        });
    });

    return res.status(200).json({ blogModel, message: true });
});

router.delete('/', async (req, res, next) => {
    let status  = await blog.findByIdAndDelete(req.body._id);
    res.status(200).json({
        message: true,
        status: status
    })
})

module.exports = router;