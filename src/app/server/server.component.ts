import { Component } from '@angular/core';

@Component({
    selector:'app-server',
    templateUrl:'./server.component.html',
    styles:[`
    .online{
        color:white;
    }
    .offline{
        color:blue;
    }
    `]
})
export class ServerComponent
{
    serverId=10;
    serverStat='offline';

    getServerStatus()
    {
        return this.serverStat;

    }
    getColor()
    {
         return this.serverStat === 'online' ? 'green' : 'red';
    }
    constructor(){
        this.serverStat=Math.random()>0.5 ? 'online' : 'offline';
    }
}