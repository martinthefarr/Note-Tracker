const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err){
            console.log(err)
        }
        console.log(data)
        const notes = JSON.parse(data)
        console.log(notes)
        res.json(notes)

    })
})
app.post("/api/notes", (req, res) => {
    console.log(req.body)
    const newnote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }
    console.log(newnote)
    // read db.json
    // parse data
    // add new notes to array of parsed notes
    // rewrite db.json with updated array of notes
})




// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);




