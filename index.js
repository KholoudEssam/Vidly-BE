const express = require('express');
const app = express();

const Genres = [
    {id: 1, genre:'Horror'},
    {id: 2, genre:'Romance'},
    {id: 3, genre:'Comedy'},
    {id: 4, genre:'Science Fiction'},
]

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.get('/api/genres', (req, res) => {
    res.send(Genres);
})

app.listen(3000, () => console.log("Server is running..."));