function BallCenter () {

	/*
	* Collecting info
	*/
	var gameConfigInfo = MODEL.gameConfiguration;
	var gameNode = document.getElementById (gameConfigInfo.ballAreaId);
	var ball_arr = [];
	var svgGroup;

	/*
	* Adding group node to the stage
	*/
	var group = SVG.group ('color-game',{
		viewBox:"-43 -43 800 600",
		width:"800px",
		height:"600px"
	});
	svgGroup = gameNode.appendChild (group);

	/*
	* Activating filters
	* SVG.effectsGallery :
	* Create the filter node and include this in to the SCG group
	* [ IE9+ FF + CRH ] this doesn't work for Safari and IE9--
	* Internet Explorer and Safari do not support SVG filters yet!
	* http://www.w3schools.com/svg/svg_feoffset.asp
	*
	*/
	//var dropAndShadow = SVG.effectsGallery.dropAndShadow ("crShadow");
	//svgGroup.appendChild (dropAndShadow);
	
	/*
	* Drawing the circle
	* SVG.drawCircle:
	*
	*/
	var incrementX = 0;
	var incrementY = 0;
	var limitRight = gameConfigInfo.rows;
	var circleRadio = gameConfigInfo.circleRadio;
	var circleMargin = gameConfigInfo.circleMargin;
	var circleLen = gameConfigInfo.rows * gameConfigInfo.lines;
	var circleSize = (circleRadio*2)+circleMargin;
	var stroke = gameConfigInfo.circleStrokeColor;

	for (var i = circleLen-1,j=0; i >= 0; i--,j++) {

		var circle = new Ball (j);

		// item position
		var ob = circle.ob;

		//
		circle.circle_position ( {
				x:circleSize*incrementX, 
				y:circleSize*incrementY 
			} );

		if(incrementX++ === limitRight-1) { incrementX = 0;  incrementY++; }

		// comming from "memory-game.min.css"
		ob.setAttribute ('class', 'circle-btn');

		/*
		* Adding group node to the stage
		*/
		svgGroup.appendChild (ob);

		//
		ball_arr.push (circle);
	};

	/* register in to Model ALL the balls entry pointer  */
	MODEL.view.ballCenter.ball_arr = ball_arr;


	/*************************************************************************************************/
	var accessItem = {
		node:function ($id) {
			return accessItem.getObGroup ($id).ob;
		},
		border:function ($id){
			return accessItem.getObGroup($id).border;
		},
		circle:function ($id){
			return accessItem.getObGroup($id).circle;
		},
		getObGroup:function ($id_) {
			var len = ball_arr.length;
			for (var i = 0; i < len; i++) {
				if (ball_arr[i].circle_id () === Number($id_)) {
					return ball_arr[i];
				}
			};
		}
	} 
	/*************************************************************************************************/
	var controlItems = {
		enabledAll:function (){
			var len = ball_arr.length;
			for (var i = 0; i < len; i++) {
				ball_arr[i].enabled ();
			}

		},
		disabledAll:function () {
			var len = ball_arr.length;
			for (var i = 0; i < len; i++) {
				ball_arr[i].disabled ();
			}

		}
	}
	/*************************************************************************************************/
	return {
		accessItem:accessItem,
		controlItems:controlItems
	}
}