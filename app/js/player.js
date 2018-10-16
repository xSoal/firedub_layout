

let f = () => {

	if( window.location.href.indexOf('relize_page') != -1 ) { // or anything
		
		// after load
		let selectPlayer = document.querySelector('.player__choice-list');
		let label = document.querySelector('.player__choice-list-label');
		console.log( label, 'label' )

		selectPlayer.addEventListener('change', function(){
			setDefaultPos(label);
			setTimeout( () => {
				label.innerHTML  = this.value;
				animate(label);
			}, 400 )
		});

	} 

	function setDefaultPos(node) {
		node.style.bottom  = '0px';
		node.style.left    = '35px';
		node.style.opacity = 0;
	}

	function animate(node) {
		node.style.bottom  = '40px';
		node.style.left    = '0px';
		node.style.opacity = 1;
	}


}


module.exports = f;