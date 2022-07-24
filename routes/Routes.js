const router = require('express').Router();
const { signup, login, verify } = require('../controller/userController');
const { addNotes, showNotes, deleteNote } = require('../controller/notesController')
const verifyUser = require('../middleware/verifyUser')

//User Sign Up Route
router.post('/signup', signup);

//User Login Route
router.post('/login', login);

//User Dashboard Or Add Notes Route
router.post('/addnotes', verifyUser, addNotes);
router.get('/addnotes', verifyUser, showNotes);

//Notes Delete Route
router.delete('/deletenote/:id', verifyUser, deleteNote);

//Verify Route
router.get('/verify', verifyUser, verify)


module.exports = router;