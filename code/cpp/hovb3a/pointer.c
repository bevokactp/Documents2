

/*
	ptr<long long> p(new long long());
	*p = 20;
	cout << *p  << typeid(*p).name() << endl;
*/
template <typename T>
class ptr
{
	T *p;

public:
	explicit ptr(T *p = NULL) { this->p = p; }
	~ptr()
	{
		cout << "+" << endl;
		delete (p);
	}
	T &operator*() { return *p; }
	T *operator->() { return p; }
};
