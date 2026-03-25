function renderBooks(data, container) {
    if (!container) return;

    container.innerHTML = "";

    data.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const img = document.createElement("img");
        img.src = book.cover;
        img.alt = book.title;
        img.onerror = () => {
            img.src = `https://via.placeholder.com/160x240?text=${encodeURIComponent(book.title)}`;
        };

        const title = document.createElement("p");
        title.textContent = book.title;

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener("click", () => {
            if (book.prototype) {
                if (typeof window.openReader === "function") {
                    window.openReader(book);
                }
            } else {
                const overlay = document.getElementById("alert-overlay");
                if (overlay) overlay.style.display = "flex";
            }
        });

        container.appendChild(card);
    });
}