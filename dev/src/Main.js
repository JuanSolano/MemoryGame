var MemoryGame = (function (){

	var debugmode = false;

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
	function configuration ($userConfiguration) {
		
		UTILITY.mergeOb(defaultGameConfiguration, $userConfiguration);

		init ();
	}


	function init () {

		/****************************************************/
		/*	MODEL
		*	comming from "Model.js"
		*	=gameConfiguration
		*
		*/	
		MODEL.gameConfiguration = defaultGameConfiguration;

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

	return {
		/* USER access code
			=configuration:

		 */
		configuration:configuration,
		tempContinue:function (){

			MODEL.core.pingItem.pausePing ();

		}
	};
})();

window.MemoryGame = MemoryGame;
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
