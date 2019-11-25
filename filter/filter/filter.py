import pandas as pd 
import numpy as np 
import json

def filter_table(data):
	
	
	records = pd.DataFrame(json.loads(data['table'])['value'])
	queries = data['filters']
	print(records.shape)
	print("Number of queries :- ",len(queries))
	# categorical
	temp = records
	for q in queries:
		col = q['col']
		word = q['word']
		df_filter = temp[temp[col]==word]
		temp = df_filter	
	return df_filter