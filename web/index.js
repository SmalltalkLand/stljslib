import {arweave} from '../coin/index.js'
import {coin} from '../tokens.js'
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
self.__out = async () => coin();
export async function newUser(name,passwd){
    let tx = await arweave.createTransaction({data: JSON.stringify({type: 'newUser',name,passwd: passwd})},coin);
    await connection.transactions.sign(tx, coin);
    const res = await connection.transactions.post(tx);
    if (res.status >= 300) throw new Error("Transaction failed!");
    let u = JSON.parse(await Deno.readTextFile('./users.json'));
    u[name] = tx.id;
    await Deno.writeTextFile('./users.json',JSON.stringify(u));
}
export async function getUsers(){
    let u = JSON.parse(await Deno.readTextFile('./users.json'));
    let uk = Object.keys(u);
    let obtained = await Promise.all(uk.map(async (x) => [x,JSON.parse((await arweave.transactions.get(u[x])).data)]));
    let o = {};
    obtained.forEach(([x,y]) => {delete y.passwd});
    obtained.forEach(([x,y]) => o[x] = y);
    return o;
}
export default (x => {
    x.get('/arw/:id', async req => {
        req.content.body = (await arweave.transactions.get(req.params.id)).data
    })
    return x
})(new Router())