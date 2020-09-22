self.onbeforeunload = async () => {
    let href = location.href;
    while(location.href === href)await new Promise(requestAnimationFrame);
    location.href = href;
}
let gao;
Object.defineProperty(self,'GoogleAnalyticsObject',{get: () => gao,set: v => {gao = v;if(self.$)self.$.fn.text = (old => function(...args){if(args[0] && args[0].startsWith('Restr'))throw "no";return old.call(this,...args)})(self.$.fn.text)}})
Object.defineProperty(self,'onbeforeunload',{value: self.onbeforeunload,writable: false,configurable: false})