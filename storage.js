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
