var UTILITY = {};
UTILITY.mergeOb = function ($objectA, $objectB){
	var key;
	for (key in $objectB) {
		$objectA[key] = $objectB[key];
	}
	return $objectA;
};
UTILITY.addEventListener = function (obj, evt, fn) {
	obj.addEventListener(evt, function (e) { 
    fn(obj, e);
  }, false);
}
UTILITY.removeEventListener = function (obj, evt, fn) {
  obj.removeEventListener(evt, function (e) { 
    fn(obj, e);
  }, false);
}
UTILITY.shuffle = function (array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
UTILITY.addClass = function (obj, className){

 var hasValue =  (obj.getAttribute ('class') !== null)?obj.getAttribute ('class'):"";
  obj.setAttribute('class',  hasValue + " " + className);
}
UTILITY.removeClass = function (obj, className){
  obj.setAttribute('class', obj.getAttribute ('class').split(className).join(""));
}

/**************************************************************************************************/
UTILITY.prototypeINIT = function (arrA, arrB) {

  /*
    COMPARE array prototype
    NOTE:
    if values are on diferent order this will not work as spected. 
  */
  Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
  }

  /**/
}
/**/
UTILITY.prototypeINIT ();