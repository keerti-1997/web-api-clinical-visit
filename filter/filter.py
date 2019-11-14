import pandas as pd 
import numpy as np 
import json

def filter_table(records,column,word):
	
	print("Column to filter ",column)
	print("Word to filter ",word)
	#print(type(data["value"]))
	#print(data["value"])
	df = pd.DataFrame(json.loads(records)['value'])
	# if categorical
	df_return = df[df[column].str.contains(word)]
	return df_return