import './jspk.js'
import {stack} from './jsdbg.js'
let k = false;
let fapply = (o,t,args) => {
  if (k) return Reflect.apply(o, t, args);
  Object.assign(() => {},{pk: `if(!eval(self.__mgmt)(,0,))throw "Management blocked this function"|o,t,args`})(x => eval(x));
  k = true; 
  try { 
      k = false;
      var v = Reflect.apply(o, t, args);
  } catch (err) {
      k = true;
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
}
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
export let kids = (o,t,args) => {
  return `false`
}