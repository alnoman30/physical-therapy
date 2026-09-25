// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// Pixxen Physical Therapy js start


  // Therapy Banner items animation
(function () {
  if (typeof gsap === "undefined") {
    console.warn("GSAP not found — hero animation skipped.");
    return;
  }

  gsap.registerPlugin(typeof CustomEase !== "undefined" ? CustomEase : null);

  var EASE_OUT = "expo.out";
  var EASE_SOFT = "power3.out";

  if (typeof CustomEase !== "undefined") {
    CustomEase.create("heroOut", "0.16, 1, 0.3, 1");
    EASE_OUT = "heroOut";
  }

  function wrapWords(root) {
    var words = [];

    function walk(node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();

        parts.forEach(function (part) {
          if (part.trim() === "") {
            frag.appendChild(document.createTextNode(part));
          } else {
            var outer = document.createElement("span");
            outer.className = "hero-word-mask";
            outer.style.display = "inline-block";
            outer.style.overflow = "hidden";
            outer.style.verticalAlign = "top";

            var inner = document.createElement("span");
            inner.className = "hero-word";
            inner.style.display = "inline-block";
            inner.textContent = part;

            outer.appendChild(inner);
            frag.appendChild(outer);
            words.push(inner);
          }
        });

        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        Array.prototype.slice.call(node.childNodes).forEach(walk);
      }
    }

    Array.prototype.slice.call(root.childNodes).forEach(walk);

    return words;
  }

  var title = document.querySelector(".therapy-hero-title");
  var desc = document.querySelector(".therapy-hero-desc");
  var priceBox = document.querySelector(".therapy-hero-pricebox");
  var cta = document.querySelector(".therapy-hero-cta");
  var checkItems = gsap.utils.toArray(".therapy-hero-check-item");
  var badges = document.querySelector(".therapy-hero-badges");
  var videoPlayer = document.querySelector(".therapy-hero-videoplayer");

  if (!title) return;

  var words = wrapWords(title);

  gsap.set(words, {
    yPercent: 120,
    opacity: 0
  });

  gsap.set(desc, {
    y: 24,
    opacity: 0
  });

  gsap.set(priceBox, {
    autoAlpha: 0,
    x: -28,
    scaleY: 0.85,
    transformOrigin: "left top"
  });

  gsap.set(cta, {
    y: 20,
    opacity: 0,
    scale: 0.94
  });

  gsap.set(checkItems, {
    x: -18,
    opacity: 0
  });

  gsap.set(badges, {
    opacity: 0,
    y: 12
  });

  if (videoPlayer) {
    gsap.set(videoPlayer, {
      opacity: 0,
      scale: 1.02
    });
  }

  var tl = gsap.timeline({
    defaults: {
      ease: EASE_OUT
    },
    delay: 0.15
  });

  if (videoPlayer) {
    tl.to(
      videoPlayer,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      0
    );
  }

  tl.to(
    words,
    {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.045,
      ease: EASE_OUT
    },
    0.15
  );

  tl.to(
    desc,
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE_SOFT
    },
    0.5
  );

  tl.to(
    priceBox,
    {
      autoAlpha: 1,
      x: 0,
      scaleY: 1,
      duration: 0.9,
      ease: "power3.out"
    },
    0.7
  );

  tl.to(
    cta,
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.85,
      ease: "back.out(1.6)"
    },
    0.9
  );

  tl.to(
    checkItems,
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.12,
      ease: EASE_SOFT
    },
    1.05
  );

  tl.to(
    badges,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: EASE_SOFT
    },
    1.4
  );

  var magneticBtns = gsap.utils.toArray(".therapy-magnetic-btn");

  magneticBtns.forEach(function (btn) {
    var strength = 0.35;

    btn.addEventListener("mousemove", function (e) {
      var rect = btn.getBoundingClientRect();

      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: "power3.out"
      });
    });

    btn.addEventListener("mouseleave", function () {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)"
      });
    });
  });
})();


// therapy CTA button animation
document.addEventListener('DOMContentLoaded', () => {
 
    const MAGNETIC_MAX_DISTANCE = 12; // px -- movement can never exceed this, however far the mouse goes
    const clamp = (value) => Math.max(-MAGNETIC_MAX_DISTANCE, Math.min(MAGNETIC_MAX_DISTANCE, value));
 
    // ---- grouped magnetic buttons: icon + text inside .therapy-btn-cta move TOGETHER,
    // driven by one mousemove listener on the shared outer anchor, so they
    // never drift apart / overlap independently anymore.
    document.querySelectorAll('.therapy-btn-cta').forEach((group) => {
        const magneticChildren = group.querySelectorAll('.therapy-magnetic-btn');
 
        group.addEventListener('mousemove', (e) => {
            const rect = group.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
 
            magneticChildren.forEach((child) => {
                gsap.to(child, {
                    x: clamp(x * 0.15),
                    y: clamp(y * 0.15),
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });
        });
 
        group.addEventListener('mouseleave', () => {
            magneticChildren.forEach((child) => {
                gsap.to(child, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)',
                });
            });
        });
    });
 
    // ---- standalone magnetic buttons (e.g. See Pricing): unchanged, independent per-element ----
    document.querySelectorAll('.therapy-magnetic-btn').forEach((btn) => {
        if (btn.closest('.therapy-btn-cta')) return; // already handled by the group logic above
 
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
 
            gsap.to(btn, {
                x: clamp(x * 0.2),
                y: clamp(y * 0.2),
                duration: 0.4,
                ease: 'power3.out',
            });
        });
 
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)',
            });
        });
    });
});

// Therapy section heading reveal
gsap.registerPlugin(ScrollTrigger);
 
  document.querySelectorAll('.therapy-section-heading').forEach(heading => {
    const tween = gsap.fromTo(
      heading,
      {
        opacity: 0,
        y: 28,
        filter: 'blur(6px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'sine.out',
        paused: true
      }
    );
 
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 90%',
      end: 'bottom 50%',
      onUpdate: self => {
        // progress only ever moves forward — scroll position drives it,
        // but scrolling back up will never un-reveal it
        if (self.progress > tween.progress()) {
          tween.progress(self.progress);
        }
      }
    });
  });

