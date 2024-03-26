function displayKidInfo() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        document.title = savedData.name;
        document.querySelector('#info .card__name').innerHTML = savedData.name;
        document.querySelector('#info .card__number').innerHTML = savedData.id;
        document.querySelector('#info .card__age').innerHTML = savedData.age + " años";
        rotateImage("thumbImage", Number(savedData.score));
        console.log(savedData);
    }
}

function displayRewards() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    appendItemsToUnorderedList("rewards", savedData.rewards);
}

function displayBehaviors() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    appendItemsToUnorderedList("behaviors", savedData.behaviors);
}


function appendItemsToUnorderedList(ulId, items) {
    const ul = document.getElementById(ulId);
    if (!ul) {
        console.error('No se encontró el elemento UL con ID:', ulId);
        return;
    }

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add(item.value.replace(/\s+/g, '-').toLowerCase()); // Reemplaza espacios con guiones y convierte a minúsculas
        if (item.checked) {
            li.classList.add('checked');
        }
        ul.appendChild(li);
    });
}

function displayImage() {
    const storedImageData = localStorage.getItem('storedImageData');
    if (storedImageData) {
        const img = document.getElementById('storedImage');
        img.src = storedImageData;
        img.style.display = 'block';
    }
}

function rotateImage(imageId, score) {
    const image = document.getElementById(imageId)
    if (!image) {
        console.error('No se encontró el elemento de la imagen con ID:', imageId);
        return;
    }
    const degrees = 180 - ((score / 100) * 180);
    image.style.transform = 'rotate(' + degrees + 'deg)';
}
