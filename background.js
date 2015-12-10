var main = $( "div.maincont" ); 
var title = $("div.titrearticles", main).text()
console.log (title);

//__parseZTWebpage ("1fichier");

var api_url = 'http://192.168.1.11:8000/api/';
var username = 'julien';
var password = 'gTV7y5T';
var res = __connect(api_url, username, password);
console.log(res);
var test = __freeSpace(api_url);
console.log(test);	