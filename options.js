$(document).ready(function() {
	/****************************************
	 * Récupération des options si elles existent déjà
	 ****************************************/
	chrome.storage.local.get(function(result){
		if(result.pyload_login == null || result.pyload_passwd == null || result.pyload_ip == null || result.pyload_port == null) {
			chrome.storage.local.clear();
		} else {
			$("#login").val(result.pyload_login);
			$("#passwd").val(result.pyload_passwd);
			$("#ip").val(result.pyload_ip);
			$("#port").val(result.pyload_port);
			$("#host").val(result.pyload_host);
		}
	});
	
	/****************************************
	 * Sauvegarde des paramètres
	 ****************************************/
	$("#save").click(function(e) {
		e.preventDefault();
		if($.trim($("#login").val()) == '' || $.trim($("#passwd").val()) == '' || $.trim($("#ip").val()) == '' || $.trim($("#port").val()) == '') {
			setNotif('images/error.png', 'PyLoad', 'Vous devez remplir les champs');
		} else {
			var loginLS  = $.trim($("#login").val());
			__addToChromeStorage('pyload_login', loginLS);

	        var passwdLS  = $.trim($("#passwd").val());
			__addToChromeStorage('pyload_passwd', passwdLS);

        	var ipLS      = $.trim($("#ip").val());
			__addToChromeStorage('pyload_ip', ipLS );
	        
        	var portLS    = $.trim($("#port").val());
			__addToChromeStorage('pyload_port', portLS);

	        var api_urlLS = 'http://' + ipLS + ':' + portLS + '/api/';
			__addToChromeStorage('pyload_api', api_urlLS);

	        var api_hostLS = $.trim($("#host").val());
			__addToChromeStorage('pyload_host', api_hostLS);
		}
	});

	/****************************************
	 * Test de la connexion au serveur
	 ****************************************/
	$("#test").click(function(e) {
		e.preventDefault();
		//TODO Tester la connexion au serveur
		if($.trim($("#login").val()) == '' || $.trim($("#passwd").val()) == '' || $.trim($("#ip").val()) == '' || $.trim($("#port").val()) == '') {
	        var sessidLS = true ;//__connect(loginLS, passwdLS);
	        if(sessidLS) {
	        	chrome.storage.local.set({'pyload_sessid': sessidLS});

	        	$("#login, #passwd").val('');
	        	$("#affichelogin").html(loginLS);
	        	$("#serveur").html(ipLS + ':' + portLS);

				$(".connexion").hide();
				$(".deconnexion").show();

	        	setNotif('images/pyload_128.png', 'PyLoad', "Vous êtes connecté à l'API de PyLoad.");
	        } else {
	        	setNotif('images/error.png', 'PyLoad', "Impossible de se connecter à l'API de PyLoad. Vérifiez les options.");
	        }
		}
	});

	/************************************
	 * Fonction de déconnexion (inutilisé pour le moment)
	 ************************************/
	$("#deconnexion").click(function(e) {
		e.preventDefault();

		chrome.storage.local.clear();
	});
});