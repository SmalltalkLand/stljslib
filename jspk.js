import crypt from 'https://cdn.skypack.dev/xor-crypt'
let k = false;
let evalSymbol = Symbol();
export let pk = (pks,eval_,px) => {
    let split = pks.split('|');
    split = split.map(x => x.replace('!!','|').replace('!,','!!'));
    let comma = split.shift().split(',');
    if(split[0].startsWith('enc')){
        let e = split.shift();
        comma = comma.map(x => Object.assign(eval(`() => {}`),{toString: ''.toString.toString.bind(''.toString),pk: `0,eval(e.su,1,))|crypt(x,|bstring(3)`})(y => eval(y)));
    };
    let result = comma.map((function(x){try{return parseInt(x)}catch(err){return x}}).bind(comma));
    result = result.map(e => split[e] || e);
    if(px){
        let py = pk(px,eval_);
        result = result.map(py);
    };
    return eval_(result.join(''))
}
let fapply = (o, t, args) => { 
    if (k) return Reflect.apply(o, t, args); 
    k = true; 
    try { 
        k = false;
        var v = o.pk ? pk(o.pk,args[0],o.px) : Reflect.apply(o, t, args);
    } catch (err) {
        k = true;
        if(err.pk){
            if(err.resume){
                k = false;
                let op = o.pk;
                o.pk = err.resume;
                var v = fapply(o,t,args);
                o.pk = op;
                k = true;
            }
        }
        k = false;
        throw err 
    } finally {
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
Function.prototype.constructor = new Proxy(Function.prototype.constructor, { 
    apply: (o, t, args) => { 
        if (k) return Reflect.apply(o, t, args); 
        k = true; 
        let a = Reflect.apply(o, t, args); 
        a = new Proxy(a, { apply: fapply }); 
        k = false; 
        return a 
    } 
})
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