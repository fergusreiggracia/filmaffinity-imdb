
//IMDB

var v_translate_name = [];
var v_original_name = [];
var v_year = [];
var v_country = [];
var v_vote = [];


//Resultados de la consola obtenidos de Filmaffinity

search_films(0);

//Recorre las películas a valorar, cargando la valoración en imdb
function search_films(i){
	if (i < v_translate_name.length){
		setTimeout(function(){
			search_film(v_translate_name[i], v_original_name[i], v_year[i], v_country[i], v_vote[i]);
			console.log(i);
			search_films(i+1);
		},2000);
	}
}

//Busca en imdb la película que indican los parámetros que recibe y la valora
function search_film(translate_name, original_name, year, country, vote){

		var web_search = "http://www.imdb.com/search/title?release_date=" + year + "-01-01," + year + "-12-31&title= " + original_name;
		var web_page_film = window.open(web_search, "_blank");
		web_page_film.onload = function () {
			//$.find('form')[0].method
			//$.find('form')[0].acceptCharset
			id_web = $(web_page_film.document).contents().find('.wlb_wrapper')[0].getAttribute("data-tconst");
			call_web = $(web_page_film.document).contents().find('.user_rating div')[0].getAttribute("data-auth");
			web_page_film.close();

			//Se vota la película
			var web_note = "http://www.imdb.com/title/" + id_web + "/vote?v=" + vote + ";k=" + call_web;
			web_page_film = window.open(web_note, "_blank");
			web_page_film.onload = function () {
				web_page_film.close();
			}
		}
}
