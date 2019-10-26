var makeJsonFromTable=function(tableID)
{
	console.log("Table ID :- ",tableID)
    var tbl=$('#'+tableID)

	var tblhead=$(tbl).find('thead');
	var tblbody=$(tbl).find('tbody');
	var tblbodyCount=$(tbl).find('tbody>tr').length;
	console.log("Number of rows :- ",tblbodyCount);
	var header=[];
	var JObjectArray=[];
	
	$.each($(tblhead).find('tr>th'),function(i,j){
        header.push($(j).text())
	})
	console.log(header);
	$.each($(tblbody).find('tr'),function(key,value)
	{
	   var jObject={};
	   for(var x=0 ; x < header.length;x++)
	   {
		 jObject[header[x]]=$(this).find('td').eq(x).text()
	   }
	   JObjectArray.push(jObject)
	});
	console.log(JObjectArray);
	var jsonObject={};
	jsonObject["count"]=tblbodyCount
	jsonObject["value"]=JObjectArray;
	console.log(jsonObject);
	return jsonObject;
}