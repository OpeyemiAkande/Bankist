"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

// Modal Window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    openModal(e);
  })
);

btnCloseModal.addEventListener("click", function (e) {
  closeModal(e);
});

overlay.addEventListener("click", function (e) {
  closeModal(e);
});

// nav hover effects
const navHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", navHover.bind(0.5));
nav.addEventListener("mouseout", navHover.bind(1));

// Smooth links Navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// Learn More Scroll
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

// Sticky Nav
const initialCoords = section1.getBoundingClientRect();
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (enteries) {
  const [entry] = enteries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Tabbed Component
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  // Activate tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // if (entry.intersectionRatio.toFixed(2) >= 0.15)
  //   entry.target.classList.remove("section--hidden");
  // else entry.target.classList.add("section--hidden");
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// window.addEventListener("scroll", checkBoxes);
// // checkBoxes();

// function checkBoxes() {
//   const triggerBottom = window.innerHeight * 0.8;
//   //   const triggerBottom = (window.innerHeight / 20) * 19;

//   allSections.forEach((section) => {
//     const sectionTop = section.getBoundingClientRect().top;
//     // console.log(sectionTop);

//     if (sectionTop < triggerBottom) {
//       section.classList.remove("section--hidden");
//     } else {
//       section.classList.add("section--hidden");
//     }
//   });
// }

// Slider
const slider = function (slide) {
  // select the slider elements
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotsContainer = document.querySelector(".dots");

  // slide state variables
  let curSlide = 0;
  const maxSlide = slides.length;

  /* FUNCTIONs */
  // create dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slideNo) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slideNo}"]`)
      .classList.add("dots__dot--active");
  };

  // Go to slide - a messenger function to next and prev
  const goToSlide = function (slideNo) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNo)}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };
  // goToSlide(1);

  // Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = max - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDots(0);
  };

  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  });
};

slider();
