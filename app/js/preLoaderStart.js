import $ from 'jquery';

let e  = () => {



	// addEventListener("popstate",function(e){
	//     alert('yeees!');
	// },false);




	let videoCont;

	let timer = setInterval(()=>{
		if( document.querySelector('.pre-loader__img-cont') != null ){
			videoCont = document.querySelector('.pre-loader__img-cont');
			clearInterval(timer);
			initPreVideo();
		}
	},50);

	function initPreVideo () {
		let video = document.createElement('video');

		video.src = 'images/video/fire_short_quality.mp4';

	    video.addEventListener('canplay', function () {
	       canPlay.call(video);
	    }, false);


		function canPlay() {

			this.style.opacity = 1;
			this.play();
			videoCont.appendChild(this);
			

		}




		video.classList.add('pre-loader__img');
		video.classList.add('hiden');
		

	}

}


module.exports = e;