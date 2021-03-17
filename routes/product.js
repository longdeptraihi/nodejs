import express from 'express';

const router = express.Router();

router.get('/Products', (req, res) => {
    console.log('Product list');
    res.json({
        message: "thanhcong"
    })


});
router.get('/', (req, res) => {
    console.log('home');
    res.json({
        message: "home"
    })
});
module.exports = router;