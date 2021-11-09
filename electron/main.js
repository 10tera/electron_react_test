const {app,BrowserWindow,Menu} = require("electron");
const isDev = require("electron-is-dev");

let mainwindow;

function createmainwindow(){
    mainwindow=new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });
    if(isDev){
        mainwindow.loadURL("http://localhost:3000/index.html");
    }
    else{
        mainwindow.loadURL(`file://${__dirname}/..index.html`);
    }
    mainwindow.on("closed",()=>{
        mainwindow=null;
    });
    if(isDev){
        require("electron-reload")(__dirname,{
            electron:require(`${__dirname}/../node_modules/electron`)
        })
    }
}

app.on("ready",()=>{
    createmainwindow();
});

app.on("window-all-closed",()=>{
    if(process.platform!=="darwin"){
        app.quit();
    }
});

app.on("activate",()=>{
   if(mainwindow===null){
       createmainwindow();
   }
});