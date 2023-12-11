
document.addEventListener("DOMContentLoaded", function() {

    const paintings = JSON.parse(content);
    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("#details figure");
    
    for (p of paintings){
          const item = document.createElement('li');
          const thumb = document.createElement('img');
          thumb.src = "images/small/" + p.id + ".jpg";
          thumb.alt = p.title;
          thumb.dataset.id = p.id;
          item.appendChild(thumb);
          list.appendChild(item);	   
    }
    
    
       // use event delegation to handle clicks in list
    list.addEventListener('click', function(e) {
       if (e.target && e.target.nodeName == "IMG") {
          displayPaintingLarge(e.target);
       }
    });
    
    function displayPaintingLarge(clickedThumbImage){
       // retrieve the painting id from data-id attribute
       let id = clickedThumbImage.dataset.id;
       // find that painting in array
       const painting = paintings.find( function (p) { return p.id == id;});
       // display the found painting
       document.querySelector("#title").textContent = painting.title;
       document.querySelector("#artist").textContent = "By " + painting.artist;
       let image = document.createElement('img');
       image.src = "images/large/" + painting.id + ".jpg";
       // clear previous features
       figure.innerHTML = "";
       // display all features for this painting
       displayFeatures(painting.features);
       // add painting to image
       figure.appendChild(image);
    }
    
    function displayFeatures(features) {
        for (let f of features) {
            displaySingleFeatureRectangle(f);
        }
    }
    
    function displaySingleFeatureRectangle(feature) {
        const rectangle = document.createElement('div');
        rectangle.classList.add('box');
    
        // Calculate position and dimensions for the rectangle
        const left = feature.upperLeft[0] + 'px';
        const top = feature.upperLeft[1] + 'px';
        const width = (feature.lowerRight[0] - feature.upperLeft[0]) + 'px';
        const height = (feature.lowerRight[1] - feature.upperLeft[1]) + 'px';
    
        // Set position and dimensions for the rectangle
        rectangle.style.position = 'absolute';
        rectangle.style.left = left;
        rectangle.style.top = top;
        rectangle.style.width = width;
        rectangle.style.height = height;
    
        // Mouseover event handling
        rectangle.addEventListener('mouseover', function () {
            const descriptionDiv = document.querySelector('#description');
            descriptionDiv.textContent = feature.description;
        });
    
        // Mouseout event handling
        rectangle.addEventListener('mouseout', function () {
            const descriptionDiv = document.querySelector('#description');
            descriptionDiv.textContent = '';
        });
    
        // Append the rectangle to the figure
        const figure = document.querySelector('#details figure');
        figure.appendChild(rectangle);
    }
    
 })