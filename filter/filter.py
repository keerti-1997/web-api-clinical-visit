import pandas as pd 
import numpy as np 
import json

def filter_table(data):
	
	
	records = pd.DataFrame(json.loads(data['table']))
	queries = data['filters']
	type_of_filter = data['type']
	#num_queries = data['num_list']

	print(records.shape)
	#print("Number of queries :- ",len(queries))
	
	col = queries['col']
	temp = records

	# categorical
	if type_of_filter == 0:

		#for q in queries:			
		word = queries['word']
		df_filter = temp[temp[col].str.contains(word, case=False)]
		temp = df_filter
    
    # numerical
	if type_of_filter == 1:
		
		records["City_ID"] = records["City_ID"].astype(str).astype(int)
		records["Date"] = pd.to_datetime(records["Date"])
		records["ID_Personal"] = records["ID_Personal"].astype(str).astype(int)
		records["ID_Type"] = records["ID_Type"].astype(str).astype(int)
		records["Is_Patient_Minor"] = records["Is_Patient_Minor"].astype(str).astype(int)
		records["N_Home_Visits"] = records["N_Home_Visits"].astype(str).astype(int)
		records["Patient_Age"] = records["Patient_Age"].astype(str).astype(int)
		records["Time_Delay"] = records["Time_Delay"].astype(str).astype(int)
		records["Visit_Status"] = records["Visit_Status"].astype(str).astype(int)
		records["Zipcode"] = records["Zipcode"].astype(str).astype(int)

		#temp = records
		#for q in queries:
		col = queries['col']
		min_range = int(queries['range']['min'])
		max_range = int(queries['range']['max'])
		print(col,min_range,max_range,type(min_range),type(max_range))
		df_filter = temp[(temp[col]>=min_range)&(temp[col]<=max_range)]
		temp = df_filter	

	return df_filter

