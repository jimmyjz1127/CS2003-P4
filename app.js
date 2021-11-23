const express = require('express');
const app = express();



app.get('/', (req,res) => res.sendFile(__dirname + '/Main.html'));
app.get('/MainClient.js', (req,res) => res.sendFile(__dirname + '/MainClient.js'));
app.get('/style.css', (req,res) => res.sendFile(__dirname +'/CSS/style.css'));
app.get('/movie_database.json', (req,res) => res.sendFile(__dirname + '/MovieDB/movie_database.json'));

app.use(express.json());
app.post('/FormData', (req,res) => {
    console.log(req.body);
})


//Start Server 
var port = 22054;
app.listen(port, () => console.log('Server Running on Port ' + port));