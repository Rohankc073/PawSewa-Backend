const express = require('express');
const { 
    postData, 
    getData, 
    getByID, 
    updateByID, 
    deleteData 
} = require('../controller/userController');

// const { authentication, authorizeRoles } = require('../middleware/roleValidation');

const router = express.Router();


router.get('/:id', getByID);

// Update a patient by ID (accessible by Admin and Patient)
router.put('/update/:id', updateByID);



router.post('/add', postData); // Add a new patient

module.exports = router;
