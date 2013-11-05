function MemoryCore () {

	/*
	* Collecting info
	*/
	var gameConfigInfo = MODEL.gameConfiguration;
	var gameNode = document.getElementById (gameConfigInfo.ballAreaId);
	var ballCenter = MODEL.view.ballCenter.ball_arr;
	var ballCenterLen = ballCenter.length;
	var interface = MODEL.view.ballCenter.interface;
	var rewardRoom = new UserRewardRoom ();

	/*
	* game configuration
	*/
	var startLevel=0;
	var currentLevel=0;
	var levelConfig=[3,5,7,9,11,13,15];
	var limitTimeLevel=3000;
	var pingStatus=0;
	var pingSpeed=500;
	var hightLightSpeed=300;
	var delayOnWinReStart=1000;

	/*
	* Game core info collection ( runtime variables )
	*/
	var IA_ItemsSelected_arr = [];
	var USER_ItemsSelected_arr = [];

	/*****************************************************************************************/
	/*
	* @pingItem:
	*	
	*/
	pingItem = {
		timer:0,
		round:0,
		splashItem:function ($id){

			var item = interface.accessItem.border($id);

			UTILITY.addClass (item, 'selected');

			
			setTimeout(function (){

				UTILITY.removeClass (item, 'selected');

			}, hightLightSpeed)

		},
		getRandomId:function (){
			var val=Math.floor(Math.random() * ballCenterLen);
			return val.toString();
		},
		startPing:function (){

			/**/
			pingStatus = 1;
			/**/

			/*
			* reset the temp user selection array, to be compared
			* with the IA arr history in the next round.
			*/
			compareSelection.clear();
			/**/

			/* 
			* add a random element to the IA arr
			*/
			IA_ItemsSelected_arr.push (pingItem.getRandomId());
			/**/

			var count = 0;
			var id;
			pingItem.timer = setInterval (function (){

				/* 	send to print the black 
				 	border on the ball
				*/
				id = IA_ItemsSelected_arr[count];
				pingItem.splashItem (id);

				//
				if(count === pingItem.round) {

					pingItem.pausePing ();

					pingItem.round++;
				}

				// 
				count++;

			}, pingSpeed);

		},
		pausePing:function (){
			if(pingStatus===2) { 
				disabledCircles ();
				pingItem.startPing (); 
				rewardRoom.reward.clear();
			} else { 
				enabledCircles ();
				/**/
				pingStatus = 2;
				/**/
				clearInterval(pingItem.timer); 
			};
		},
		stopPing:function (){
			/**/
			pingStatus=0;
			/**/
		}
	};

	/**/
	MODEL.core.pingItem = pingItem;

	/*****************************************************************************************/
	/*
	* @compare selections:
	*	
	*/
	compareSelection = {
		clear:function (){
			USER_ItemsSelected_arr = [];
		},

		/*
		* info comming from "BallCenter.js"
		* onclick ball action
		* 
		*/
		userSelection:function (id_){
			/**/
			USER_ItemsSelected_arr.push(id_);

			/**/
			compareSelection.checkIfCorrect ();
		},
		checkIfCorrect:function (){
			console.log('checking');

			/* 
			* if user complete the lengt selection of IA array,
			* this will compare both arr's
			*
			* .compare: Array prototype
			* declared on UTILITY.prototypeINIT
			*/
			if (USER_ItemsSelected_arr.length === IA_ItemsSelected_arr.length) {

				if(USER_ItemsSelected_arr.compare(IA_ItemsSelected_arr)) {
					console.log('equal');

					rewardRoom.reward.userWin ();

					/* delay to reestart () */ 
					setTimeout(function(){
						pingItem.pausePing();
					},delayOnWinReStart);
					

				} else {
					console.log('Error');

					compareSelection.clear();

					rewardRoom.reward.userFail ();
				}
			}
		}
	}

	/**/
	MODEL.core.compareSelection = compareSelection;

	/*****************************************************************************************/
	this.startGame = function  () {

		if(pingStatus===0) pingItem.startPing ();

	}
	this.pauseGame = function () {


	}
	this.stopGame = function  () {
		clearGame ();
	}

	/*****************************************************************************************/
	function clearGame () {
		pingItem.clear ();
		compareSelection.clear ();
	}
	function enabledCircles () {
		console.log("enabled");
		interface.controlItems.enabledAll ();
	} 
	function disabledCircles () {
		console.log("disabled");
		interface.controlItems.enabledAll ();
	} 
	/*****************************************************************************************/
} 