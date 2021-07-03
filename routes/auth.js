import express from 'express'
import { userSignupValidator } from "../validator";
const router = express.Router();

import { signup, signin, signout } from "../controllers/auth"

router.post('/signup',userSignupValidator , signup);
router.post('/signin',signin);
router.get('/signout', signout);
// router.post('/signout', signout);

module.exports = router;