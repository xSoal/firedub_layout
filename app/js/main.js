
import $ from 'jquery';
import slick from 'slick-carousel';
// import makeFireCanvas from './makeFireCanvas';
import preLoaderStart from './preLoaderStart';

//those need to be included only on aboute-us page
import CircleType from 'circletype';

import player from './player';
import sliderConf from './sliderConf';

preLoaderStart();

class ImageLoader{
	constructor(src, name){
		this.name = name;
		this.img = new Image();
		this.img.src = src;
		this.isLoad = false;

		this.img.onload = () => {
			conf.images[this.name] = this.img;
			this.isLoad = true;
			this.checkOtherImages();
			if(this instanceof ImageLoadLoader){
				this.className = 'pre-loader__img';
				// $('.pre-loader__img-cont').append(this.image);
				// document.querySelector('.pre-loader__img-cont').appendChild(this.img);
				// $('.pre-loader').show();
				conf.time.preLoaderStart = performance.now();
				
			}
		}

	}

	checkOtherImages(){
		let isLoad = false;

		for(let obj in conf.images){
			isLoad = conf.images[obj] instanceof Image;
		}

		if(isLoad){
			conf.loadStatus.images = true;
		}
	}
}


class ImageLoadLoader extends ImageLoader{
	constructor(src, name){
		super(src,name);
	}
}

let conf = {
	loadStatus: {
		html: false,
		images: false,
		js: false
	},
	images: {
		preLoaderImg: new ImageLoadLoader('images/fire_small.gif', 'preLoaderImg'),
		test: new ImageLoader('images/header_bg_reserv.png', 'test')
	},
	time: {
		preLoaderStart: 0,
		needForLoader: 2056, // min time for show pre loader 
	}
}


let checkForContentLoad = () => {
	if( conf.loadStatus.html && conf.loadStatus.images){
		// all js manipulate with dom
		sliderInit();

		textRotator();

		canHidePreLoaderCheck();

		player();
	}

	else {
		checkForContentLoad();
	}
}





function canHidePreLoaderCheck() {

	// after all js load 
	console.log(performance.now(), 'js is load');

	//to show pre_load more than 
	let loaderIsShow  = performance.now() - conf.time.preLoaderStart; //in ms

	setTimeout(()=>{
		if(loaderIsShow > conf.time.needForLoader){
			$('.pre-loader').hide();
		}
		else {
			canHidePreLoaderCheck();
		}	
	},50)

}


function sliderInit(){


	// sliderConf import from another file where params are chosen from href


	$('.relizes-row').on('init', function(event, slick, direction){
		conf.loadStatus.js = true;
	})
	.slick(sliderConf);

}




function textRotator () {

	// it's need only at aboute-us pages
	if( window.location.href.indexOf('aboute') !== -1 ) {
		
		let textElementsToRotate = document.querySelectorAll('.teamate__nickname');

		Array.prototype.forEach.call(textElementsToRotate, function(el){
			let circleType = new CircleType( el );
			circleType.radius(120);

			// if those will set in css this lib will doesn't do what's need
			el.style.transform = 'rotate(-27deg)';
		})
	}
}




window.addEventListener('load', ()=>{
	conf.loadStatus.html = true;
	checkForContentLoad();
});
