/*********************************************
 * Appel à l'api
 *********************************************/
function __callAPI() {
	//Premier argument doit être le nom de l'api a appeler
	var apiName = arguments [0];
	__debugDisplay("Appel de l'api : " + apiName);
	
	//2ème argument sont les paramètres de l'api
	var dataToSend = arguments [1];
	if (dataToSend == null) {
		dataToSend == "";
	}	
	//3ème argument une fonction de callback pour la réponse
	var callback = arguments[2];
	__debugDisplay(dataToSend);
	
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
					__debugDisplay('Retour = ' + response);
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
					__debugDisplay("Login Ok") ;
				} else {
					__debugDisplay("Erreur de login") ;
				}
			});
		} 
	});
}

/******************************************
 * Fonction qui retourne l'espace libre restant 
 ******************************************/
function __freeSpace() {
    __callAPI('freeSpace',null, function (response) {
		__debugDisplay("Espace libre : "+ response) ;
		return response ;
	});
}

/******************************************
 * Informations sur la file d'attente
 ******************************************/
function __getQueue(callback) {
    __callAPI('getQueue',null, function (response) {
		__debugDisplay("Informations : "+ JSON.stringify(response)) ;
		callback (response) ;
	});
}

/******************************************
 * Retrouve un pid à partir du nom
 ******************************************/
function __getPIDByName(PIDname, callback) {
	__getQueue(function(data){
		// Verification package par package
		for (var key in data) {
			var package = data[key];
			//Si la package a le bon nom
			if (PIDname == package.name) {
				__debugDisplay ("PID trouvé pour le package "+ PIDname + " : " + package.pid);
				if (callback != null) {
					callback(package.pid);
				}
				return package.pid ;
			}
		}
		//Aucun package avec ce nom
		if (callback != null) {
			callback(false);
		}
	}) ;
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