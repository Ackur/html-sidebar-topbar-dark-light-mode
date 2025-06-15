const elements = {
  toggleSidebar: document.getElementById("toggle-sidebar"),
  sidebar: document.getElementById("app-sidebar"),
};

function onToggleSidebarClicked() {
  const expanded = this.getAttribute("aria-expanded") === "true";

  if (expanded) {
    document.documentElement.style.setProperty("--sidebar-width", "80px");
    this.setAttribute("aria-expanded", "false");
    elements.sidebar.classList.add("expanded");
  } else {
    document.documentElement.style.setProperty("--sidebar-width", "250px");
    this.setAttribute("aria-expanded", "true");
    elements.sidebar.classList.remove("expanded");
  }
}

elements.toggleSidebar.addEventListener("click", onToggleSidebarClicked);
