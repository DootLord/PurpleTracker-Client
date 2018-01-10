const remote = require("electron").remote;
const task = require("./js/task.js");
const storage = window.localStorage;
const BrowserWindow = remote.BrowserWindow;
var user;

/**
 * Pulls tasks for that user
 */
function initalize() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:4200/tasks?uid=" + user.id);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      task.renderTasks(JSON.parse(xhr.responseText));
    }
  }
  xhr.send();
}

/** 
 * Pulls user data from server using login details
 */
function loginUser() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var login = {
      "username": username,
      "password": password
  }

  // Make request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:4200/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) { // If valid, login user
              user = JSON.parse(xhr.responseText);
              document.getElementById("overlay-login").classList.remove("fadeInDown"); // remove inital animation class
              document.getElementById("overlay-login").classList.add("zoomOutUp"); // Add zoom out animation class
              initalize();
          } else if (xhr.status === 400) { // If no data, inform user
              Materialize.toast("Please ensure both fields are filled out!", 2000, "red");
          } else if (xhr.status === 204) { // If bad login, inform user
              Materialize.toast("Invalid username or password", 2000, "red");
          }
      }
  }
  xhr.send(JSON.stringify(login));
}

/** On Click */
// Login user on button press
document.getElementById("login").addEventListener("click", loginUser);

// Close app on exit button press
document.getElementById("close").addEventListener("click", function () {
  process.exit(0); // Exit without error
});

/** Keypress */

// Enter key for login
document.onkeypress = function (e) {
  if (e.keyCode == 13) {
    loginUser();
    return false;
  } else {
    return true;
  }
}


