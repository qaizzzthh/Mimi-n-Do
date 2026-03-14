document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("books-container");
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const toggleViewBtn = document.getElementById("toggle-view");
    
    // Inisialisasi render pertama kali
    renderBooks(storedBooks, container);

    // Fitur Pencarian
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const term = searchInput.value.toLowerCase();
        const filtered = storedBooks.filter(b => b.title.toLowerCase().includes(term));
        renderBooks(filtered, container);
    });

    // Toggle View-All (Flex Wrap Mode)
    let isGridView = false;
    toggleViewBtn.addEventListener('click', () => {
        const navBtns = document.getElementById('nav-btns');
        const viewText = document.getElementById('view-text');
        const viewIcon = document.getElementById('view-icon');
        
        isGridView = !isGridView;
        if (isGridView) {
            container.classList.add('grid-mode');
            navBtns.style.display = 'none';
            viewText.innerText = 'Tutup Semua';
            viewIcon.innerText = 'visibility_off';
        } else {
            container.classList.remove('grid-mode');
            navBtns.style.display = 'flex';
            viewText.innerText = 'Lihat Semua';
            viewIcon.innerText = 'visibility';
        }
    });
});

// Fungsi Navigasi Scroll (Global agar bisa dipanggil dari atribut onclick HTML)
function scrollBooks(direction) {
    const container = document.getElementById("books-container");
    const scrollAmount = 300;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}