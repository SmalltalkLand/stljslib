import {pk} from './jspk.js'
import './utiltites.js'
import {compile} from 'https://cdn.skypack.dev/coffeescript'
let k = false;
let evalSymbol = Symbol();
let prevo;
let fapply = (o, t, args) => { 
    if (k) return Reflect.apply(o, t, args);
    if (o.denies_call && o.denies_call(prevo))return;
    let op = prevo;
    prevo = o;
    k = true;
    try { 
        k = false;
        var v = Reflect.apply(o, t, args);
    } catch (err) {
        k = true;
        if(err && err[evalSymbol])eval(err[evalSymbol]);
        k = false;
        throw err 
    } finally {
        prevo = op;
       /*k = false */
    };
    if (v.then && !o.name === 'then') v = v.then(null, err => {
        if(k)return Promise.reject(err);
        k = true;
        /* */
        k = false;
        return Promise.reject(err) 
    }); 
    return v
};
self.close = new Proxy(self,close || {},{
    apply: (o,t,args) => confirm('Close?') ? Reflect.apply(o,t,args) : null
})
Proxy.prototype.constructor = new Proxy(Proxy.prototype.constructor,{
    apply: (o,t,args) => {
        if(k)return Reflect.apply(o,t,args);
        k = true;
        let v = Reflect.apply(o,t,[Reflect.apply(o,t,args),{}]);
        k = false;
        return v;
    }
})
Function.prototype.constructor = new Proxy(Function.prototype.constructor, { 
    apply: (o, t, args) => { 
        if (k) return Reflect.apply(o, t, args); 
        k = true; 
        let a = Reflect.apply(o, t, args); 
        a = new Proxy(a, { apply: fapply }); 
        k = false; 
        return a 
    } 
});
if(Function.wrappedJSObject)Function.wrappedJSObject.prototype.constructor = new Proxy(Function.wrappedJSObject.prototype.constructor, { 
    apply: (o, t, args) => { 
        if (k) return Reflect.apply(o, t, args); 
        k = true; 
        let a = Reflect.apply(o, t, args); 
        a = new Proxy(a, { apply: fapply }); 
        k = false; 
        return a 
    } 
});