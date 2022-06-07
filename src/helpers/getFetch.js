// import data from "../data/data.json";

const products = [
  {
    id: "0",
    title: "Vela de Rosa",
    category: "Vela",
    initial: "1",
    stock: 10,
    price: 760,
    image: "https://i.postimg.cc/62jbMMQd/vela-Aromatica.webp",
  },
  {
    id: "1",
    title: "Vela de Vainilla",
    category: "Vela",
    initial: "1",
    stock: 2,
    price: 730,
    image: "https://i.postimg.cc/62jbMMQd/vela-Aromatica.webp",
  },
  {
    id: "2",
    title: "Aromatizante de lavanda",
    category: "Aromatizante",
    initial: "1",
    stock: 0,
    price: 550,
    image: "https://i.postimg.cc/rRDn35d7/difusor1.jpg",
  },
  {
    id: "3",
    title: "Aromatizante Night",
    category: "Aromatizante",
    initial: "1",
    stock: 2,
    price: 550,
    image: "https://i.postimg.cc/rRDn35d7/difusor1.jpg",
  },
  {
    id: "4",
    title: "Aromatizante Daytime",
    category: "Aromatizante",
    initial: "1",
    stock: 2,
    price: 530,
    image: "https://i.postimg.cc/rRDn35d7/difusor1.jpg",
  },
  {
    id: "5",
    title: "Aromatizante Morning",
    category: "Aromatizante",
    initial: "1",
    stock: 2,
    price: 540,
    image: "https://i.postimg.cc/rRDn35d7/difusor1.jpg",
  },
  {
    id: "6",
    title: "Aromatizante de Eucaliptus",
    category: "Aromatizante",
    initial: "1",
    stock: 2,
    price: 500,
    image: "https://i.postimg.cc/rRDn35d7/difusor1.jpg",
  },
  {
    id: "7",
    title: "Aromatizante de Limon",
    category: "Aromatizante",
    initial: "1",
    stock: 2,
    price: 540,
    image: "https://i.postimg.cc/rRDn35d7/difusor1.jpg",
  },
  {
    id: "8",
    title: "Vela de Pino",
    category: "Vela",
    initial: "1",
    stock: 2,
    price: 740,
    image: "https://i.postimg.cc/62jbMMQd/vela-Aromatica.webp",
  },
];

export const getFetch1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(products);
  }, 2000);
});
