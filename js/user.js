function startUserPopulation(){
    $.ajax("http://localhost:4200/users")
    .done(function(data) {
        populateUserList(data);
    });
}

function populateUserList(users){
    console.log(users);
}

module.exports.startUserPopulation = startUserPopulation;
