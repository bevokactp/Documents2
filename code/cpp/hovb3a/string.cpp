
vector<string>
splitString(const string &str, const string &del)
{
	vector<string> tokens;
	size_t start = 0;
	size_t end = str.find(del);

	while (end != string::npos)
	{
		tokens.push_back(str.substr(start, end - start));
		start = end + del.length();
		end = str.find(del, start);
	}
	tokens.push_back(str.substr(start));
	return tokens;
}

void printCounterWords(string &str)
{
	unordered_map<string, int> counterWords;

	string current_word;

	for (char chr : str)
	{
		if (isalnum(chr))
			current_word += chr;
		else
		{
			if (!current_word.empty())
			{
				counterWords[current_word]++;
				current_word.clear();
			}
		}
	}

	for (auto &pair : counterWords)
		cout << "'" << pair.first << "'" << " " << pair.second << "\n";
}
