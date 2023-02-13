const fs = require("fs/promises");
const { parse } = require("path");
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function saveNote(content) {
    fs.writeFile(notesPath, JSON.stringify(content))
}

async function addNote(title) {
    const notes = await getNotes()
    console.log(chalk.yellow("notes Before", JSON.stringify(notes)));
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green("Note was added"));
    console.log("notesAfter", notes);
}

async function printNotes() {
    const notes = await getNotes()
    if (notes.length) {
        console.log(chalk.bgBlue("Here is the list of notes:"));
        notes.forEach(note => {
            console.log(chalk.blue(note.id, note.title));
        });
    } else {
        console.log(chalk.red("List is empty!"));
    }

}
async function readNote(id) {
    const notes = await getNotes()
    const note = notes.find(n => n.id === id)
    if (note) {
        console.log(chalk.yellow("Note is read:"));
        console.log(chalk.green(JSON.stringify(note)))
    } else {
        console.log(chalk.red(`Note with id: "${id}" not found!`));
    }
}

async function deleteNote(id) {
    const notes = await getNotes()
    const filteredNotes = notes.filter(note => note.id !== id)
    if (filteredNotes.length !== notes.length) {
        console.log(chalk.green(`Note with id: "${id}" successfully deleted!`));

        saveNote(filteredNotes)
    } else {
        console.log(chalk.red(`Note with id "${id}" not found!`));
    }
}
module.exports = {
    addNote, printNotes, readNote, deleteNote
}