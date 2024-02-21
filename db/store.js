const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Created Store Class
class Store {
//Read and write notes
    read() {
        return readFileAsync("db/db.json","utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json",JSON.stringify(note));
    }
//Get notes
    getNotes() {
        return this.read().then((notes)=>{
            let parsedNotes;

            try {
                //Adding note if there are notes present
                parsedNotes = [].concat(JSON.parse(notes));
              } catch (err) {
                //If no notes are present, creating empty array
                parsedNotes = [];
              }
        
              return parsedNotes;
        });
    }
};

module.exports=new Store();