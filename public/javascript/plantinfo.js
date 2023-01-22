const plantType = {whateverthevariableis}

switch(plantType) {
      case "houseplant": houseplantImage();
      break;
      case "cactus": cactusImage();
      break;
      case "tree": treeImage();
      break;
      case "flowering": floweringImage();
      break;
      case "palm": palmImage();
      break;
      case "flowering": floweringImage();
      break;
      case "other": generalImage();
      break;
      default: generalImage();
      break;
}

const houseplantImage = () => {
      var planticonimage = document.getElementById("planticon").src('./houseplant.png');   
}

 const treeImage = () => {
       var planticonimage = document.getElementById("planticon").src('./tree.png'); 
 }

 const cactusImage = () => {
       var planticonimage = document.getElementById("planticon").src('./cactus.png');
 }

// function show_image(src, width, height, alt) {
//       var img = document.createElement("img");
//       img.src = src;
//       img.width = width;
//       img.height = height;
//       img.alt = alt;
  
//       // This next line will just add it to the <body> tag
//       document.body.appendChild(img);
//   }