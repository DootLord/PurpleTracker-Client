/**
 * Iterates through returned server object to render tasks
 * @param {JSON} tasks 
 */
function renderTasks(tasks) {
    for (var i = 0; tasks.length > i; i++) {
        renderTask(tasks[i].title, tasks[i].set_date, tasks[i].complete_date, tasks[i].urgent);
    }
}

/** 
 * Uses data pulled from server to display tasks to user
 */
function renderTask(task, start, end, urgent) {
    // Create reference to table
    var table = document.getElementById("table")
    // Create new row
    var row = document.createElement("tr");
    row.classList.add("animated", "bounceInLeft");
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
}


module.exports.renderTasks = renderTasks;
module.exports.renderTask = renderTask;
