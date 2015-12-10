/******************************************
 * Fonction qui parse une page ZT
 ******************************************/
function __parseZTWebpage(hostName) {
	var rightHost = false;
	//Selection des liens et des hosts de la page
	$( '.maincont .contentl a, .maincont .contentl span:not(.helphbtn) ' ).each(function( index ) {
		console.log( index + ": " + $( this ).text() );
		//Si c'est un host rechercher si c'est celui que l'on parse
		if ($(this).prop("tagName") == 'SPAN') {
			if ($( this ).text() == hostName) {
				rightHost = true;
			} else {
				rightHost = false;
			}
		}
		//Si c'est un lien et qu'il appartient au bon host, y ajouter un bouton
		if (($(this).prop("tagName") == 'A') && rightHost) {
			__addPyloadLink($(this));
		}

	});
}

/******************************************
 * Fonction qui ajoute un bouton pyload à
 * la suite du lien
 ******************************************/
function __addPyloadLink(link) {
	link.after('<button class="pyloadLink"></button>');
}