// ambil data cerita dari localStorage
let cerita = JSON.parse(localStorage.getItem("cerita")) || []
let modeHapus = false
let sudahSimpan = false



/* =========================
   TAMPILKAN CERITA
========================= */
function tampilkanCerita(){

let list = document.getElementById("ceritaList")

// jika halaman tidak punya list, hentikan
if(!list) return

list.innerHTML = ""

cerita.forEach((c,i)=>{

let item = `
<div class="cerita-item" onclick="klikCerita(${i})">

<div class="nomor">${i+1}</div>

<img src="img/buku.png" class="icon-buku">

<div class="judul">${c.judul}</div>

<div class="tanggal">${c.tanggal}</div>

</div>
`

list.innerHTML += item

})

}

function aktifkanHapus(){

modeHapus = true

alert("Pilih cerita yang ingin dihapus")

}

/* =========================
   TAMBAH CERITA
========================= */
function tambahCerita(){
  localStorage.setItem("asalHalaman", "index")
  localStorage.setItem("editIndex",-1)
  window.location = "editor.html"
}



/* =========================
   EDIT CERITA
========================= */
function editCerita(index){

localStorage.setItem("editIndex",index)

window.location = "editor.html"

}

/* =========================
   SIMPAN CERITA
========================= */
function simpanCerita(){

let judul = document.getElementById("judul").value
let isi = document.getElementById("isi").value

if(!judul || !isi){
alert("Isi dulu!")
return
}

let index = parseInt(localStorage.getItem("editIndex"))
let tanggal = new Date().toLocaleDateString()

let data = {
judul: judul,
isi: isi,
tanggal: tanggal
}

if(index === -1){
cerita.push(data)
}else{
cerita[index] = data
}

localStorage.setItem("cerita", JSON.stringify(cerita))

// 🔥 tandai sudah disimpan
sudahSimpan = true

tampilkanPopup()
}

function tanyaSimpan(){

let asal = localStorage.getItem("asalHalaman")

// kalau sudah simpan → langsung pindah
if(sudahSimpan){

  if(asal === "buat"){
    window.location = "buat.html"
  }else{
    window.location = "index.html"
  }

  return
}

// tampilkan popup
let popup = document.getElementById("popupKonfirmasi")

if(popup){
  popup.style.display = "flex"
}
}

function tidakSimpan(){

let asal = localStorage.getItem("asalHalaman")

if(asal === "buat"){
  window.location = "buat.html"
}else{
  window.location = "index.html"
}

}

function yaSimpan(){

simpanCerita()

let asal = localStorage.getItem("asalHalaman")

setTimeout(()=>{

  if(asal === "buat"){
    window.location = "buat.html"
  }else{
    window.location = "index.html"
  }

},1000)

}
/* =========================
   LOAD EDITOR
========================= */
function loadEditor(){

let judulInput = document.getElementById("judul")
let isiInput = document.getElementById("isi")

// jika bukan halaman editor
if(!judulInput || !isiInput) return

let index = parseInt(localStorage.getItem("editIndex"))

if(index >= 0){

let data = cerita[index]

judulInput.value = data.judul
isiInput.value = data.isi

}

}

function klikCerita(index){

if(modeHapus){

let konfirmasi = confirm("Hapus cerita ini?")
if(!konfirmasi) return

cerita.splice(index,1)

localStorage.setItem("cerita", JSON.stringify(cerita))

modeHapus = false

// 🔥 FIX UTAMA DI SINI
// jika halaman sekarang kosong setelah hapus → mundur 1 page
if((currentPage - 1) * perPage >= cerita.length && currentPage > 1){
  currentPage--
}

renderCerita()

}else{

editCerita(index)

}

}

/* =========================
   JALANKAN SAAT HALAMAN LOAD
========================= */

document.addEventListener("DOMContentLoaded", function(){

renderCerita()
loadEditor()

document.getElementById("judul")?.addEventListener("input", ()=> sudahSimpan = false)
document.getElementById("isi")?.addEventListener("input", ()=> sudahSimpan = false)

})


/*halaman buat*/

let fileTerpilih = null

function bukaLibrary(){
window.location = "index.html"
}

function pilihFile(){

let input = document.getElementById("fileInput")

if(!input) return

input.click()

input.onchange = function(){

fileTerpilih = input.files[0]

let nama = document.getElementById("namaFile")

if(nama){
nama.innerText = "File dipilih: " + fileTerpilih.name
}

}

}

function uploadFile(){

localStorage.setItem("asalHalaman", "buat")

if(!fileTerpilih){
alert("Pilih file dulu")
return
}

let reader = new FileReader()

reader.onload = function(e){

let isiFile = e.target.result

let cerita = JSON.parse(localStorage.getItem("cerita")) || []

let data = {
judul: fileTerpilih.name,
isi: isiFile,
tanggal: new Date().toLocaleDateString()
}

cerita.push(data)

localStorage.setItem("cerita",JSON.stringify(cerita))

tampilkanPopup()

setTimeout(()=>{
window.location = "index.html"
},1500)

}

// 🔥 HARUS DI SINI (DI LUAR onload)
reader.readAsText(fileTerpilih)

}



function tampilkanPopup(){

let popup = document.getElementById("popupSimpan")
if(!popup) return

popup.style.display = "flex"

// klik dimana saja = tutup
popup.onclick = function(){
popup.style.display = "none"
}

}

let currentPage = 1
const perPage = 4

function renderCerita(){

let list = document.getElementById("ceritaList")
if(!list) return

list.innerHTML = ""

let start = (currentPage - 1) * perPage
let end = start + perPage

let dataTampil = cerita.slice(start, end)

dataTampil.forEach((c, index)=>{

let nomor = start + index + 1

list.innerHTML += `
<div class="cerita-item" onclick="klikCerita(${nomor-1})">

<div class="nomor">${nomor}</div>

<img src="img/buku.png" class="icon-buku">

<div class="judul">${c.judul}</div>

<div class="tanggal">${c.tanggal}</div>

<button class="btn-upload" onclick="event.stopPropagation(); uploadDariIndex(${nomor-1})">
Upload
</button>

</div>
`

})

document.getElementById("pageNumber").innerText = currentPage

}

function nextPage(){
if(currentPage * perPage < cerita.length){
currentPage++
renderCerita()
}
}

function prevPage(){
if(currentPage > 1){
currentPage--
renderCerita()
}
}

function kehome(){
 window.location.href = "../Home/index.html"
}

function keBuat(){
  window.location = "buat.html"
}

function uploadDariIndex(index){

  let loading = document.getElementById("loadingUpload")
  let popup = document.getElementById("popupPersen")

  loading.style.display = "flex"

  setTimeout(()=>{

    loading.style.display = "none"
    popup.style.display = "flex"

    popup.onclick = function(){
      popup.style.display = "none"
    }

    let data = cerita[index]

    let books = JSON.parse(localStorage.getItem("books")) || []

    let newBook = {
      id: Date.now(),
      title: data.judul,
      cover: "../buatcerita/img/default-book.png",
      prototype: false
    }

    books.push(newBook)

    localStorage.setItem("books", JSON.stringify(books))

    console.log("Berhasil upload:", newBook)

    // 🔥 PINDAH KE LIBRARY
    setTimeout(()=>{
      window.location.href = "../library/library.html"
    },1000)

  },2000)
}