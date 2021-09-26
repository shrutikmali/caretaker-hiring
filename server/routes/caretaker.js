const express = require('express');
const { signIn, signUp } = require('../controllers/caretaker.js');

const router = express.Router();
router.post('/signin', signIn);
router.post('/signup', signUp);

/*

1. Sign in / Sign up (POST)
2. View profile (GET)
3. Edit profile (PATCH)
4. View pending requests (GET)
5. Accept / Decline request (POST / PATCH)
6. Request cancellation of current job (PATCH)
7. View current jobs (GET)
8. View past jobs (GET)
9. Set availability (PATCH)

*/

module.exports = router;