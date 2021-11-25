const express = require('express');
const app = express();

/**
 * Starts server and handles all the AJAX GET and POST requests 
 */
function runServer()
{
    //GET main HTML page 
    app.get('/', (req,res) => res.sendFile(__dirname + '/Main.html'));
    //GET main HTML page script
    app.get('/MainClient.js', (req,res) => res.sendFile(__dirname + '/MainClient.js'));
    //GET main HTML page CSS
    app.get('/style.css', (req,res) => res.sendFile(__dirname +'/CSS/style.css'));
    //GET the movie database JSON file
    app.get('/movie_database.json', (req,res) => res.sendFile(__dirname + '/MovieDB/movie_database.json'));

    app.use(express.json());

    //Delete movie entry
    app.post('/Delete', (req,res) => 
    {
        deleteMovie(req.body.id);
        res.send(true);//confirm to client that request was received 
    });

    //Edit movie entry
    app.post('/Edit', (req,res) => 
    {
        editMovie(req.body);
    });

    //Add movie entry
    app.post('/Add', (req,res) => 
    {
        addMovie(req.body);
    });

    //Start Server 
    var port = 22054;
    app.listen(port, () => console.log('Server Running on Port ' + port));
}

/**
 * Deletes movie from database by removing entry from JSON file
 * @param deleteID : id of movie to delete
 */
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

/**
 * Edit movie entry by replacing entry in database JSON file with new entry
 * @param data : the new edited movie entry in JSON String format 
 */
function editMovie(data)
{
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync('MovieDB/movie_database.json'));
    var json = [];
    jsonFile.forEach((line) => 
    {
        if (line.id == data.id)
        {
            json.push(data);//push edited entry 
        }
        else
        {
            json.push(line);
        }
    });
    
    fs.writeFileSync('MovieDB/movie_database.json', JSON.stringify(json));
}

/**
 * Adds movie entry to database by appending entry to the end of database JSON file
 * @param data : new movie entry in JSON String format
 */
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

//start running server
runServer();

