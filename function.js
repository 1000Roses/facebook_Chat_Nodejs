const fs = require('fs');
const login = require("facebook-chat-api");

var myFriend = JSON.parse(fs.readFileSync("myFriend.json",{ encoding : 'utf8'}));  // read file and covert it to object and stored i myFriend variable. OBJECT
var database = JSON.parse(fs.readFileSync("database.json", {encoding : 'utf8'}));

function updateMyFriend(obj){
    fs.writeFileSync("myFriend.json", JSON.stringify(obj),{
        encoding : 'utf8'
    })
}

function AddNewdIdFriend(id){
    myFriend.push(id);
}

function checkIdFriend(id){
    if (myFriend.indexOf(id) != -1)
        return true;
    return false;
}

function deleteIdFriend(id) {
    if (checkIdFriend(id)){
        var pos = myFriend.indexOf(id);
        myFriend.splice(pos,1);          // DELETE  element where its index
    }
}

function logain(){
    try{
            login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
            if(err) return console.error(err);

            

            api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent",updatePresence: false, listenEvents: true}); // default of updateaPresence: false and selfListener: false
            //  api.deleteThread("100007455286033", (err) => {
            //     if(err) return console.error(err);
            // });

            api.listenMqtt((err, message) => {
         
                
                if(message.type === "message" && !message.isGroup){
                    console.log(message);
                    var idPerson = message.senderID;

                    if (database.start[message.body]){    // START
                        AddNewdIdFriend(idPerson);
                        updateMyFriend(myFriend); // make a function to update my friend
                        api.sendMessage(database.start[message.body], message.threadID);
                    }

                    else if (database.end[message.body]){  //END
                        deleteIdFriend(idPerson);
                        updateMyFriend(myFriend); // make a function to update my friend
                        api.sendMessage(database.end[message.body], message.threadID);
                    }

                    else if (checkIdFriend(idPerson)){      //BODY
                        // TO DO execute with database
                        if(database.body[message.body]){
                            api.sendMessage(database.body[message.body], message.threadID);
                        }else{
                            api.sendMessage("Đợi chút, Tiến đang ngồi ngoài đường ngắm gái. Mình là robo_bot của Tiến 😳😂😳", message.threadID);
                        }
                        

                    }


                    
                }
                

            });
        });
    }
    catch (err){
        console.log(err);
        logain();

    }
}


module.exports = logain;