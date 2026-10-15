/* Disc Rotation Function */

const DISCS = [
  {id: "Disc-1", subtitle: "Asylum", link: "https://y3036816.wixsite.com/echos-in-the-asylum", image: "/Images/Disc-1.png"},
  {id: "Disc-2", subtitle: "GymBrosAR", link: "https://y3036816.wixsite.com/ar-app-showcase", image: "/Images/Disc-2.png"},
  {id: "Disc-3", subtitle: "2D Platformer", link: "https://y3036816.wixsite.com/portfolio", image: "/Images/Disc-3.png"},
  {id: "Disc-4", subtitle: "Blank Disc", Link: null, image: null}
]

const discContainer = document.querySelector('.disc-container');

DISCS.forEach(disc =>{
  const tile = document.createElement("div");
})

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
}

const carousel = new Carousel(discContainer, discContainer.children);

