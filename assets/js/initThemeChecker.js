(function () {
  try {
    const theme = localStorage.getItem("theme") || "system";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);
    if (isDark) document.documentElement.dataset.theme = "dark";
  } catch (e) {
    console.log(e);
  }
})();
