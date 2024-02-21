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
//Add a note 
    addNote(note) {
        const {title,text} = note;
        if (!title || !text) {
            throw new Error ("The note needs to have both a title and text")
        }
        const newNote = {title,text,id: uuidv1()};

        return this.getNotes()
        .then((notes)=>[...notes,newNote])
        .then((updatedNotes)=>this.write(updatedNotes))
        .then(()=>newNote)
    }
//Delete a note
    removeNote(id) {
        return this.getNotes()
       .then((notes) => notes.filter((note) => note.id !== id))
       .then((filteredNotes) => this.write(filteredNotes));
   }
};

//Export store class
module.exports=new Store();