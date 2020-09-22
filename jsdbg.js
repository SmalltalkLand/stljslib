export let stack = [];
let k = false;
let dbgtrace = [];
let fapply = (o, t, args) => { 
    if (k) return Reflect.apply(o, t, args); 
    k = true; 
    stack.push({o,t,args});
    try { 
        k = false;
        var v = Reflect.apply(o, t, args)
    } catch (err) {
        k = true;
        (err.jdbg_stack || (err.jdbg_stack = [])).push({ o, t, args });
        k = false;
        throw err 
    } finally {
        k = true;
        stack.pop();
        k = false;
        //k = false 
    };
    if (v.then && !o.name === 'then') v = v.then(null, err => {
        if(k)return Promise.reject(err);
        k = true; 
        (err.jdbg_stack || (err.jdbg_stack = [])).push({ o, t, args });
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