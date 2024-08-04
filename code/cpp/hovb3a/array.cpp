

template <typename T, size_t n>
size_t
array1_len(T (&a)[n])
{
    return sizeof(T) * n;
}