from flask import Flask, request,jsonify, render_template
from flask_cors import CORS, cross_origin
import json
from filter import filter_table
import pandas as pd

app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/import_json": {"origins": "http://127.0.0.1:5000"}})
#CORS(app, resources=r'/signUp/*', allow_headers='Content-Type')
# "http://127.0.0.1:5000/"


@app.route('/import_json', methods=['GET','POST'])
@cross_origin()
def import_json():
	if request.method == 'POST':
		data = request.json
		print(data)
		print("JSON submitting for filtering")
		filtered = filter_table(data)
		print(filtered)
	# 	#return jsonify(df_return)
	# 	#return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
	# 	#temp = df_return.to_dict('records')
	# 	#columnNames = df_return.columns.valueso
	# 	#print(columnNames)
	# 	#return render_template('records.html', message = "testing!!",records=temp, colnames=columnNames)
	#return render_template('index.html',data=filtered.to_json())
	return jsonify(filtered.to_dict(orient='records'))

if __name__ == "__main__":
	app.run(debug=True)