window.onload = createMovieTable();

function createMovieTable()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var movies = JSON.parse(this.responseText);
            var header = '<tr><th>ID</th>'
                            + '<th>Director Name</th>'
                            + '<th>Actor 2</th>'
                            + '<th>Genres</th>'
                            + '<th>Actor 1</th>'
                            + '<th>Movie Title</th>'
                            + '<th>Actor 3</th>'
                            + '<th>Plot Keyword</th>'
                            + '<th>IMDB Link</th>'
                            + '<th>Edit Entry</th>'
            document.getElementById('movie_table').innerHTML += header;
            
            for (var i = 1; i < movies.length; i++)
            {
                var movieData = new Map(Object.entries(movies[i])); 
                
                var id = movies[i].id;
                
                var output = '<tr id=\'' + id + '\'>';
                for (var [key,value] of movieData.entries())
                {
                    output += '<td><div>' + value + '</div></td>';
                }
                output += '<td><input type=\'button\' value=\'Edit\' onclick=\'editMovie(' + JSON.stringify(movies[i]) + ')\' /></td>';
                output += '</tr>';
                
                document.getElementById('movie_table').innerHTML += output;
            }
        }
    }
    xhttp.open('GET', 'movie_database.json', true);
    xhttp.send();
}


function editMovie(movies)
{
    var movieMap = new Map(Object.entries(movies));
    
    var editForm = document.getElementById('edit_form');
    var row = editForm.getElementsByTagName('tr')[1];
    
    for (var [key,value] of movieMap.entries())
    {
        row.innerHTML += '<td><textarea name=\'' + key + '\'>' + value + '</textarea></td>';
    }
    document.getElementById('background').style.filter='blur(5px)';
    document.getElementById('edit_div').style.display='block';
}



function saveEdit(formID)
{
    var form = document.getElementById(formID);
    
    const xhttp = new XMLHttpRequest();

    var formData = new FormData(form);

    var formJSON = convertFormJSON(formData);

    xhttp.open('POST', 'FormData', true);

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(formJSON);

    return true;
}

function convertFormJSON(formData)
{
    var jsonData = {};
    formData.forEach((key,value) => 
    {
        jsonData[key] = value;
    })
    var json = JSON.stringify(jsonData);

    return json;
}

function validateDetails(details)
{

}




