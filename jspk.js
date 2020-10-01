import crypt from 'https://cdn.skypack.dev/xor-crypt'
let k = false;
let evalSymbol = Symbol();
function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
  }
export function newNull(){
    let a,v,rc = () => String.fromCodePoint(Math.round(Math.random() * 2000 + 300));return typeof (v=(a=[
        ``,
        `let ${rc()};`,
        () => `import('data:text/javascript,${newNull()}');`,
        () => `for ${rc()} of new Array(${Math.round(Math.random() * 300000)}).map(${rc()} => {${newNull()}; return ${rc()} => {${newNull()}}}){${newNull()}}`,
        (a) => a = rc(), `function ${a}(b) {const by = new Uint8Array(b.length);for (let i = 0; i < by.length; i++) {by[i] = b.charCodeAt(i);}return String.fromCharCode(...new Uint16Array(bytes.buffer));}eval(${a}(atob("${btoa(toBinary(newNull()))}")))`,
    ])[Math.round(Math.random() * a.length)]) === 'function' ? v() : v
}
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
    let res2 = result.join('');
    let s = res2.split(';');
    s = s.map(x => `${x};${newNull()}`);
    res2 = s.join(';');
    return eval_(res2)
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