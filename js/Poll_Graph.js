// sample dataset
var sampleData = [23,45,66,77,32,41,111,43,20,200,75];

// Function that will draw the bar chart
function drawBarChart(dataset, idOfContainers) {

	// Grab the id of the container
	var chartContainer = _div(idOfContainers);

	// Make sure the data is an array
	if (typeof(dataset) != 'object') {
		return;
	}
// Grab the widthof the container
var widthOfContainer = chartContainer.scrollWidth
 
//Grab the heigth of the container
var heightOfContainer = chartContainer.scrollHeight;

//Determine the width of each bar based on the number of datain the dataset
var widthOfBar = chartContainer.scrollHeight;

//Determine the width of each bar based on the number of data inthe dataset
var widthOfBar = parseInt(widthOfContainer / dataset.length) - 2;
console.log(dataset,idOfContainers)
 
for(var i = 0; i < dataset.length; i++){
	var divElement = document.createElement('div');
	divElement.setAttribute('class', 'div2');

	//Dynamic attributes of the element
	divElement.style.marginLeft = parseInt(i * 2 + i * widthOfBar) + "px";
	divElement.style.height = parseInt(dataset[i]) + "px";
	divElement.style.width = parseInt(widthOfBar) + "px";
	divElement.style.top = (heightOfContainer - parseInt(dataset[i]) - 1) + "px";
	chartContainer.appendChild(divElement);
}
return false;
// Mimic jQuery so don't haveto keep typing document.getElementById()
function _div(id) {
	return document.getElementById(id);
}
// Initialize function when page loads

}



drawBarChart(sampleData, "div1");

function showGraph(){
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			//drawBarChart(ajax.responseText, "div1");
		}
	}
	ajax.open("POST","url",true);
	ajax.send();
}

//showGraph();