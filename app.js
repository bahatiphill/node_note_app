const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

//Customize yarg version
yargs.version("1.1.0");

//create Add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "body content",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

//create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  }
});

//create Read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function() {
    console.log("reading note");
  }
});

//create List command
yargs.command({
  command: "list",
  describe: "List notes",
  handler: function() {
    notes.listNotes();
  }
});

yargs.parse();
