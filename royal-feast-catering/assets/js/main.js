/* =========================================================
   ROYAL FEAST — main.js
   Sticky header, mobile nav, dark mode, RTL, scroll reveal,
   accordion, tabs, back-to-top, generic form validation.
   ========================================================= */
(function () {
  "use strict";

  var html = document.documentElement;

  /* ---------- Theme (Dark / Light) ---------- */
  function initTheme() {
    var stored = localStorage.getItem("rf-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    html.setAttribute("data-theme", theme);
    updateThemeButtons(theme);
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  function toggleTheme() {
    var current = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("rf-theme", next);
    updateThemeButtons(next);
  }

  /* ---------- RTL toggle ---------- */
  function initDir() {
    var stored = localStorage.getItem("rf-dir") || "ltr";
    html.setAttribute("dir", stored);
    updateDirButtons(stored);
  }

  function updateDirButtons(dir) {
    document.querySelectorAll("[data-dir-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", dir === "rtl" ? "true" : "false");
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to left-to-right layout" : "Switch to right-to-left layout");
    });
  }

  function toggleDir() {
    var current = html.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    var next = current === "rtl" ? "ltr" : "rtl";
    html.setAttribute("dir", next);
    localStorage.setItem("rf-dir", next);
    updateDirButtons(next);
  }

  /* ---------- Sticky header shadow ---------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  /* ---------- Mobile nav with Backdrop & Lock Scroll ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".hamburger");
    var panel = document.querySelector(".mobile-nav");
    if (!toggle || !panel) return;

    // Create overlay backdrop element if not exists
    var backdrop = document.querySelector(".mobile-nav-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "mobile-nav-backdrop";
      document.body.appendChild(backdrop);
    }

    function closeNav() {
      panel.classList.remove("is-open");
      backdrop.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    function openNav() {
      panel.classList.add("is-open");
      backdrop.classList.add("is-active");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    backdrop.addEventListener("click", closeNav);

    // Toggle mobile dropdown (Home accordion)
    panel.querySelectorAll(".mobile-dropdown-header").forEach(function (header) {
      header.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var linksContainer = this.nextElementSibling;
        var icon = this.querySelector(".dropdown-icon, svg");
        var isExpanded = this.getAttribute("aria-expanded") !== "false";
        
        if (isExpanded) {
          if (linksContainer) linksContainer.style.display = "none";
          this.setAttribute("aria-expanded", "false");
          if (icon) icon.style.transform = "rotate(-90deg)";
        } else {
          if (linksContainer) linksContainer.style.display = "block";
          this.setAttribute("aria-expanded", "true");
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });
    });

    panel.querySelectorAll("a[href]").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        closeNav();
      }
    });
  }

  /* ---------- Global Toast Notification Helper ---------- */
  window.showToast = function (message, type) {
    type = type || "success";
    var container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    var toast = document.createElement("div");
    toast.className = "toast-message toast-" + type;
    toast.innerHTML = (type === "success" ? "✓ " : "✕ ") + message;
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
  };

  /* ---------- Active nav link highlight ---------- */
  function initActiveNav() {
    var page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("[data-nav-link], .admin-nav a, .mobile-nav a").forEach(function (link) {
      var target = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
      var isActive = (target === page) || (page === "" && target === "index.html");
      if (isActive) {
        link.setAttribute("aria-current", "page");
        link.classList.add("is-active");
      } else {
        link.removeAttribute("aria-current");
        link.classList.remove("is-active");
      }
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll("[data-animate]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-shown", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Accordion (FAQ) ---------- */
  function initAccordion() {
    document.querySelectorAll(".accordion-item").forEach(function (item) {
      var trigger = item.querySelector(".accordion-trigger");
      var panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;
      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".accordion-item").forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".accordion-panel").style.maxHeight = null;
          other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + 40 + "px";
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- Tabs (Menu categories) ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var buttons = group.querySelectorAll(".tab-btn");
      var panels = group.querySelectorAll(".tab-panel");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab-target");
          buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
          panels.forEach(function (p) {
            p.classList.toggle("is-active", p.getAttribute("data-tab-panel") === target);
          });
        });
      });
    });
  }

  /* ---------- Generic client-side form validation & Loading State ---------- */
  function validateField(field) {
    var value = field.value.trim();
    var valid = true;
    if (field.hasAttribute("required") && !value) valid = false;
    if (field.type === "email" && value) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && valid;
    }
    if (field.type === "tel" && value) {
      valid = /^[0-9+\-\s()]{7,}$/.test(value) && valid;
    }
    field.classList.toggle("is-invalid", !valid);
    return valid;
  }

  function initForms() {
    document.querySelectorAll("form[data-validate]").forEach(function (form) {
      var fields = form.querySelectorAll(".form-control[required], .form-control[type=email], .form-control[type=tel]");
      fields.forEach(function (field) {
        field.addEventListener("blur", function () { validateField(field); });
        field.addEventListener("input", function () {
          if (field.classList.contains("is-invalid")) validateField(field);
        });
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var allValid = true;
        fields.forEach(function (field) { if (!validateField(field)) allValid = false; });
        if (!allValid) {
          var firstInvalid = form.querySelector(".is-invalid");
          if (firstInvalid) firstInvalid.focus();
          window.showToast("Please fill out all required fields correctly.", "error");
          return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnText = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "Processing...";
        }

        setTimeout(function () {
          var successEl = form.parentElement.querySelector(".form-success") || document.getElementById(form.getAttribute("data-success-target") || "");
          if (successEl) {
            form.style.display = "none";
            successEl.classList.add("is-shown");
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
          window.showToast("Thank you! Your request has been submitted successfully.", "success");
          form.reset();
        }, 600);
      });
    });
  }

  /* ---------- Newsletter mini-form (footer) ---------- */
  function initNewsletter() {
    document.querySelectorAll(".newsletter-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input");
        if (input && input.value.trim()) {
          input.value = "";
          window.showToast("Subscribed! Thank you for joining our newsletter.", "success");
        }
      });
    });
  }

  // ---------- Admin Enquiries Table Status Filter ----------
  document.addEventListener("DOMContentLoaded", function () {
    const statusFilter = document.getElementById("statusFilter");
    const tableRows = document.querySelectorAll(".admin-table tbody tr");

    if (!statusFilter || !tableRows.length) return;

    statusFilter.addEventListener("change", function () {
      const selectedValue = this.value.toLowerCase().trim();

      tableRows.forEach(function (row) {
        const statusPill = row.querySelector(".status-pill");
        if (!statusPill) return;

        const rowStatus = statusPill.textContent.toLowerCase().trim();

        if (selectedValue === "all" || rowStatus === selectedValue) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  /* ---------- Admin sidebar toggle (mobile) ---------- */
  function initAdminSidebar() {
    var toggle = document.querySelector(".admin-hamburger");
    var sidebar = document.querySelector(".admin-sidebar");
    if (!toggle || !sidebar) return;

    /* Create backdrop */
    var backdrop = document.createElement("div");
    backdrop.className = "admin-sidebar-backdrop";
    backdrop.style.cssText = "position:fixed;inset:0;background:rgba(15,8,6,.55);backdrop-filter:blur(3px);z-index:1499;opacity:0;pointer-events:none;transition:opacity .25s ease;";
    document.body.appendChild(backdrop);

    function openSidebar() {
      sidebar.classList.add("is-open");
      backdrop.style.opacity = "1";
      backdrop.style.pointerEvents = "auto";
      toggle.setAttribute("aria-expanded", "true");
    }
    function closeSidebar() {
      sidebar.classList.remove("is-open");
      backdrop.style.opacity = "0";
      backdrop.style.pointerEvents = "none";
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar();
    });

    /* Close on backdrop click */
    backdrop.addEventListener("click", closeSidebar);

    /* Close on nav link click (mobile navigation) */
    sidebar.querySelectorAll(".admin-nav-link").forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initDir();
    initHeaderScroll();
    initMobileNav();
    initAdminSidebar();
    initActiveNav();
    initScrollReveal();
    initBackToTop();
    initAccordion();
    initTabs();
    initForms();
    initNewsletter();

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", toggleTheme);
    });
    document.querySelectorAll("[data-dir-toggle]").forEach(function (btn) {
      btn.addEventListener("click", toggleDir);
    });
  });
})();