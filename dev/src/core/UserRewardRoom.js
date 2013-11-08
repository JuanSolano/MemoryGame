function UserRewardRoom () {

	var gameConfigInfo = MemoryGame.MODEL.gameConfiguration;
	var rewardroomNode = document.getElementById (gameConfigInfo.rewardroomId);
	var msgNode = document.getElementById ('msg');
	var userRewardStatus;
	var self = this;
	
	/**/
	this.reward = {
		nextLevel:function (){

		},
		userWin:function (){

			self.userRewardStatus = 'userWin';
			this.assignReward ();

		},
		userFail:function (){

			
			self.userRewardStatus = 'userFail';
			this.assignReward ();

		},
		assignReward:function (){

			UTILITY.addClass (msgNode, self.userRewardStatus);

		},
		clear:function (){
			if(self.userRewardStatus !== undefined){
				UTILITY.removeClass (msgNode, self.userRewardStatus);
			}
		}
	} 

	/**/
	this.messageCentral = {
		userWinMessages:function () {

		},
		userFailMessages:function () {

		}
	} 
}