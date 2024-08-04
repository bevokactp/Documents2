#include <stdio.h>

typedef void (*func_p)();

void func(){
    printf("!!!!!");
};

void 
func_assign(func_p *f){
    *f = func;
};

int  main(){

    func_p f = NULL;
    func_assign(&f);
    f();  

    return 0;
}
