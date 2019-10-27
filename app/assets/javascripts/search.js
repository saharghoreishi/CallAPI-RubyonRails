document.addEventListener("turbolinks:load", function() {
  $input = $("[data-behavior='autocomplete']")
  
  var options = {
    getValue: "name",
    url: function(phrase) {
      return "/search.json?q=" + phrase;
    },
    categories: [
      {
        listLocation: "movies",
        header: "<strong>Movies</strong>",
      }
    ],
    list: {
      onChooseEvent: function() {
        var urls = $input.getSelectedItemData().name
        var movieurl=$input.getSelectedItemData().url
         $input.val("")
         callAPI(urls,movieurl)
         /**/
       
      }
    }
  }

  $input.easyAutocomplete(options)
});

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

function callAPI (moviename,movieurls) {
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container ');
app.appendChild(container);

    var request = createCORSRequest("get", "http://www.omdbapi.com/?apikey=ff3a0d99&t="+moviename);
   
     if (request){
 
    request.onload = function(){
        //do something with request.responseText
      var data  = JSON.parse(request.responseText);
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
     
      const logo = document.createElement('img');
      logo.src = data.Poster;

      const h1 = document.createElement('h1');
      h1.textContent = data.Title;

      const p = document.createElement('p');
      p.textContent = "Released Date: "+data.Released;

      var btn = document.createElement("BUTTON");   // Create a <button> element
      btn.innerHTML = "Order Movie";                   // Insert text
       btn.addEventListener('click', function() { Turbolinks.visit(movieurls)});
      container.appendChild(card);
      card.appendChild(btn); 
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(logo);
   console.log(app)
       };
    request.send();
      }
    
    }
  