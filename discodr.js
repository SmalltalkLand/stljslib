//import './jsdbg.js'
import {discodr} from './tokens.js'
import {donate} from './coin/index.js'
import Client from "https://x.nest.land/Discordeno@8.4.1/src/module/client.ts";
import { sendMessage } from "https://x.nest.land/Discordeno@8.4.1/src/handlers/channel.ts";
import { deleteMessage} from "https://x.nest.land/Discordeno@8.4.1/src/handlers/message.ts";
import { getMember } from "https://x.nest.land/Discordeno@8.4.1/src/handlers/guild.ts";
import { Intents } from "https://x.nest.land/Discordeno@8.4.1/src/types/options.ts";
//import { WebSocket } from "https://x.nest.land/deno-websocket@v0.0.5/mod.ts";
import { WebSocket } from "https://deno.land/x/websocket@v0.0.5/mod.ts";
console.log('test');
export let NewClient = (a,...args) => ((reg,nxt) => {let inext, idict = {};let ssdata,roleutil;reg = {},nxt = {},ssdata = {},roleutil = {
    addRole: (k,role) => {ssdata[k].roles.push(role); return ssdata[k].roles.length-1},
    addRoleToUser: (k,roleID,user) => {ssdata[k].users[user].roles.push(roleID)}
};return Client({
    token: discodr(),
    ...a,
    intents: [Intents.GUILD_MESSAGES, Intents.GUILDS,...a.intents],
    eventHandlers: {
        ...a.eventHandlers,
        ready: () => {
            console.log('ready');
        },
        messageCreate: async (message) => {
            async function next(){
                return await new Promise(c => nxt[message.author.id] = c);
            }
            if(nxt[message.author.id]){nxt[message.author.id](message);
            nxt[message.author.id] = null;return;}
            console.log(message.channel);
            if(message.guildID === '676919440377511938')message.ourServer = true;
            if(message.ourServer && message.channel.id === '758450701406830659')message.moderator = true;
            let k;
            if((k=Object.keys(reg).filter(x => reg[x] === message.channel)).length === 0)reg[(k = [Math.random()])[0]] = message.channel;
            let parts = message.content.split(' ');
            if(parts[parts.length - 1] === ','){
                let new_ = await next();
                parts.pop();
                parts = parts.concat(new_.content.split(' '));
            }
            if(parts[parts.length - 2] === ',in'){
                let p = parts.pop();
                parts.pop();
                message.channel = reg[parseFloat(p)];
            };
            if(parts[parts.length - 2] === ',as'){
                let p = parts.pop();
                parts.pop();
                message.author = getMember(message.guildID,p)
            };
            /*if(parts[0] === '!impersonate'){inext = m => {
                let source = parts[1];

                inext = null;
            }};
            if(inext)inext(message);
            message.author = idict[message.author.id] || message.author;*/
            let botMessageCreate = async message => {
                if(!message.moderator)await sendMessage({id: '758450701406830659',guildID: '676919440377511938'},`Bot sent message ${message.content} (id: ${message.id})`);
                a.eventHandlers.messageCreate(message);
                if(!ssdata[k])return;
                if(!ssdata[k].bid[message.author.id].allowed){await deleteMessage(message);return};
                if(parts[0] !== ssdata[k].bid[message.author.id].token && ssdata[k].bid[message.author.id].token){await deleteMessage(message);return};
            };
            if(!message.moderator)await sendMessage({id: '758450701406830659',guildID: '676919440377511938'},`User ${message.name} sent message ${message.content} (id: ${message.id})`);
            if(message.moderator);
            if(parts[0] === '!jmp'){
                let o = ssdata[k];
                ssdata[k] = o || {name: parts[1],users: {[message.author.id]: {roles: [-1]}},roles: [],bid: {}};
                if(!ssdata[k].users[message.author.id])ssdata.users[message.author.id] = {roles: []};
                if(ssdata[k] !== o){
                    if(message.author.bot)bid[message.author.id] = {allowed: true}
                }
            };
            try{
            if(message.author.bot)return await botMessageCreate(message);
            }catch(err){

            };
            if(ssdata[k]){
                message.ssdata = ssdata[k];
                message.ssroleinfo = {roles: (ssdata[k].users[message.author.id]).roles.map(r => r === -1 ? 'Administrator' : ssdata[k].roles[r])};
            }
            a.eventHandlers.messageCreate(message);
            if(parts[0] === '!getcid')await sendMessage(message.channel,(k[0] || k).toString());
            if(parts[0] === '!send')await sendMessage(reg[parts[1]],parts.slice(2).join(' '));
            if(parts[0] === '!ws' && message.ourServer){
                if(parts[1] === 'join')message.author.sock = new WebSocket(parts[2]);
                if(parts[1] === 'next'){let m = await new Promise(c => message.author.sock.one('message',c));await sendMessage(message.channel,`Ws for ${message.author.username}: ${m}`)};
                if(parts[1] === 'send')message.author.sock.send(parts.slice(2).join(' '));
            }
        }
    }
},...args)})();
NewClient({intents: [],eventHandlers: {messageCreate: m => {}}});