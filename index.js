$(document).ready(function () {
// Filtros

$("#filtro").on("click", () => {
    let query = $("#query").val()
    let year = $("#year").val()
    let language = $("#language").val()
    let page = $("#page").val()
    let url=`https://api.themoviedb.org/3/search/movie?api_key=c4fb6f2207ee99ef944482751f343f8b`

    if(query != ""){
        url += `&query=${query}`
    }
    if(year != ""){
       // Esto no funciona porque no filtra solo por año sino por fecha completa
        url += `&release_date=${year}`
    }
    if(language != ""){
        url += `&language=${language}`
    }
    if(page != ""){
        url += `&page=${page}`
    }
    
    $("#posts").html("");
    getPost(url)

});

function getYearFromString(string){
    let date = new Date(string)
    return date.getFullYear()
}




  // Construir un listado
  const getPost = (url) => {
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        success: (response) => {
            
           let contenido = "";
            $.each(response.results, (index, result) => { 
                let year = getYearFromString(result.release_date);
                console.log(year);
               contenido += `
                <h2 class="fw-bold">${result.title}</h2>
                <img class="w-100 rounded shadow" src="https://image.tmdb.org/t/p/w500/${result.backdrop_path}" alt="">
                <div class="mx-2 mt-3">
                <p class="text-muted">${result.overview}</p>
                <a href="#" class="btn btn-sm btn-secondary float-end">Ver</a>
                <p class="fst-italic text-muted">${result.release_date}</p>
                </div>
                <hr class="my-4">
               `
            });
            $("#posts").html(contenido);
        }
    });
  }

  function init(url){
    getPost(url)
  }


  init("https://api.themoviedb.org/3/movie/popular?api_key=c4fb6f2207ee99ef944482751f343f8b&query=Resident&year=2020&page=1")
    
  // Detectar el final del scroll
  $(document).on("scroll", () => {
    const scrollableHeight = $(document).height() - $(window).innerHeight();

    if ($(document).scrollTop() >= scrollableHeight) {
        console.log('Final scroll');
        
       getPost("https://api.themoviedb.org/3/discover/movie?api_key=c4fb6f2207ee99ef944482751f343f8b&query=Resident&year=2020&page=1&page="+Math.floor(Math.random() * 100))
        
    }
  });
});
