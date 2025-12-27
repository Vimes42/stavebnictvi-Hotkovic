// ======================
// COPYRIGHT
// ======================
const copyrightEl =
  document.getElementById("rok-copyright") as HTMLElement | null;

if (copyrightEl) {
  copyrightEl.innerText = new Date().getFullYear().toString();
}

// ======================
// NAVBAR SCROLL
// ======================
const navbar = document.querySelector(".navbar") as HTMLElement | null;

window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 20);
});

// ======================
// MOBILE MENU
// ======================
const menuButton = document.querySelector(".hamburger") as HTMLElement | null;
const navList = document.querySelector(".nav-list") as HTMLElement | null;
const navItems = document.querySelectorAll(".nav-list li");

menuButton?.addEventListener("click", () => {
  navList?.classList.toggle("active");

  if (navList?.classList.contains("active")) {
    window.scroll({ top: 0, behavior: "smooth" });
  }
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navList?.classList.remove("active");
  });
});

// ======================
// READ MORE (WHO)
// ======================
const readMoreBtn =
  document.querySelector(".read-more-btn") as HTMLButtonElement | null;
const whoMoreText =
  document.querySelector(".who-more-text") as HTMLElement | null;

const isMobile = () => window.innerWidth < 768;

const updateReadMore = () => {
  if (!readMoreBtn || !whoMoreText) return;

  if (isMobile()) {
    readMoreBtn.style.display = "";
    whoMoreText.classList.remove("expanded");
    readMoreBtn.setAttribute("aria-expanded", "false");
    readMoreBtn.firstChild!.textContent = "Více";
  } else {
    whoMoreText.classList.add("expanded");
    readMoreBtn.style.display = "none";
  }
};

readMoreBtn?.addEventListener("click", () => {
  const expanded = readMoreBtn.getAttribute("aria-expanded") === "true";
  whoMoreText?.classList.toggle("expanded", !expanded);
  readMoreBtn.setAttribute("aria-expanded", String(!expanded));
  readMoreBtn.firstChild!.textContent = expanded ? "Více" : "Zobrazit méně";
});

window.addEventListener("resize", updateReadMore);
updateReadMore();

// ======================
// GALERIE (SERVICES)
// ======================

type Gallery = Record<string, string[]>;

const galleries: Gallery = {};
let currentGallery: string[] = [];
let currentIndex = 0;

const lightbox = document.getElementById("lightbox")!;
const lightboxImg = document.querySelector(".lightbox-image") as HTMLImageElement;
const btnPrev = document.querySelector<HTMLButtonElement>(".lightbox-prev")!;
const btnNext = document.querySelector<HTMLButtonElement>(".lightbox-next")!;
const btnClose = document.querySelector<HTMLButtonElement>(".lightbox-close")!;

/* načtení galerií */
document.querySelectorAll<HTMLImageElement>(".service-gallery-hidden img").forEach((img) => {
    const gallery = img.dataset.gallery;
    if (!gallery) return;

    galleries[gallery] ??= [];
    galleries[gallery].push(img.src);
  });

/* otevření */
document.querySelectorAll(".service-gallery-thumb").forEach(thumb => {
  thumb.addEventListener("click", () => {
    const galleryName = thumb.getAttribute("data-gallery")!;
    currentGallery = galleries[galleryName];
    currentIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = currentGallery[currentIndex];
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

/* navigace */
btnPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  openLightbox();
});

btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  openLightbox();
});

btnClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") btnPrev.click();
  if (e.key === "ArrowRight") btnNext.click();
});
