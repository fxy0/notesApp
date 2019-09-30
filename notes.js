const fs = require('fs');
const chalk = ('chalk');
const NOTES_FILE_NAME = 'notes.json';


const getNotes = () => {
    try {
        const notes = fs.readFileSync(NOTES_FILE_NAME).toString();
        return JSON.parse(notes);
    }catch (e) {
        return [];
    }
}


//not ekleme fonksiyonu

const addNote = (title,body) => {
    
    const notes = getNotes();

    const duplicatedNotes =  notes.filter(note => note.title ===title);
    if (duplicatedNotes.length !==0){
        console.log(chalk.red.inverse('Ayni title ile kayit etmeye calistiniz.'));
        return;
    }

    //{title,body} notlara ekleme

    notes.push({
        title,
        body
    });

    console.log(chalk.green.inverse(notes));

    saveNotes(notes);
}

const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync(NOTES_FILE_NAME,notesJson);
}


const removeNote = (title) => {
    const notes = getNotes();
    const newNoteList = notes.filter(note => note.title !== title);
    console.log(chalk.red.inverse('notunuz silindi'));
    saveNotes(newNoteList);
}


const getNote = (title) => {
    const notes =getNotes();
    const noteList =  notes.filter(note => note.title === title);
    return noteList.length === 0 ? {} : noteList[0];
}

module.exports = {
    getNotes,
    addNote,
    getNote,
    removeNote
  }