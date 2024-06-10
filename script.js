// Get the gallery container and the images
const galleryContainer = document.querySelector('.gallery-container');
const gallery = document.querySelector('.gallery');

// Get the images from the directory
const images = [];
const dir = 'images/'; // directory where images are stored
const files = [];

// Fetch the list of files in the directory
fetch(dir)
  .then(response => response.text())
  .then(data => {
    // Parse the HTML response to get the file names
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const links = doc.querySelectorAll('a');
    
    // Add each file to the files array
    links.forEach(link => {
      const fileName = link.textContent.trim();
      if (fileName !== '' && fileName !== '.' && fileName !== '..') {
        files.push(dir + fileName);
      }
    });
    
    // Add images to the gallery
    files.forEach(file => {
      const img = document.createElement('img');
      img.src = file;
      img.alt = file.split('/').pop();
      gallery.appendChild(img);
    });
  })
  .catch(error => {
    console.error('Error fetching files:', error);
  });
