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
		video.classList.add('pre-loader__img');
		videoCont.appendChild(video);
		video.preload = "auto";
		video.load();
		
	    // video.addEventListener('canplay', function () {
	    //    canPlay.call(video);
	    // }, false);


		let timer = setInterval( () => {
			console.log( video.readyState, 'READY STATE VIDEO' )
			if( video.readyState == 4 ) {
				clearInterval(timer);
				video.style.opacity = 1;
				video.play();
			}
			
		}, 25 )

		

	}

}


module.exports = e;