
const { Plant } = require("../../models");

let plantType = Plant.species

console.log(chalk.bgHex('#2c2e28').white(plantType))

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
      case "other": generalImage();
      break;
      default: generalImage();
      break;
}

const houseplantImage = () => {
      console.log(chalk.bgHex('#2c2e28').white(plantType))
      var plantspanEL = document.getElementsByClassName("plantSpan");
      // $(".plantSpan").addClass("plantSpan bg-[#284c20] text-[#eae3ba]");
      plantspanEL.addClass("bg-[#56a554]")
      $(".planticon").setAttribute('src', '/houseplant.png');
}

const cactusImage = () => {
      var plantspanEL = document.getElementsByClassName("plantSpan");
      plantspanEL.addClass("bg-[#8d4029]")
      $(".planticon").setAttribute('src', '/cactus.png');
}

const treeImage = () => {
      var plantspanEL = document.getElementsByClassName("plantSpan");
      plantspanEL.addClass("bg-[#284c20]")
      $(".planticon").setAttribute('src', '/tree.png');
}

const floweringImage = () => {
      var plantspanEL = document.getElementsByClassName("plantSpan");
      plantspanEL.addClass("bg-[#a487b2]")
      $(".planticon").setAttribute('src', '/houseplant.png');
}

const palmImage = () => {
      var plantspanEL = document.getElementsByClassName("plantSpan");
      plantspanEL.addClass("bg-[#40a1a9]")
      $(".planticon").setAttribute('src', '/houseplant.png');
}

const generalImage = () => {
      var plantspanEL = document.getElementsByClassName("plantSpan");
      plantspanEL.addClass("bg-[#284c20]")
      $(".planticon").setAttribute('src', '/houseplant.png');
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