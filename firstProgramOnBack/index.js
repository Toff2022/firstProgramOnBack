const yargs = require("yargs")
const express = require("express")
const path = require("path")
const chalk = require("chalk")
const pkg = require("./package.json")
const { addNote, printNotes, readNote, deleteNote, getNotes, updateNote, editNote } = require("./notes.controller")

const port = 3000
const app = express()

app.set("view engine", "ejs")
app.set("views", "pages")
app.use(express.static(path.resolve(__dirname, "public"))) //подключение скриптов из папки
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get("/", async (req, res) => {
    // res.sendFile(path.join(basePath, "index.html"))
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})
app.post("/", async (req, res) => {
    await addNote(req.body.title)
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true
    })
    // res.sendFile(path.join(basePath, "index.html"))
})

app.delete("/:id", async (req, res) => {
    // console.log("id", req.params.id);
    await deleteNote(req.params.id)
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port: ${port}`));
})

app.put("/:id", async (req, res) => {
    await updateNote({ id: req.params.id, title: req.body.title })
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false
    })
})

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
yargs.command({
    command: "edit",
    describe: "Edit note by id",
    builder: {
        id: {
            type: "string",
            describe: "Note id",
            demandOption: true,
        },
        newTitle: {
            type: "string",
            describe: "Note title",
            demandOption: true,
        }
    },
    async handler({ id, newTitle }) {
        editNote(id, newTitle)
    }
})

yargs.parse()   