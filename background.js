var table;
function callback(response){
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	sendRequestToGoogle();
        return;
    }

    var data = response.getDataTable();
    table = data;
}

function sendRequestToGoogle(){
	console.log("requesting");
	var query = new google.visualization.Query("https://spreadsheets.google.com/a/google.com/tq?key=0AprwHw_VarWwdHc4QmpBNnBCdThpUERGVk1DQnVVYkE");
	query.setQuery('select C where C IS NOT NULL ORDER BY A DESC LIMIT 1000');
	query.send(callback);
}
google.setOnLoadCallback(sendRequestToGoogle);
google.load('visualization', '1');

var num = -1;
var back = -1;
var url = "";
var autoTabId = null;
var iter = parseInt(getData(),10);
var isCheck = getCheck("check");
var isAutomode = getCheck("auto");

function getId(){
    console.log(iter);
    if(table) {
	console.log(table.getValue(iter,0));
	var ret = table.getValue(iter,0);
	return ret;
    }
    else return "wait";
}
function reload(){
    var query = new google.visualization.Query("https://spreadsheets.google.com/a/google.com/tq?key=0AprwHw_VarWwdHc4QmpBNnBCdThpUERGVk1DQnVVYkE");
    query.setQuery('select C where C IS NOT NULL ORDER BY A DESC LIMIT 1000');
    query.send(callback);
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
	console.log(sender.tab ?
	            "from a content script:" + sender.tab.id :
      		    "from the extension");
	if (request.req == "start"){
	    sendResponse({ans: "goodbye"});
	    num = 3;
	    back = 0;

	}else if(request.req == "next"){
	    iter++;
	    setData(iter);
	    sendResponse({ans: "ok" ,id: table.getValue(iter,0)});
	}else if(request.req == "prev"){
	    iter--;
	    setData(iter);
	    sendResponse({ans: "ok" ,id: table.getValue(iter,0)});
	}else if(request.req == "ask"){
	    if(num > 0 && back == 0){
		url = request.href;
		sendResponse({ans: "do"});
		num--;
		back = 2;
	    }else if(num == 0){
		num = -1;
		back = -1;
		url = "";
		iter++;
		setData(iter);
		sendResponse({ans: "close" ,id: table.getValue(iter,0)});
	    }else if(back == 2){
		sendResponse({ans: "back",href: url});
		back=0;
	    } else if(back == 1){
		sendResponse({ans: "reload"});
		back--;
	    }  else sendResponse({ans: "no"});
	}else if(request.req == "reset"){
	    num = -1;
	    back = -1;
	    url = "";
	    //autoTabId = null;
	    sendResponse({});
	}else if (request.req == "check"){
	    sendResponse({ans: isCheck});
	}else if (request.req == "auto") {
	    if (autoTabId == sender.tab.id && isAutomode) {
		sendResponse({ans: "yes"});
	    } else {
		autoTabId = null;
		sendResponse({ans: "no"});
	    }
	}else if(request.req == "startAuto") {
	    autoTabId = sender.tab.id;
	    sendResponse({ans: "startauto"});
	}else if(request.req == "stopAuto") {
	    autoTabId = null;
	    sendResponse({ans: "stopauto"});
  	}else
   	    sendResponse({}); // snub them.
    }
);
