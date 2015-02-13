// JavaScript Document
var text = [
			'<span style="font-size:20px">The Netherlands and England</span> <br /><br/> Death Toll: 100,000. <br/>A combination of high tides and storms flooded the Thames and the Netherlands.',
			'<span style="font-size:20px">Huang He (Yellow) River, China</span> <br /><br/> Death Toll: 1,000,000<br/> to 3,700,000 The Huang He River is prone to flooding because of the broad expanse  of plain that lies around it. One of the major reasons for flooding is the high silt content that gives the river its yellow tint and its name.',
			'<span style="font-size:20px">E. Pakistan (now Bangladesh)</span> <br /><br/> Cyclone-generated floods inundate coastal regions. 300,000 - 500,000 lives lost',
			'<span style="font-size:20px">Central Europe</span> <br /><br/>The Oder River flood affected Poland, Germany, and the Czech Republic, taking the lives of 105-115 people (in Czech Republic and Poland) and causing material damages estimated at $4.5 billion.',
			'<span style="font-size:20px">North central Europe</span><br /><br/>Heavy summer rains <br/>in north central Europe bring on disastrous August flooding, with some 250,000 people directly affected and about $20 billion in damages.',
			'<span style="font-size:20px">U.S. Gulf Coast</span><br /><br/>Hurricane Katrina causes extensive flooding in Louisiana, Mississippi, and Alabama, with a storm surge in excess of 6 m (20 ft).<br/>The levees around New Orleans, La., are breached, and the entire city is flooded; most of the city\'s population was evacuated. In the region there were 1,193 people killed, with estimated damages of $60 billion.',
			'<span style="font-size:20px">Myanmar</span><br /><br/>The Irrawaddy delta area is pounded by Cyclone Nargis, the largest cyclone ever in the Bay of Bengal. The United Nations estimates that the storm severely affected 2.4 million people; about 146,000 people either die or are reported missing.',
			'<span style="font-size:20px">Philippines</span><br /><br/>Mudslides and the worst flooding in over 60 years occur after two tropical systems strike the island within a week. Tropical storm Ketsana dropped 42.4 cm (16.7 in), of rain in just 12 hours. Days later, slow-moving Typhoon Parma added another astounding 120.4 cm (47.4 in) of rain. President Gloria Arroyo declares a nationwide state of calamity. At least 3 million people are affected, and more than 540 die; damage exceeds $250 million.',
			'<span style="font-size:20px">Australia, Queensland</span><br /><br/>The floods forced the evacuation of thousands of people from towns and cities. At least 70 towns and over 200,000 people were affected. Total damage was estimated at around $11.5 billion.',
			'<span style="font-size:20px">Thailand</span><br /><br/>Severe flooding occurred during the 2011 monsoon season in Thailand, which saw the highest rainfall in the country in 50 years. Flooding soon spread along the Mekong and Chao Phraya river basins. In October floodwaters reached the Chao Phraya and inundated parts of Bangkok. Flooding resulted in a total of 815 deaths (with 3 missing) and 13.6 million people affected. The flooding produced the highest insured loss ever for freshwater flooding at $12 billion.'		
];

var slider;

var h = [];

var info = [];

var img = [];

var zoomDiv = null;

var zoomPic = null;

var zoomClose = null;

var closeDiv = null;

function openZoom(e){
	var obj = e.target;
	var n = parseInt(obj.id);
	zoomPic.src = img[n].src;
	document.body.appendChild(zoomDiv);
	setTimeout(function(){
		zoomDiv.style.opacity = 1;
	},100);
}

function createInfo(){
	for(i=0; i<10; i++){
		var img1 = document.createElement('img');
		var img2 = document.createElement('img');
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var div3 = document.createElement('div');
		closeDiv = document.createElement('img');
		closeDiv.className = 'closeDiv';
		closeDiv.id = i;
		closeDiv.src = 'img/close-button.png';
		div1.className = 'div';
		img1.className = 'view';
		img1.src = 'img/big/'+(i+1)+'.png';
		img2.className = 'zoom';
		img2.src = 'img/zoom.png';
		img2.id = i;
		img2.addEventListener('touchstart', openZoom, false);
		img2.addEventListener('click', openZoom, false);
		closeDiv.addEventListener('touchstart',CloseDivView, false);
		div2.className = 'info';
		div3.className = 'text_croll';
		div3.innerHTML = text[i];
		div2.appendChild(div3);
		div1.appendChild(img1);
		div1.appendChild(div2);
		div1.appendChild(img2);
		div1.appendChild(img2);
		div1.appendChild(closeDiv);
		info.push(div1);
	}
	for(var i=0; i< 10; i++){
		img[i] = new Image();
		img[i].src = 'img/full/'+(i+1)+'.jpg';
	}
	
	zoomDiv = document.createElement('div');
	zoomDiv.className = "zoomDiv";
	zoomDiv.style.opacity = 0;
	
	zoomPic = document.createElement('img');
	zoomPic.className = 'zoomPic';
	
	zoomClose = document.createElement('img');
	zoomClose.className = 'closeZoom';
	zoomClose.src = 'img/close-button.png';
	
	zoomClose.addEventListener('touchstart',function(){
		document.body.removeChild(zoomDiv);
		zoomDiv.style.opacity = 0;
	},false);
	
	zoomClose.addEventListener('click',function(){
		document.body.removeChild(zoomDiv);
		zoomDiv.style.opacity = 0;
	},false);
	
	zoomDiv.appendChild(zoomPic);
	zoomDiv.appendChild(zoomClose);
}

function CloseDivView(e){
	var obj = e.target;
	var n = parseInt(obj.id);
	slider.list[n].getElementsByTagName("ul")[1].removeChild(info[n]);
	slider.list[n].getElementsByTagName("ul")[0].style.width = slider.w + 'px';
	slider.list[n].getElementsByTagName("ul")[0].style.opacity = 1;
	slider.list[n].getElementsByTagName("ul")[1].style.width = '0px';
	slider.width = 1950;	
	//slider.mover.style.width = slider.width + 'px';
	slider.maxSlide = -606;
	slider.infoID = -1;
	console.log(parseInt(slider.slider.style.left));
	if(parseInt(slider.slider.style.left)< slider.maxSlide) slider.slider.style.left = '-606px';
}

function Slider(div,but){
	var my = this;
	my.mover = div;
	my.slider;
	my.list = [];
	my.count = 0;
	my.counter = 0;
	my.width =0;
	my.maxSlide;
	my.crollerWidth = 900;
	my.but = but;
	my.x;
	my.dx;
	my.w = 0;
	my.infoID = -1;
	my.isMove = false;
	my.isMouse = false;
	my.platformName;
	my.infoDiv = null;
	this.w;
	my.init = function(){		
		my.slider = my.mover.childNodes[1];
		my.list = my.slider.getElementsByTagName("li");
		my.count = my.list.length;
		my.w = my.list[0].clientWidth;
		for(var i=0; i < my.count;  i++){
			//my.list[i].id = i;			
			my.width = my.width + my.list[i].clientWidth;
		}
		//console.log(my.count);
		my.maxSlide = -597;
		//console.log(my.maxSlide);
		my.slider.style.width = '3000px';
		my.slider.style.left = '0px';
		my.platformName= navigator.platform;
		var n = my.but.length;
		for(var i=0; i< n;i++){
			my.but[i].id = i;
			if(my.platformName == 'iPad') my.but[i].addEventListener('touchstart',my.openInfo,false);
			else my.but[i].addEventListener('click',my.openInfo,false);
		}
		if(my.platformName == 'iPad'){
			document.getElementById("left").addEventListener('touchstart', my.next,false);
			document.getElementById('right').addEventListener('touchstart', my.pre,false);
			my.slider.addEventListener('touchstart', my.mouseDown,false);
			my.slider.addEventListener('touchmove', my.mouseMove,false);
			my.slider.addEventListener('touchend', my.mouseUp,false);
		}
		else{
			document.getElementById("left").addEventListener('click', my.next,false);
			document.getElementById('right').addEventListener('click', my.pre,false);
			//my.slider.addEventListener('mousedown', my.mouseDown,false);
			//my.slider.addEventListener('mousemove', my.mouseMove,false);
			//my.slider.addEventListener('mouseup', my.mouseUp,false);
		}
	};
	my.moveSlide = function(dx){
		// Move left
		if(dx<0){			
			if(my.counter >= my.count-1){
				my.counter = my.count-1;
				my.slider.style.left = my.maxSlide + 'px';
				return;
			}			
			my.width = my.list[my.counter].clientWidth;
			//console.log(my.width);
			var x = (parseInt(my.slider.style.left) - my.width);
			//var x = my.counter*my.w;
			if(x<my.maxSlide) {
				x = my.maxSlide;
				my.counter = my.count-1;
			}			
			my.slider.style.left = x + 'px';
			my.counter = my.counter + 1;
		}
		// Move right
		else if(dx>0){
			my.counter = my.counter - 1;
			if(my.counter < 0){
				my.counter = 0;
				my.slider.style.left = 0 + 'px';
				return;
			}			
			my.width = my.list[my.counter].clientWidth;
			
			var x = (parseInt(my.slider.style.left)+ my.width);
			if(x>0){
				x = 0;
				my.counter = 0;
			}	
			
			my.slider.style.left = x + 'px';			
		}
		//console.log(my.counter);
	};
	
	my.openInfo = function(e){
		var obj = e.target;
		var n = parseInt(obj.id);
		if(n==NaN) return;
		var width = my.list[n].getElementsByTagName("ul")[1].clientWidth;
		if(width==0){
			// Close old info 
			if(my.infoID>=0){
				my.list[my.infoID].getElementsByTagName("ul")[1].removeChild(my.infoDiv);
				my.list[my.infoID].getElementsByTagName("ul")[0].style.width = my.w + 'px';
				my.list[my.infoID].getElementsByTagName("ul")[0].style.opacity = 1;
				my.list[my.infoID].getElementsByTagName("ul")[1].style.width = '0px';
				
				
			}
			my.list[n].getElementsByTagName("ul")[0].style.width = '0px';
			my.list[n].getElementsByTagName("ul")[1].style.width = '590px';
			//my.slider.style.width = (parseInt(my.slider.style.width)+3*my.w) + 'px';
			my.list[n].getElementsByTagName("ul")[0].style.opacity = 0;
			
			// Update width and max slide
			my.width = 1950;
			my.maxSlide = -1049;
			//my.slider.style.width = my.width + 'px';
			my.infoID = n;	
			var str = 'n='+n;
			console.log(str);
			if(n==9) {
				my.counter = 7;
				my.slider.style.left =(-1055)+'px';
			}
			else if(n==8) {
				my.counter = 6;
				my.slider.style.left =(-900)+'px';
			}
			else if(n==7){
				my.counter = 6;
				my.slider.style.left = (-my.w*my.infoID-5) +'px';
			}
			else my.slider.style.left = (-my.w*my.infoID-5) +'px';
			
			my.infoDiv = info[n];
			my.infoDiv.style.opacity = 0;
			setTimeout(function(){
				my.list[n].getElementsByTagName("ul")[1].appendChild(my.infoDiv);				
			},500,my);
			setTimeout(function(){
				my.infoDiv.style.opacity=1;				
			},1000,my);
		}
	};
	my.nextBack = function(dx){
		if(my.infoID>=0){
			my.list[my.infoID].getElementsByTagName("ul")[1].removeChild(my.infoDiv);
			my.list[my.infoID].getElementsByTagName("ul")[0].style.width = my.w + 'px';
			my.list[my.infoID].getElementsByTagName("ul")[0].style.opacity = 1;
			my.list[my.infoID].getElementsByTagName("ul")[1].style.width = '0px';
		}
		my.width = 1600;
		//my.slider.style.width = my.width + 'px';
		my.maxSlide = -602;
		my.infoID = -1;
		// Move left
		if(dx<0){
			if(my.counter==4) return;
			if(my.counter< 4) my.counter = my.counter+1;
			var n = (parseInt(my.slider.style.left)-149);
			if(n<-602){
				n = -602;
				document.getElementById('left').style.opacity=0.3;
				document.getElementById('right').style.opacity=1;
				my.counter=4;
			}
			my.slider.style.left = n + 'px';
		}
		// Move right
		else if(dx>0){
			if(my.counter==0) return;
			my.counter = my.counter-1;
			var n = (parseInt(my.slider.style.left)+149) ;
			if(n<-602){
				n = -602;
				document.getElementById('right').style.opacity=0.3;
				document.getElementById('left').style.opacity=1;
				my.counter=0;
			}
			my.slider.style.left = n + 'px';
		}
		var obj = my.but[my.counter];		
		obj.classList.remove('close');		
	};
	my.next = function(){
		my.nextBack(-1);
		console.log(my.counter);
		if(my.counter==4) {
			document.getElementById('left').style.opacity=0.3;
			document.getElementById('right').style.opacity=1;
		}
		else {
			document.getElementById('left').style.opacity=1;
			document.getElementById('right').style.opacity=1;
		}
	};
	my.pre = function(){
		my.nextBack(1);
		if(my.counter==0) {
			document.getElementById('right').style.opacity=0.3;
			document.getElementById('left').style.opacity=1;
		}
		else{
			document.getElementById('right').style.opacity=1;
			document.getElementById('left').style.opacity=1;
		}
	};
	my.mouseDown = function(e){
		e.preventDefault();
		my.isMouse = true;
		if(my.platformName=='iPad'){
			my.x = e.changedTouches[0].clientX;
		}
		else{
			my.x = x = e.clientX;
		}
	};
	my.mouseMove = function(e){
		e.preventDefault();
		if(my.platformName=='iPad'){
			var x = e.changedTouches[0].clientX;
		}
		else{
			if(my.isMouse==false) return;
			var x = x = e.clientX;
		}
		my.dx = x - my.x;
		if(Math.abs(my.dx)>90){
			my.x = x;
			my.moveSlide(my.dx);
			my.isMove = true;
		}
	};
	my.mouseUp = function(e){
		my.isMouse = false;
		if(my.isMove==true){
			var n = (my.slider.offsetLeft)%my.w;
			if(n==0) return;
		}
		my.moveSlide(my.dx);
		my.isMove = false;
	};	
	my.init();	
}