window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(reg => console.log('Service Worker Registered', reg))
             .catch(err => console.log('Service Worker Registration Failed', err));
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  fetchPhotos();
  showPage('home'); // Show home page by default
});

function showPage(page) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.style.display = "none");
  document.getElementById(page).style.display = "block";
}

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
      users.forEach(user => {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.phone;
        row.insertCell(3).textContent = user.website;
      });
    });
}

function fetchPhotos() {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(photos => {
      const photoList = document.getElementById('photoList');
      photos.slice(0, 20).forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'col-md-3';
        photoItem.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
            <div class="card-body">
              <p class="card-text">${photo.title}</p>
            </div>
          </div>
        `;
        photoList.appendChild(photoItem);
      });
    });
}
