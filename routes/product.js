import express from 'express';
import { update,  list, create , productById, read, remove, photo} from '../controllers/product'
const router = express.Router();

import { userById } from '../controllers/user';
import { requireSignin, isAuth, isAdmin } from '../controllers/auth'

router.post('/product/add/:userId', isAdmin, requireSignin, isAuth, create); //phuong thuc tao o controllers


//detail


router.get('/products', list);
router.put('/product/:productId/:userId', isAdmin, requireSignin, isAuth, update);
router.get('/products/:productId', read);
router.delete('/products/:productId/:userId', isAdmin, requireSignin, isAuth, remove);
router.get('/products/photo/:productId', photo);


router.param('productId', productById );
router.param('userId', userById);


module.exports = router;