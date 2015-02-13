// JavaScript Document
var t = false;
function test(){
	if(t==false){
		document.getElementById("timeline").style.width = '1950px';
		t = true;
	}
	else{
		document.getElementById("timeline").style.width = '1493px';
		t = false;
	}
}
window.onload = function(){
	var div = document.getElementById("Croller");
	var but = document.getElementsByClassName("but");
	document.body.addEventListener('touchmove',function(e){
		e.preventDefault();
	},false)
	//var test = document.
	slider = new Slider(div,but);
	createInfo();
	//document.body.addEventListener('click',test,false);
	//myScroll = new iScroll('Croller');	
};