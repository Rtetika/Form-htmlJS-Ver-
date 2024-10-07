const touristList = JSON.parse(localStorage.getItem('touristList')) || [];
let editIndex = localStorage.getItem('editIndex');

function generateList() {
    const tbody = document.getElementById("tourist-list");

    if(tbody){
        tbody.innerHTML = '';
        touristList.forEach((place, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
             <td>${place.name}</td>
             <td>${place.address}</td>
             <td>${place.rating}</td>
             <td>${place.type}</td>
             <td>${place.date}</td>
             <td><img src= "${place.pictureURL}" alt="Image" style="width: 100px;"></td>
             <td>
             <button class="edit-btn" onclick="editTourist(${index})">Update</button>
             <button class="dlt-btn"  onclick="deleteTourist(${index})">Delete</button>

             </td>
             
            `;
            tbody.appendChild(row);
            
        });
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}

async function submitForm() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const rating = document.getElementById("rating").value;
    const type = document.getElementById("type").value;
    const date =document.getElementById("date").value;
    const picture = document.getElementById("picture").files[0];

    let pictureURL = '';
    if (picture) {
        pictureURL= await toBase64(picture);
    }

    const touristPlace = {
        name,
        address,
        rating,
        type,
        date,
        pictureURL
    };

    if (editIndex !== null) {
        touristList[editIndex] = touristPlace;
        localStorage.removeItem('editIndex');
    } else {
        touristList.push(touristPlace);
    }

    localStorage.setItem('touristList', JSON.stringify(touristList));
    window.location.href = 'tourist.html';
}

function editTourist(index) {
    localStorage.setItem('editIndex', index);
    window.location.href = 'form.html';
}

function deleteTourist(index) {
    touristList.splice(index, 1);
    localStorage.setItem('touristList', JSON.stringify(touristList));
    generateList();
}

if (document.getElementById("tourist-form")) {
    if(editIndex !== null) {
        const place =touristList[editIndex];
        document.getElementById("name").value = place.name;
        document.getElementById("address").value = place.address;
        document.getElementById("rating").value = place.rating;
        document.getElementById("type").value = place.type; 
        document.getElementById("date").value = place.date;      
    }
}
//searchbar function

window.onload = generateList;