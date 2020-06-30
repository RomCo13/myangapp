import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreation="no server created";
  serverName="asd";
  serverCreated=false;
  servers=['TestServer','TestServer 2'];

  onUpdateServerName(event)
  {
    console.log(event.target.value);
    this.serverName=event.target.value;
  }
  onCreateServer()
  {
    this.servers.push(this.serverName);
    this.serverCreated=true;
    this.serverCreation="server created name is " + this.serverName;
  }
  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

}
