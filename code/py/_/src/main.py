text = """Радение
праводасть
лелядасть
троядасть, трудность
яводасть
радедасть
славодасть
желядасть
костродасть
семадасть
бередасть
наводасть
танядасть
перодасть
магодасть
свентодасть
мародасть
хородасть, гордасть
ладодасть
стрибодасть
веедасть
яродасть, ярость
велодасть
рододасть
каподасть
радасть
"""



# Split the text into lines and extract the header and data rows
lines = text.strip().split('\n')
headers = lines[0].split('\t')
data = lines[1:]

# Create the dictionary with headers as keys and corresponding values
result = {header: [] for header in headers}

for index, row in enumerate(data):
    values = row.split('\t')
    for header, value in zip(headers, values):
        result[header].append(f"{index + 1}\t{value}")


with open('result1232.txt', 'w') as f:
	for header, values in result.items():
		f.write(f"{header}\n")
		for value in values:
			f.write(f"{value}\n")
