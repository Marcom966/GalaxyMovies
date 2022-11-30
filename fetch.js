


/* constructor con parametri per api*/
//FATTO IN CLASSE
class film {
    constructor(title,year,imdbID,type,poster){
        this.title = title;
        this.year = year;
        this.imdbID = imdbID;
        this.type=type;
        this.poster = poster;
    };
    /*validare parametri*/
    validate(){
    if(this.title==null||this.title==''||!this.title){
        return false;
    };
    if (this.year==null||this.year==''||!this.year){
        return false;
    };  
    if (this.imdbID==null||this.imdbID==''||!this.imdbID){
        return false;
    };    
    if (this.type==null||this.type==''||!this.type){
        return false;
    };    
    if (this.poster==null||this.poster==''||!this.poster){
        return false;
    };                
    };
};


class film2 {
    constructor(title,released,runtime,genre,director,writer,actors,plot,dvd){
        this.title = title;
        this.released = released;
        this.runtime = runtime;
        this.genre = genre;
        this.director = director;
        this.writer = writer;
        this.actors = actors;
        this.plot = plot;
        this.dvd = dvd;
    };
    validate(){
    if(this.title==null||this.title==''||!this.title){
        return false;
    };
    if(this.released==null||this.released==''||!this.released){
        return false;
    };
    if(this.runtime==null||this.runtime==''||!this.runtime){
        return false;
    };
    if(this.genre==null||this.genre==''||!this.genre){
        return false;
    };
    if(this.director==null||this.director==''||!this.director){
        return false;
    };
    if(this.writer==null||this.writer==''||!this.writer){
        return false;
    };
    if(this.actors==null||this.actors==''||!this.actors){
        return false;
    };
    if(this.plot==null||this.plot==''||!this.plot){
        return false;
    };
    if(this.dvd==null||this.dvd==''||!this.dvd){
        return false;
    };
    };
};




//CODICE PER OPENING.HTML (PRENDE TESTO IN INPUT E LO PASSA A FUNZIONE USERINPUTFUNCTION IN INDEX2.HTML)
if($("body").data("title")=="opening"){
    let count = 0;
    //let count2 = 0;
    let buttoninputopening = document.getElementById('submitopening');
    buttoninputopening.addEventListener('click', function(){
        let userinputfirst = document.getElementById('UserInput0').value;
        count++;
        localStorage.setItem('firstitem',userinputfirst);
        localStorage.setItem('seconditem',count);
        document.location.href='index.html';
    });
};


if($("body").data("title")=="main-index"){

    //CODICE INDEX2.HTML


    //SEZIONE DI RICERCA PER NOME


    /*Prendo in input button ricerca index*/
    let buttoninput = document.getElementById('submit');

    /*creo array per movies*/
    const DisplayNewrandmovie = [];
    //let buttontext = document.getElementById('UserInput2').value;

        /* funzione che salva i dati da passare a fetch*/    
        function userinputfunction (a, b){


            //salvo dati in nuova variabile
            const userinput = a;

            //stampo stringa in input
            //console.log(userinput);

            /*DA QUESTO PUNTO IN POI IL CODICE SARA' PRESSOCHE' UGUALE NELLE PROSSIME 2 SEZIONI*/

            /*funzione cerca/salva in array movies*/
            function searchAPI(query){

                //inserisco parametri fetch
                const apiURL = 'https://www.omdbapi.com/?';
                const apiKey = 'ed143ea3';

                //chiamata api url
                const completeURL = `${apiURL}apikey=${apiKey}&s=${query}`;

                //fetch (chiamata vera e propria)
                fetch(completeURL)

                    //risposta e converto risposta in json (classe)
                    .then(res=>res.json())

                    //risposta in json, metto i risultati della ricerca in variabile newrandmovie
                        .then((res) => {
                            const Newrandmovie = res.Search;
                            //console.log(Newrandmovie);

                            //ciclo all'interno di risultati (newrandmovie)(dopo gestione errore)


                                //Gestione errore film non trovato
                                if(Newrandmovie == "undefined"){

                                    //prendo row (in cui sono salvati elementi già creati)
                                    let darimuovere = document.getElementById('row');
                                    //console.log(darimuovere);

                                    //funzione che rimuove elementi da row (sarà presente uguale in altre parti del codice)
                                    function removeEverything(darimuovere){
                                        while (darimuovere.firstChild){
                                            darimuovere.removeChild(darimuovere.firstChild);
                                        };
                                    };
                                    removeEverything(darimuovere);

                                    //creo elemento in row per "scritta" "film non trovato"
                                    //console.log(countnewnumber);
                                    let pererrori = document.getElementById('row');
                                    let nontrovato=document.createElement('div');

                                    //impostazioni div errore
                                    nontrovato.id = "nontrovatodiv";
                                    nontrovato.className="nontrovato";

                                    //scritta effettiva
                                    const content2 = `
                                    <h3 class="search-txt">Film/page not found :/</h3>
                                    `;

                                    //inserisco in div scritta
                                    nontrovato.innerHTML += content2;
                                    pererrori.appendChild(nontrovato);
 
                                    //let removebuttonlistener = document.getElementById('submit');
                                    //removebuttonlistener.removeEventListener('click', openStuff);
                                };

                            //ciclo array film trovati 
                            Newrandmovie.forEach(element => {

                                //genera un nuovo film attraverso parametri definiti in constructor
                                const Newfilm = new film (element.Title,element.Year,element.imdbID,element.type,element.Poster);

                                //faccio push del nuovo film all'interno di array displaynewrandmovie
                                b.push(Newfilm);
        
                            });

                            //count che ci servirà più tardi
                            let count=0;

                            //ciclo all'interno di elementi array film
                            b.forEach(object =>{

                                //variabili che serviranno in parte di ricerca per campo anno
                                let searchbyyearmovie=null;
                                let searchbyyearyear=null;

                                //CREO CARD E INSERISCO DATI

                                //console.log(object.title);
                                //console.log(object.year);
                                //console.log(object.type);

                                //mi riattacco a row
                                let newcard = document.getElementById('row');

                                //posizionamento card
                                let position = document.createElement('div');
                                position.className = "col-sm-4 mb-4";
                                newcard.appendChild(position);
                                //console.log(newcard);

                                //creazione card e decisione altezza
                                let actualcard = document.createElement('div');
                                actualcard.className = 'card h-100';
                                position.appendChild(actualcard);
                                //console.log(actualcard);

                                //inserisco immagine
                                let cardimg = document.createElement('img');
                                cardimg.className = "card-img-top";
                                cardimg.src=`${object.poster}`;
                                //console.log(`${object.poster}`);

                                //sostituisco immagine se non disponibile in array fetch
                                if (`${object.poster}`=="N/A"){
                                    cardimg.src='images/image-not-available.jpg';
                                };
                                cardimg.alt="card image cap";
                                actualcard.appendChild(cardimg);
                                //console.log(cardimg);

                                //creazione card-body
                                let cardbody = document.createElement('div');
                                cardbody.className="card-body";
                                actualcard.appendChild(cardbody);
                                //console.log(cardbody);

                                //inserisco titolo card
                                let movietitle = document.createElement('h3');
                                movietitle.className="card-title";
                                movietitle.id="movieTitle";
                                movietitle.innerHTML=`${object.title}`;
                                cardbody.appendChild(movietitle);
                                //console.log(movietitle);

                                //creo e inserisco spazio per campo year
                                let moredetails = document.createElement('ul');
                                moredetails.className="list-group list-group-flush";
                                moredetails.id="ul";
                                actualcard.appendChild(moredetails);
                                let li1 = document.createElement('li');
                                li1.className="list-group-item";
                                li1.id = "movieYear";

                                //inserisco campo year
                                li1.innerHTML="Year:"+`${object.year}`;

                                //cambio di stile x evidenziare presenza di un add event listener
                                li1.addEventListener('mouseover', changeborder2);
                                function changeborder2(){
                                    li1.style.border = '1px solid blue';
                                };
                                li1.addEventListener('mouseout', rechangeborder2);
                                function rechangeborder2(){
                                    li1.style.border = 'none';
                                };

                                //funzione che esegue ricerca per anno se cliccate su campo year:
                                li1.addEventListener('click',function(){
                                    searchbyyearmovie = document.getElementById("UserInput2").value;
                                    searchbyyearyear = `${object.year}`;
                                    searchByYear(searchbyyearmovie, searchbyyearyear);
                                });
                                moredetails.appendChild(li1);
        
                                //creo button card
                                let buton = document.createElement('button');
                                buton.className="btn btn-primary"
                                buton.dataset.toggle="modal";
                                buton.dataset.target="#Mymodal";
                                buton.id="button1";
                                buton.innerHTML="More Details";
        
                                //addeventlistener x ulteriore fetch più approfondito
                                buton.addEventListener('click', function(){
                                    //modal.style.display = "block";
                                    let movietitle =`${object.title}`;
        
                                    //prendo titolo film
                                    //console.log(movietitle);
        
                                    //nuovo fetch approfondito (codice uguale a primo fetch)
                                    function serachdetailedAPIS(query){
                                        const completeURLDue = `${apiURL}apikey=${apiKey}&t=${query}`;
                                        fetch(completeURLDue)
                                            .then(response => response.json())
                                                .then((response) => {
                                                    let searchbyyearmovie=null;
                                                    let searchbyyearyear=null;
                                                    const movie = response;
                                                    //console.log(movie);
                                                    //console.log(movie.Title);
                                                    //console.log(movie.Released);
        
                                                    //INSERISCO IN CAMPI MODALI RISULTATI

                                                    //titolo
                                                    let p1 = document.getElementById('p0')
                                                    p1.innerHTML="Title:"+`${movie.Title}`;
                                                    let titletosearch = `${movie.Title}`;
                                                    //console.log(titletosearch);

                                                    //effetti per evidenziare presenza addeventlistener(zona cliccabile)
                                                    p1.addEventListener('mouseover', changeborder1);

                                                    //cambio di stile
                                                    function changeborder1(){
                                                        document.getElementById('p0').style.border = '1px solid blue';
                                                    };
                                                    p1.addEventListener('mouseout', rechangeborder1);
                                                    function rechangeborder1(){
                                                        document.getElementById('p0').style.border = 'none';
                                                    };

                                                    //funzione che apre link ricerca youtube su nome film + cambia sfondo campo in bianco in hover e rimuove addeventlistener se cliccato e poi resetta colori
                                                    p1.addEventListener('click', openlink);
                                                    function openlink(){
                                                        document.getElementById('p0').style.backgroundColor = 'white';
                                                        document.getElementById('p0').style.color = 'black';
                                                        window.open(`https://www.youtube.com/results?search_query=${titletosearch}`, '_blank');
                                                        p1.removeEventListener('click', openlink);
                                                        count++;
                                                        /*p1.addEventListener('click', openlink);*/
                                                        if (count>=2){
                                                            image.removeEventListener('click', openlink2);
                                                            count = 0;
                                                            /*image.addEventListener('click', openlink2);*/
                                                        };
                                                        document.getElementById('p0').style.backgroundColor = 'transparent';
                                                        document.getElementById('p0').style.color = 'white';
                                                    };

                                                    //inserisco dati in campo year
                                                    let p2 = document.getElementById('p1');
                                                    p2.innerHTML="Year:"+`${movie.Year}`;

                                                    //funzione che esgue ricerca per anno se cliccate su year:
                                                    p2.addEventListener('click', function(){
                                                        searchbyyearmovie = document.getElementById("UserInput2").value;
                                                        searchbyyearyear = `${object.year}`;
                                                        searchByYear(searchbyyearmovie, searchbyyearyear);
                                                    });

                                                    //cambio di stile
                                                    p2.addEventListener('mouseover', changeborder);
                                                    function changeborder(){
                                                        document.getElementById('p1').style.border = '1px solid blue';
                                                    };
                                                    p2.addEventListener('mouseout', rechangeborder);
                                                    function rechangeborder(){
                                                        document.getElementById('p1').style.border = 'none';
                                                    };

                                                    //inserisco dati in campo rated
                                                    let p3 = document.getElementById('p2');
                                                    p3.innerHTML="Rated:"+`${movie.Rated}`;

                                                    //inserisco dati in campo released
                                                    let p4 = document.getElementById('p3');
                                                    p4.innerHTML="Released:"+`${movie.Released}`;

                                                    //inserisco dati in campo runtime
                                                    let p5 = document.getElementById('p4');
                                                    p5.innerHTML="Runtime:"+`${movie.Runtime}`;

                                                    //inserisco dati in campo plot (trama) 
                                                    let p6 = document.getElementById('p5');
                                                    p6.innerHTML="Plot:"+`${movie.Plot}`;

                                                    //inserisco immagine
                                                    let image = document.getElementById('image');
                                                    image.className ="image-border img-responsive";
                                                    image.src =`${object.poster}`;
                                                    //console.log(`${object.poster}`);

                                                    //sostituisco immagine se non disponibile in array fetch
                                                    if (`${object.poster}`=="N/A"){
                                                        image.src='images/image-not-availabl3.jpg';
                                                    };

                                                    //funzione che apre link spotify + cambio trasparenza in hover, rimuove  seguito addeventlistener e ripristina colore
                                                    image.addEventListener('click', openlink2);
                                                    function openlink2(){
                                                        window.open(`https://open.spotify.com/search/${titletosearch}`, '_blank');                                         
                                                        image.removeEventListener('click', openlink2);
                                                        count++;
                                                        /*image.addEventListener('click', openlink2);*/
                                                        if (count>=2){
                                                            p1.removeEventListener('click', openlink);
                                                            count = 0;
                                                            /*p1.addEventListener('click', openlink);*/
                                                        };
                                                    };
                                                    image.alt="";

                                                });
                                
                                    };
                                    serachdetailedAPIS(movietitle);
                                    //chiamata funzione ricerca(sopra)

                                    //apro modale
                                    const button = document.getElementById('button1');
                                    const modal = document.querySelector(button.dataset.target);
                                    buton.onclick = function(){
                                        modal.style.display ="block";
                                    };
                            
                                });
                                actualcard.appendChild(buton);
                                //console.log(buton);
                                //(sopra) "appendo" bottone (fine card)

                            //faccio ritornare array films
                            return b;
                            });

                    //Gestione errore di connessione
                    }).catch(function(error){
                        //mostro messaggio errore
                        if(error!=undefined){

                            //rimuovo tutti elementi presenti in row
                            let darimuovere = document.getElementById('row');
                            function removeEverything(darimuovere){
                                while (darimuovere.firstChild){
                                    darimuovere.removeChild(darimuovere.firstChild);
                                };
                            };
                            removeEverything(darimuovere);

                            //creo div per errore e aggiungo testo
                            let dacreare = document.getElementById("row");
                            let connection = document.createElement('div');

                                //funzione che inserisce testo in div errore e dona classe a div
                                function Displayerror1(connection){
                                    connection.id="connectionerror";
                                    connection.className="connectionerror";
                                    const content = `
                                    <h3 class="search-txt">Error. Check your connection or try to seach for a different title.</h3>
                                    `;
                                    connection.innerHTML += content;
                                    dacreare.appendChild(connection);
                                };
                            Displayerror1(connection);

                            /*let dacancellare = document.getElementById('row');
                            function removeEverything(darimuovere){
                                while (darimuovere.firstChild){
                                    darimuovere.removeChild(darimuovere.firstChild);
                                };
                            };
                            removeEverything(dacancellare);*/
                        }
                    });
            };
            //chiamata a funzione per ricerca api
            searchAPI(userinput);

            //stampo in console array risultante da funzione ricerca
            //console.log(b);

        return b;   
        //ritorno array movies
        };

    //vado a prendere da pagina opening testo in input e contatore
    let input = localStorage.getItem('firstitem');
    let countinput = localStorage.getItem('seconditem');

    //VERIFICA SE INPUT INSERIMENTO E' IN INDEX O OPENING
    if(countinput==1){
    // se contatore è 1 eseguo ricerca normle
        let buttontextinput = input;
        userinputfunction (buttontextinput, DisplayNewrandmovie);
        //console.log(DisplayNewrandmovie);
    //altrementi    
    };

    //aggiungo addeventlistener in bottone ricerca film
    buttoninput.addEventListener('click', openStuff);

    //funzione che cancella elenti già presenti in row e li sostituisce con nuovi
    function openStuff(){
        countinput++;
        
        //se contatore è maggiore di 2
        if(countinput>=2){
            //console.log("volte successive alla prima-->"+countinput);
    
            //svuoto array
            for(let i=0; i<DisplayNewrandmovie.length; i++){
                DisplayNewrandmovie.splice(i);
            };

            //rimuovo cards
            let removefirst = document.getElementById('row');
            function removeEverything(darimuovere){
                while (darimuovere.firstChild){
                    darimuovere.removeChild(darimuovere.firstChild);
                };
            };
            removeEverything(removefirst);

            //resetto testo in input
            let buttontext = document.getElementById('UserInput2').value;
            //console.log(DisplayNewrandmovie);

            //eseguo nuova ricerca e ricostruisco tutto.
            userinputfunction (buttontext, DisplayNewrandmovie);
        };
    };
    //console.log(DisplayNewrandmovie);


    //DA QUESTO PUNTO IN POI FUNZIONI DI FETCH, ESSENDO UGUALI ALLA PRIMA SARANNO MENO COMMENTATE O COMMENTATE SONO IN PUNTI IN CUI E'CAMBIATO QUALCOSA




    //SEZIONE DEDICATA A RICERCA PER ANNO DA CAMPO YEAR IN CARD/MODALE

    //Funzione che passa parametri a funzione di fetch per anno
    function searchByYear(movie, year){

        //assegnamento variabili per ricerca
        let annotosearchtext = year;
        let movietosearchfor = movie;
        //console.log(movietosearchfor);
        //console.log(annotosearchtext);

        //funzione di fetch per anno
        function searchmoviesbyYear(query,input){
            let apiURL = 'https://www.omdbapi.com/?';
            let apiKey = 'ed143ea3';

            //uguale a url prima fetch con aggiunta campo year (COMMENTI DA RIGA 96 A RIGA 532)
            const completeURLDue = `${apiURL}apikey=${apiKey}&s=${query}&y=${input}`;
            fetch(completeURLDue)
                .then(response => response.json())
                    .then((response) => {
                        //console.log(response);
                        const movie = response.Search;
                        //console.log(movie);

                        //gestione errore film non trovato
                        if(movie == undefined){
                            let darimuovere = document.getElementById('row');
                            //console.log(darimuovere);
                            function removeEverything(darimuovere){
                                while (darimuovere.firstChild){
                                    darimuovere.removeChild(darimuovere.firstChild);
                                };
                            };
                            removeEverything(darimuovere);
                            //console.log(countnewnumber);
                            let pererrori = document.getElementById('row');
                            let nontrovato=document.createElement('div');
                            nontrovato.id = "nontrovatodiv";
                            nontrovato.className ="nontrovato";
                            const content2 = `
                            <h3 class="search-txt">Film/page not found :/</h3>
                            `;
                            nontrovato.innerHTML += content2;
                            pererrori.appendChild(nontrovato); 
                        }
                        const moviestokeep = [];
                        movie.forEach(oggetto=>{
                            const newMovie = new film (oggetto.Title,oggetto.Year,oggetto.imdbID,oggetto.type,oggetto.Poster);
                            moviestokeep.push(newMovie);
                        });
                        //console.log(moviestokeep);

                        //funzione per rimozione card e sostituzione con nuove
                        let removefirst = document.getElementById('row');
                        function removeEverything(darimuovere){
                            while (darimuovere.firstChild){
                                darimuovere.removeChild(darimuovere.firstChild);
                            };
                        };
                        removeEverything(removefirst);

                        let count=0;
                        moviestokeep.forEach(object =>{


                            //posiziono, creo card e inserisco dati
                            //console.log(object.title);
                            //console.log(object.year);
                            //console.log(object.type);
                            let newcard = document.getElementById('row');
                            let position = document.createElement('div');
                            position.className = "col-sm-4 mb-4";
                            newcard.appendChild(position);
                            //console.log(newcard);
                            let actualcard = document.createElement('div');
                            actualcard.className = 'card h-100';
                            position.appendChild(actualcard);
                            //console.log(actualcard);
                            let cardimg = document.createElement('img');
                            cardimg.className = "card-img-top";
                            cardimg.src=`${object.poster}`;

                            //sostituisce immagine se non disponibile in array fetch
                            if (`${object.poster}`=="N/A"){
                                cardimg.src='images/image-not-available.jpg';
                            };
                            cardimg.alt="card image cap";
                            actualcard.appendChild(cardimg);
                            //console.log(cardimg);
                            let cardbody = document.createElement('div');
                            cardbody.className="card-body";
                            actualcard.appendChild(cardbody);
                            //console.log(cardbody);
                            let movietitle = document.createElement('h3');
                            movietitle.className="card-title";
                            movietitle.id="movieTitle";
                            movietitle.innerHTML=`${object.title}`;
                            cardbody.appendChild(movietitle);
                            //console.log(movietitle);
                            let moredetails = document.createElement('ul');
                            moredetails.className="list-group list-group-flush";
                            moredetails.id="ul";
                            actualcard.appendChild(moredetails);
                            let li1 = document.createElement('li');
                            li1.className="list-group-item";
                            li1.id="movieYear";
                            li1.innerHTML="Year:"+`${object.year}`;

                            //bordino blu on hover campo year card
                            li1.addEventListener('mouseover', changeborder2);
                            function changeborder2(){
                                li1.style.border = '1px solid blue';
                            };
                            li1.addEventListener('mouseout', rechangeborder2);
                            function rechangeborder2(){
                                li1.style.border = 'none';
                            };

                            //ricerca per anno se cliccate su year:
                            li1.addEventListener('click', function(){
                                let searchbyyearmovie=null;
                                let searchbyyearyear=null;
                                searchbyyearmovie = `${object.title}`;
                                searchbyyearyear = `${object.year}`;
                                searchByYear(searchbyyearmovie, searchbyyearyear);
                            });
                            moredetails.appendChild(li1);

                            //creo button card
                            let buton = document.createElement('button');
                            buton.className="btn btn-primary"
                            buton.dataset.toggle="modal";
                            buton.dataset.target="#Mymodal";
                            buton.id="button1";
                            buton.innerHTML="More Details";

                            //addeventlistener x ulteriore fetch più approfondito
                            buton.addEventListener('click', function(){
                                let movietitle =`${object.title}`;

                                //prendo titolo film
                                //console.log(movietitle);

                                //nuovo fetch approfondito
                                function serachdetailedAPIS(query){
                                    const completeURLDue = `${apiURL}apikey=${apiKey}&t=${query}`;
                                    fetch(completeURLDue)
                                        .then(response => response.json())
                                            .then((response) => {

                                                const movie = response;
                                                //console.log(movie);
                                                //console.log(movie.Title);
                                                //console.log(movie.Released);

                                                //inserisco in campi modale risultati
                                                let p1 = document.getElementById('p0');
                                                p1.innerHTML="Title:"+`${movie.Title}`;
                                                let titletosearch = `${movie.Title}`;

                                                //bordino blu on hover
                                                p1.addEventListener('mouseover', changeborder1);
                                                function changeborder1(){
                                                    document.getElementById('p0').style.border = '1px solid blue';
                                                };
                                                p1.addEventListener('mouseout', rechangeborder1);
                                                function rechangeborder1(){
                                                    document.getElementById('p0').style.border = 'none';
                                                };

                                                //apertura link youtube on click
                                                p1.addEventListener('click', openlink);
                                                function openlink(){
                                                    document.getElementById('p0').style.backgroundColor = 'white';
                                                    document.getElementById('p0').style.color = 'black';
                                                    window.open(`https://www.youtube.com/results?search_query=${titletosearch}`, '_blank');
                                                    p1.removeEventListener('click', openlink);
                                                    count++;
                                                    if (count>=2){
                                                        image.removeEventListener('click', openlink2);
                                                        count = 0;
                                                    };
                                                    document.getElementById('p0').style.backgroundColor = 'transparent';
                                                    document.getElementById('p0').style.color = 'white';
                                                };
                                                let p2 = document.getElementById('p1');
                                                p2.innerHTML="Year:"+`${movie.Year}`;
                                                p2.addEventListener('mouseover', changeborder);
                                                function changeborder(){
                                                    document.getElementById('p1').style.border = '1px solid blue';
                                                };
                                                p2.addEventListener('mouseout', rechangeborder);
                                                function rechangeborder(){
                                                    document.getElementById('p1').style.border = 'none';
                                                };

                                                //ricerca per anno se cliccate su year:
                                                p2.addEventListener('click', function(){
                                                    let searchbyyearmovie = null;
                                                    let searchbyyearyear = null;
                                                    searchbyyearmovie = `${object.title}`;
                                                    searchbyyearyear = `${object.year}`;
                                                    searchByYear(searchbyyearmovie, searchbyyearyear);
                                                });
                                                let p3 = document.getElementById('p2');
                                                p3.innerHTML="Rated:"+`${movie.Rated}`;
                                                let p4 = document.getElementById('p3');
                                                p4.innerHTML="Released:"+`${movie.Released}`;
                                                let p5 = document.getElementById('p4');
                                                p5.innerHTML="Runtime:"+`${movie.Runtime}`;
                                                let p6 = document.getElementById('p5');
                                                p6.innerHTML="Plot:"+`${movie.Plot}`;
                                                let image = document.getElementById('image');
                                                image.className ="img-responsive image-border";
                                                image.src =`${object.poster}`;

                                                //sostituisce immagine se non disponibile in array fetch
                                                if (`${object.poster}`=="N/A"){
                                                    image.src='images/image-not-available.jpg';
                                                };

                                                //apertura link youtube più cambio bordino
                                                image.addEventListener('click', openlink2);
                                                function openlink2(){
                                                    window.open(`https://open.spotify.com/search/${titletosearch}`, '_blank');
                                                    image.removeEventListener('click', openlink2);
                                                    count++;
                                                    if (count>=2){
                                                        p1.removeEventListener('click', openlink);
                                                        count = 0;
                                                    };
                                                };
                                                image.alt="";

                                                //gestione errore connessione
                                            }).catch(function(error){
                                                //mostro messaggio errore
                                                if(error!=undefined){
                                                    let darimuovere = document.getElementById('row');
                                                    function removeEverything(darimuovere){
                                                        while (darimuovere.firstChild){
                                                            darimuovere.removeChild(darimuovere.firstChild);
                                                        };
                                                    };
                                                    removeEverything(darimuovere);
                                                    let dacreare = document.getElementById("row");
                                                    let connection = document.createElement('div');
                                                        function Displayerror1(connection){
                                                            connection.className="connectionerror";
                                                            connection.id="connectionerror";
                                                            const content = `
                                                            <h3 class="search-txt">Error. Check your connection or try searching for a different title.</h3>
                                                            `;
                                                            connection.innerHTML += content;
                                                            dacreare.appendChild(connection);
                                                        };
                                                    Displayerror1(connection);
                                                };
                                            });

                                };
                                serachdetailedAPIS(movietitle);
                
                                //apro modale
                                const button = document.getElementById('button1');
                                const modal = document.querySelector(button.dataset.target);
                                buton.onclick = function(){
                                    modal.style.display ="block";
                                };
                            });

                            actualcard.appendChild(buton);
                            //console.log(buton);
                            //(sopra) "appendo" bottone (fine card)


                        });
    
                    });
        };

        //Controllo se input e in index o opening
        if(countinput==1){
            searchmoviesbyYear(input, annotosearchtext);
        }else if (countinput>=2){
            searchmoviesbyYear(movietosearchfor, annotosearchtext);
        };
    };


    //SEZIONE DEDICATA A FETCH PER ANNO DA BUTTON

    //Prendo in input pulsante ricerca per anno
    let annoinputbutton = document.getElementById('submit2');

    //aggiungo addeventlistener su pulsante ricerca per anno
    annoinputbutton.addEventListener('click',function(){

        //prendo valori di pulsanti ricerca per nome film e anno
        let annotosearchtext = document.getElementById("UserInput3").value;
        let movietosearchfor = document.getElementById("UserInput2").value;

        //alert che avrebbe dovuto uscire fuori qualora qualcuno cercasse di cercare anno film senza prima avere inserito nome
        //console.log(movietosearchfor);
        //console.log(annotosearchtext);
        //if (movietoseachfor==null){
            //let alert = document.getElementById("alert");
            //window.alert(alert);
        //};
        
        //funzione che cerca movies a parire da anno e nome(COMMENTI DA RIGA 96 A 532)
        function searchmoviesbyYear(query,input){
            let apiURL = 'https://www.omdbapi.com/?';
            let apiKey = 'ed143ea3';

            //url con aggiunta di anno
            const completeURLDue = `${apiURL}apikey=${apiKey}&s=${query}&y=${input}`;
            fetch(completeURLDue)
                .then(response => response.json())
                .then((response) => {
                    //console.log(response);
                    const movie = response.Search;
                    //console.log(movie);

                    //gestione errore film non trovato
                    if(movie == undefined){
                        let darimuovere = document.getElementById('row');
                        //console.log(darimuovere);
                        function removeEverything(darimuovere){
                            while (darimuovere.firstChild){
                                darimuovere.removeChild(darimuovere.firstChild);
                            };
                        };
                        removeEverything(darimuovere);
                        //console.log(countnewnumber);
                        let pererrori = document.getElementById('row');
                        let nontrovato=document.createElement('div');
                        nontrovato.id = "nontrovatodiv";
                        nontrovato.className ="nontrovato";
                        const content2 = `
                        <h3 class="search-txt">Film/page not found :/</h3>
                        `;
                        nontrovato.innerHTML += content2;
                        pererrori.appendChild(nontrovato);
                    };
                    const moviestokeep = [];
                    movie.forEach(oggetto=>{
                        const newMovie = new film (oggetto.Title,oggetto.Year,oggetto.imdbID,oggetto.type,oggetto.Poster);
                        moviestokeep.push(newMovie);
                    });
                    //console.log(moviestokeep);

                    //rimozione meteriale vecchio per creazione card (anche nelle altre funzioni questo codice è messo uguale nelo stesso punto)
                    let removefirst = document.getElementById('row');
                    function removeEverything(darimuovere){
                        while (darimuovere.firstChild){
                            darimuovere.removeChild(darimuovere.firstChild);
                        };
                    };
                    removeEverything(removefirst);
    
                    let count=0;
                    moviestokeep.forEach(object =>{
    
                        //posiziono, creo card e inserisco dati
                        //console.log(object.title);
                        //console.log(object.year);
                        //console.log(object.type);
                        let newcard = document.getElementById('row');
                        let position = document.createElement('div');
                        position.className = "col-sm-4 mb-4";
                        newcard.appendChild(position);
                        //console.log(newcard);
                        let actualcard = document.createElement('div');
                        actualcard.className = 'card h-100';
                        position.appendChild(actualcard);
                        //console.log(actualcard);
                        let cardimg = document.createElement('img');
                        cardimg.className = "card-img-top";
                        cardimg.src=`${object.poster}`;
    
                        //sostituisce immagine se non disponibile in array fetch
                        if (`${object.poster}`=="N/A"){
                            cardimg.src='images/image-not-available.jpg';
                        };
                        cardimg.alt="card image cap";
                        actualcard.appendChild(cardimg);
                        //console.log(cardimg);
                        let cardbody = document.createElement('div');
                        cardbody.className="card-body";
                        actualcard.appendChild(cardbody);
                        //console.log(cardbody);
                        let movietitle = document.createElement('h3');
                        movietitle.className="card-title";
                        movietitle.id="movieTitle";
                        movietitle.innerHTML=`${object.title}`;
                        cardbody.appendChild(movietitle);
                        //console.log(movietitle);
                        let moredetails = document.createElement('ul');
                        moredetails.className="list-group list-group-flush";
                        moredetails.id="ul";
                        actualcard.appendChild(moredetails);
                        let li1 = document.createElement('li');
                        li1.className="list-group-item";
                        li1.id = "movieYear";
                        li1.innerHTML="Year:"+`${object.year}`;

                        //bordino blu
                        li1.addEventListener('mouseover', changeborder2);
                        function changeborder2(){
                            li1.style.border = '1px solid blue';
                        };
                        li1.addEventListener('mouseout', rechangeborder2);
                        function rechangeborder2(){
                            li1.style.border = 'none';
                        };

                        //ricerca per anno se cliccate su year:
                        li1.addEventListener('click',function(){
                            searchbyyearmovie = document.getElementById("UserInput2").value;
                            searchbyyearyear = `${object.year}`;
                            searchByYear(searchbyyearmovie, searchbyyearyear);
                        });
                        moredetails.appendChild(li1);
    
                        //creo button card
                        let buton = document.createElement('button');
                        buton.className="btn btn-primary"
                        buton.dataset.toggle="modal";
                        buton.dataset.target="#Mymodal";
                        buton.id="button1";
                        buton.innerHTML="More Details";
    
                        //addeventlistener x ulteriore fetch più approfondito
                        buton.addEventListener('click', function(){
                            let movietitle =`${object.title}`;
    
                            //prendo titolo film
                            //console.log(movietitle);
    
                            //nuovo fetch approfondito
                            function serachdetailedAPIS(query){
                            const completeURLDue = `${apiURL}apikey=${apiKey}&t=${query}`;
                                fetch(completeURLDue)
                                    .then(response => response.json())
                                    .then((response) => {
                                        const movie = response;
                                        //console.log(movie);
                                        //console.log(movie.Title);
                                        //console.log(movie.Released);
    
                                        //inserisco in campi modale risultati
                                        let p1 = document.getElementById('p0');
                                        p1.innerHTML="Title:"+`${movie.Title}`;
                                        let titletosearch = `${movie.Title}`;

                                        //bordino blu hover
                                        p1.addEventListener('mouseover', changeborder1);
                                        function changeborder1(){
                                            document.getElementById('p0').style.border = '1px solid blue';
                                        };
                                        p1.addEventListener('mouseout', rechangeborder1);
                                        function rechangeborder1(){
                                            document.getElementById('p0').style.border = 'none';
                                        };

                                        //apertura link youtube
                                        p1.addEventListener('click', openlink);
                                        function openlink(){
                                            document.getElementById('p0').style.backgroundColor = 'white';
                                            document.getElementById('p0').style.color = 'black';
                                            window.open(`https://www.youtube.com/results?search_query=${titletosearch}`, '_blank');
                                            p1.removeEventListener('click', openlink);
                                            count++;
                                            if (count>=2){
                                                image.removeEventListener('click', openlink2);
                                                count = 0;
                                            };
                                            document.getElementById('p0').style.backgroundColor = 'transparent';
                                            document.getElementById('p0').style.color = 'white';

                                        };
                                        let p2 = document.getElementById('p1');
                                        p2.innerHTML="Year:"+`${movie.Year}`;

                                        //bordino blu hover
                                        p2.addEventListener('mouseover', changeborder);
                                        function changeborder(){
                                            document.getElementById('p1').style.border = '1px solid blue';
                                        };
                                        p2.addEventListener('mouseout', rechangeborder);
                                        function rechangeborder(){
                                            document.getElementById('p1').style.border = 'none';
                                        };

                                        //ricerca per anno se cliccate su year:
                                        li1.addEventListener('click',function(){
                                            searchbyyearmovie = document.getElementById("UserInput2").value;
                                            searchbyyearyear = `${object.year}`;
                                            searchByYear(searchbyyearmovie, searchbyyearyear);
                                            modal.style.display = "none";
                                        });
                                        let p3 = document.getElementById('p2');
                                        p3.innerHTML="Rated:"+`${movie.Rated}`;
                                        let p4 = document.getElementById('p3');
                                        p4.innerHTML="Released:"+`${movie.Released}`;
                                        let p5 = document.getElementById('p4');
                                        p5.innerHTML="Runtime:"+`${movie.Runtime}`;
                                        let p6 = document.getElementById('p5');
                                        p6.innerHTML="Plot:"+`${movie.Plot}`;
                                        let image = document.getElementById('image');
                                        image.className ="img-responsive image-border";
                                        image.src =`${object.poster}`;
    
                                        //sostituisce immagine se non disponibile in array fetch
                                        if (`${object.poster}`=="N/A"){
                                            image.src='images/image-not-available.jpg';
                                        };

                                        //apertura link spotify
                                        image.addEventListener('click', openlink2);
                                        function openlink2(){
                                            window.open(`https://open.spotify.com/search/${titletosearch}`, '_blank');
                                            image.removeEventListener('click', openlink2);
                                            count++;
                                            if (count>=2){
                                                p1.removeEventListener('click', openlink);
                                                count = 0;
                                            };
                                        };
                                        image.alt="";
                                        
                                        //gestione errore connessione
                                    }).catch(function(error){
                                        //mostro messaggio errore
                                        if(error!=undefined){
                                            let darimuovere = document.getElementById('row');
                                            function removeEverything(darimuovere){
                                                while (darimuovere.firstChild){
                                                    darimuovere.removeChild(darimuovere.firstChild);
                                                };
                                            };
                                            removeEverything(darimuovere);
                                            let dacreare = document.getElementById("row");
                                            let connection = document.createElement('div');
                                                function Displayerror1(connection){
                                                    connection.id="connectionerror";
                                                    connection.className="connectionerror";
                                                    const content = `
                                                    <h3 class="search-txt">Error. Check your connection or try to search for a different title.</h3>
                                                    `;
                                                    connection.innerHTML += content;
                                                    dacreare.appendChild(connection);
                                                };
                                            Displayerror1(connection);
                                        };
                                    });
        
                            };
                            serachdetailedAPIS(movietitle);
                    
                            //apro modale
                            const button = document.getElementById('button1');
                            const modal = document.querySelector(button.dataset.target);
                            buton.onclick = function(){
                            modal.style.display ="block";
                            };
                        });
    
                        actualcard.appendChild(buton);
                        //console.log(buton);
                        //(sopra) "appendo" bottone (fine card)
    
    
                    });
        
                });
            };
        
        //controllo se input proviene da index o opening
        if (countinput==1){
        searchmoviesbyYear(input, annotosearchtext);
        }else if (countinput>=2){
        searchmoviesbyYear(movietosearchfor, annotosearchtext);
        };
    });



    //SEZIONE DEDICATA A RICERCA PAGINA DIVERSA

    //Generazione pulsanti numero pagina
    for (let i=1; i<10; i++){

        //creo pulsanti e assegno classi
        let buttonrow = document.getElementById("buttonrow");
        let pulsante = document.createElement("input");
        pulsante.type="text"
        pulsante.className="new-search-txt"
        pulsante.id="numberbutton"

        //gli assegno numero(in questo caso numero di indice ciclo for)
        pulsante.placeholder = i;

        //aggiungo addeventlistener su bottoni
        pulsante.addEventListener('click',function(){

            //variabile che servirà a prendere anno di uscita film
            let movieyear = null;

            //variabile che serve a prendere numero di pagina
            let pagenumber = i;

            //variabile che prende nome film da form per inserimento nome film poco sotto
            let moviename = null;
            moviename = document.getElementById("UserInput2").value;
            movieyear = document.getElementById("UserInput3").value;
            //console.log(pagenumber);

            //funzione di ricerca pagina
            function searchByPage(movie, year, number){

                //assegnamento variabili di nome film e anno uscita
                let annotosearchtext = year;
                let movietosearchfor = movie;
                //console.log(movietosearchfor);
                //console.log(annotosearchtext);

                //assegnamento variabile di numero pagina
                let pagenumber = number;
                //console.log(pagenumber);
                
                //funzione di fetch numero pagina (COMMENTI DETTAGLIATI DA RIGA 96 A RIGA A 532)
                function searchmoviesbyYear(cuery,inputt,number){
                    let apiURL = 'https://www.omdbapi.com/?';
                    let apiKey = 'ed143ea3';

                    //converto numero di pagina da stringa a numero
                    let pageNumber = number;
                    let pageNumberInteger = parseInt(pageNumber);
                    //console.log(pageNumber);

                    //assegnamento anno di ricerca
                    let year = inputt;
                    //console.log(year);

                    //controllo se variabile anno è vuota
                    if(year===""){

                        //fetch con aggiunta di campo numero di pagina (PagenumberInteger)
                        const completeURLtre = `${apiURL}apikey=${apiKey}&s=${cuery}&page=${pageNumberInteger}`;
                        fetch(completeURLtre)
                            .then(response => response.json())
                                .then((response) => {
                                    //console.log(response);
                                    const movie = response.Search;
                                    //console.log(movie);

                                    //gestione errore film non trovato
                                    if(movie == undefined){
                                        let darimuovere = document.getElementById('row');
                                        //console.log(darimuovere);
                                        function removeEverything(darimuovere){
                                            while (darimuovere.firstChild){
                                                darimuovere.removeChild(darimuovere.firstChild);
                                            };
                                        };
                                        removeEverything(darimuovere);
                                        //console.log(countnewnumber);
                                        let pererrori = document.getElementById('row');
                                        let nontrovato=document.createElement('div');
                                        nontrovato.id = "nontrovatodiv";
                                        nontrovato.className="nontrovato";
                                        const content2 = `
                                        <h3 class="search-txt">Film/page not found :/</h3>
                                        `;
                                        nontrovato.innerHTML += content2;
                                        pererrori.appendChild(nontrovato);
                                    }

                                    //creo array movie
                                    const moviestocycle = [];
                                    movie.forEach(oggetto=>{
                                        const newMovie = new film (oggetto.Title,oggetto.Year,oggetto.imdbID,oggetto.type,oggetto.Poster);
                                        moviestocycle.push(newMovie);
                                    });

                                    //rimuovo materiale per far spazio a cards
                                    //console.log(moviestocycle);
                                    let removefirst = document.getElementById('row');
                                    function removeEverything(darimuovere){
                                        while (darimuovere.firstChild){
                                            darimuovere.removeChild(darimuovere.firstChild);
                                        };
                                    };
                                    removeEverything(removefirst);

                                    let count=0;
                                    moviestocycle.forEach(object =>{
    
    
                                        //posiziono, creo card e inserisco dati
                                        //console.log(object.title);
                                        //console.log(object.year);
                                        //console.log(object.type);
                                        let newcard = document.getElementById('row');
                                        let position = document.createElement('div');
                                        position.className = "col-sm-4 mb-4";
                                        newcard.appendChild(position);
                                        //console.log(newcard);
                                        let actualcard = document.createElement('div');
                                        actualcard.className = 'card h-100';
                                        position.appendChild(actualcard);
                                        //console.log(actualcard);
                                        let cardimg = document.createElement('img');
                                        cardimg.className = "card-img-top";
                                        cardimg.src=`${object.poster}`;
    
                                        //sostituisce immagine se non disponibile in array fetch
                                        if (`${object.poster}`=="N/A"){
                                            cardimg.src='images/image-not-available.jpg';
                                        };
                                        cardimg.alt="card image cap";
                                        actualcard.appendChild(cardimg);
                                        //console.log(cardimg);
                                        let cardbody = document.createElement('div');
                                        cardbody.className="card-body";
                                        actualcard.appendChild(cardbody);
                                        //console.log(cardbody);
                                        let movietitle = document.createElement('h3');
                                        movietitle.className="card-title";
                                        movietitle.id="movieTitle";
                                        movietitle.innerHTML=`${object.title}`;
                                        cardbody.appendChild(movietitle);
                                        //console.log(movietitle);
                                        let moredetails = document.createElement('ul');
                                        moredetails.className="list-group list-group-flush";
                                        moredetails.id="ul";
                                        actualcard.appendChild(moredetails);
                                        let li1 = document.createElement('li');
                                        li1.className="list-group-item";
                                        li1.id="movieYear";
                                        li1.innerHTML="Year:"+`${object.year}`;

                                        //bordino blu hover
                                        li1.addEventListener('mouseover', changeborder2)
                                        function changeborder2(){
                                            li1.style.border = '1px solid blue';
                                        };
                                        li1.addEventListener('mouseout', rechangeborder2);
                                        function rechangeborder2(){
                                            li1.style.border = 'none';
                                        };
    
                                        //ricerca per anno se cliccate su year:
                                        li1.addEventListener('click', function(){
                                            let searchbyyearmovie=null;
                                            let searchbyyearyear=null;
                                            searchbyyearmovie = document.getElementById("UserInput2").value;
                                            searchbyyearyear = `${object.year}`;
                                            searchByYear(searchbyyearmovie, searchbyyearyear);
                                        });
                                        moredetails.appendChild(li1);
    
                                        //creo button card
                                        let buton = document.createElement('button');
                                        buton.className="btn btn-primary"
                                        buton.dataset.toggle="modal";
                                        buton.dataset.target="#Mymodal";
                                        buton.id="button1";
                                        buton.innerHTML="More Details";
    
                                        //addeventlistener x ulteriore fetch più approfondito
                                        buton.addEventListener('click', function(){
                                            let movietitle =`${object.title}`;
    
                                            //prendo titolo film
                                            //console.log(movietitle);
    
                                            //nuovo fetch approfondito
                                            function serachdetailedAPIS(query){
                                                const completeURLDue = `${apiURL}apikey=${apiKey}&t=${query}`;
                                                fetch(completeURLDue)
                                                    .then(response => response.json())
                                                        .then((response) => {
    
                                                            const movie = response;
                                                            //console.log(movie);
                                                            //console.log(movie.Title);
                                                            //console.log(movie.Released);
    
                                                            //inserisco in campi modale risultati
                                                            let p1 = document.getElementById('p0');
                                                            p1.innerHTML="Title:"+`${movie.Title}`;
                                                            let titletosearch = `${movie.Title}`;

                                                            //bordino blu hover
                                                            p1.addEventListener('mouseover', changeborder1);
                                                            function changeborder1(){
                                                                document.getElementById('p0').style.border = '1px solid blue';
                                                            };
                                                            p1.addEventListener('mouseout', rechangeborder1);
                                                            function rechangeborder1(){
                                                                document.getElementById('p0').style.border = 'none';
                                                            };

                                                            //apertura link youtube
                                                            p1.addEventListener('click', openlink);
                                                            function openlink(){
                                                                document.getElementById('p0').style.backgroundColor = 'white';
                                                                document.getElementById('p0').style.color = 'black';
                                                                window.open(`https://www.youtube.com/results?search_query=${titletosearch}`, '_blank');
                                                                p1.removeEventListener('click', openlink);
                                                                count++;
                                                                if (count>=2){
                                                                    image.removeEventListener('click', openlink2);
                                                                    count = 0;
                                                                };
                                                                document.getElementById('p0').style.backgroundColor = 'transparent';
                                                                document.getElementById('p0').style.color = 'white';

                                                            };
                                                            let p2 = document.getElementById('p1');
                                                            p2.innerHTML="Year:"+`${movie.Year}`;

                                                            //bordino blu hover
                                                            p2.addEventListener('mouseover', changeborder);
                                                            function changeborder(){
                                                                document.getElementById('p1').style.border = '1px solid blue';
                                                            };
                                                            p2.addEventListener('mouseout', rechangeborder);
                                                            function rechangeborder(){
                                                                document.getElementById('p1').style.border = 'none';
                                                            };
    
                                                            //ricerca per anno se cliccate su year:
                                                            p2.addEventListener('click', function(){
                                                                let searchbyyearmovie = null;
                                                                let searchbyyearyear = null;
                                                                searchbyyearmovie = document.getElementById("UserInput2").value;
                                                                searchbyyearyear = `${object.year}`;
                                                                searchByYear(searchbyyearmovie, searchbyyearyear);
                                                                modal.style.display = "none";
                                                            });
                                                            let p3 = document.getElementById('p2');
                                                            p3.innerHTML="Rated:"+`${movie.Rated}`;
                                                            let p4 = document.getElementById('p3');
                                                            p4.innerHTML="Released:"+`${movie.Released}`;
                                                            let p5 = document.getElementById('p4');
                                                            p5.innerHTML="Runtime:"+`${movie.Runtime}`;
                                                            let p6 = document.getElementById('p5');
                                                            p6.innerHTML="Plot:"+`${movie.Plot}`;
                                                            let image = document.getElementById('image');
                                                            image.className ="img-responsive image-border";
                                                            image.src =`${object.poster}`;
    
                                                            //sostituisce immagine se non disponibile in array fetch
                                                            if (`${object.poster}`=="N/A"){
                                                                image.src='images/image-not-available.jpg';
                                                            };

                                                            //apertura link spotify
                                                            image.addEventListener('click', openlink2);
                                                            function openlink2(){
                                                                window.open(`https://open.spotify.com/search/${titletosearch}`, '_blank');
                                                                image.removeEventListener('click', openlink2);
                                                                count++;
                                                                if (count>=2){
                                                                    p1.removeEventListener('click', openlink);
                                                                    count = 0;
                                                                };
                                                            };
                                                            image.alt="";
                                                            
                                                            //gestione errore connessione
                                                        }).catch(function(error){
                                                            //mostro messaggio errore
                                                            if(error!=undefined){
                                                                let darimuovere = document.getElementById('row');
                                                                function removeEverything(darimuovere){
                                                                    while (darimuovere.firstChild){
                                                                        darimuovere.removeChild(darimuovere.firstChild);
                                                                    };
                                                                };
                                                                removeEverything(darimuovere);
                                                                let dacreare = document.getElementById("row");
                                                                let connection = document.createElement('div');
                                                                    function Displayerror1(connection){
                                                                        connection.className="connectionerror";
                                                                        connection.id="connectionerror";
                                                                        const content = `
                                                                        <h3 class="search-txt">Error. Check your connection or try to search for another title.</h3>
                                                                        `;
                                                                        connection.innerHTML += content;
                                                                        dacreare.appendChild(connection);
                                                                    };
                                                                Displayerror1(connection);
                                                            };
                                                        });
        
                                            };
                                            serachdetailedAPIS(movietitle);
                    
                                            //apro modale
                                            const button = document.getElementById('button1');
                                            const modal = document.querySelector(button.dataset.target);
                                            buton.onclick = function(){
                                                modal.style.display ="block";
                                            };
                                        });
    
                                        actualcard.appendChild(buton);
                                        //console.log(buton);
                                        //(sopra) "appendo" bottone (fine card)
    
    
                                    });
        
                                });

                    //controllo bottone year pieno
                    }else if (year!=""){

                        //converto data (anno) da da stringa a data 
                        let yeardate = new Date(year);

                        //estapolo anno da data
                        let yeartoinsert = yeardate.getFullYear();
                        //console.log(yeartoinsert);

                        //fetch con aggiunta di parametri anno e numero di pagina (COMMENTI DETTAGLIATI DA RIGA 96 A RIGA 532)
                        const completeURLDue = `${apiURL}apikey=${apiKey}&s=${cuery}&y=${yeartoinsert}&page=${pageNumberInteger}`;
                        fetch(completeURLDue)
                            .then(response => response.json())
                                .then((response) => {
                                    //console.log(response);
                                    const movie = response.Search;
                                    //console.log(movie);

                                    //errore film non trovato
                                    if(movie == undefined){
                                        let darimuovere = document.getElementById('row');
                                        //console.log(darimuovere);
                                        function removeEverything(darimuovere){
                                            while (darimuovere.firstChild){
                                                darimuovere.removeChild(darimuovere.firstChild);
                                            };
                                        };
                                        removeEverything(darimuovere);
                                        //console.log(countnewnumber);
                                        let pererrori = document.getElementById('row');
                                        let nontrovato=document.createElement('div');
                                        nontrovato.id = "nontrovatodiv";
                                        nontrovato.className="nontrovato";
                                        const content2 = `
                                        <h3 class="search-txt">Film/page not found :/</h3>
                                        `;
                                        nontrovato.innerHTML += content2;
                                        pererrori.appendChild(nontrovato);
                                    };

                                    //creo array movies
                                    const moviestokeep = [];
                                    movie.forEach(oggetto=>{
                                        const newMovie = new film (oggetto.Title,oggetto.Year,oggetto.imdbID,oggetto.type,oggetto.Poster);
                                        moviestokeep.push(newMovie);
                                    });

                                    //cancello tutto per fare spazio a cards
                                    //console.log(moviestokeep);
                                    let removefirst = document.getElementById('row');
                                    function removeEverything(darimuovere){
                                        while (darimuovere.firstChild){
                                            darimuovere.removeChild(darimuovere.firstChild);
                                        };
                                    };
                                    removeEverything(removefirst);

                                    let count=0;
                                    moviestokeep.forEach(object =>{
    
    
                                        //posiziono, creo card e inserisco dati
                                        //console.log(object.title);
                                        //console.log(object.year);
                                        //console.log(object.type);
                                        let newcard = document.getElementById('row');
                                        let position = document.createElement('div');
                                        position.className = "col-sm-4 mb-4";
                                        newcard.appendChild(position);
                                        //console.log(newcard);
                                        let actualcard = document.createElement('div');
                                        actualcard.className = 'card h-100';
                                        position.appendChild(actualcard);
                                        //console.log(actualcard);
                                        let cardimg = document.createElement('img');
                                        cardimg.className = "card-img-top";
                                        cardimg.src=`${object.poster}`;
    
                                        //sostituisce immagine se non disponibile in array fetch
                                        if (`${object.poster}`=="N/A"){
                                            cardimg.src='images/image-not-available.jpg';
                                        };
                                        cardimg.alt="card image cap";
                                        actualcard.appendChild(cardimg);
                                        //console.log(cardimg);
                                        let cardbody = document.createElement('div');
                                        cardbody.className="card-body";
                                        actualcard.appendChild(cardbody);
                                        //console.log(cardbody);
                                        let movietitle = document.createElement('h3');
                                        movietitle.className="card-title";
                                        movietitle.id="movieTitle";
                                        movietitle.innerHTML=`${object.title}`;
                                        cardbody.appendChild(movietitle);
                                        //console.log(movietitle);
                                        let moredetails = document.createElement('ul');
                                        moredetails.className="list-group list-group-flush";
                                        moredetails.id="ul";
                                        actualcard.appendChild(moredetails);
                                        let li1 = document.createElement('li');
                                        li1.className="list-group-item";
                                        li1.id="movieYear";
                                        li1.innerHTML="Year:"+`${object.year}`;

                                        //bordino blu hover year card
                                        li1.addEventListener('mouseover', changeborder2);
                                        function changeborder2(){
                                            li1.style.border = '1px solid blue';
                                        };
                                        li1.addEventListener('mouseout', rechangeborder2);
                                        function rechangeborder2(){
                                            li1.style.border = 'none';
                                        };
    
                                        //ricerca per anno se cliccate su year:
                                        li1.addEventListener('click', function(){
                                            let searchbyyearmovie=null;
                                            let searchbyyearyear=null;
                                            searchbyyearmovie = document.getElementById("UserInput2").value;
                                            searchbyyearyear = `${object.year}`;
                                            searchByYear(searchbyyearmovie, searchbyyearyear);
                                        });
                                        moredetails.appendChild(li1);
    
                                        //creo button card
                                        let buton = document.createElement('button');
                                        buton.className="btn btn-primary"
                                        buton.dataset.toggle="modal";
                                        buton.dataset.target="#Mymodal";
                                        buton.id="button1";
                                        buton.innerHTML="More Details";
    
                                        //addeventlistener x ulteriore fetch più approfondito
                                        buton.addEventListener('click', function(){
                                            let movietitle =`${object.title}`;
    
                                            //prendo titolo film
                                            //console.log(movietitle);
    
                                            //nuovo fetch approfondito
                                            function serachdetailedAPIS(query){
                                                const completeURLDue = `${apiURL}apikey=${apiKey}&t=${query}`;
                                                fetch(completeURLDue)
                                                    .then(response => response.json())
                                                        .then((response) => {
    
                                                            const movie = response;
                                                            //console.log(movie);
                                                            //console.log(movie.Title);
                                                            //console.log(movie.Released);
    
                                                            //inserisco in campi modale risultati
                                                            let p1 = document.getElementById('p0');
                                                            p1.innerHTML="Title:"+`${movie.Title}`;
                                                            let titletosearch = `${movie.Title}`;

                                                            //bordino blu hover
                                                            p1.addEventListener('mouseover', changeborder1);
                                                            function changeborder1(){
                                                                document.getElementById('p0').style.border = '1px solid blue';
                                                            };
                                                            p1.addEventListener('mouseout', rechangeborder1);
                                                            function rechangeborder1(){
                                                                document.getElementById('p0').style.border = 'none';
                                                            };

                                                            //apertura link youtube
                                                            p1.addEventListener('click', openlink);
                                                            function openlink(){
                                                                document.getElementById('p0').style.backgroundColor = 'white';
                                                                document.getElementById('p0').style.color = 'black';
                                                                window.open(`https://www.youtube.com/results?search_query=${titletosearch}`, '_blank');
                                                                p1.removeEventListener('click', openlink);
                                                                count++;
                                                                if (count>=2){
                                                                    image.removeEventListener('click', openlink2);
                                                                    count = 0;
                                                                };
                                                                document.getElementById('p0').style.backgroundColor = 'transparent';
                                                                document.getElementById('p0').style.color = 'white';
                                                            };
                                                            let p2 = document.getElementById('p1');
                                                            p2.innerHTML="Year:"+`${movie.Year}`;

                                                            //bordino blu hover
                                                            p2.addEventListener('mouseover', changeborder);
                                                            function changeborder(){
                                                                document.getElementById('p1').style.border = '1px solid blue';
                                                            };
                                                            p2.addEventListener('mouseout', rechangeborder);
                                                            function rechangeborder(){
                                                                document.getElementById('p1').style.border = 'none';
                                                            };
    
                                                            //ricerca per anno se cliccate su year:
                                                            p2.addEventListener('click', function(){
                                                                let searchbyyearmovie = null;
                                                                let searchbyyearyear = null;
                                                                searchbyyearmovie = document.getElementById("UserInput2").value;
                                                                searchbyyearyear = `${object.year}`;
                                                                searchByYear(searchbyyearmovie, searchbyyearyear);
                                                                modal.style.display = "none";
                                                            });
                                                            let p3 = document.getElementById('p2');
                                                            p3.innerHTML="Rated:"+`${movie.Rated}`;
                                                            let p4 = document.getElementById('p3');
                                                            p4.innerHTML="Released:"+`${movie.Released}`;
                                                            let p5 = document.getElementById('p4');
                                                            p5.innerHTML="Runtime:"+`${movie.Runtime}`;
                                                            let p6 = document.getElementById('p5');
                                                            p6.innerHTML="Plot:"+`${movie.Plot}`;
                                                            let image = document.getElementById('image');
                                                            image.className ="img-responsive image-border";
                                                            image.src =`${object.poster}`;
    
                                                            //sostituisce immagine se non disponibile in array fetch
                                                            if (`${object.poster}`=="N/A"){
                                                                image.src='images/image-not-available.jpg';
                                                            };

                                                            //apertura link spotify
                                                            image.addEventListener('click', openlink2);
                                                            function openlink2(){
                                                                window.open(`https://open.spotify.com/search/${titletosearch}`, '_blank');
                                                                image.removeEventListener('click', openlink2);
                                                                count++;
                                                                if (count>=2){
                                                                    p1.removeEventListener('click', openlink);
                                                                    count = 0;
                                                                };
                                                            };
                                                            image.alt="";

                                                            //errore connessione
                                                        }).catch(function(error){
                                                            //mostro messaggio errore
                                                            if(error!=undefined){
                                                                let darimuovere = document.getElementById('row');
                                                                function removeEverything(darimuovere){
                                                                    while (darimuovere.firstChild){
                                                                        darimuovere.removeChild(darimuovere.firstChild);
                                                                    };
                                                                };
                                                                removeEverything(darimuovere);
                                                                let dacreare = document.getElementById("row");
                                                                let connection = document.createElement('div');
                                                                    function Displayerror1(connection){
                                                                        connection.className="connectionerror";
                                                                        connection.id="connectionerror";
                                                                        const content = `
                                                                        <h3 class="search-txt">Error. Check your connection or try searching for a different title.</h3>
                                                                        `;
                                                                        connection.innerHTML += content;
                                                                        dacreare.appendChild(connection);
                                                                    };
                                                                Displayerror1(connection);
                                                            };
                                                        });
        
                                            };
                                            serachdetailedAPIS(movietitle);
                    
                                            //apro modale
                                            const button = document.getElementById('button1');
                                            const modal = document.querySelector(button.dataset.target);
                                            buton.onclick = function(){
                                                modal.style.display ="block";
                                            };
                                        });
    
                                        actualcard.appendChild(buton);
                                        //console.log(buton);
                                        //(sopra) "appendo" bottone (fine card)
    
    
                                    });
        
                                });
    
                    };
                };
                searchmoviesbyYear(movietosearchfor, annotosearchtext, pagenumber);
            
            };
            
            //verifico che input sia in index.html e non in opening
            if(countinput==1){
                searchByPage(input,movieyear,pagenumber);
            }else if (countinput>=2){
                searchByPage(moviename,movieyear,pagenumber);
            };

        });
        buttonrow.append(pulsante);
    };

   


};

