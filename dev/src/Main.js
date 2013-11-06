var MemoryGame = MemoryGame || {};
//******
(function (){

	var debugmode = true;

	/* DEFAULT game configuration */
	var defaultGameConfiguration = {
		gameNodeId:'game',
		ballAreaId:'ballCenter',
		historyAreaId:'historyArea',
		rewardroomId:'rewardroom',
		rows:4,
		lines:3,
		circleRadio:40,
		circleMargin:5,
		circleStrokeColor:'#CCCCCC',
		startLevel:0
	};


	function init ($userConfiguration) {

		/* mersh default game mode with user mode info */
		UTILITY.mergeOb(defaultGameConfiguration, $userConfiguration);

		/****************************************************/
		/*	MODEL
		*	comming from "Model.js"
		*	=gameConfiguration
		*
		*/	
		//
		MemoryGame.MODEL.gameConfiguration = defaultGameConfiguration;
		/****************************************************/
		/* VIEW
		* @sections
		*
		*/	
		var gameInterface = new View ();

		/****************************************************/
		/* game core init 
		* comming from "core/MemoryCore.js"
		*/
		var memCore = new MemoryCore ();
		memCore.startGame();

	}

	// 
	MemoryGame.gameSetup = {
		// game init
		init:init
	};

})();


 /*
* jQuery loader:
* Check if any jQuery version is loaded, if don't, this code will load an jQuery version
*/
/*if (!window.jQuery) {
	var jqscript = document.createElement('script');
	jqscript.setAttribute("type", "text/javascript");
	jqscript.setAttribute("src", "http://code.jquery.com/jquery.min.js");
	jqscript.onload = function () {
		init_memorygame ();
	};
	document.getElementsByTagName("head")[0].appendChild(jqscript);
}else{ init_memorygame (); }*/
