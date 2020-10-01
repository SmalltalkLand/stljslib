import Arweave from "https://raw.githubusercontent.com/divy-work/arweave-deno/master/src/index.ts";
import {coin} from '../tokens.js'
export let arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    logging: true,
    logger: (...e) => console.log(...e),
  });
(async () => {
    arweave.anchor = (await arweave.api.get("/tx_anchor")).data;
})();
export async function donate(_private){
    let t = await arweave.createTransaction(
        {target: coin.id , last_tx: arweave.anchor,   quantity: arweave.ar.arToWinston("0.1") },
        _private,
      );
      await arweave.transactions.sign(t, _private);
      const res = await arweave.transactions.post(t);
}
//console.log((() =>Function.prototype.constructor.x )())