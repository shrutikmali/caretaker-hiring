const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send("Customer").status(200));
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