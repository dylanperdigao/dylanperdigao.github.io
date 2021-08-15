function sectionAnimation() {
	// Remove the transition class
	const squares = document.querySelectorAll('.square');
	const squares_wrappers = document.querySelectorAll('.square-wrapper');
	for (let i = 0; i < squares.length; i++) {
		squares[i].classList.remove('square-transition');
		// Create the observer, same as before:
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
						squares[i].classList.add('square-transition');
					return;
				}
				squares[i].classList.remove('square-transition');
			});
		});
		observer.observe(squares_wrappers[i]);
	}

}
function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}
function secret1(){
	getLocalStream();
	let x = document.getElementById("audio1");
	if(!x.paused){
		x.pause();
		return;
	}
	x.play()
}