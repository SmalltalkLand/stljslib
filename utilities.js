import R from 'https://cdn.skypack.dev/ramda'
import Lazy from 'https://cdn.skypack.dev/lazy.js'
Object.create = new Proxy((o => Object.assign(function(...args){return o.call(this,...args)},{toString: o.toString.bind(o)}))(Object.create),{construct: (o,args,t) => Reflect.apply(o,t,args)})
Lazy.Sequence.define("Rfn",{
    init: function(type,...args){
        this.fn = R.partial(R[type].bind(R),...args);
    },
    each: function(fn){
        return this.parent.each(this.fn(fn));
    }
});
Lazy.Sequence.define("forever",{
    each: function(fn){
        requestAnimationFrame(() => this.each(fn));
        this.parent.each(fn);
    }
});
Lazy.Sequence.prototype["fantasy-land/map"] = function(f){return Lazy.Sequence.prototype.map.call(this,R.partial(f))};
Lazy.Sequence.prototype["fantasy-land/filter"] = function(f){return Lazy.Sequence.prototype.filter.call(this,R.partial(f))};;
Lazy.Sequence.prototype["fantasy-land/reduce"] = function(f,val){return Lazy.Sequence.prototype.map.call(this,R.partial(f),val)};