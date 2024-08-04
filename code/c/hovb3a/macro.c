
#define ARRAY_SIZE(arr) ((char *)(&arr + 1) - (char *)(&arr)) / sizeof(arr[0])

#define print(var) _Generic((var), \
    int: printf("%d\n", var), \
    float: printf("%f\n", var), \
    double: printf("%lf\n", var), \
    char: printf("%c\n", var), \
    char*: printf("%s\n", var), \
    const char*: printf("%s\n", var), \
    default: printf("%p\n", (void*)&var))


#define print2(x) printf(#x "\n")
