window.onload = createMovieTable();

/**
 * Populates movie HTML table with movie entries based on database JSON file
 */
function createMovieTable()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var movies = JSON.parse(this.responseText);//parse JSON String 
            
            for (var i = 1; i < movies.length; i++)
            {
                var movieData = new Map(Object.entries(movies[i])); //put each movie json data into map
    
                var id = movies[i].id;//movie ID
                
                var output = '<tr id=\'' + id + '\'>';
                for (var [key,value] of movieData.entries())
                {
                    if (key == 'movie_imdb_link')
                    {
                        output += '<td><a href=\'' + value + '\'>' + value + '</a></td>';
                    }
                    else
                    {
                        output += '<td>' + value + '</td>';//add movie entry to movietable
                    }
                }
                output += '<td class=\'edit_cell\'>' 
                            + '<input id=\'edit_btn\' class=\'movie_btn\' type=\'button\' value=\'Edit\' onclick=\'editMovie(' + JSON.stringify(movies[i]) + ')\' />'
                            + '<input id=\'delete_btn\' class=\'movie_btn\' type=\'button\' value=\'Delete\' onclick=\'deleteMovie(' + id + ')\' />'
                        +'</td>';
                output += '</tr>';
                
                document.getElementById('movie_table').innerHTML += output;
            }
        }
    }
    xhttp.open('GET', 'movie_database.json', true);
    xhttp.send();
}

/**
 * Deletes movie from database - removes movie from database JSON file then regenerates movie table with updated JSON file
 * @param id : id of movie to delete 
 */
function deleteMovie(id)
{
    if (confirm('Are you sure you want to delete this movie?'))
    {
        var json = {id : id};

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function()
        {
            if (this.status == 200 && this.readyState == 4)
            {
                var movieTable = document.getElementById('movie_table');
                var tbody = movieTable.getElementsByTagName('tbody');
                var len = tbody.length;
                for (var i = 1; i < len; i+=1)//clear movie table entries
                {
                    movieTable.removeChild(tbody[1]);
                }
                createMovieTable();//regenerate table movie entries
            }
        }

        xhttp.open('POST', 'Delete', true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send(JSON.stringify(json));
    }
}
/**
 * Generates the form for adding a new movie entry to database
 */
function addMovie()
{
    var keys = ['director_name', 'actor_2_name', 'genres', 'actor_1_name', 'movie_title', 'actor_3_name', 'plot_keywords','movie_imdb_link'];

    var addForm = document.getElementById('add_form')
    var row = addForm.getElementsByTagName('tr')[1];
    row.innerHTML += '<input type=\'hidden\' name=\'id\' />';
    for (var i = 0; i < keys.length; i++)//generate form inputs for adding movies
    {
        row.innerHTML += '<td><textarea name=\'' + keys[i] + '\'></textarea></td>';
    }
    document.getElementById('background').style.filter='blur(5px)';//blur background
    document.getElementById('add_div').style.display='block';//make add movie form visible
}

/**
 * Generates the edit form for editing a movie entry
 * @param movies : the details of movie to be edited in JSON string format
 */
function editMovie(movies)
{
    var movieMap = new Map(Object.entries(movies));//put movie json data into map
    
    var editForm = document.getElementById('edit_form');
    var row = editForm.getElementsByTagName('tr')[1];
    
    //generate input fields for movie editing form
    for (var [key,value] of movieMap.entries())
    {
        if (key == 'id')//make the id unchangeable in the movie edit form
        {
            row.innerHTML += '<td><input type=\'hidden\' name=\'id\' value=\''+value+'\' />'
                            + '<text>' + value + '</text></td>';
        }
        else
            row.innerHTML += '<td><textarea name=\'' + key + '\'>' + value + '</textarea></td>';
    }
    document.getElementById('background').style.filter='blur(5px)';//blur background
    document.getElementById('edit_div').style.display='block';//make editing form visible
}

/**
 * Sends form data to server through AJAX request if data is deemed valid
 * @param formID : the id of the form 
 * @param url : the request header url : 'Edit' for the editing movie form & 'Add' for the add movie entry form
 */
function saveEdit(formID, url)
{
    var form = document.getElementById(formID);

    if (validateForm(new FormData(form)) == false)
    {
        alert('Required field left empty!');//alert client if invalid
        return false;
    }

    var formJSON = convertFormJSON(new FormData(form));

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(formJSON);
    return true;
}

/**
 * Converts form data into JSON string
 * @param formData : the form data
 */
function convertFormJSON(formData)
{
    var jsonData = {};
    formData.forEach((value,key) => 
    {
        jsonData[key] = value;
    });
    var json = JSON.stringify(jsonData);
    return json;
}

/**
 * Determines if form data is valid by checking if certain fields were left empty or not
 * @param formData 
 */
function validateForm(formData)
{
    var result = true;
    formData.forEach((value,key) => 
    {
        if (key=='director_name' || key=='actor_1_name' || key=='movie_title' || key=='Genres' || key=='movie_imdb_link')
        {
            if (value.length == 0)
            {
                result = false;
            }
        }
    })
    return result;
}

/**
 * Cancels the form 
 * @param formID : the form to cancel
 * @param divID : the div containing the form to cancel
 */
function cancelForm(formID, divID)
{
    var form = document.getElementById(formID);
    var row = form.getElementsByTagName('tr')[1];
    row.innerHTML = '';
    document.getElementById('background').style.filter='blur(0px)';
    document.getElementById(divID).style.display='none';
}







