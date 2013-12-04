var table;
function callback(response){
          if (response.isError()) {
            alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
          }

        var data = response.getDataTable();
	table = data;
}
google.setOnLoadCallback(function(){
console.log("loaded");
var query = new google.visualization.Query("https://spreadsheets.google.com/a/google.com/tq?key=0AprwHw_VarWwdHc4QmpBNnBCdThpUERGVk1DQnVVYkE");
query.setQuery('select C where C IS NOT NULL ORDER BY A DESC LIMIT 1000');
query.send(callback);
});
google.load('visualization', '1');

var num = -1;
var back = -1;
var url = "";
var iter = parseInt(getData(),10);

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
	             "from a content script:" + sender.tab.url :
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
		sendResponse({});

  	  }else
   	   	sendResponse({}); // snub them.
 	 }
);
