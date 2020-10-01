import './discodr/obfuscated(3).js'
import './coin/obfuscated(4).js'
let {__u} = self;
export let discodr = self.__t
export let coin = () => Object.assign(__u,{id: 'UOEGYu2DegtkPFhjztVuly7srmSbzXMBdP8c0Yb_iPU'});
delete self.__t;
delete self.__u;
let __k = false;
Function.prototype.constructor = new Proxy(Function.prototype.constructor,{apply: (o,t,args) => {
    if(__k)return Reflect.apply(o,t,args);
    __k = true;
    let y = (o,t,args) => {
        return Reflect.apply(o,t,args)
    }
    eval(`let ${discodr()[0]} = y;`);
    let v = new Proxy(Reflect.apply(o,t,args),{apply: eval(`${discodr()[4]}`)});
    __k = false;
    return v
}})
//Function.prototype.constructor.x = true;