

var temp = localStorage.getItem("localCSS");

if(temp) {
  var styletag=document.createElement('style')
  var stylecontent=document.createTextNode(temp);
  styletag.appendChild(stylecontent)
  document.getElementsByTagName("head")[0].appendChild(styletag)

}
