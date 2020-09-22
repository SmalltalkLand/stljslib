export let curce;
export function set_curce(val){curce = val};
export default {createElement: (...args) => curce(...args)}