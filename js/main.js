var noteList = [];
var noteListView = document.getElementById("noteList");

/*
* Add Note Handler function
* This function is to add & edit note based on index that have been passed
* and update the view as refesh after removing from the list
*/

var addNewNote = function(e,i){
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  var newNote = {title:title,description:description};

  if(e){
    noteList[i] = newNote;
  }else{
    noteList.push(newNote);
  }
  updateListView();
  hidePopupView();
};

/*
* Edit Note Handler function
* This function is to edit note based on index that have been passed
* and update the view as refesh after removing from the list
* also linked with addNewNote function to utalize the actions
*/
var editNote = function(e){
  document.getElementById('title').value = noteList[e].title;
  document.getElementById('description').value = noteList[e].description;
  document.getElementById("btnAdd").onclick = function () { addNewNote(true,e); };
  document.getElementById("btnAdd").innerHTML = "Edit";
  showPopupView();

}

/*
* Delete Note Handler function
* This function is to remove note based on index that have been passed
* and update the view as refesh after removing from the list
*/
var deleteNote = function(e){
  noteList.splice(e,1);
  updateListView();
}

/*
* Save Notes Handler function
* This function is to save all the notes into text file and download
* Currently two lines break after one note.
*/
var saveNote = function(){
  var content = "";
  for (var i = 0; i < noteList.length; i ++) {
      content += noteList[i].title;
      content += "\n";
      content += noteList[i].description;
      content += "\n\n";
  }
  uri = "data:application/octet-stream," + encodeURIComponent(content);
  location.href = uri;
}
// TODO: need to implement
var filterNote = function(){

}

/*
* Show PopUp view handler
* This function is to show popup.
*/
var showPopupView =function() {
  var notePopupView = document.getElementById("notePopupView");
  notePopupView.style.display = "block";
}

/*
* Hide PopUp view handler
* This function is to hide popup.
*/
var hidePopupView =function() {
  var notePopupView = document.getElementById("notePopupView");
  document.getElementById('title').value = "";
  document.getElementById('description').value = "";
  document.getElementById("btnAdd").onclick = function () { addNewNote(false,-1); };
  notePopupView.style.display = "none";
}


/*
* Update Note listing View handler function
* This function is to update Note items.
*/
var updateListView = function(){
  clearListView();
  noteList.forEach(function(e,i){
    var note = document.createElement("div");
    note.setAttribute("id",i);
    note.className = "note-item";

    var noteTitle = document.createElement("div");
    noteTitle.textContent = e.title;
    noteTitle.className = "note-title";

    var noteDescription = document.createElement("div");
    noteDescription.textContent = e.description;
    noteDescription.className = "note-description";

    var editDeleteButtons = document.createElement("div");
    editDeleteButtons.innerHTML = '<div class="row"><button class="btn" onclick="editNote('+i+')"> Edit </button> &nbsp;<button class="btn" onclick="deleteNote('+i+')"> Delete </button></div>';

    note.appendChild(noteTitle);
    note.appendChild(noteDescription);
    note.appendChild(editDeleteButtons);

    noteListView.appendChild(note);

  });
}

/*
* Clear Note listing view
* This function is to update Note items.
*/
var clearListView =function(){
  noteListView.innerHTML = "";
}
