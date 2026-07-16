(function () {
  "use strict";

  var NAV_BREAKPOINT = 1200;

  var body = document.body;
  var header = document.querySelector("[data-site-chrome]");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("menu-toggle");
  var overlay = document.getElementById("nav-overlay");

  function setChromeHeight() {
    if (!header) return;
    var height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty(
      "--site-chrome-height",
      height + "px"
    );
  }

  function isDesktopNav() {
    return window.matchMedia("(min-width: " + (NAV_BREAKPOINT + 1) + "px)").matches;
  }

  function openMenu() {
    if (!nav || !toggle || !overlay) return;
    nav.classList.add("is-open");
    toggle.classList.add("is-active");
    overlay.classList.add("is-visible");
    body.classList.add("is-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    overlay.setAttribute("aria-hidden", "false");
    nav.removeAttribute("aria-hidden");
  }

  function closeMenu() {
    if (!nav || !toggle || !overlay) return;
    nav.classList.remove("is-open");
    toggle.classList.remove("is-active");
    overlay.classList.remove("is-visible");
    body.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    overlay.setAttribute("aria-hidden", "true");
    if (!isDesktopNav()) {
      nav.setAttribute("aria-hidden", "true");
    } else {
      nav.removeAttribute("aria-hidden");
    }
  }

  function toggleMenu() {
    if (nav && nav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    setChromeHeight();
    if (isDesktopNav()) {
      closeMenu();
    }
  });

  if (header && typeof ResizeObserver !== "undefined") {
    var observer = new ResizeObserver(function () {
      setChromeHeight();
    });
    observer.observe(header);
  }

  setChromeHeight();
  window.addEventListener("load", setChromeHeight);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setChromeHeight).catch(function () {});
  }

  if (!isDesktopNav() && nav) {
    nav.setAttribute("aria-hidden", "true");
  }
})();
