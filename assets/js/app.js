const elements = {
  sidebar: document.getElementById("app-sidebar"),
  sidebarBackdrop: document.getElementById("app-sidebar-backdrop"),
  sidebarToggle: document.getElementById("toggle-sidebar"),
  themeSwitcher: document.getElementById("theme-switcher"),
};

const responsiveMobileWidth = "768px";

class CollapsedSidebar {
  sidebarEl = null;
  triggerEl = null;
  sidebarWidth = {
    expanded: getComputedStyle(document.documentElement).getPropertyValue(
      "--sidebar-expanded-width"
    ),
    collapsed: getComputedStyle(document.documentElement).getPropertyValue(
      "--sidebar-collapsed-width"
    ),
  };

  constructor(sidebarEl, triggerEl, responsiveMobileWidth) {
    this.sidebarEl = sidebarEl;
    this.triggerEl = triggerEl;
    this.responsiveMobileWidth = responsiveMobileWidth;
  }

  expandSidebar = () => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      this.sidebarWidth.expanded
    );
    this.triggerEl.setAttribute("aria-expanded", "true");
    this.sidebarEl.classList.remove("collapsed");
  };

  collapseSidebar = () => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      this.sidebarWidth.collapsed
    );
    this.triggerEl.setAttribute("aria-expanded", "false");
    this.sidebarEl.classList.add("collapsed");
  };

  toggleSidebar = () => {
    const isExpanded = this.triggerEl.getAttribute("aria-expanded") === "true";
    if (isExpanded) this.collapseSidebar();
    else this.expandSidebar();
  };

  init = () => {
    if (window.innerWidth <= window.parseInt(this.responsiveMobileWidth))
      this.collapseSidebar();
    else this.expandSidebar();
  };
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

const collapsedSidebar = new CollapsedSidebar(
  elements.sidebar,
  elements.sidebarToggle,
  responsiveMobileWidth
);
const projectColorTheme = new ProjectColorTheme();

collapsedSidebar.init();
projectColorTheme.init();

elements.themeSwitcher.addEventListener("click", projectColorTheme.toogleTheme);
elements.sidebarToggle.addEventListener(
  "click",
  collapsedSidebar.toggleSidebar
);
elements.sidebarBackdrop.addEventListener(
  "click",
  collapsedSidebar.toggleSidebar
);
window
  .matchMedia(`(max-width: ${responsiveMobileWidth})`)
  .addEventListener("change", collapsedSidebar.init);
