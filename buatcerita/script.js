/* ================================================
   SCRIPT.JS - JavaScript untuk Buat Cerita
   Digunakan oleh: index.html, editor.html, buat.html
   ================================================ */

// ==================== VARIABLES ====================
let cerita = JSON.parse(localStorage.getItem("cerita")) || [];
let modeHapus = false;
let sudahSimpan = false;
let fileTerpilih = null;

// Pagination
let currentPage = 1;
const perPage = 4;

// ==================== FUNGSI NAVIGASI ====================
function kehome() {
  window.location.href = "../index.html";
}

function keBuat() {
  window.location.href = "buat.html";
}

function bukaLibrary() {
  window.location.href = "index.html";
}

// ==================== RENDER CERITA (INDEX) ====================
function renderCerita() {
  let list = document.getElementById("ceritaList");
  if (!list) return;

  list.innerHTML = "";

  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  let dataTampil = cerita.slice(start, end);

  dataTampil.forEach((c, index) => {
    let nomor = start + index + 1;

    list.innerHTML += `
      <div class="cerita-item" onclick="klikCerita(${nomor - 1})">
        <div class="nomor">${nomor}</div>
        <img src="img/buku.png" class="icon-buku" alt="Buku">
        <div class="judul">${c.judul}</div>
        <div class="tanggal">${c.tanggal}</div>
        <button class="btn-upload" onclick="event.stopPropagation(); uploadDariIndex(${nomor - 1})">
          Upload
        </button>
      </div>
    `;
  });

  // Update nomor halaman
  let pageNum = document.getElementById("pageNumber");
  if (pageNum) {
    pageNum.innerText = currentPage;
  }
}

function nextPage() {
  if (currentPage * perPage < cerita.length) {
    currentPage++;
    renderCerita();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderCerita();
  }
}

// ==================== AKSI CERITA ====================
function aktifkanHapus() {
  modeHapus = true;
  alert("Pilih cerita yang ingin dihapus");
}

function tambahCerita() {
  localStorage.setItem("asalHalaman", "index");
  localStorage.setItem("editIndex", -1);
  window.location.href = "editor.html";
}

function editCerita(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "editor.html";
}

function klikCerita(index) {
  if (modeHapus) {
    let konfirmasi = confirm("Hapus cerita ini?");
    if (!konfirmasi) return;

    cerita.splice(index, 1);
    localStorage.setItem("cerita", JSON.stringify(cerita));
    modeHapus = false;

    // Jika halaman kosong setelah hapus, mundur 1 page
    if ((currentPage - 1) * perPage >= cerita.length && currentPage > 1) {
      currentPage--;
    }

    renderCerita();
  } else {
    editCerita(index);
  }
}

// ==================== EDITOR ====================
function loadEditor() {
  let judulInput = document.getElementById("judul");
  let isiInput = document.getElementById("isi");

  // Jika bukan halaman editor
  if (!judulInput || !isiInput) return;

  let index = parseInt(localStorage.getItem("editIndex"));

  if (index >= 0 && cerita[index]) {
    judulInput.value = cerita[index].judul;
    isiInput.value = cerita[index].isi;
  }
}

function simpanCerita() {
  let judul = document.getElementById("judul")?.value;
  let isi = document.getElementById("isi")?.value;

  if (!judul || !isi) {
    alert("Isi judul dan cerita dulu!");
    return;
  }

  let index = parseInt(localStorage.getItem("editIndex"));
  let tanggal = new Date().toLocaleDateString("id-ID");

  let data = {
    judul: judul,
    isi: isi,
    tanggal: tanggal
  };

  if (index === -1) {
    cerita.push(data);
  } else {
    cerita[index] = data;
  }

  localStorage.setItem("cerita", JSON.stringify(cerita));
  sudahSimpan = true;
  tampilkanPopup("popupSimpan");
}

// ==================== KONFIRMASI SIMPAN ====================
function tanyaSimpan() {
  let asal = localStorage.getItem("asalHalaman");

  // Kalau sudah simpan, langsung pindah
  if (sudahSimpan) {
    pindahHalaman(asal);
    return;
  }

  // Tampilkan popup konfirmasi
  let popup = document.getElementById("popupKonfirmasi");
  if (popup) {
    popup.style.display = "flex";
  }
}

function tidakSimpan() {
  let asal = localStorage.getItem("asalHalaman");
  pindahHalaman(asal);
}

function yaSimpan() {
  simpanCerita();
  let asal = localStorage.getItem("asalHalaman");
  
  setTimeout(() => {
    pindahHalaman(asal);
  }, 1000);
}

function pindahHalaman(asal) {
  if (asal === "buat") {
    window.location.href = "buat.html";
  } else {
    window.location.href = "index.html";
  }
}

// ==================== UPLOAD FILE (BUAT.HTML) ====================
function pilihFile() {
  let input = document.getElementById("fileInput");
  if (!input) return;

  input.click();

  input.onchange = function () {
    fileTerpilih = input.files[0];

    let nama = document.getElementById("namaFile");
    if (nama && fileTerpilih) {
      nama.innerText = "File dipilih: " + fileTerpilih.name;
    }
  };
}

function uploadFile() {
  localStorage.setItem("asalHalaman", "buat");

 if (!fileTerpilih) {
  tampilkanPopup("popupFile");
  return;
}

  let reader = new FileReader();

  reader.onload = function (e) {
    let isiFile = e.target.result;
    let ceritaData = JSON.parse(localStorage.getItem("cerita")) || [];

    let data = {
      judul: fileTerpilih.name.replace(/\.[^/.]+$/, ""), // Hapus extension
      isi: isiFile,
      tanggal: new Date().toLocaleDateString("id-ID")
    };

    ceritaData.push(data);
    localStorage.setItem("cerita", JSON.stringify(ceritaData));
    
    tampilkanPopup("popupSimpan");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  };

  reader.readAsText(fileTerpilih);
}

// ==================== UPLOAD KE LIBRARY ====================
function uploadDariIndex(index) {
  let loading = document.getElementById("loadingUpload");
  let popup = document.getElementById("popupPersen");

  if (loading) loading.style.display = "flex";

  setTimeout(() => {
    if (loading) loading.style.display = "none";
    if (popup) {
      popup.style.display = "flex";
      popup.onclick = function () {
        popup.style.display = "none";
      };
    }

    let data = cerita[index];
    let books = JSON.parse(localStorage.getItem("books")) || [];

    let newBook = {
      id: Date.now(),
      title: data.judul,
      cover: "../buatcerita/img/default-book.png",
      prototype: false
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    console.log("Berhasil upload ke library:", newBook);

    // Pindah ke Library
    setTimeout(() => {
      window.location.href = "../Library/library.html";
    }, 1000);
  }, 2000);
}

// ==================== POPUP HELPER ====================
function tampilkanPopup(id) {
  let popup = document.getElementById(id);
  if (!popup) return;

  popup.style.display = "flex";

  // Klik di mana saja untuk tutup
  popup.onclick = function () {
    popup.style.display = "none";
  };
}

const popupFile = document.getElementById("popupFile");

if (popupFile) {
  popupFile.addEventListener("click", function () {
    popupFile.style.display = "none";
  });
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", function () {
  renderCerita();
  loadEditor();

  // Deteksi perubahan di editor
  let judulInput = document.getElementById("judul");
  let isiInput = document.getElementById("isi");

  if (judulInput) {
    judulInput.addEventListener("input", () => sudahSimpan = false);
  }
  if (isiInput) {
    isiInput.addEventListener("input", () => sudahSimpan = false);
  }
});

