function MemoryCore () {

	/*
	* Collecting info
	*/
	var self = this;
	var gameConfigInfo = MemoryGame.MODEL.gameConfiguration;
	var gameNode = document.getElementById (gameConfigInfo.ballAreaId);
	var ballCenter = MemoryGame.MODEL.view.ballCenter.ball_arr;
	var ballCenterLen = ballCenter.length;
	var interface = MemoryGame.MODEL.view.ballCenter.interface;
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
				/**/
				pingItem.startPing (); 
				/**/
				self.disableCircles();
				/**/
				rewardRoom.reward.clear();
			} else { 
				/**/
				pingStatus = 2;
				/**/
				self.enableCircles(); 
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
	MemoryGame.MODEL.core.pingItem = pingItem;

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

			/*
			* if user complete the lengt selection of IA array,
			* this will compare both arr's
			*/ 
			if (USER_ItemsSelected_arr.length === IA_ItemsSelected_arr.length) {

				self.disableCircles  ();
				compareSelection.checkIfCorrect ();
			}
		},
		checkIfCorrect:function (){
			console.log('checking');

			/* 
			* .compare: Array prototype
			* declared on UTILITY.prototypeINIT
			*/
			if(USER_ItemsSelected_arr.compare(IA_ItemsSelected_arr)) {
 
				//
				levelConfig++
				rewardRoom.reward.userWin ();
				//




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

	/**/
	MemoryGame.MODEL.core.compareSelection = compareSelection;

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
	this.enableCircles = function () {
		interface.controlItems.enableAll ();
	} 
	this.disableCircles = function () {
		interface.controlItems.disableAll ();
	} 
	/*****************************************************************************************/
} 