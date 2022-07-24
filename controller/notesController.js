const Notes = require('../model/notesModel')
const User = require('../model/userModel')

//User Dashboard Or Add Notes Route
const addNotes = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        if (user) {
            const { title, description, date } = req.body;
            const notes = await Notes.create({
                user_id: req.user.id, title, description, date
            })
            if (notes) {
                res.status(200).json({ msg: "Note Added Successfully", status: 201 })
            } else {
                res.status(400).json({ msg: "Failed To Add Notes", status: 400 })
            }
        } else {
            res.status(400).json({ msg: "User Not Found", status: 400 })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed To Add Notes", status: 400 })
    }
}

//Show Notes
const showNotes = async (req, res) => {
    const notes = await Notes.find({ user_id: req.user.id }).sort({ createdAt: -1 })
    if (notes) {
        res.status(200).json(notes)
    } else {
        res.status(400).json({ msg: "No Data Found", status: 400 })
    }
}

//Delete Notes
const deleteNote = async (req, res) => {
    try {
        const id = req.params.id
        const notes = await Notes.findByIdAndDelete(id)
        if (notes) {
            res.status(200).json({ msg: "Deleted Successfully", status: 200 })
        } else {
            res.status(400).json({ msg: "Not Found", status: 200 })
        }
    } catch (error) {
        res.status(400).json({ msg: "Not Found", status: 400 })
    }
}

module.exports = { addNotes, showNotes, deleteNote }