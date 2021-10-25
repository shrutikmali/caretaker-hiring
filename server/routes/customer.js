const { findCaretakers, pendingRequests, sendRequest, signIn, signUp, cancelRequest, currentHires, pastHires, markAsComplete, sendFeedback, customerDetails, updateCustomerDetails } = require('../controllers/customer.js');
const auth = require('../middleware/auth.js')

const express = require('express');

const router = express.Router();
router.post('/signin', signIn);
router.post('/signup', signUp)
router.get('/', (req, res) => res.send("Customer").status(200));
router.get('/find', findCaretakers);
router.use(auth);
router.post('/request', sendRequest);
router.post('/pending', pendingRequests);
router.post('/cancel', cancelRequest);
router.get('/current', currentHires);
router.get('/past', pastHires);
router.post('/complete', markAsComplete);
router.post('/feedback', sendFeedback);
router.get('/details', customerDetails);
router.post('/update', updateCustomerDetails);
/*

1. Find caretakers (GET)
2. Send request (POST / PATCH)
3. Delete sent request (POST / PATCH);
4. Edit profile (PATCH)
5. View pending requests (GET)
6. View current hires (GET)
7. View past hires (GET)
8. Review past hires (POST)
9. View caretaker profile? (GET)
10. Sign in / Sign up (POST)

*/

module.exports = router;
