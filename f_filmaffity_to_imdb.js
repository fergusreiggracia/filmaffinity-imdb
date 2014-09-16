
//FILMAFFINITY

var v_translate_name = [];
var v_original_name = [];
var v_year = [];
var v_country = [];
var v_vote = [];

//Carga la primera página de valoraciones del usuario en Filmaffinity
var web_page = window.open("http://www.filmaffinity.com/es/myvotes.php?p=1&orderby=4", "_blank");

web_page.onload = function () {
	var pages = parseInt($(web_page.document).contents().find('table tr td b')[1].firstChild.textContent);
	web_page.close();

	//Lanza el proceso de volcado de valoraciones para todas las páginas de valoraciones del usuario
	load_web_page(pages);

};

//Carga una página de valoraciones en Fimaffinity y copia sus valoraciones a imdb
//pages: Páginas que quedan por tratar
function load_web_page(pages){

	if (pages > 0)
	{
		//setTimeout(function(){ 
			var web_page =  window.open("http://www.filmaffinity.com/es/myvotes.php?p=" + pages + "&orderby=4", "_blank");	
			web_page.onload = function () {
				//Lanza la copia sobre las películas de esta página
				load_web_page_film_for(0, $(web_page.document).contents().find('.mc-title a'), pages);

				web_page.close();

				//Continua con la siguiente página de valoraciones
				//load_web_page(pages+1, max_pages);
			};
		//},10000);
	}

}

//Carga la página de una película en Filmaffnity y copia su valoración a imdb
//y: Página a tratar
//webs: Vector de páginas a tratar
//pages: Número de la página de resultados que recibe
//max_pages: Total de páginas de resultados
function load_web_page_film_for(y, webs, pages){
	if (y < webs.length)
	{
		setTimeout(function(){
			var web = webs.get(y).href;
			load_web_page_film(web, pages, y)
			load_web_page_film_for(y+1, webs, pages);
		},2000);
	}else{
		load_web_page(pages-1);
	}
}

//Sacamos en la consola de Javascript los datos de interés sobre la película a la que corresponde la web
//web: URL de la página de la película
//pages: Página de valoraciones de la que se ha extraido la película
//films: Posición de la película en su página de valoraciones
function load_web_page_film(web, pages, films){
		var web_page_film = window.open(web, "_blank");
		web_page_film.onload = function () {
			var translate_name = $(web_page_film.document).contents().find('td h1 a span')[0].textContent.replace("'","\\'");
			var original_name = $(web_page_film.document).contents().find('.movie-info dd')[0].firstChild.textContent.split("(")[0].replace("'","\\'");
			var year = parseInt($(web_page_film.document).contents().find('.movie-info dd')[1].firstChild.textContent);
			var country = $(web_page_film.document).contents().find('.movie-info dd')[3].textContent;
			var vote = $(web_page_film.document).contents().find('.rating-img img')[0].src.split("_")[0].split("/")[$(web_page_film.document).contents().find('.rating-img img')[0].src.split("_")[0].split("/").length-1];
			//console.log(web + " " + translate_name + " " + original_name + " " + year + " " + country + " " + vote);
			web_page_film.close();
			
			v_translate_name.push(translate_name);
			v_original_name.push(original_name);
			v_year.push(year);
			v_country.push(country);
			v_vote.push(vote);
			
			console.log(
			"v_translate_name.push('" + translate_name + "'); " +
			"v_original_name.push('" + original_name + "'); " + 
			"v_year.push('" + year + "'); " +
			"v_country.push('" + country + "'); " + 
			"v_vote.push('" + vote + "'); " +
			"//Página '" +  pages + ' película ' + films
			);

			//search_film(translate_name, original_name, year, country, vote);

		};
}

//Volcar las variables si hemos perdido los logs de la consola
//En este caso las barras delante de "'" serán un problema 
//JSON.stringify(v_translate_name)
//JSON.stringify(v_original_name)
//JSON.stringify(v_year)
//JSON.stringify(v_country)
//JSON.stringify(v_vote)

