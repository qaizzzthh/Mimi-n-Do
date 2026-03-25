localStorage.removeItem("books");

const initialBooks = [
  {
    id: 1,
    title: "Timun Mas",
    cover: "../img/timun-mas.svg",
    prototype: true
  },
  {
    id: 2,
    title: "Anteh Si Penjaga Bulan",
    cover: "../img/anteh-si-penjaga-bulan.svg",
    prototype: false
  },
  {
    id: 3,
    title: "Asal-Usul Tari Guel",
    cover: "../img/asal-usul-tari-guel.svg",
    prototype: false
  },
  {
    id: 4,
    title: "Batu Panjang",
    cover: "../img/batu-panjang.svg",
    prototype: false
  },
  {
    id: 5,
    title: "Biwar Penkaluk Naga",
    cover: "../img/biwar-penakluk-naga.svg",
    prototype: false
  },
  {
    id: 6,
    title: "Gajah Wong",
    cover: "../img/gajah-wong.svg",
    prototype: false
  },
  {
    id: 7,
    title: "Ibuanari dan Sagu Bulan",
    cover: "../img/ibuanari-dan-sagu-bulan.svg",
    prototype: false
  },
  {
    id: 8,
    title: "La Moelu",
    cover: "../img/la-moelu.svg",
    prototype: false
  },
  {
    id: 9,
    title: "Perempuan Pembawa Api",
    cover: "../img/perempuan-pembawa-api.svg",
    prototype: false
  },
  {
    id: 10,
    title: "Si Lebai Malang",
    cover: "../img/si-lebai-malang.svg",
    prototype: false
  },
  {
    id: 11,
    title: "Siuk Bambam Siuk Bimbim",
    cover: "../img/siuk-bambam-siuk-bimbim.svg",
    prototype: false
  },
];

if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(initialBooks));
}

const storedBooks = JSON.parse(localStorage.getItem("books"));