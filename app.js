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


function searchTourist() {
    const searchInput = document.getElementById("search-bar");
    const searchValue = searchInput.value.toLowerCase();
    const table = document.getElementById("tourist-list");
    const tr = table.getElementsByTagName("tr");

    //loop to search by column by column , td[0]= name, td[1]=address, td[2]=rating, td[3]=type 
    for(let i = 0; i < tr.length; i++){
        const tdName = tr[i].getElementsByTagName("td")[0];
        const tdAddress = tr[i].getElementsByTagName("td")[1];
        const tdRating = tr[i].getElementsByTagName("td")[2];
        const tdType = tr[i].getElementsByTagName("td")[3];

        if(tdName && tdAddress && tdRating && tdType ) {
            const txtName = tdName.textContent || tdName.innerText;
            const txtAddress = tdAddress.textContent || tdAddress.innerText;
            const txtRating = tdRating.textContent || tdRating.innerText;
            const txtType = tdType.textContent || tdType.innerText;

            
            if (txtName.toLowerCase().indexOf(searchValue) > -1 || txtAddress.toLowerCase().indexOf(searchValue) > -1 || txtRating.toLowerCase().indexOf(searchValue) > -1 || txtType.toLowerCase().indexOf(searchValue) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }

        }

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


window.onload =  generateList();
