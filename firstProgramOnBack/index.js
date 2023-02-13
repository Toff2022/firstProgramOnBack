const yargs = require("yargs")
const pkg = require("./package.json")
const { addNote, printNotes, readNote, deleteNote } = require("./notes.controller")

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        }
    },
    handler({ title }) {
        addNote(title)
    }
})
yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        printNotes()
    }
})
yargs.command({
    command: "read",
    describe: "Read note by id",
    builder: {
        id: {
            type: "string",
            describe: "Note id",
            demandOption: true,
        }
    },
    async handler({ id }) {
        readNote(id)
    }
})
yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "Note id",
            demandOption: true,
        }
    },
    async handler({ id }) {
        deleteNote(id)
    }
})

yargs.parse()   