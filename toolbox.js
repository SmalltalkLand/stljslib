import {bind,wire} from 'https://cdn.skypack.dev/hyperhtml'
import 'https://www.gstatic.com/jsaction/contract.js'
import 'https://www.gstatic.com/jsaction/dispatcher.js'
export let shadow = (style,content,parent) => bind((parent || (parent = wire()`<div></div>`)).shadowRoot || parent.attachShadow({mode: 'open'}))`<span><style>${style}</style>${content}</span>`
export let input = type => {
    let content;
    let res = shadow(``,content = wire()`<input type=${type}></input>`);
    let eventContract = new jsaction.EventContract();
    eventContract.addContainer(res);
    eventContract.addEvent('blur');
    let dispatcher = new jsaction.Dispatcher();
    eventContract.dispatchTo(dispatcher.dispatch.bind(dispatcher));

    dispatcher.registerHandlers(
        null,                    // the namespace
        null,                            // handler object
        {                                // action map
            blur: () => {},
        });
    return content;
}