const express = require('express');
const router = express.Router();

const auth =
require('../middleware/auth');

const dashboardcontroller =
require('../controllers/dashboardcontroller');

router.get('/',
auth,
dashboardcontroller.index);

module.exports = router;