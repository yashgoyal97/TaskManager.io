document.getElementById("task").value = 0;
var servers = [];
var tasks = [];
var tasksInProgress = [];
var progBars = [];
function addServer() {
    var serverDetails = {};
    //random number assigned to serverId 
    var serverId = Math.floor((Math.random() * 100) + 1);
    //appended Id to name for unique server
    var serverName = `Server${serverId}`;
    serverDetails.id = serverId;
    serverDetails.name = serverName;
    serverDetails.status = "AVAILABLE";
    // console.log("server", serverDetails);
    servers.push(serverDetails);
    // servers = new Set(servers);
    // console.log(servers);
    if (tasks.length > 0) {
        tasksInProgress = this.assignTaskToServer();
        // console.log("Tasks picked up by server: ", tasksInProgress);
        this.createTaskDiv(tasks);
        this.createServerDiv(servers);
        if (tasksInProgress.length > 0) {
            this.tasksInProgressDiv(tasksInProgress);
        }
    } else {
        // console.log("No tasks available to pickup");
        this.createServerDiv(servers);
    }
}

function createServerDiv(servers) {
    var serverDiv = document.getElementById("serverList");
    serverDiv.innerHTML = '';
    var availableServers = 0;
    servers.forEach(server => {
        if (server.status === "AVAILABLE") {
            availableServers++;
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("class", `servers`);
            mainDiv.setAttribute("id", `servers${server.id}`);
            var serverName = document.createElement('h4');
            serverName.innerHTML = `${server.name}`;
            var deleteServer = document.createElement('button');
            deleteServer.setAttribute('class', 'serverBtns');
            deleteServer.setAttribute('id', `btn${server.name}`);
            deleteServer.innerHTML = "Delete";
            mainDiv.appendChild(serverName);
            mainDiv.appendChild(deleteServer);
            document.getElementById("serverList").appendChild(mainDiv);
        }
    });
    if (!availableServers) {
        var noServer = document.createElement('h4');
        noServer.innerText = "No server available";
        document.getElementById("serverList").appendChild(noServer);
    }
}

function clearServerList() {
    var serverDiv = document.getElementById("serverList");
    serverDiv.innerHTML = '';
    servers = [];
}

function addTask() {
    var newTask = Number(document.getElementById("task").value);
    document.getElementById("task").value = 0;
    if (newTask) {
        for (var i = 0; i < newTask; i++) {
            var taskDetails = {};
            var taskId = Math.floor((Math.random() * 100) + 1);
            var taskName = `Task${taskId}`;
            taskDetails.id = taskId;
            taskDetails.name = taskName;
            taskDetails.status = "PENDING";
            tasks.push(taskDetails);
            // tasks = new Set(tasks);
        }
        if (servers.length > 0) {
            tasksInProgress = this.assignTaskToServer();
            // console.log("Tasks picked up by server: ", tasksInProgress, tasks);
            this.createTaskDiv(tasks);
            this.createServerDiv(servers);
            if (tasksInProgress.length > 0) {
                this.tasksInProgressDiv(tasksInProgress);
            }

        } else {
            // console.log("No server available to pickup task");
            this.createTaskDiv(tasks);
        }
        // console.log(tasks);
    }
}

function createTaskDiv(tasks) {
    var taskDiv = document.getElementById("taskList");
    taskDiv.innerHTML = '';
    var pendingTasks = 0;
    tasks.forEach(task => {
        if (task.status === "PENDING") {
            pendingTasks++;
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("class", 'tasks');
            // mainDiv.setAttribute("id", `tasks${task.id}`);

            var taskName = document.createElement('h4');
            taskName.innerHTML = `${task.name}`;

            var deleteTask = document.createElement('button');
            deleteTask.setAttribute('class', 'taskBtns');
            // deleteTask.setAttribute('id', `btn${task.name}`);
            deleteTask.innerHTML = "Delete";

            mainDiv.appendChild(taskName);
            mainDiv.appendChild(deleteTask);
            document.getElementById("taskList").appendChild(mainDiv);
        }
    });
    if (!pendingTasks) {

    }
}

function assignTaskToServer() {
    for (var i = 0; i < servers.length; i++) {
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].status === "PENDING" && servers[i].status === "AVAILABLE") {
                //Task picked up by server
                servers[i].status = "NOT AVAILABLE";
                tasks[j].status = "PROGRESS";

                var taskInProgressObj = {};
                taskInProgressObj.serverName = servers[i].name;
                taskInProgressObj.serverId = servers[i].id;
                taskInProgressObj.serverStatus = servers[i].status;
                taskInProgressObj.taskName = tasks[j].name;
                taskInProgressObj.taskId = tasks[j].id;
                taskInProgressObj.taskStatus = tasks[j].status;

                tasksInProgress.push(taskInProgressObj);
            }
        }
    }
    return tasksInProgress;
}

function tasksInProgressDiv(inProgTasks) {
    document.getElementById('inProgressDiv').style.display = 'block';
    console.log(inProgTasks);
    inProgTasks.forEach(task => {
        if (task.taskStatus === "PROGRESS") {
            var mainDiv = document.createElement('div');
            mainDiv.setAttribute("class", `tasksInProgress`);
            mainDiv.setAttribute("id", `tasks${task.taskId}`);
            var taskName = document.createElement('h4');
            taskName.setAttribute("class", `taskName`);
            taskName.innerHTML = `${task.taskName}`;

            var progBackground = document.createElement('div');
            progBackground.setAttribute("class", `progBG`);
            var progressBar = document.createElement('div');
            progressBar.setAttribute("class", `progBar`);
            progBackground.appendChild(progressBar);

            mainDiv.appendChild(taskName);
            mainDiv.appendChild(progBackground);

            document.getElementById("taskInProgressList").appendChild(mainDiv);
            // console.log("task", task);

            //progress bar running
            if (task.taskStatus !== "PROG_START") {
                const progBars = document.getElementsByClassName('progBar');
                for (let i = 0; i < progBars.length; i++) {
                    let width = 0;
                    let elem = progBars[i];
                    let newInterval = setInterval(function () {
                        if (width < 100) {
                            task.taskStatus = "PROG_START";
                            width++;
                            elem.style.width = width + "%";
                        } else {
                            clearInterval(newInterval);
                        }
                    }, 200);
                }
            }
        }
    });
}
