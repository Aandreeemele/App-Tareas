function createHeader() {
    let header = document.createElement('header');
    header.classList.add('createHeader');

    let logo = document.createElement('img');
    logo.src = "data:image/png;base64,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";
    logo.alt = "Logo";
    header.appendChild(logo);

    let h1 = document.createElement('h1');
    h1.innerText = "List-Date";
    header.appendChild(h1);

    return header;
}

export { createHeader };
