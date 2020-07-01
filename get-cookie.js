const fs = require("fs");
const login = require("facebook-chat-api");

var credentials = {
	email: "email",
	password: "pass"
	};

login(credentials,{forceLogin: true}, (err, api) => {
    if(err) return console.error(err);

    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});
