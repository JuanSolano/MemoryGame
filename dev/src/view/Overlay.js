function Overlay (){

	/*
	* Collecting info
	*/
	var gameConfigInfo = MemoryGame.MODEL.gameConfiguration;
	var overlayNode = document.getElementById (gameConfigInfo.boxOverlayId);
	var self = this;

	/**/
	var overlay_OnView=true;
	var overlaySection_OnView;


	/****************************************************************************************/
	/*
		start game btn
	*/
	var startBTN = overlayNode.querySelectorAll('a.startgame-btn')[0];

	function startGame_MouseUp_Handler () {

		self.hideOvelay ();

		if(coreOB().gameStatus() === 0) {
			setTimeout(function(){

				coreOB().startGame ();

			}, 500);
			
		}

	}

	UTILITY['addEventListener'] (startBTN, 'mouseup', startGame_MouseUp_Handler);

	/****************************************************************************************/

	this.showOverlay = function (section_) {

		UTILITY.removeClass (overlayNode, 'hide');

		switch (section_) {

			case "startgame":

			break;

		}

	}
	this.hideOvelay = function () {

		UTILITY.addClass (overlayNode, 'hide');

	}

	/****************************************************************************************/
	function coreOB () {
		return MemoryGame.MODEL.core.obClass;
	}
	/****************************************************************************************/ 
}