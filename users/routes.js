const router = require('express').Router();

const User = require('./model');

router.use((req, res, next) => {
    res.status(200);
    res.setHeader('Content-type', 'application/json');
    next();
});

router.route('/')
.get((req, res) => {
    User.find({}, (error, users) => {
        res.end(JSON.stringify(users));
    });
})
.post((req, res) => {
    User.create(req.body, (err, user) => {
        if (err) res.status(400).end(err.message);
        res.status(201).end(JSON.stringify(user));
    });
})
.delete((req, res) => {
    res.status(405).end();
})
.patch((req, res) => {
    res.status(405).end();
})
.put((req, res) => {
    res.status(405).end();
});

router.route('/:userId')
.get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) res.status(400).end(err.message);
        res.end(JSON.stringify(user));
    })
})
.post((req, res) => {
    res.status(405).end();
})
.delete((req, res) => {
    User.findByIdAndRemove(req.params.userId, (err, user) => {
        if (err) res.status(400).end(err.message);
        res.end();
    })
})
.patch(async (req, res) => {
    let user = await User.findById(req.params.userId);
    user = Object.assign(user, req.body);
    User.findByIdAndUpdate(req.params.userId, update = user , options = { new: true }, (err, user) => {
        if (err) res.status(400).end(err.message);
        res.end(JSON.stringify(user));
    });
})
.put((req, res) => {
    User.findByIdAndUpdate(req.params.userId, update = req.body , options = { new: true }, (err, user) => {
        if (err) res.status(400).end(err.message);
        res.end(JSON.stringify(user));
    });
});

module.exports = router;