const movie = {
    constructor(title,year,imdbID,type, poster){
        this.title = title;
        this.year = year;
        this.imdbID = imdbID;
        this.type = type;
        this.poster = poster;

    },
    Validate(){
        if (this.title == '' || this.title == NULL || this.title){
            return false;
        }
        if (this.year =='' || this.year == NULL || this.year){
            return false;
        }
        if (this.imdbID == '' || this.imdbID == NULL || this.imdbID){
            return false;
        }
        if (this.type == '' || this.type == NULL || this.type){
            return false;
        }
        if (this.poster =='' || this.poster == NULL || this.poster){
            return false;
        }else{
            return true;
        }
    },
    test(){
        function testMovies (){

            let newmovie = (title,year,imdbID, type, poster)
        }
    }

},




function SearchAPI(query){
    const baseurl = 'http://www.omdbapi.com/';
    const apikey = '4fb6998';

    const completeURL = baseURL + `apikey=` + Apikey + `&s=` + query;

    fetch (completeURL)
        .then(response = response, json())
        .then(response) = {
            const Arrmovie = response.seach;
        };
    
    
}   
function getmovies();

let i;

for(i=0; i<Arrmovie.length; i++){
    const newmovie = New movie (Arrmovie[i].title, Arrmovie[i].year, Arrmovie[i].imdbID, Arrmovie[i].type, Arrmovie[i].poster); 
    const newmoviearray = [];
    if (film.validate){
        newmoviearray.push(films);
        if (film.validate()){
            adisplaymovies.push(film);
        }
    }
}

adisplaymovies.array.forEach(element => {
    const movie = document.createElement('div');
    const card = document.createElement('div');
    const img = document.createElement('img'); 

    
});

/* creare classe con films 
verificare che parametri siano pieni
fare la fetch con i web apis
prendere i films, metterli in un nuovo array.
stampare array a display.
*/




