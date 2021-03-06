/**
 * For converting CSV to JSON
 */

var fs = require('fs');

/**
 * Reads CSV file and converts data into JSON file
 * @param csvFile : name of CSV file
 * @param jsonFile : name of JSON file to create 
 */
function writeJSON(csvFile, jsonFile)
{
    var csvData = fs.readFileSync(csvFile, 'utf8');//read CSV file
    var jsonData = createJSON(csvData);//obtain JSON data from CSV file
    fs.writeFileSync(jsonFile, jsonData);//create JSON file containing JSON data 
}

/**
 * Converts CSV data into JSON data 
 * @param csvFile : the CSV file data 
 */
function createJSON(csvFile)
{
    var lines = csvFile.split('\n');//split csv into lines 

    var json = [];//array to contain each movie in JSON format

    var headers = ['id']
    Array.prototype.push.apply(headers, lines[0].split(','));//split the header into its elements

    for (var i = 0; i < lines.length; i++)
    {
        var movie = {};//Initialize JSON object
        var line = [i];//create an ID

        Array.prototype.push.apply(line, lines[i].replace("\'", '&#39;').split(','));//append movie details to ID 

        for (var j = 0; j < headers.length; j++)//setup key,value pairs in JSON
        {
            movie[headers[j]] = line[j];
        }
        json.push(movie);
    }
    return JSON.stringify(json);
}

writeJSON('MovieDB/movie_metadata_subset.csv', 'MovieDB/movie_database.json');
