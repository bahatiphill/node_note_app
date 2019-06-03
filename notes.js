const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes... ";
};

//LIST NOTES
const listNotes = () => {
  //get notes
  const notes = loadNotes();

  //loop through notes
  notes.forEach(note => {
    console.log(chalk.green(note.title));
    console.log(chalk.yellow(note.body));
  });
};

//REMOVE NOTE
const removeNote = function(title) {
  //load an existing notes
  const noteObj = loadNotes();

  //filter through
  const filteredNote = noteObj.filter(function(note) {
    return note.title !== title;
  });

  //print to the screen
  if (filteredNote.length == noteObj.length) {
    console.log(chalk.red("No Note Found"));
  }
  if (filteredNote.length < noteObj.length) {
    console.log(chalk.green("Note Removed"));
  }

  //save the new notes
  saveNotes(filteredNote);
};

//ADD NOTE
const addNote = function(title, body) {
  //get the notes in Js Object
  const notes = loadNotes();

  //check if note is already exist
  const duplicatenotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicatenotes.length === 0) {
    //push note to  array
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
  } else {
    console.log("New title is taken");
  }
};

const saveNotes = function(notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
