var dynamicColors = function() 
{
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	return "rgb(" + r + "," + g + "," + b + ")";
};

var data = JSON.parse(localStorage.getItem("data"));
console.log(data.length);

var pathology = {};
var cities = {};
var minority = {};
var visit_status = {};
var patient_age = {"0-10":0,"10-20":0,"20-30":0,"30-40":0,"40-50":0,"50-60":0,"60-70":0,"80-90":0,"90-100":0};

var stats = {1:"Pending", 2:"Accepted", 3 :"Rejected", 4:"Closed", 5:"Canceled", 6 :"Incidence", 7:"Reassign", 8:"Duplicate"};
for (var i in data['value'])
{
	//console.log(data['value'][i]['Pathology']);
	path = data['value'][i]['Pathology'];
	if (!(path in pathology))
		pathology[path] = 1;
	else
		pathology[path] += 1;

	city = data['value'][i]['City'];
	if (!(city in cities))
		cities[city] = 1;
	else
		cities[city] += 1;

	min = data['value'][i]['Is_Patient_Minor'];
	if (!(min in minority))
		minority[min] = 1;
	else
		minority[min] += 1;

	status = data['value'][i]['Visit_Status'];
	if (!(stats[status] in visit_status))
		visit_status[stats[status]] = 1;
	else
		visit_status[stats[status]] += 1;

	age = data['value'][i]['Patient_Age'];
	if (!(age in patient_age))
		patient_age[age] = 1;
	else
		patient_age[age] += 1;

}


console.log(Object.keys(patient_age));

var pathology_keys = Object.keys(pathology);
var pathology_values = [];
var path_colors = [];

var city_keys = Object.keys(cities);
var city_values = [];
var city_colors = [];

var minority_keys = Object.keys(minority);
var minority_values = [];
var min_colors = [];

var status_keys = Object.keys(visit_status);
var status_values = [];
var status_colors = [];


pathology_keys.forEach(function(key){
    pathology_values.push(pathology[key]);
    path_colors.push(dynamicColors());
});

city_keys.forEach(function(key){
    city_values.push(cities[key]);
    city_colors.push(dynamicColors());
});

minority_keys.forEach(function(key){
    minority_values.push(minority[key]);
    min_colors.push(dynamicColors());
});

status_keys.forEach(function(key){
    status_values.push(visit_status[key]);
    status_colors.push(dynamicColors());
});



var lab = [];
var val = [];
var col = [];

console.log(status_keys)
console.log(status_values)
console.log(status_colors)

for (var j=0; j < 10; j++)
{
	lab.push(pathology_keys[j]);
	val.push(pathology_values[j]);
	col.push(path_colors[j]);
}

var pie_chart_1 = new Chart(document.getElementById("pie-chart-1"), 
{
    type: 'pie',
    data: {
      labels: lab,
      datasets: [{
        label: "Population (millions)",
        backgroundColor: col,
        data: val,
		borderColor: "black",
		borderWidth: 1,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Top 10 diseases'
      },
      legend: {
      	display: false,
      }
    }
});

var lab = [];
var val = [];
var col = [];

for (var j=0; j < 10; j++)
{
	lab.push(city_keys[j]);
	val.push(city_values[j]);
	col.push(city_colors[j]);
}

var pie_chart_2 = new Chart(document.getElementById("pie-chart-2"), 
{
    type: 'pie',
    data: {
      labels: lab,
      datasets: [{
        label: "Population (millions)",
        backgroundColor: col,
		data: val,
		borderColor: "black",
		borderWidth: 1,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Top 10 populous cities '
      },
      legend: {
      	display: false,
      },
    }  
	    
});

var pie_chart_3 = new Chart(document.getElementById("pie-chart-3"), 
{
    type: 'pie',
    data: {
      labels: ["IsMinor","IsNotMinor"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: min_colors,
		data: minority_values,
		borderColor: "black",
		borderWidth: 1,
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Minority Distribution'
      },
      legend: {
      	display: true,
      	position: 'right',
      	align: 'end',
      },
    }  
	    
});

var bar_chart_1 = new Chart(document.getElementById("bar-chart-1"), {
    type: 'bar',
    data: {
      labels: status_keys,
      datasets: [
        {
          label: "Number of visits",
          backgroundColor: status_colors,
          data: status_values,
          borderColor:"black",
          borderWidth:2
        }
      ]
    },
    options: {
      legend: { 
      	display: false 
      },
      title: {
        display: true,
        text: 'Visit Status Distribution'
      }
    }
});

var bar_chart_2 = new Chart(document.getElementById("bar-chart-2"), {
    type: 'bar',
    data: {
      labels: status_keys,
      datasets: [
        {
          label: "Number of visits",
          backgroundColor: status_colors,
          data: status_values,
          borderColor:"black",
          borderWidth:2
        }
      ]
    },
    options: {
      legend: { 
      	display: false 
      },
      title: {
        display: true,
        text: 'Visit Status Distribution'
      }
    }
});