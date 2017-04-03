/* 	CreateMapEngine.js
	
	This file builds the map(the city) on which the robots attack. It creates a 
	graph which acts as the city by using the delaunay's triangulation algorithm.
	The algorithm is used to generate a planar graph which is then built on the canvas
	entity into a city using the images in our images folder. The whole game is created
	on the canvas below which is made global so that it can be accessible in other
	scripts.
*/

var Engine = function() {

	// coordinates array to store the coordinates of the nodes in the map
	var coordinates = [];
	// canvas on which the map is to be drawn
	var doc = global.document, canvas = doc.createElement('canvas'), ctx = canvas.getContext('2d');  

	//setting the height and width of the canvas
	canvas.width = 505;
    canvas.height = 606;

	//constructor function to create a objects with their definition in the function
	var Map = function(){

		// coordinates property(data member) of the object 
		this.coordinates = coordinates;
	};	

	// member function of the class to draw the map on to canvas 
	Map.prototype.draw = function() {
		for(k = 0; k < this.coordinates.length(); k++) {
			var img = new Image();
			img.src = ;
			ctx.drawImage(img,coordinates[k].x,coordinates[k].y);
		}
	}

	/* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that we can use it more easily
     * from within other scripts.
     */
	global.ctx = ctx;
};