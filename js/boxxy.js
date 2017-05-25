$(document).ready(function() {
  $("boxview").load("boxes", function() {
    var linkString = $('boxview').text();
    $('boxview').empty();
    var linkArray = linkString.split("\n");
    var i;
    var linkbox = 1;
    var column = 1;
    var html = '';

    for(i in linkArray) {
      var line = jQuery.trim(linkArray[i]);
      var lineType = line.substr(0,1)

      if(!line) {
        continue;
      } else switch (lineType) {
        case "&":
          if(column > 1) { html += '</ul></div></div>'; };
          var splitLine = line.substr(2).split(' | ');
          var columnWidth = splitLine[0];
          linkbox = 1;
          column += 1;
          html += '<div class="column col-' + columnWidth + '">';
          continue;
        case "#":
          if(linkbox > 1) { html += '</ul></div>'; }
          linkbox += 1
          html += '<div class="box"><h1>' + line.substr(2) + '</h1><ul><br/>';
          continue;
        case "@":
          var splitLine = line.substr(2).split(' | ');
          var url = splitLine[0];
          var title = splitLine[1];
          html += '[<a href="' + url + '"target="_blank">' + title + '</a>]<br>';
          continue;
        case "?":
          // continue;
          var temp = localStorage.getItem("savedStorage");
          if(temp) {
            if(linkbox > 1) { html += '</ul></div>'; }
            linkbox += 1
            html += '<div class="box"><h1>temp [<a href="wip-cache/"target="_blank"> &gt </a>]<br></h1><ul><br/>';
            var tempLinkArray = temp.split("\n");
            for(i in tempLinkArray) {
              var line = jQuery.trim(tempLinkArray[i]);
              var lineType = line.substr(0,1)
              if(!line) {
                continue;
              } else {
                  var splitLine = line.substr(2).split(' | ');
                  var url = splitLine[0];
                  var title = splitLine[1];
                  html += '[<a href="' + url + '"target="_blank">' + title + '</a>]<br>';
                  continue;
                }};
          };
        default:
          continue;
      };
    };

    html = html + '</ul></div></div>';
    $('boxview').append(html);
    $('ul').slideUp(0);
    $(".box").delegate('a', 'click', function(e) {
      e.stopImmediatePropagation(); } ).click(function() {
        if ( $('ul', this).is( ":hidden" ) ) {
          $('ul', this).slideDown(80);
        } else {
          $('ul', this).slideUp(80);
        }
    });
  });
});
