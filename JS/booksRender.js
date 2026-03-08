function renderBooks(data, container) {
    if (!container) return;
    
    container.innerHTML = "";
    data.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" onerror="this.src='https://via.placeholder.com/160x240?text=${book.title}'">
            <p>${book.title}</p>
        `;

        card.onclick = () => {
            if (book.prototype) {
                alert("Buku bisa dibaca (fitur nanti)");
            } else {
                alert("Buku sedang dalam pengembangan");
            }
        };
        container.appendChild(card);
    });
}