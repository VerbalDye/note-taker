const cuid = require('cuid');
const fs = require('fs');
const path = require('path');
let { notes } = require('../../db/db.json');
const router = require('express').Router();

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
    return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function deleteNote(id, notesArray) {
    notesArray = notesArray.filter(note => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notesArray;
}

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = cuid();
    if (!validateNote(req.body)) {
        res.status(400).send('The not is not formatted correctly.');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    notes = deleteNote(req.params.id, notes);
    res.json(notes);
});

module.exports = router;