console.log("hello from app.js");
document.addEventListener("click", event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        // console.log("remove id", id);
        remove(id).then(() => {
            event.target.closest("li").remove()
        })
    }

    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id
        console.log("edit id", id);
        const title = event.target.dataset.title
        console.log("edit title", title);

        const newTitle = prompt("Введите новое название : ", title)
        console.log("newTitle", newTitle);
        if (newTitle !== null) {
            update({ id, title: newTitle }).then(() => {
                event.target.closest("li").querySelector("span").innerText = newTitle
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" })
}

async function update(newNote) {
    await fetch(`/${newNote.id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    })
    console.log("req_params", req.params);
    console.log(("req_body", req.body));
}