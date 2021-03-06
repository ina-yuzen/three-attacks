function decrypt(s) {
    return decodeURIComponent(escape(window.atob(s)));
}

var query = 'P2d1aWQ9T04mdXJsPWh0dHAlM0ElMkYlMkYxMjUuNi4xNjkuMzUlMkZpZG9sbWFzdGVyJTJGcHJvZmlsZSUyRnNob3clMkY=';
var domain = decrypt('aHR0cDovL3NwLnBmLm1iZ2EuanAvMTIwMDgzMDUv') + decrypt(query);

function close_win(){    if(location.href.lastIndexOf("battle") > -1){
	var nvua = navigator.userAgent;
	if(nvua.indexOf('MSIE') >= 0){
	    if(nvua.indexOf('MSIE 5.0') == -1) {
		top.opener = '';
	    }
	}
	else if(nvua.indexOf('Gecko') >= 0){
	    top.name = 'CLOSE_WINDOW';
	    wid = window.open('','CLOSE_WINDOW');
	}
	top.close();
    }
}

document.onkeyup = function(e){
    if(location.href.lastIndexOf("profile") > -1){
	// キーコード
	var key_code = e.keyCode;
	// Shiftキーの押下状態
	//var shift_key = e.shiftKey;
	// Ctrlキーの押下状態
	//var ctrl_key = e.ctrlKey;
	// Altキーの押下状態
	//var alt_key = e.altKey;
	if(key_code == 13){
	    send_startAuto();
	    //start_battle();
	}else if(key_code == 39){
	    send_next();
	}else if(key_code == 37){
	    send_prev();
	}
	console.log(document.links.length);
	//ask_todo();
    }
};

function start_battle(isAutomode){
    console.log(isAutomode);
    if (typeof isAutomode === 'undefined') isAutomode = false;
    if (!(isAutomode && !available_checking())) {
	send_start();
    } else {
	send_next();
	return;
    }
    var arr = document.links;
    for(var i=arr.length; i--;){
	if(arr[i].innerHTML.lastIndexOf("button_livebattle") > -1)
	    location.href=arr[i].href;
    }
}

function send_reset(){
    chrome.extension.sendRequest({req: "reset"},function(response){
	return;
    });
}

function send_start(){
    chrome.extension.sendRequest({req: "start"},function(response){
	console.log(response.ans);
    });
}
function send_startAuto(){
    console.log("startauto");
    chrome.extension.sendRequest({req: "startAuto"},function(response){
	console.log(response.ans);
	//console.log(response.ans === "true");
	start_battle(response.ans);
	return;
    });
}
function send_next(){
    chrome.extension.sendRequest({req: "next"},function(response){
	location.href = domain + response.id;
    });
}
function send_prev(){
    chrome.extension.sendRequest({req: "prev"},function(response){
	location.href = domain + response.id;
    });
}
function ask_auto(){
    chrome.extension.sendRequest({req: "auto"},function(response){
	if (response.ans == "yes") {
	    start_battle(true);
	}
    });
}
function ask_todo(){
    chrome.extension.sendRequest({req: "ask",href: location.href},function(response){
	if(response.ans == "do")
	{  console.log("done");
	   try{
	       var elements = document.getElementsByClassName("red_mild");
	       console.log("get element");
	       for (var i = 0; i < elements.length; i++) {
		 if (elements[i].textContent.indexOf(decrypt('4oC75ZCM44GY44OX44Ot44OH44Ol44O844K144O844Go44Gv44CBMeaXpTPlm57jgb7jgafjgZfjgYtMSVZF44OQ44OI44Or44Gn44GN44G+44Gb44KT')) > -1) {
		       console.log("no more rest");
		       send_reset();
		       send_next();
		       return;
		   }
	       }
                 if ($('h3.title_hanyo').children(decrypt('OmNvbnRhaW5zKCLmlLvjgrPjgrnjg4jjgYzotrPjgorjgb7jgZvjgpMiKQ==')).length) {
	       send_reset();
	       return;
             }
	     document.forms[0].querySelector('input[type=submit]').click();
	   }catch(e){
	       console.log(e);
	       send_reset();
	   }
	}
	else if(response.ans == "back"){
	    console.log("back");
	    //history.back();
	    location.href = response.href;
	}
	else if(response.ans == "reload"){
	    location.reload();
	}
	else if(response.ans == "close"){
	    location.href = domain + response.id;
	}
	else console.log("no");
    });
}

window.addEventListener("DOMContentLoaded", function(){
    if(location.href.lastIndexOf("battle") > -1){
      window.onload = function () {};
	if (location.href.lastIndexOf("flash") < 0) // skip loading flash
	ask_todo();
    } else {
	send_reset();
    }
    if(location.href.lastIndexOf("profile") > -1)
	ask_auto();
    if(location.href.lastIndexOf("present") > -1){
	var isCheck = false;

	chrome.extension.sendRequest({req: "check"},function(response){
	    isCheck = (String(response.ans) == 'true');
	    if (!isCheck) {
		var element = document.querySelector(".chks_change");
		element.click();
	    }
	});
    }
    //	document.getElementById("chks_change").click();
}, false);

function getUnitName() {
    return document.getElementsByClassName("title_tenhoshi")[0].textContent;
}
function getIntroduction() {
    var elements = document.getElementsByTagName("div");
    var i = 0;
    while (i < elements.length) {
	if (elements[i].textContent == "自己紹介") break;
	i++;
    }
    return elements[i+1].textContent;
}

function available_checking(){
    var unitName = getUnitName();
    var introduction = getIntroduction();
    var names = unitName + "\n" + introduction;
    var xClosed = !(names.indexOf("休業") > -1 
		   || names.indexOf("休止") > -1
		    || names.indexOf("作業") > -1);
    var ngWords = names.indexOf("もふもふ道場") > -1;

    var strengths = extractNums(names);
    
    var under6000 = false;
    for (var i = 0; i < strengths.length; i++) {
	var str = strengths[i];
	//console.log(i + " : " + str);
	if (str === null) continue;
	var j = parseFloat(str);
	if (str.lastIndexOf("k") > -1) j *= 1000;
	if (j < 1000) continue;
	else if (j > 6000) {
	    under6000 = false;
	    break;
	} else {
	    under6000 = true;
	}
    }
    console.log("under6000: " + under6000);

    return xClosed && under6000 && !ngWords;
}

function extractNums( str ){
// return [3500, 10k, 3.5k], for example.
    var num = new String( str ).match(/\d+(.\d+[kK])?[kK]?/g);
    if (num === null) num = [];
    return num;
};

if(location.href.lastIndexOf("battle") > -1 && location.href.lastIndexOf("flash") > -1) 
    ask_todo();
