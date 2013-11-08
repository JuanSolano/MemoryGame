/*
* @View
* View game directory:
* 
* @BallCenter ():
* This class have those events:
* =nodeObejct
*
*/
function View () {

	// 
	/*	BallCenter SVG Class
	*	node || border || circle: + (item id)
	*	ejp: ballView.accessItem.border(0);
	*/
	var ballView = new BallCenter ();

	/**/
	MemoryGame.MODEL.view.ballCenter.interface = ballView;


	/* CENTER OVERLAY */
	/*
		game controls
	
	*/
	var overlay = new Overlay ();
	/**/
	MemoryGame.MODEL.view.overlay.interface = overlay;

}

