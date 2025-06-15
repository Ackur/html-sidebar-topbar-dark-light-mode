const elements = {
  sidebar: document.getElementById("app-sidebar"),
  sidebarBackdrop: document.getElementById("app-sidebar-backdrop"),
  sidebarToggle: document.getElementById("toggle-sidebar"),
};

const sidebarWidth = {
  expanded: getComputedStyle(document.documentElement).getPropertyValue(
    "--sidebar-expanded-width"
  ),
  collapsed: getComputedStyle(document.documentElement).getPropertyValue(
    "--sidebar-collapsed-width"
  ),
};

function expandSidebar() {
  document.documentElement.style.setProperty(
    "--sidebar-width",
    sidebarWidth.expanded
  );
  elements.sidebarToggle.setAttribute("aria-expanded", "true");
  elements.sidebar.classList.remove("collapsed");
}

function collapseSidebar() {
  document.documentElement.style.setProperty(
    "--sidebar-width",
    sidebarWidth.collapsed
  );
  elements.sidebarToggle.setAttribute("aria-expanded", "false");
  elements.sidebar.classList.add("collapsed");
}

function toggleSidebar() {
  const isExpanded =
    elements.sidebarToggle.getAttribute("aria-expanded") === "true";
  if (isExpanded) collapseSidebar();
  else expandSidebar();
}

elements.sidebarToggle.addEventListener("click", toggleSidebar);
elements.sidebarBackdrop.addEventListener("click", toggleSidebar);
window.matchMedia("(min-width: 769px)").addEventListener("change", event => {
  if (event.matches) expandSidebar();
  else collapseSidebar();
});
