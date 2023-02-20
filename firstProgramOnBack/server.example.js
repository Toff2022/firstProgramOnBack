const http = require("http")
const fs = require("fs/promises")
const path = require("path")

const basePath = path.join(__dirname, "pages")

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
        const content = await fs.readFile(path.join(basePath, "index.html"))
        // res.setHeader("Content-Type", "text/html")
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.end(content)
    } else if (req.method === "POST") {
        const body = []
        res.writeHead(200, {
            "Content-Type": "text/plain; charset = utf-8"
        })
        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on("end", () => {
            const title = body.toString().split("=")[1].replaceAll("+", " ")
            addNote(title)
            // console.log("end", body.toString().split("=")[1].replaceAll("+", " "));
            res.end(`Title = ${title}`)
        })

    }
})