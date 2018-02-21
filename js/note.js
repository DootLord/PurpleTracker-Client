// References note modal forms 
function createNote(currentTask) {
    var noteData = {}

    // Pull data from globals and forms
    noteData.id = currentTask;
    noteData.title = $("#note-create-title").val();
    noteData.text = $("#note-create-text").val();
    noteData.color = $("#note-create-color").val();
    noteData.type = $("#note-create-type").val();

    if(noteData.title.length < 2 || noteData.text.length < 4){
        Materialize.toast("Please ensure both fields contain text");
        return;
    }

    $.post("http://localhost:4200/note", noteData).done(function(data){
        // Empty the form after submiting data
        $("#note-create-title").val("");
        $("#note-create-text").val("");
        $("#note-create-color").val("");
        $("#note-create-type").val("");

        $("#create-note-modal").modal("close");
    });
}

module.exports.createNote = createNote;