var initScroll = -597;
var initWidth = 1498;
var pos = [0,-146,-297,-445,-592,-741,-889,-1035,-891,-1039];
var _posLink = [0,-149,-298,-445,-596,-596,-596,-596,-591,-592];
var maxScroll = -1043;
var maxWidth = 1937;
var scroll;
var left;
var right;

var text = [
			'<span style="font-size:20px">The Netherlands and England</span> <br /><br/> Death Toll: 100,000. <br/>A combination of high tides and storms flooded the Thames and the Netherlands.',
			'<span style="font-size:20px">Huang He (Yellow) River, China</span> <br /><br/> Death Toll: 1,000,000<br/> to 3,700,000 The Huang He River is prone to flooding because of the broad expanse  of plain that lies around it. One of the major reasons for flooding is the high silt content that gives the river its yellow tint and its name.',
			'<span style="font-size:20px">E. Pakistan (now Bangladesh)</span> <br /><br/> Cyclone-generated floods inundate coastal regions. 300,000 - 500,000 lives lost',
			'<span style="font-size:20px">Central Europe</span> <br /><br/>The Oder River flood affected Poland, Germany, and the Czech Republic, taking the lives of 105-115 people (in Czech Republic and Poland) and causing material damages estimated at $4.5 billion.',
			'<span style="font-size:20px">North central Europe</span><br /><br/>Heavy summer rains <br/>in north central Europe bring on disastrous August flooding, with some 250,000 people directly affected and about $20 billion in damages.',
			'<span style="font-size:20px">U.S. Gulf Coast</span><br /><br/>Hurricane Katrina causes extensive flooding in Louisiana, Mississippi, and Alabama, with a storm surge in excess of 6 m (20 ft).<br/>The levees around New Orleans, La., are breached, and the entire city is flooded; most of the city\'s population was evacuated. In the region there were 1,193 people killed, with estimated damages of $60 billion.',
			'<span style="font-size:20px">Myanmar</span><br /><br/>The Irrawaddy delta area is pounded by Cyclone Nargis, the largest cyclone ever in the Bay of Bengal. The United Nations estimates that the storm severely affected 2.4 million people; about 146,000 people either die or are reported missing.',
			'<span style="font-size:20px">Philippines</span><br /><br/>Mudslides and the worst flooding in over 60 years occur after two tropical systems strike the island within a week. Tropical storm Ketsana dropped 42.4 cm (16.7 in), of rain in just 12 hours. Days later, slow-moving Typhoon Parma added another astounding 120.4 cm (47.4 in) of rain. President Gloria Arroyo declares a nationwide state of calamity. At least 3 million people are affected, and more than 540 die; damage exceeds $250 million.',
			'<span style="font-size:20px">Queensland, Australia</span><br /><br/>The floods forced the evacuation of thousands of people from towns and cities. At least 70 towns and over 200,000 people were affected. Total damage was estimated at around $11.5 billion.',
			'<span style="font-size:20px">Thailand</span><br /><br/>Severe flooding occurred during the 2011 monsoon season in Thailand, which saw the highest rainfall in the country in 50 years. Flooding soon spread along the Mekong and Chao Phraya river basins. In October floodwaters reached the Chao Phraya and inundated parts of Bangkok. Flooding resulted in a total of 815 deaths (with 3 missing) and 13.6 million people affected. The flooding produced the highest insured loss ever for freshwater flooding at $12 billion.'		
];

var slider = null,zoomDiv = null, zoomPic = null, zoomClose = null, closeDiv = null ;

var timeline = [/* [farent, div_title, div_content] */];

var h = [], info = [], img = [];

var oldView = -1;

var w = 0;

var infoDiv = null;

// Map timeline
function MapTimeline(){
    var div = slider.getElementsByTagName('div');
    var k = 0;
    for(var i=0; i < div.length; i++){
        var temp = [];
        if(div[i].className=='time'){
            temp[0] = div[i];
            var div1 = div[i].getElementsByTagName('div');
            for(j=0; j< div1.length; j++){
                if(div1[j].className == 'title') temp[1] = div1[j];
                if(div1[j].className == 'content') temp[2] = div1[j];
                if(div1[j].className == 'but') {
                    div1[j].id = k;
                    div1[j].addEventListener('touchstart',openInfo ,false);
		    div1[j].addEventListener('click',openInfo ,false);
                }
            }
            div[i].id = k;
            k = k+1;
            timeline.push(temp);
        }
    }
    console.log(timeline);
}

// Open large image to view
function openZoom(e){
	var obj = e.target;
	var n = parseInt(obj.id);
	zoomPic.src = img[n].src;
	document.body.appendChild(zoomDiv);
	setTimeout(function(){
		zoomDiv.style.opacity = 1;
	},100);
}

// Open view
function openInfo(e){
    var obj = e.target;
    var n = parseInt(obj.id);
    if(n==NaN) return;
    // Close oldview
    if(oldView>=0){
            timeline[oldView][2].removeChild(infoDiv);
            timeline[oldView][1].style.width = '144px';
            timeline[oldView][1].style.opacity = 1;
            timeline[oldView][2].style.width = '0px';
            timeline[oldView][0].style.width = '148px';
            if(oldView==5) timeline[oldView][0].style.width = '150px';
            
    }
    // Open new view
    //slider.style.webkitTransitionDuration = '1s';
    infoDiv = info[n];
    oldView = n;
    timeline[n][2].appendChild(info[n]);
    timeline[n][2].style.width = '592px';
    timeline[n][0].style.width = '595px';
    K = 1977;
    if(n==9) {
        timeline[n][0].style.width = '598px';
        K = 1977;
    }
    timeline[n][1].style.opacity = 0;
    timeline[n][1].style.width = '0px';
    //slider.style.webkitTransitionDuration = '1000ms';
    setTimeout(function(){
	slider.style.webkitTransitionDuration = '500ms';
	slider.style.left =  pos[n] + 'px';
    },300);
    slider.style.width = K + 'px';
    setTimeout(function(){
        infoDiv.style.opacity = 1;
    },800,infoDiv);
    CheckStatus();
};

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
		img1.src = 'img/big/'+(i+1)+'.jpg';
		img2.className = 'zoom';
		img2.src = 'img/zoom.png';
		img2.id = i;
		img2.addEventListener('touchstart', openZoom, false);
		img2.addEventListener('touchstart', openZoom, false);
		closeDiv.addEventListener('touchstart',CloseDivView, false);
		img2.addEventListener('click', openZoom, false);
		img2.addEventListener('click', openZoom, false);
		closeDiv.addEventListener('click',CloseDivView, false);
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
        timeline[n][2].removeChild(info[n]);
        timeline[n][2].style.width = '0px';
        timeline[n][1].style.width = '144px';
        timeline[n][1].style.opacity = 1;
        info[n].style.opacity = 0;
        timeline[n][0].style.width = '148px';
        if(n==9) timeline[n][0].style.width = '150px';
	slider.style.webkitTransitionDuration = '800ms';
        slider.style.width = initWidth + 'px';
        slider.style.left = _posLink[n]  + 'px';
        oldView = -1;
	CheckStatus();
}

function OutView(){
    if(oldView<0) return;
    timeline[oldView][2].removeChild(info[oldView]);
    timeline[oldView][2].style.width = '0px';
    timeline[oldView][1].style.width = '144px';
    timeline[oldView][1].style.opacity = 1;
    info[oldView].style.opacity = 0;
    timeline[oldView][0].style.width = '148px';
    if(oldView==9) timeline[oldView][0].style.width = '150px';
    slider.style.width = initWidth + 'px';
    slider.style.left = _posLink[oldView]  + 'px';
    oldView = -1;
    CheckStatus();
}

function MoveNext(){
    OutView();
    var n = parseInt(slider.style.left );
    console.log(n);
    for(var i=0; i<10; i++){
	if(_posLink[i]<n){
	    n = _posLink[i];
	    break;
	}
    }
    slider.style.webkitTransitionDuration = '800ms';
    //slider.style.width = initWidth + 'px';
    slider.style.left = n  + 'px';
    CheckStatus();
}

function MoveBack(){
     OutView();
    var n = parseInt(slider.style.left );
    console.log(n);
    for(var i=9; i>=0; i--){
	if(_posLink[i]>n){
	    n = _posLink[i];
	    break;
	}
    }
    slider.style.webkitTransitionDuration = '800ms';
    //slider.style.width = initWidth + 'px';
    slider.style.left = n  + 'px';
    CheckStatus();
}

function CheckStatus(){
    var n = parseInt(slider.style.left );
    if(oldView>0){
	if(n>=0){
	    right.style.opacity = 0.3;
	    left.style.opacity = 1;
	}
	else if(n<=-1039){
	    right.style.opacity = 1;
	    left.style.opacity = 0.3;
	}
	else{
	    right.style.opacity = 1;
	    left.style.opacity = 1;
	}
    }
    else{
	if(n>=0){
	    right.style.opacity = 0.3;
	    left.style.opacity = 1;
	}
	else if(n<=-592){
	    right.style.opacity = 1;
	    left.style.opacity = 0.3;
	}
	else{
	    right.style.opacity = 1;
	    left.style.opacity = 1;
	}
	
    }
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

window.onload = function(){
    slider = document.getElementById('timeline');
    MapTimeline();
    createInfo();
    scroll = new iScroll('Croller',{
        onScrollStart:function(){
            //OutView();
	    scroll.refresh()
        },
	onScrollEnd:function(){
	    CheckStatus();
	}
    });
    left = document.getElementById('left');
    right = document.getElementById('right');
    document.getElementById('right').addEventListener('click',MoveBack,false);
    document.getElementById('left').addEventListener('click',MoveNext,false);
}


