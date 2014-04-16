function setData(index){
	localStorage.setItem("index",index);
	var bg = chrome.extension.getBackgroundPage();
	bg.iter = parseInt(index,10);
}
function getData(){
	try{
		var index = localStorage.getItem("index");
		if(index) return index;
		else return 0;
	}catch(e){
		console.log("sita");
		return 0;
	}
}
function setCheck(flag){
	localStorage.setItem("check", flag);
	var bg = chrome.extension.getBackgroundPage();
	bg.isCheck = flag;
}
function getCheck(){
	try{
		var check = localStorage.getItem("check");
		if(check) return (check === 'true');
		else return false;
	} catch(e) {
		return false;
	}
}
