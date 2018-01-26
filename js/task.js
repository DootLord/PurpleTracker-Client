/**
 * Iterates through returned server object to render tasks
 * @param {JSON} tasks 
 */
function renderTasks(tasks) {
    for (var i = 0; tasks.length > i; i++) {
        renderTask(tasks[i].id, tasks[i].title, tasks[i].set_date, tasks[i].complete_date, tasks[i].urgent);
    }
}

/** 
 * Uses data pulled from server to display tasks to user
 */
function renderTask(id, task, start, end, urgent) {
    // Cut out date from TIMEDATE format MySQL likes to do
    start = start.substring(0,10);
    console.log(end);
    if(end == null || end == undefined){end = "N/A";}
    if(urgent == null || urgent == undefined){urgent = "BASIC";}
    end = end.substring(0,10);

    // Create reference to table
    var table = document.getElementById("table");

    // Create new row
    var row = document.createElement("tr");
    row.classList.add("animated", "bounceInLeft");
    row.setAttribute("id", id);

    // Create row elements
    var tdTask = document.createElement("td");
    var tdStart = document.createElement("td");
    var tdEnd = document.createElement("td");
    var tdUrgent = document.createElement("td");

    // Populate row elements
    tdTask.innerText = task;
    tdStart.innerText = start;
    tdEnd.innerText = end;
    tdUrgent.innerText = urgent;

    // Append row elements to row
    row.append(tdTask);
    row.append(tdStart);
    row.append(tdEnd);
    row.append(tdUrgent);
    // Append row to table;
    table.append(row);

    // Add onclick listeners for each task
    row.onclick = function () {
        console.log("CLICK");
        var id = this.getAttribute("id");
        getTask(id);
    }
}

// Get latest task infomation from server
function getTask(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4200/task?task_id=" + id);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var taskDetails = JSON.parse(xhr.responseText);
                showTask(taskDetails);
            } else {
                Materialise.toast("Error getting task from server");
            }
        }
    }
    xhr.send();
}

// Renders the task infomation in a modal pop-up
function showTask(taskDetails) {
    renderTask(taskDetails.task);
    renderNote(taskDetails.note);
    $("#task-modal").modal("open");

    function renderTask(task) {
        var title = $("#task-title")[0];
        var date = $("#task-date")[0];
        var text = $("#task-desc")[0];

        title.innerHTML = "";
        //date.innerHTML = "";
        text.innerHTML = "";

        title.innerText = task.title;
        task.set_date = formatDate(task.set_date);
        //date.innerText = task.set_date;
        text.innerText = task.text;
    }

    function renderNote(note){
        var noteArea = $("#note-list")[0];
        noteArea.innerHTML = "";
        for (var i = 0; note.length > i; i++) {
            note[i].date = note[i].date.substring(0,11);

            var noteItem = document.createElement("li");
            var title = document.createElement("h4");
            var date = document.createElement("p");
            var text = document.createElement("p");

            noteItem.classList.add("note-item");
            
            if(note[i].colour){
                noteItem.style.backgroundColor = note[i].colour;
            }
        
            title.classList.add("col", "s8");
            title.innerText = note[i].title;
            console.log(note[i].date);
            note[i].date = formatDate(note[i].date);
            date.innerText = note[i].date;

            text.innerText = note[i].note;

            noteItem.append(title);
            noteItem.append(date);
            noteItem.append(text);

            noteArea.append(noteItem);
        }
    }
}

function formatDate(date) {
    // Trim off any extra charactersk
    date = date.substring(0,11);

    // Rotate date around
    date = date.split("-");
    date.reverse();
    date = date.join("-");

    // Replace "-" with "/"
    date = date.replace(/-/g, "/");

    // Remove SQL Timestamp characters "T" and "Z"
    date = date.replace(/[A-Z]/g, " ");

    // Remove any spaces
    date = date.replace(" ", "");

    return date;
}


module.exports.renderTasks = renderTasks;
module.exports.renderTask = renderTask;
