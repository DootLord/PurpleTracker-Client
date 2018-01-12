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
    // Create reference to table
    var table = document.getElementById("table")
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
    row.onclick = function(){
        console.log("CLICK");
        var id = this.getAttribute("id");
        getTask(id);
    }
}

// Get latest task infomation from server
function getTask(id){
    var xhr = new XMLHttpRequest();
    xhr.open("GET" ,"http://localhost:4200/task?task_id=" + id);

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                
                var taskDetails = JSON.parse(xhr.responseText);
                showTask(taskDetails);
            } else {
                Materialise.toast("Error getting task from server");
            }
        }
    }
    xhr.send();
}

// Renders the task infomation in a pop-up
function showTask(taskDetails){
    console.log(taskDetails);

    /** RENDER DATA ON MODAL */    
    
    $("#task-modal").modal("open");

}


module.exports.renderTasks = renderTasks;
module.exports.renderTask = renderTask;
