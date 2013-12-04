function close_win(){
if(location.href.lastIndexOf("battle") > -1){
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
		send_start();
		var arr = document.links;
		for(var i=arr.length; i--;){
			if(arr[i].innerHTML.lastIndexOf("button_livebattle.jpg") > -1)
			location.href=arr[i].href;
		}
	}else if(key_code == 39){
		send_next();
	}else if(key_code == 37){
		send_prev();
	}
	console.log(document.links.length);
		//ask_todo();
	}
};

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
function send_next(){
	chrome.extension.sendRequest({req: "next"},function(response){
		location.href = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fprofile%2Fshow%2F" + response.id;
	});
}
function send_prev(){
	chrome.extension.sendRequest({req: "prev"},function(response){
		location.href = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fprofile%2Fshow%2F" + response.id;
	});
}
function ask_todo(){
chrome.extension.sendRequest({req: "ask",href: location.href},function(response){
if(response.ans == "do")
{  console.log("done");
try{
document.forms[0].elements[0].click();
}catch(e){
console.log(e);
send_reset();
}
//location.reload();

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
location.href = "http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fprofile%2Fshow%2F" + response.id;
}
else console.log("no");
});
}

window.addEventListener("DOMContentLoaded", function(){
if(location.href.lastIndexOf("battle") > -1)
	ask_todo();
else send_reset();
if(location.href.lastIndexOf("present") > -1)
	document.getElementById("chks_change").click();
}, false);

function Sleep( T ){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1+1000*T ){    //T秒待つ 
       d2=new Date().getTime(); 
   } 
   return; 
} 
