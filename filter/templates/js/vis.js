var firebaseConfig = 
{
    apiKey: "AIzaSyCHA3rBGSAdS4QXvXSOnjhSdxe4ek-R73c",
    authDomain: "inf551-project-48265.firebaseapp.com",
    databaseURL: "https://inf551-project-48265.firebaseio.com",
    projectId: "inf551-project-48265",
    storageBucket: "inf551-project-48265.appspot.com",
    messagingSenderId: "886384796957",
    appId: "1:886384796957:web:b5e62ee8c4b112acd8adf4",
    measurementId: "G-5C2QT45TNQ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log("initialized");
var value = document.getElementById("value");
var dbRef = firebase.database().ref().child("data");
console.log(dbRef);

var arr = new Array();
var data;

var pathology = {};
var cities = {};
var minority = {};
var visit_status = {};
var patient_age = {"0-18":0,"19-30":0,"31-60":0,"61-80":0,"81-100":0};
var stats = {1:"Pending", 2:"Accepted", 3 :"Rejected", 4:"Closed", 5:"Canceled", 6 :"Incidence", 7:"Reassign", 8:"Duplicate"};
var city_disease = {};
var time_delay = {};

$( window ).on( "load", function() 
{

  console.log( "window loaded" );
    
  dbRef.once('value', function(snapshot) 
  {
    if(snapshot.exists()) 
    {
      console.log("Data is here");
        $("#loading").hide();
        snapshot.forEach(function(data) 
        {
      var val = data.val();
      var tmp = new Object();
      tmp["City"] = val.City;
      tmp["City_ID"] = val.City_ID;
      tmp["Date"] = val.Date;
      tmp["ID_Personal"] = val.ID_Personal;
      tmp["ID_Type"] = val.ID_Type;
      tmp["Is_Patient_Minor"] = val.Is_Patient_Minor;
      tmp["LAT"] = val.LAT;
      tmp["LON"] = val.LON;
      tmp["N_Home_Visits"] = val.N_Home_Visits;
      tmp["Pathology"] = val.Pathology;
      tmp["Patient_Age"] = val.Patient_Age;
      tmp["Time_Delay"] = val.Time_Delay;
      //tmp["Geo_Point"] = val.Geo_Point;
      tmp["Visit_Status"] = val.Visit_Status;
      tmp["Zipcode"] = val.Zipcode;
      arr.push(tmp);
    });
      console.log(arr.length);
      data = arr;
    for (var i in data)
    {
      //console.log(data[i]['Pathology']);

      city = data[i]['City'];
      path = data[i]['Pathology'];
      min = data[i]['Is_Patient_Minor'];
      status = data[i]['Visit_Status'];
      age = data[i]['Patient_Age'];
      time = data[i]['Time_Delay'];

      if (!(city in city_disease))
        city_disease[city] = {}
      if (!(path in city_disease[city]))
        city_disease[city][path] = 1
      else
        city_disease[city][path] += 1
         
      if (!(city in cities))
        cities[city] = 1;
      else
        cities[city] += 1;


      if (!(path in pathology))
        pathology[path] = 1;
      else
        pathology[path] += 1;


      if (!(min in minority))
        minority[min] = 1;
      else
        minority[min] += 1;

      if (!(time in time_delay))
        time_delay[time] = 1;
      else
        time_delay[time] += 1;


      if (!(stats[status] in visit_status))
        visit_status[stats[status]] = 1;
      else
        visit_status[stats[status]] += 1;

      
      if(age >=0 && age <= 18)
        patient_age["0-18"] += 1
      if(age >18 && age <= 30)
        patient_age["19-30"] += 1
      if(age >30 && age <= 60)
        patient_age["31-60"] += 1
      if(age >60 && age <= 80)
        patient_age["61-80"] += 1
      if(age >80 && age <= 100)
        patient_age["81-100"] += 1                      
    }

    //console.log(city_disease)

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

    var age_keys = Object.keys(patient_age);
    var age_values = [];
    var age_colors = [];


    var time_keys = Object.keys(time_delay);
    var time_values = [];
    var time_colors = [];

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

    age_keys.forEach(function(key){
        age_values.push(patient_age[key]);
        age_colors.push(dynamicColors());
    });

    time_keys.forEach(function(key){
        time_values.push(time_delay[key]);
        time_colors.push(dynamicColors());
    });   


    var pie_chart_1 = new Chart(document.getElementById("pie-chart-1"), 
    {
        type: 'pie',
        data: {
          labels: pathology_keys,
          datasets: [{
            label: "Population (millions)",
            backgroundColor: path_colors,
            data: pathology_values,
        borderColor: "black",
        borderWidth: 1,
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Diseases Distribution (Total :'+ ('' + pathology_keys.length) +')'
          },
          legend: {
            display: false,
          }
        }
    });

    var pie_chart_2 = new Chart(document.getElementById("pie-chart-2"), 
    {
        type: 'pie',
        data: {
          labels: city_keys,
          datasets: [{
            label: "Number of records",
            backgroundColor: city_colors,
        data: city_values,
        borderColor: "black",
        borderWidth: 1,
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Cities Distribution (Total :'+ ('' + city_keys.length) +')'
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
    //console.log(age_keys);
    //console.log(age_values);

    var bar_chart_2 = new Chart(document.getElementById("bar-chart-2"), {
        type: 'bar',
        data: {
          labels: age_keys,
          datasets: [
            {
              label: "Number of visits",
              backgroundColor: age_colors,
              data: age_values,
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
            text: 'Patient Age Distribution'
          }
        }
    });

    var bar_chart_3 = new Chart(document.getElementById("bar-chart-3"), {
        type: 'bar',
        data: {
          labels: time_keys,
          datasets: [
            {
              label: "Number of time delays",
              backgroundColor: time_colors,
              data: time_values,
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
            text: 'Time Delay distribution'
          }
        }
    });

    }    
  });
});

var dynamicColors = function() 
{
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};


//var data = JSON.parse(arr);

// //console.log(data);



