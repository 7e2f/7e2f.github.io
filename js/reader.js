$(document).ready(function() {
    var pageFile = location.search.split('page=')[1] ? location.search.split('page=')[1] : 'null';
    $("#pageview").load("../../reader/pages/" + pageFile, function() {
      document.getElementById("pageview").innerHTML = marked(document.getElementById("pageview").innerHTML);
      document.title = pageFile;
      Prism.highlightAll();
    });
});
