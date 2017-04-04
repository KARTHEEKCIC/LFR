/* 	CreateMapEngine.js
	
	* This file builds the map(the city) on which the robots attack. It creates a 
	* graph which acts as the city by using the delaunay's triangulation algorithm.
	* The algorithm is used to generate a planar graph which is then built on the canvas
	* entity into a city using the images in our images folder. The whole game is created
	* on the canvas below which is made global so that it can be accessible in other
	* scripts.
*/

var Engine = (function(global) {
	/* canvas on which the map is to be drawn*/
	var doc = global.document, canvas = doc.createElement('canvas'), ctx = canvas.getContext('2d');  

	/*setting the height and width of the canvas*/
	canvas.width = 600;
    canvas.height = 600;
    canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';
    doc.body.appendChild(canvas);

	/*constructor function to create a objects with their definition in the function
	*/
	var Map = function(){

		/* coordinates property(data member) of the object */
		this.coordinates = [];
	};	

	/* member function of the class to draw the city of the map on to canvas */
	Map.prototype.drawVertices = function() {
		console.log("creating the nodes of the city on the canvas");
		for(k = 0; k < this.coordinates.length; k++) {	 
			// drawing the circle which are teh vertices of the graph
			ctx.beginPath();
			ctx.arc(this.coordinates[k][0],this.coordinates[k][1],10,0,2*Math.PI);
			ctx.fillStyle="#FF0000";
			ctx.fill();
			ctx.closePath();
		}
		console.log("completed");
	}

	/*function to create the roades of the city on the canvas
	*/
	Map.prototype.drawEdges = function(triangles) {
		for(j=0; j < triangles.length-2; j=j+2) {
			this.drawTriangle(triangles[j],triangles[j+1]);
		}
	}

	/*function to draw the a single triangle given by the delaunay's triangulation
	*/
	Map.prototype.drawTriangle = function(node1,node2) {
		ctx.moveTo(this.coordinates[node1][0],this.coordinates[node1][1]);
		ctx.lineTo(this.coordinates[node2][0],this.coordinates[node2][1]);
		ctx.stroke();
		// ctx.lineTo(this.coordinates[node3][0],this.coordinates[node3][1]);
		// ctx.stroke();
		// ctx.lineTo(this.coordinates[node1][0],this.coordinates[node1][1]);
		// ctx.stroke();
	}
	
	/* function to create random points on the canvas 
	 * which will act as coordinates of the nodes of the city
	 */
	Map.prototype.createVertices = function() {
		console.log("creating vertices");
		var minX = 30, maxX = (canvas.width/4)-30, minY = 30, maxY = (canvas.height/3)-30;
		for(m=0; m < 3; m++){
			for(i=0; i < 4; i++) {
				var vertex = [];
				console.log(minX + "," + maxX);
				vertex[0] = Math.floor((Math.random() * (maxX-minX)) + minX);
				console.log(minY + "," + maxY);
				vertex[1] = Math.floor((Math.random() * (maxY-minY)) + minY);
				this.coordinates.push(vertex);
				console.log("vertex : " + vertex[0] + "," + vertex[1]);
				minX = maxX + 30;
				maxX = minX + (canvas.width/4)-30;
			}
			minY = maxY + 30;
			maxY = minY + (canvas.height/3)-30;
			maxX = (canvas.width/4)-30;
			minX = 30;
		}
	}

	/* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that we can use it more easily
     * from within other scripts.
     */
	global.ctx = ctx;

	/* creating the map instance of the class Map
	 * and calling its function to create the city on the canvas.
	*/ 
	var map = new Map();
	map.createVertices();
	map.drawVertices();
	console.log(Delaunay.triangulate(map.coordinates));
	console.log(map.coordinates.length);
	console.log((Delaunay.triangulate(map.coordinates)).length);
	map.drawEdges(Delaunay.triangulate(map.coordinates));

})(this);