function UserRewardRoom () {

	var gameConfigInfo = MODEL.gameConfiguration;
	var rewardroomNode = document.getElementById (gameConfigInfo.rewardroomId);
	var msgNode = document.getElementById ('msg');
	var userRewardStatus = "";
	
	/**/
	reward = {
		nextLevel:function (){

		},
		userWin:function (){

			userRewardStatus = 'userWin';
			reward.assignReward ();

		},
		userFail:function (){

			
			userRewardStatus = 'userFail';
			reward.assignReward ();

		},
		assignReward:function (){

			UTILITY.addClass (msgNode, userRewardStatus);

		},
		clear:function (){
			
			UTILITY.removeClass (msgNode, userRewardStatus);

		}
	}


	/**/
	messageCentral = {
		userWinMessages:function () {

		},
		userFailMessages:function () {

		}
	}

	/**/
	return {
		reward:reward
	}
}