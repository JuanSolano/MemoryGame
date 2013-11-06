SVG = {};
SVG.header = '<?xml version="1.0" encoding="utf-8"?>';
SVG.header += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Basic//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-basic.dtd">';
SVG.xmlns = "http://www.w3.org/2000/svg";  

/*
* @group:
*
*
*/
SVG.group = function ($groupID,$params) {

	var defaultGroupPropertys = {
		version:"1.1",
		width:'800px',
		height:'600px',
		viewBox:"0 0 800 600",
		preserveAspectRatio:"none",
		id:"group-" + $groupID
	};
	var gpP = UTILITY.mergeOb(defaultGroupPropertys, $params);

	/*
	* group constructor
	*/
	function Group () {

		var group = document.createElementNS(SVG.xmlns, 'svg');

		var key;
		for (key in gpP) {
			group.setAttributeNS(null, key, gpP[key]);
		}

		return group;
	}

	return new Group ();
};

/*
* @drawCircle:
* 
*
*/
SVG.drawCircle = function ($cicleID, $params) {

	/*
	* circle constructor
	*/
	function Circle () {  

		var g = document.createElementNS (SVG.xmlns, 'g');
		g.setAttributeNS(null, "transform", 'translate(0 0)');
		g.setAttributeNS(null, "id", $cicleID);

		
		//rect Draw
		var rectPropertys = {
			height:'86',
			width:'86',
			x:"-43",
			y:"-43",
			style:"fill:blue;opacity:0"
		}
		var rect = (function() {
			var node = document.createElementNS(SVG.xmlns, 'rect');
			var key;
			for (key in rectPropertys) {
				node.setAttributeNS(null, key, rectPropertys[key]);
			}
			return node;
		})();
		
		//shine Draw
		var shinePropertys = {
			d:'M-23.8462-4.0352c0,0,3.6968-15.6182,23.8452-18.48c0,0,2.3838,2.9805,3.0996,6.3188
			c0,0-17.645,1.6689-26.3486,18.0029L-23.8462-4.0352z M-10.4736-1.8359c0,0,2.1367-9.0254,13.7813-10.6792c0,0,1.3779,1.7227,1.791,3.6519
			c0,0-10.1982,0.9648-15.2271,10.4043L-10.4736-1.8359z',
			fill:"#E0E0E0",
			stroke:"none",
			style:"fill-opacity:0.8"
		}
		var shine = (function() {

			var node = document.createElementNS (SVG.xmlns, 'path');
			var key;
			for (key in shinePropertys) {
				node.setAttributeNS(null, key, shinePropertys[key]);
			}
			return node;

		})();
		

		// border draw
		var borderPropertys = {
			fill:'#E0E0E0',
			r:40,
			cx:"0",
			cy:"0",
			class:"border"
		};
		var border = (function(){
			var node = document.createElementNS(SVG.xmlns,'circle');
			var key;
			for (key in borderPropertys) {
				node.setAttributeNS(null, key, borderPropertys[key]);
			}
			return node;
		})();

		// circle draw
		var circlePropertys = {
			fill:SVG.colorGallery.getRandomColor(),
			r:29,
			cx:"0",
			cy:"0",
			class:"circle"
		};
		var circle = (function(){
			var node = document.createElementNS(SVG.xmlns,'circle');
			var key;
			for (key in circlePropertys) {
				node.setAttributeNS(null, key, circlePropertys[key]);
			}
			return node;
		})();

		// hit area
		var hitPropertys = {
			fill:"#CCCCCC",
			r:29,
			cx:"0",
			cy:"0",
			style:"fill-opacity:0.0",
			class:"hitArea"
		};
		var hitArea = (function(){
			var node = document.createElementNS(SVG.xmlns,'circle');
			var key;
			for (key in hitPropertys) {
				node.setAttributeNS(null, key, hitPropertys[key]);
			}
			return node;
		})();

		/*
		@circle effect
		This doesn't work for Safari and IE8--
		*/
		//circle.setAttributeNS (null, 'style', 'filter:url(#crShadow)');

		/* 
			@Adding SVG files to the principal node
		*/
		g.appendChild (border);
		g.appendChild (circle);
		g.appendChild (shine);
		g.appendChild (hitArea);

		return g;
	}

	return new Circle ();
};

SVG.colorGallery = {

		/*
		* @getRandomColor:
		*
		*
		*/
		getRandomColor:function () {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.round(Math.random() * 15)];
			}
			return color;
		}

		/*
		* @updateColor:
		*
		*
		*/
		
};

SVG.effectsGallery = {

	/*
	* @filterNode:
	*
	*
	*/
	filterNode:function ($nodeId) {
		var node = document.createElementNS (SVG.xmlns, 'filter');
		node.setAttributeNS(null, 'id', $nodeId);
		node.setAttributeNS(null, 'height', '130%');
		return node
	},

	/*
	* @dropAndShadow:
	*
	*
	*/
	dropAndShadow:function ($nodeId) {

		var	dpNode = SVG.effectsGallery.filterNode ($nodeId);
		console.log(dpNode);

		var fB = document.createElementNS (SVG.xmlns, 'feGaussianBlur'); 
		fB.setAttributeNS(null, 'in', 'SourceAlpha');
		fB.setAttributeNS(null, 'stdDeviation', '2');
		fB.setAttributeNS(null, 'result', 'blur');

		var fO = document.createElementNS (SVG.xmlns, 'feOffset'); 
		fO.setAttributeNS(null, 'dx', '2');
		fO.setAttributeNS(null, 'dy', '2');
		fO.setAttributeNS(null, 'result', 'offsetblur');

		
		var fM = document.createElementNS (SVG.xmlns, 'feMerge'); 
		var merge_arr = ['offsetblur', 'SourceGraphic']
		for (var i = 0; i < merge_arr.length; i++) {
			var mg = document.createElementNS (SVG.xmlns, 'feMergeNode'); 
			mg.setAttributeNS(null, 'in', merge_arr[i]);
			fM.appendChild (mg);
		};
		
		dpNode.appendChild (fB);
		dpNode.appendChild (fO);
		dpNode.appendChild (fM);

		return dpNode;
	}
}