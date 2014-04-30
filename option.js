var ur
function save(){
    var index = document.getElementById("index").value;
    setData(index);
    setCheck("check", document.getElementById("box").checked);
    setCheck("auto", document.getElementById("autobox").checked);
    //init();
}
function restore(){
    var index = getData();
    console.log(index);
    document.getElementById("index").value = index;
    var bg = chrome.extension.getBackgroundPage();
    var id = bg.getId();
    console.log(id);
    var str = "";
    if(id=="wait") {
	str = "Loading";
    }
    else {
	ur = 'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fprofile%2Fshow%2F' + id;
	str = '<input type="button" id="goto" value="go to dojo" style="width: 160px; height: 80px;" />';
    }
    document.getElementById("dojo").innerHTML = str;
    
    var check = getCheck("check");
    document.getElementById("box").checked = check;
    setCheck("check", check);

    var auto = getCheck("auto");
    document.getElementById("autobox").checked = auto;
    setCheck("auto", auto);
}
function reset(){
    setData(0);
    chrome.extension.getBackgroundPage().reload();
    init();
}
function init(){
    restore();
    document.getElementById("goto").addEventListener('click', function(){chrome.tabs.create({url:ur},void(0));},false);
}

window.onload = function(){
    document.getElementById("save").addEventListener('click', save, false);
    document.getElementById("reset").addEventListener('click', reset, false);
    document.getElementById("next").addEventListener('click', function(){
	document.getElementById("index").value++;
	save();
	init();
    },false);
    document.getElementById("prev").addEventListener('click', function(){
	document.getElementById("index").value--;
	save();
	init();
    },false);
    document.getElementById("check").addEventListener('click', toggleCheck("box") , false);
    document.getElementById("box").addEventListener('click', toggleCheck("box"), false);
    document.getElementById("automode").addEventListener('click',toggleCheck("autobox"), false);
    document.getElementById("autobox").addEventListener('click',toggleCheck("autobox"), false);
    init();
};

function toggleCheck(id){
    return function(evt) {
	var checkbox = document.getElementById(id);
	checkbox.checked = !checkbox.checked;
	save();
    }
}
