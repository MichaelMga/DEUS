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