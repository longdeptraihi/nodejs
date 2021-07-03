import express from 'express';
import { requireSignin, isAuth, isAdmin} from '../controllers/auth'
import { create, list, categoryById, read, update, remove } from '../controllers/category';
import { userById } from '../controllers/user'
const router = express.Router();



router.param('categoryId', categoryById);
router.post('/category/add/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/categories', list);
router.get('/category/:categoryId', read);
router.put('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;