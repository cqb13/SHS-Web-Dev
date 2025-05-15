const projectCardContainer = document.getElementById("projects");

document.addEventListener("DOMContentLoaded", function () {
  const projectCardContainer = document.getElementById("projects");

  fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
      projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";

        const projectCardHeader = document.createElement("div");
        projectCardHeader.className = "project-card-header";

        const name = document.createElement("h3");
        name.textContent = project.name;

        const description = document.createElement("p");
        description.textContent = project.description;

        projectCardHeader.appendChild(name);
        projectCardHeader.appendChild(description);

        const projectCardInteract = document.createElement("div");
        projectCardInteract.className = "project-card-interact";

        if (project.code != "") {
          const codeLink = document.createElement("a");
          codeLink.href = project.code;
          codeLink.target = "_blank";
          codeLink.textContent = "Code";
          projectCardInteract.appendChild(codeLink);
        }

        const viewLink = document.createElement("a");
        viewLink.href = project.view;
        viewLink.target = "_blank";
        viewLink.textContent = "View";

        projectCardInteract.appendChild(viewLink);

        projectCard.appendChild(projectCardHeader);
        projectCard.appendChild(projectCardInteract);

        projectCardContainer.appendChild(projectCard);
      });
    })
    .catch((error) => {
      console.error("Error loading projects:", error);
    });
});
