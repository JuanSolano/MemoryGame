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

	//
	var rewardRoom = new UserRewardRoom ();


	/*
		0 = stoped
		1 = playing
		2 = paused
	*/
	var gameStatus = 0;


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
			var val=Math.floor((Math.random() * ballCenterLen)+1);
			return val.toString();
		},
		startPing:function (){

			/**/
			gameStatus = 1
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

			gameStatus=2;

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
			gameStatus=0;
			pingStatus=0;
			/**/
		},
		clear:function (){
			gameStatus=0;
			pingStatus=0;
			this.round=0;
			clearInterval(pingItem.timer);
 

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

				rewardRoom.reward.userFail ();
				clearGame ();
				showOverlay ();

			} 
		}
	}

	/**/
	MemoryGame.MODEL.core.compareSelection = compareSelection;

	/*****************************************************************************************/
	this.startGame = function  () {

		rewardRoom.reward.clear();

		if(pingStatus===0) pingItem.startPing ();

	}
	this.pauseGame = function () {


	}
	this.stopGame = function  () {
		clearGame ();
	}
	this.enableCircles = function () {
		interface.controlItems.enableAll ();
	} 
	this.disableCircles = function () {
		interface.controlItems.disableAll ();
	} 
	this.gameStatus = function () {
		return gameStatus;
	}

	/*****************************************************************************************/
	function clearGame () {
		pingItem.clear ();
		compareSelection.clear ();	
		//
		IA_ItemsSelected_arr= [];
	}
	function showOverlay (){ 
		MemoryGame.MODEL.view.overlay.interface.showOverlay('user-loose');

	}
	/*****************************************************************************************/

	MemoryGame.MODEL.core.obClass = self;
} 