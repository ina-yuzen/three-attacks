var ur
var bg = chrome.extension.getBackgroundPage();

function save(){
    var index = document.getElementById("index").value;
    setData(index);
    setCheck("check", document.getElementById("box").checked);
    setCheck("auto", document.getElementById("autobox").checked);
}

function restore(){
    var index = getData();
    console.log(index);
    document.getElementById("index").value = index;
    var id = bg.getId();
    console.log(id);
    var str = "";
    if(id=="wait") {
	document.getElementById("dojo").innerHTML =  "Loading";
    }
    else {
	var dojo_element = document.getElementById("dojo");
	dojo_element.innerHTML = '<input type="button" id="goto" value="go to dojo" style="width: 160px; height: 80px;" />';
	dojo_element.children.goto.addEventListener('click', bg.go_to_dojo, false);
    }
    
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
    restore();
}

window.onload = function(){
    bg.dojo_element = document.getElementById("dojo");
    document.getElementById("index").addEventListener('keypress', bg.go_to_dojo_by_enter, false);
    document.getElementById("save").addEventListener('click', save, false);
    document.getElementById("reset").addEventListener('click', reset, false);
    document.getElementById("next").addEventListener('click', function(){
	document.getElementById("index").value++;
	save();
    },false);
    document.getElementById("prev").addEventListener('click', function(){
	document.getElementById("index").value--;
	save();
    },false);
    document.getElementById("check").addEventListener('click', toggleCheck("box") , false);
    document.getElementById("box").addEventListener('click', toggleCheck("box"), false);
    document.getElementById("automode").addEventListener('click',toggleCheck("autobox"), false);
    document.getElementById("autobox").addEventListener('click',toggleCheck("autobox"), false);
    var goto_element = document.getElementById("goto");
    if (goto_element != null) {
	goto_element.addEventListener('click', go_to_dojo(), false);
    }
    restore();
};

function toggleCheck(id){
    return function(evt) {
	var checkbox = document.getElementById(id);
	checkbox.checked = !checkbox.checked;
	save();
    }
}

bg.go_to_dojo = function go_to_dojo() {
    save();
    if (bg.table != null) {
	var url = 'http://sp.pf.mbga.jp/12008305/?guid=ON&url=http%3A%2F%2F125.6.169.35%2Fidolmaster%2Fprofile%2Fshow%2F' + bg.table.getValue(parseInt(document.getElementById("index").value), 0);
	chrome.tabs.create({url:url},void(0));
    }
}

bg.go_to_dojo_by_enter = function(e) {
    if (e.keyCode == 13) bg.go_to_dojo();
}
