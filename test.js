const fs = require('fs');
function extraObject(obj) {
    var keys = Object.keys(obj);  // RETURN a array includes name of key, each key correspond to each element in array
    
    for (var i = 0; i < keys.length; ++i) {   // LOOP:
        var key = keys[i],                          // GET each name of object in loop 
            subkeys = key.split(/,\s?/),            // RETURN a array includes key is separated with ",", split it  
            target = obj[key];                      // value of key
        // console.log();
        delete obj[key];                            // DELETE obj object
        subkeys.forEach( key => { obj[key] = target; })   
    }
    return obj;
}

function addInStart(obj){
    Object.assign(database.start,extraObject(obj));
}

function addInStop(obj){
    Object.assign(database.end,extraObject(obj));
}

function addInBody(obj){
    Object.assign(database.body,extraObject(obj));
}
var database = {
    start : {},
    end   : {},
    body :  {}
    
}


database.start = extraObject({
    "ê, Ê, Tiến, tiến, tien, ây, start, Start, begin, Begin" : "hửm"
    
                                                  // the same meaning between "key" : "value" and key : "value"
});

database.body = extraObject({
    "how are u, how r u" : "immmmmm finnee !! có chuyện gì thế ?",
    ":)),@@,=))" : "😂😂"
});

database.end = extraObject({
    "stop, Stop, Dừng lại, dừng lại, dừng, kết thúc, end, stop here" : "🙂"
});


addInBody({"mày làm bài chưa": "Bài gì cơ ?", "đi chơi không?" : "pick dùm t cái lịch 🙂"});
addInStop({
    "...,..,.,👃,ok" : "😂"
})

console.log(JSON.stringify(database));

fs.writeFileSync("database.json",JSON.stringify(database));

var abc = JSON.parse(fs.readFileSync("database.json"), {encoding : 'utf8'});
console.log(abc.end)
if (!abc.start["cc"]){
    console.log("in");
}



// MAKE PRECISION WHEN PICK SUITABLE SENTENCE 