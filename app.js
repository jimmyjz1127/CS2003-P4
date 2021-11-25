const express = require('express');
const app = express();


function runServer()
{
    app.get('/', (req,res) => res.sendFile(__dirname + '/Main.html'));
    app.get('/MainClient.js', (req,res) => res.sendFile(__dirname + '/MainClient.js'));
    app.get('/style.css', (req,res) => res.sendFile(__dirname +'/CSS/style.css'));
    app.get('/movie_database.json', (req,res) => res.sendFile(__dirname + '/MovieDB/movie_database.json'));

    app.use(express.json());

    app.post('/Delete', (req,res) => {
        deleteMovie(req.body.id);
        res.send(true);
    })

    app.post('/Edit', (req,res) => 
    {
        editMovie(req.body);
    });

    app.post('/Add', (req,res) => 
    {
        addMovie(req.body);
    })

    //Start Server 
    var port = 22054;
    app.listen(port, () => console.log('Server Running on Port ' + port));
}

function deleteMovie(deleteID)
{
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync('MovieDB/movie_database.json'));
    var json = [];
    var id = 0;
    jsonFile.forEach((line) =>
    {
        if (line.id !== deleteID)
        {
            line.id = id;
            json.push(line);
            id++;
        }
    });
    fs.writeFileSync('MovieDB/movie_database.json', JSON.stringify(json));
}

function editMovie(data)
{
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync('MovieDB/movie_database.json'));
    var json = [];
    jsonFile.forEach((line) => 
    {
        if (line.id == data.id)
        {
            json.push(data);
        }
        else
        {
            json.push(line);
        }
    });
    
    fs.writeFileSync('MovieDB/movie_database.json', JSON.stringify(json));
}

function addMovie(data)
{
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync('MovieDB/movie_database.json'));
    var json = []; 
    var id = 0;
    jsonFile.forEach((line) => 
    {
        json.push(line);
        id++;
    }) 
    data.id = id;
    json.push(data);
    fs.writeFileSync('MovieDB/movie_database.json', JSON.stringify(json));
    
}

runServer();

