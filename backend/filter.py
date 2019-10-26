import pandas as pd 
import numpy as np 

def get_data(data):
	
	print(type(data["value"]))
	df = pd.DataFrame(data["value"])
	#print("Number of rows in the data :- ",df.shape)