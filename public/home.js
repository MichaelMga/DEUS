const projectCreationPanel = document.getElementById("projectCreationPanelWrapper");

const openProjectCreationPanel = () => {
    updateProjectCreationPanelDisplay('flex');
}

const closeProjectCreationPanel = () => {
    updateProjectCreationPanelDisplay('none');
}

const updateProjectCreationPanelDisplay = (display) => {
    projectCreationPanel.style.display = display;
}


const tryToCreateProject = () => {

    const user =  JSON.parse(localStorage.getItem('user')).user;

    fetch("http://localhost:3000/create-project", {
        method: "POST",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                user,
                projectName: document.getElementById('newProjectName').value
            }
        )
    }).then(
        res => console.log(res)
     )
}