
size_t
str_len(char *str){
    char *p = &str[0];
    size_t len = 0;
    while (*p++ != '\0')
        len++;
    return len;
}
