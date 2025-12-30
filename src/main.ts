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

  menuButton.classList.toggle('active');
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

const updateReadMore = () => {
  if (!readMoreBtn || !whoMoreText) return;

    readMoreBtn.style.display = "";
    whoMoreText.classList.remove("expanded");
    readMoreBtn.setAttribute("aria-expanded", "false");
    readMoreBtn.firstChild!.textContent = "Více";
  
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
// GALERIE 
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
function initGalleries() {
    // Najdeme všechny obrázky, které mají data-gallery
    const allGalleryImages = document.querySelectorAll<HTMLImageElement>("[data-gallery]");
    
    allGalleryImages.forEach(img => {
        const name = img.dataset.gallery!;
        if (!galleries[name]) galleries[name] = [];
        
        // Přidáme URL obrázku, pokud tam ještě není
        if (!galleries[name].includes(img.src)) {
            galleries[name].push(img.src);
        }
    });
}

/* otevření */
document.addEventListener("click", (e) => {
    const target = e.target as HTMLImageElement;
    if (target.classList.contains("service-gallery-thumb")) {
        const galleryName = target.dataset.gallery;
        if (!galleryName) return;

        initGalleries(); // Pro jistotu aktualizujeme seznam
        currentGallery = galleries[galleryName];
        
        // Najdeme index aktuálního obrázku v poli galerie
        currentIndex = currentGallery.indexOf(target.src);
        
        if (currentIndex !== -1) {
            openLightbox();
        }
    }
});

function openLightbox() {
    if (currentGallery[currentIndex]) {
        lightboxImg.src = currentGallery[currentIndex];
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden"; // Zamezí skrolování pozadí
    }
}

function closeLightbox() {

  lightbox.classList.remove("active");
  document.body.style.overflow = "";
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
