//packages
const express=require('express');
const requireAuth=require('../middleware/requireAuth');

//imports
const expenseController=require('../controllers/expenseController');

const router=express.Router();

router.use(requireAuth);

//get all data
router.get('/',expenseController.getExpense);

//post some new data
router.post('/',expenseController.postExpense);

//delete a single data
router.delete('/:id',expenseController.deleteExpense);

//update a data
router.patch('/:id',expenseController.patchExpense);

module.exports=router;

