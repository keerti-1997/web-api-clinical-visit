var firebaseConfig = {
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
var orderBy = "City";
var ascending_flag = 1;
var countRows = 0;
var arr = new Array();
var fulldata;
var load_once_flag = 0;
//used for sorting comparity
function locale(a, b) 
{
  if (typeof(a[orderBy])  === "string") {
    return ascending_flag * a[orderBy].localeCompare(b[orderBy]);
  } else {
    return ascending_flag * (a[orderBy] - b[orderBy]);
  }
}; 

function loadTable() 
{
  dbRef.once('value', function(snapshot) 
  {
    // execute this part only once
    if (load_once_flag == 0) 
    {
      if(snapshot.exists()) 
      {
        console.log("Data is here");
        $("#loading").hide();
        $("#navigation").show();
        $("#tableContent").show();
        $("#paging").show();
        
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
          tmp["Geo_Point"] = val.Geo_Point;
          tmp["Visit_Status"] = val.Visit_Status;
          tmp["Zipcode"] = val.Zipcode;
          // tmp["Geo_Point"] = val.Geo_Point;
          arr.push(tmp);
          load_once_flag = 1;
        });
      };
    };

    arr.sort(locale);
    console.log('Completed sorting');
    add500Rows();

    var content = '';
    for(var i = 500 * countRows; i < Math.min(500 * countRows + 500, arr.length); i++) 
    {
      content += '<tr>';
      content += '<td>' + (i + 1) + '</td>';
      content += '<td>' + arr[i].City + '</td>';
      content += '<td>' + arr[i].City_ID + '</td>';
      content += '<td>' + arr[i].Date + '</td>';
      content += '<td>' + arr[i].ID_Personal + '</td>';
      content += '<td>' + arr[i].ID_Type + '</td>';
      content += '<td>' + arr[i].Is_Patient_Minor + '</td>';
      content += '<td>' + arr[i].LAT + '</td>';
      content += '<td>' + arr[i].LON + '</td>';
      content += '<td>' + arr[i].N_Home_Visits + '</td>';
      content += '<td>' + arr[i].Pathology + '</td>';
      content += '<td>' + arr[i].Patient_Age + '</td>';
      content += '<td>' + arr[i].Time_Delay + '</td>';
      content += '<td>' + arr[i].Visit_Status + '</td>';
      content += '<td>' + arr[i].Zipcode + '</td>';
      // content += '<td>' + arr[i].Geo_Point + '</td>';
      content += '</tr>';
    };
    $('#ex-table').append(content); 
    countRows += 1;
    console.log(arr.length);
      //localStorage.setItem("data", JSON.stringify(arr));
    }    
  );
};

function deleteTable() 
{
  var tb = document.getElementById('ex-table');
  var rowNum = tb.rows.length;
  for (i = 1; i < rowNum; i++) {
    tb.deleteRow(i);
    rowNum = rowNum - 1;
    i = i - 1;
  }
};

//change arguments, delete odd table, and load new table  
function reloadTable(a, b) 
{
  count = 0;
  countRows = 0;
  orderBy = a;
  ascending_flag = b;
  deleteTable();
  loadTable();
};

loadTable();

var jsonified = "";
var filter_list = [];
var numeric = [];
var submit_click = 0;
var categorical = ["Cityip","Pathologyip","Dateip"];
var numerical = ["City_IDip","ID_Personalip","ID_Typeip","Latitudeip","Longitudeip","N_Home_Visitsip","Patient_Ageip","Time_Delayip","Visit_Statusip","Zip_Codeip","Is_Patient_Minorip"]
var type_of_filter;
var filter_clicks = {};
var submit_clicks = 0;
var filtdata;
var countFiltered;


for(var n in categorical)
  filter_clicks[categorical[n]] = 0
for(var n in numerical)
  filter_clicks[numerical[n]] = 0

//console.log(filter_clicks)

function filter(id)
{
  w = id.slice(0,-2)
  console.log(w+"ip")
  console.log("in filter");
  for (var c in categorical)
    if(categorical[c] != (w+"ip"))
      document.getElementById(categorical[c]).style.display = "none";
  for (var c in numerical)
    if(numerical[c] != (w+"ip"))
      document.getElementById(numerical[c]).style.display = "none";

  if(filter_clicks[id] % 2 == 0) 
    document.getElementById(id).style.display = "block";
  else
    document.getElementById(id).style.display = "none";
  filter_clicks[id] += 1
}


function cleared(id)
{
  w = id.slice(0,-5)
  console.log(w);
  if(numerical.indexOf(w+"ip") > -1)
  {
    //console.log(document.getElementById(id).children[0].children[1].children[0].value)
    document.getElementById(id).children[0].children[1].children[0].value = "";
    document.getElementById(id).children[1].children[1].children[0].value = "";
    //document.getElementById(id).value = "";    
  }
  if(categorical.indexOf(w+"ip") > -1)
    document.getElementById(id).value = "";
}

function submitted(id)
{ 

  jsonified = JSON.stringify(makeJsonFromTable('ex-table'));

  
  var filt = {};
  var num = {};
  var input = {};
  console.log("in submitted")
  console.log(id.slice(0,-5));
  col = id.slice(0,-5);
  if(numerical.indexOf(col+"ip") > -1)
  {
    type_of_filter = 1
    min = document.getElementById(id).children[0].children[1].children[0].value;
    max = document.getElementById(id).children[1].children[1].children[0].value;
    
    if(typeof min == "undefined" || typeof max == "undefined")
    {
      alert("Input cannot be empty!");
      return;
    }
    
    num['col'] = col;
    num['range'] = {'min':min,'max':max};
    filter_list.push(num);
    input = JSON.stringify({table:jsonified,filters:num,type:type_of_filter});
  }

  if(categorical.indexOf(w+"ip") > -1) 
  {
    type_of_filter = 0
    var word = document.getElementById(id).value;
    console.log(word);
    
    if(typeof word == "undefined")
    {
      alert("Input cannot be empty!");
      return;
    }
    
    filt['col'] = col;
    filt['word'] = word;
    filter_list.push(filt);
    input = JSON.stringify({table:jsonified,filters:filt,type:type_of_filter});
  }
  
  //console.log(input);   
  console.log("Now ajax call");
  $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data : input,
        dataType: 'json',
        url: 'http://127.0.0.1:5000/import_json',

        success: function (data) 
        {
          console.log("success");
          var filtered = "";
          var count = 0;
          countFiltered = 0;
          console.log(data.length)
          console.log(typeof(data))
          for(i = 500 * countFiltered; i < Math.min(500 * countFiltered + 500, data.length); i++)
          {

            filtered += '<tr>';
            filtered += '<td>' + (i + 1) + '</td>';
            filtered += '<td>' + data[i].City + '</td>';
            filtered += '<td>' + data[i].City_ID + '</td>';
            filtered += '<td>' + data[i].Date + '</td>';
            filtered += '<td>' + data[i].ID_Personal + '</td>';
            filtered += '<td>' + data[i].ID_Type + '</td>';
            filtered += '<td>' + data[i].Is_Patient_Minor + '</td>';
            filtered += '<td>' + data[i].Latitude + '</td>';
            filtered += '<td>' + data[i].Longitude + '</td>';
            filtered += '<td>' + data[i].N_Home_Visits + '</td>';
            filtered += '<td>' + data[i].Pathology + '</td>';
            filtered += '<td>' + data[i].Patient_Age + '</td>';
            filtered += '<td>' + data[i].Time_Delay + '</td>';
            filtered += '<td>' + data[i].Visit_Status + '</td>';
            filtered += '<td>' + data[i].Zip_Code + '</td>';
            // content += '<td>' + arr[i].Geo_Point + '</td>';
            filtered += '</tr>'; 
            count += 1;
          } 
          console.log("Length of the result ",count);
          if (data.length <= 500)
          {  
            $("#paging").hide();
            $("#paging_filt").hide();
          }
          else
          { 
            $("#paging").hide();
            $("#paging_filt").show();  
          }
                        
          countFiltered += 1; 
          $('#ex-table tbody tr').remove();
          $('#ex-table').append(filtered); 
          filtdata = data; 
          //console.log(filtdata);
          arr = filtdata;
        },

        error: function(error) 
        {
          console.log(error);
          alert(error)
        }
  });         
  console.log('Completed filtering');
  //add500Rows();
  submit_clicks += 1;    
}

function add500Rows() 
{
  var content = '';
  for (i = 500 * countRows; i < Math.min(500 * countRows + 500, arr.length); i++) {
    content += '<tr>';
    content += '<td>' + (i + 1) + '</td>';
    content += '<td>' + arr[i].City + '</td>';
    content += '<td>' + arr[i].City_ID + '</td>';
    content += '<td>' + arr[i].Date + '</td>';
    // content += '<td>' + arr[i].Geo_Point + '</td>';
    content += '<td>' + arr[i].ID_Personal + '</td>';
    content += '<td>' + arr[i].ID_Type + '</td>';
    content += '<td>' + arr[i].Is_Patient_Minor + '</td>';
    content += '<td>' + arr[i].LAT + '</td>';
    content += '<td>' + arr[i].LON + '</td>';
    content += '<td>' + arr[i].N_Home_Visits + '</td>';
    content += '<td>' + arr[i].Pathology + '</td>';
    content += '<td>' + arr[i].Patient_Age + '</td>';
    content += '<td>' + arr[i].Time_Delay + '</td>';
    content += '<td>' + arr[i].Visit_Status + '</td>';
    content += '<td>' + arr[i].Zipcode + '</td>';
    content += '</tr>';
  }
  countRows++;
  $('#ex-table').append(content);
};



function add500FiltRows() 
{
  var content = '';
  console.log(countFiltered);

  for (i = 500 * countFiltered; i < Math.min(500 * countFiltered + 500, filtdata.length); i++) 
  {
    content += '<tr>';
    content += '<td>' + (i + 1) + '</td>';
    content += '<td>' + filtdata[i].City + '</td>';
    content += '<td>' + filtdata[i].City_ID + '</td>';
    content += '<td>' + filtdata[i].Date + '</td>';
    // content += '<td>' + arr[i].Geo_Point + '</td>';
    content += '<td>' + filtdata[i].ID_Personal + '</td>';
    content += '<td>' + filtdata[i].ID_Type + '</td>';
    content += '<td>' + filtdata[i].Is_Patient_Minor + '</td>';
    content += '<td>' + filtdata[i].Latitude + '</td>';
    content += '<td>' + filtdata[i].Longitude + '</td>';
    content += '<td>' + filtdata[i].N_Home_Visits + '</td>';
    content += '<td>' + filtdata[i].Pathology + '</td>';
    content += '<td>' + filtdata[i].Patient_Age + '</td>';
    content += '<td>' + filtdata[i].Time_Delay + '</td>';
    content += '<td>' + filtdata[i].Visit_Status + '</td>';
    content += '<td>' + filtdata[i].Zipcode + '</td>';
    content += '</tr>';
  }
  countFiltered += 1;
  $('#ex-table').append(content);
}; 


