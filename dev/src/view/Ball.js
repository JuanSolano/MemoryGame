function Ball (id_) {
	
	this.id = id_;
	this.ob = SVG.drawCircle ('circle_'+id_,{ /* No config settings */ });
	this.enableBTN = false;

	//***
	this.border = this.ob.querySelectorAll('circle.border')[0];
	this.circle = this.ob.querySelectorAll('circle.circle')[0];
	this.hitArea = this.ob.querySelectorAll('circle.hitArea')[0];

	// ITEMS HANDLERS
	var self = this;
	var mouseEvents = {
		click:function (obj, evt){ /* no click action */ },
		overHandler:function (obj, evt){
			if(!self.enableBTN) { return }
			UTILITY.addClass (self.border, 'bHover');
		},
		outHandler:function (obj, evt){
			//if(!self.enableBTN) { return }
			UTILITY.removeClass (self.border, 'bHover');
			UTILITY.removeClass (self.border, 'bPress');
		},
		downHandler:function (obj, evt){
			if(!self.enableBTN) { return }
			UTILITY.addClass (self.border, 'bPress');
		},
		upHandler:function (obj, evt){
			if(!self.enableBTN) { return }

			UTILITY.removeClass (self.border, 'bPress');

			/*
			* MODEL.core.compareSelection
			* userSelection ():
			* register and send to compare the user item selection
			*/
			MemoryGame.MODEL.core.compareSelection.userSelection (id_);
		}
	}

	/* EVENT */
	this.events = function (action_) {

		UTILITY[action_] (this.hitArea, 'click', mouseEvents.click);

		UTILITY[action_] (this.hitArea, 'mousedown', mouseEvents.downHandler);
		UTILITY[action_] (this.hitArea, 'mouseup', mouseEvents.upHandler);

		UTILITY[action_] (this.hitArea, 'mouseover', mouseEvents.overHandler);
		UTILITY[action_] (this.hitArea, 'mouseout', mouseEvents.outHandler);

	}

	/**/
	self.events('addEventListener');
}
/**/
Ball.prototype.enableAction = function () {
	this.enableBTN = true; 
}
Ball.prototype.disableAction = function () {
	this.enableBTN = false; 
}
Ball.prototype.circle_id = function () {
	return Number(this.id);
}
Ball.prototype.circle_position  = function (ob_) {
	 this.ob.setAttribute ('transform', 'translate('+ob_.x+' '+ob_.y+')');
}
Ball.prototype.circle = function () {
	return this.ob;
}