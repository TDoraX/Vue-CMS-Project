const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, 'MYSECRET', (err, decoded) => {
            if (decoded !== undefined) {
                next();
            } else {
                res.sendStatus(403);
            }
        });
    } else {
        res.sendStatus(403);
    }
}

router.post('/', dataCtrl.create);
router.put('/:id', dataCtrl.update);
router.delete('/:id', dataCtrl.remove);
router.post('/list', verifyToken, dataCtrl.list);
router.get('/:id', dataCtrl.get);
router.post('/removes', dataCtrl.removes);
router.post('/login', dataCtrl.login);

module.exports = router;