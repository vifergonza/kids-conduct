document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    const storedImageData = localStorage.getItem('storedImageData');
    if (storedImageData) {
        displayImage(storedImageData);
    }
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveFormData();
});


function saveFormData() {
    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        id: document.getElementById('number_id').value,
        score: document.getElementById('score').value,
        behaviors: Array.from(document.querySelectorAll('input[name="behaviors"]')).map(el => {
            return {
                value: el.value,
                checked: el.checked
            }
            
        }),
        rewards: Array.from(document.querySelectorAll('input[name="rewards"]')).map(el => {
            return {
                value: el.value,
                checked: el.checked
            }
        })
    };
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Datos guardados');
}

function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        document.getElementById('name').value = savedData.name;
        document.getElementById('age').value = savedData.age;
        document.getElementById('score').value = savedData.score;
        document.getElementById('number_id').value = savedData.id;
        savedData.behaviors.forEach(behavior => {
            document.querySelector(`input[name="behaviors"][value="${behavior.value}"]`).checked = behavior.checked;
        });
        savedData.rewards.forEach(reward => {
            document.querySelector(`input[name="rewards"][value="${reward.value}"]`).checked = reward.checked;
        });
    }
}

function displaySavedData() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    const displayDiv = document.getElementById('savedData');
    if (savedData) {
        displayDiv.innerHTML = `
            <p>Id: ${savedData.id}</p>
            <p>Nombre: ${savedData.name}</p>
            <p>Edad: ${savedData.age}</p>
            <p>Puntuacion: ${savedData.score}</p>
            <p>Comportamientos:</p> 
            ${dispayList(savedData.behaviors)}
            <p>Recompensas:</p> 
            ${dispayList(savedData.rewards)}
        `;
    } else {
        displayDiv.innerHTML = '<p>No hay datos guardados.</p>';
    }
}

function dispayList(list) {
    let ulHtml = '<ul>';
    list.forEach(item => {
        ulHtml += `<li>${item.value}: ${item.checked ? 'Si' : 'No'}</li>`;
    });
    return ulHtml.concat('</ul>');
}


document.getElementById('uploadButton').addEventListener('click', function() {
    var fileInput = document.getElementById('imageUploader');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        // Cuando la carga del archivo se completa, almacenamos la cadena base64 en el localStorage
        localStorage.setItem('storedImageData', reader.result);
        displayImage(reader.result);
    };

    if (file) {
        reader.readAsDataURL(file); // Leer el archivo como Data URL (base64)
    } else {
        alert('No se ha seleccionado ninguna imagen.');
    }
});

function displayImage(base64Image) {
    var img = document.getElementById('storedImage');
    img.src = base64Image;
    img.style.display = 'block'; // Mostramos la imagen
}


