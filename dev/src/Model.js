var MemoryGame = MemoryGame || {};
//******
MemoryGame.MODEL = {};
/*
* @gameConfiguration
*	.gameConfiguration:
*		.
*		.
*/
MemoryGame.MODEL.gameConfiguration = {};



/********************************************************************* VIEW */
MemoryGame.MODEL.view = {

	
	ballCenter:{
		
		/* defined on view.js */
		interface:{},
		
		/* defined in BallCenter.js */
		ball_arr:[]
	},

	overlay:{

		interface:{}

	}

};

/********************************************************************* CORE */
MemoryGame.MODEL.core = {
	pingItem:{},
	compareSelection:{}
};