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


window.onload = async () => {

    const user = JSON.parse(localStorage.getItem("user")).user;

   const homeProjectsWrapper = document.getElementById("homeProjectsWrapper");

   const data = await fetch(`http://localhost:3000/projects?user=${user}`);

   data.json().then(
    res => {
      res.projects.forEach(project => {

        const projectElement = document.createElement("div");

        projectElement.setAttribute("class", "projectContainer");

        homeProjectsWrapper.appendChild(projectElement)
        
      });
       console.log(res)
    }
        )
   

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