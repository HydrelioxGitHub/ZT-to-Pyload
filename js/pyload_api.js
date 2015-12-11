/*********************************************
 * Appel à l'api
 *********************************************/
function __callAPI() {
	//Premier argument doit être le nom de l'api a appeler
	var apiName = arguments [0];
	console.log("Appel de l'api : " + apiName);
	
	//2ème argument sont les paramètres de l'api
	var dataToSend = arguments [1];
	if (dataToSend == null) {
		dataToSend == "";
	}	
	//3ème argument une fonction de callback pour la réponse
	var callback = arguments[2];
	console.log(dataToSend);
	
	//Récupération de l'url de l'api 
	chrome.storage.local.get(function(result){
		if(result.pyload_api == null ) {
			throw "No API url configurée vérifier les options";
		} else {
			var urlToCall =  result.pyload_api + apiName ;
			//Appel ajax 
			$.ajax({
				url: urlToCall,
				type: 'post',
				dataType: "json",
				data: dataToSend,
				success: function(response) {
					console.log('Retour = ' + response);
					if (callback != null) {
						callback(response);
					}
				},
				error: function(response) {
					return response;
				}
			});
		} 
	});
};

/******************************************
 * Fonction qui se connecte à l'api PyLoad
 ******************************************/
function __connect() {
	chrome.storage.local.get(function(result){
		if( (result.pyload_login == null) || (result.pyload_passwd== null) ) {
			throw "Pas de login ou de mot de passe, vérifier les options";
		} else {
			var credentials = {
				username: result.pyload_login,
				password: result.pyload_passwd
			} ;
			__callAPI('login',credentials, function (response) {
				if (response = true) {
					console.log("Login Ok") ;
				} else {
					console.log("Erreur de login") ;
				}
			});
		} 
	});
}

/******************************************
 * Fonction qui retourne l'espace libre restant 
 ******************************************/
function __freeSpace() {
	__callAPI('freeSpace');
}

/**********************************************
 * Fonction qui ajoute un package et des liens
 **********************************************/
function __addPackage(name, links) {
    if(check()) {
        /*$.ajax({
            url: api_url + 'addPackage',
            type: 'post',
            data: 'name=' + name + '&links=' + links,
            success: function(response) {
                console.log('package added');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });*/
        return 123;
    } else {
        return false;
    }
}



/*********************************************
 * Fonction qui ajoute des liens à un package
 *********************************************/
function __addFiles(pid, links) {
    if(check()) {
        /*$.ajax({
            url: api_url + 'addFiles',
            type: 'post',
            data: 'pid=' + parseInt(pid, 10) + '&links=' + links,
            success: function(response) {
                console.log('links added to package');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });*/
        return true;
    } else {
        return false;
    }
}

/****************************************
 * Fonction récup les infos d'un package
 ****************************************/
function __getPackageInfo(pid) {
    if(check()) {
        $.ajax({
            url: api_url + 'getPackageInfo',
            type: 'post',
            data: 'pid=' + parseInt(pid, 10),
            success: function(response) {
                console.log('get package info');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/******************************************
 * Fonction récup les données d'un package
 ******************************************/
function __getPackageData(pid) {
    if(check()) {
        $.ajax({
            url: api_url + 'getPackageData',
            type: 'post',
            data: 'pid=' + parseInt(pid, 10),
            success: function(response) {
                console.log('get package data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/******************************************
 * Fonction récup les données d'un fichier
 ******************************************/
function __getFileData(fid) {
    if(check()) {
        $.ajax({
            url: api_url + 'getFileData',
            type: 'post',
            data: 'fid=' + fid,
            success: function(response) {
                console.log('get file data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/**************************************************
 * Fonction récup la liste des packages en attente
 **************************************************/
function __getQueue() {
    if(check()) {
        /*$.ajax({
            url: api_url + 'getQueue',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });*/
        
        var array = [
            {
                "name": "Films",
                "pid": 1,
                "sizetotal": 734003200,
                "sizedone": 176160768
            },
            {
                "name": "Musiques",
                "pid": 2,
                "sizetotal": 68157440,
                "sizedone": 28626124
            },
            {
                "name": "Séries TV",
                "pid": 3,
                "sizetotal": 367001600,
                "sizedone": 330301440
            }
        ];

        return array;
    } else {
        return false;
    }
}



/******************************************************************
 * Fonction récup la liste des packages et leur données en attente
 ******************************************************************/
function __getQueueData() {
    if(check()) {
        $.ajax({
            url: api_url + 'getQueueData',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/***********************************************
 * Fonction récup le statut des téléchargements
 ***********************************************/
function __statusDownloads() {
    if(check()) {
        $.ajax({
            url: api_url + 'statusDownloads',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}



/**************************************
 * Fonction récup le statut du serveur
 **************************************/
function __statusServer() {
    if(check()) {
        $.ajax({
            url: api_url + 'statusServer',
            type: 'post',
            data: '',
            success: function(response) {
                console.log('get queue data');
                return response;
            },
            error: function(response) {
                console.log(response);
                return false;
            }
        });
    } else {
        return false;
    }
}