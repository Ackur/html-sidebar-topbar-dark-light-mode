const elements = {
  sidebar: document.getElementById("app-sidebar"),
  sidebarBackdrop: document.getElementById("app-sidebar-backdrop"),
  sidebarToggle: document.getElementById("toggle-sidebar"),
  themeSwitcher: document.getElementById("theme-switcher"),
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

// PROJECT COLOR THEME
class ProjectColorTheme {
  darkThemeInstance = null;
  themeVariants = { dark: "dark", light: "light" };
  currentTheme = null;

  setCurrentTheme = theme => {
    this.currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  };

  toogleTheme = () => {
    const { dark, light } = this.themeVariants;
    const theme = this.currentTheme === dark ? light : dark;
    this.currentTheme = theme;

    // waiting for switch animation
    setTimeout(() => {
      this.setCurrentTheme(theme);
    });
  };

  onSystemChangeTheme = evt => {
    const theme = evt.matches
      ? this.themeVariants.dark
      : this.themeVariants.light;
    this.setCurrentTheme(theme);
  };

  init = () => {
    this.darkThemeInstance = window.matchMedia("(prefers-color-scheme: dark)");
    const localStoreTheme = localStorage.getItem("theme");
    if (localStoreTheme) {
      const { dark, light } = this.themeVariants;
      this.setCurrentTheme(localStoreTheme === dark ? dark : light);
    } else {
      this.onSystemChangeTheme(this.darkThemeInstance);
    }
    this.darkThemeInstance.addEventListener("change", this.onSystemChangeTheme);
  };

  destroy = () => {
    this.darkThemeInstance.removeEventListener(
      "change",
      this.onSystemChangeTheme
    );
  };
}

const projectColorTheme = new ProjectColorTheme();
projectColorTheme.init();

elements.themeSwitcher.addEventListener("click", projectColorTheme.toogleTheme);
elements.sidebarToggle.addEventListener("click", toggleSidebar);
elements.sidebarBackdrop.addEventListener("click", toggleSidebar);
window.matchMedia("(min-width: 769px)").addEventListener("change", event => {
  if (event.matches) expandSidebar();
  else collapseSidebar();
});
