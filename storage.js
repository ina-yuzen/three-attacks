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
function setCheck(index, flag){
	localStorage.setItem(index, flag);
	var bg = chrome.extension.getBackgroundPage();
	if (index == "check") bg.isCheck = flag;
    else if (index == "auto") bg.isAutomode = flag;
}
function getCheck(index){
	try{
		var check = localStorage.getItem(index);
		if(check) return (check === 'true');
		else return false;
	} catch(e) {
		return false;
	}
}
