const DISCS = [
  { id: "Disc-1", subtitle: "Asylum",        link: "https://y3036816.wixsite.com/echos-in-the-asylum", image: "/Images/Disc-1.png" },
  { id: "Disc-2", subtitle: "GymBrosAR",     link: "https://y3036816.wixsite.com/ar-app-showcase",     image: "/Images/Disc-2.png" },
  { id: "Disc-3", subtitle: "2D Platformer", link: "https://y3036816.wixsite.com/portfolio",           image: "/Images/Disc-3.png" },
  { id: "Disc-4", subtitle: "Blank Disc",    link: null, image: "/Images/Disc-4.png"}
];

const BLANK_DISC_IMAGE = "/Images/Disc-Blank.png";

const discContainer = document.querySelector('.disc-container');

DISCS.forEach(disc => {
  const img = document.createElement("img");
  img.src = disc.image ?? BLANK_DISC_IMAGE;
  img.alt = disc.subtitle;
  img.title = disc.subtitle;
  img.dataset.disc = disc.id;
  discContainer.appendChild(img);
});

class Carousel {
  constructor(container, items) {
    this.carouselContainer = container;
    this.carouselArray = [...items];
    this.setupClicks();
    this.updateDiscs();
  }

  updateDiscs() {
    this.carouselArray.forEach(el => {
      el.classList.remove('disc-item-1', 'disc-item-2', 'disc-item-3', 'disc-item-4');
    });

    this.carouselArray.slice(0, 4).forEach((el, i) => {
      el.classList.add(`disc-item-${i + 1}`);
    });
  }

  setupClicks() {
    this.carouselArray.forEach(el => {
      el.addEventListener('click', () => this.selectDisc(el));
    });
  }

  selectDisc(clicked) {
    const oldFirst = this.carouselArray[0];
    if (clicked === oldFirst) return;

    const rest = this.carouselArray.filter(el => el !== clicked && el !== oldFirst);
    this.carouselArray = [clicked, ...rest.slice(0, 2), oldFirst, ...rest.slice(2)];
    this.updateDiscs();
  }

  get selected() {
    return this.carouselArray[0];
  }
}

const carousel = new Carousel(discContainer, discContainer.children);

const startBtn = document.querySelector('.Startbtn');

startBtn.addEventListener('click', () => {
  const data = DISCS.find(d => d.id === carousel.selected.dataset.disc);
  if (!data || !data.link) return;

  window.open(data.link, '_blank', 'noopener');
});