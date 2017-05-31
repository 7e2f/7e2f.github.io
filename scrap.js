
var styletag=document.createElement('style')
var stylecontent=document.createTextNode(".box {background-image: url('/style/img/woven.png');}");
styletag.appendChild(stylecontent)
document.getElementsByTagName("head")[0].appendChild(styletag)


var hs = document.getElementsByTagName('style');
for (var i=0, max = hs.length; i <= max; i++) {
    hs[i].parentNode.removeChild(hs[i]);
}
