const express = require('express');
const router = express.Router();
const { Profile, Plant } = require('../../Models');
const withAuth = require('../../Utils/Auth');

// Route to display static src images
// app.get("/static", (req, res) => {
//   res.render("static");
// });

// // Route to display dynamic src images
// app.get("/plant", (req, res) => {
//   imageList = [];
//   imageList.push({ src: "./doodle.png", name: "doodle" });
//   imageList.push({ src: "./hangingplant.png", name: "logo" });
//   // imageList.push({ src: "icons/react.png", name: "react" });
//   res.render("dynamic", { imageList: imageList });
// });

// //auth verifies logged in before executing==========================================================================
// router.post('/', async (req, res) => {
//     try {

//       const newPlant = await Plant.create({
//         ...req.body,
//         profile_id: req.session.profile_id,
//       });

//       res.status(200).json(newPlant);
//     } catch (err) {
//       res.status(400).json(err);
//     }

//   });

// // Update plant using ID
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedPlant = await Plant.update(
//       {
//         name: req.body.name,
//         species: req.body.species,
//         scientificName: req.body.scientificName,
//         adoptionDate: req.body.adoptionDate,
//         height: req.body.height,
//         stage: req.body.stage,
//         waterNeeds: req.body.waterNeeds,
//         watered: req.body.watered,
//         sunshineNeeds: req.body.sunshineNeeds,
//         generalNotes: req.body.generalNotes
//       },
//       {
//         where:
//         {
//           id: req.params.id
//         }
//       }
//     )
//     if (!updatedPlant) {
//       res.status(404).json({ message: 'There is no plant with this id!'});
//       return;
//     }
//     res.status(200).json(updatedPlant);
//   } catch (err) {
//     res.status(500).json(err)
//   }

// });



// //delete plant using ID, verifies that logged in before executing =================================================
//   router.delete('/:id', async (req, res) => {
//     try {

//       const plantData = await Plant.destroy({
//         where: {
//           id: req.params.id,
//           profile_id: req.session.profile_id,
//         },
//       });
// //if plant ID not found throw 404 error============================================================================
//       if (!plantData) {
//         res.status(404).json({ message: 'There is no plant with this id!' });
//         return;
//       }

//  //200 error for successful request ==============================================================================
//       res.status(200).json(plantData);
//  //catch server error ============================================================================================     
//     } catch (err) {
//       res.status(500).json(err);
//     }

//   });  

  
  router.get('/', async (req, res) => {
    // res.json({message : 'plants are here'});
    Plant.findAll({
      attributes: [
        'id',
        'name',
        'species',
        'scientificName',
        'adoptionDate',
        'height',
        'stage',
        'waterNeeds',
        'waterCurrent',
        'watered',
        'sunshineNeeds',
        'generalNotes'
      ],

      include: [
        {
            model: Profile,
            attributes: ['username']
        },
      ],
    })
    .then(dbPlantData => res.json(dbPlantData))
    // if there was a server error, return the error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  })

router.get('/:id', async (req, res) => {
  // res.json({message : 'plants are here'});
  Plant.findOne({
    where: {
      id: req.params.id
    },

    attributes: [
      'id',
      'name',
      'species',
      'scientificName',
      'adoptionDate',
      'height',
      'stage',
      'waterNeeds',
      'watered',
      'waterCurrent',
      'waterMax',
      'sunshineNeeds',
      'generalNotes'
    ],

    include: [
      {
          model: Profile,
          attributes: ['username']
      },
    ],
  })
  .then(dbPlantData => res.json(dbPlantData))
  // if there was a server error, return the error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

router.delete('/:id', (req, res) => {
  Plant.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPlantData => {
      if (!dbPlantData) {
        res.status(404).json({ message: 'No plant found with this id' });
        return;
      }
      res.json(dbPlantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Plant.create({
        name: req.body.name,
        species: req.body.species,
        scientificName: req.body.scientificName,
        adoptionDate: req.body.adoptionDate,
        height: req.body.height,
        stage: req.body.stage,
        waterNeeds: req.body.waterNeeds,
        watered: req.body.watered,
        sunshineNeeds: req.body.sunshineNeeds,
        plantType: req.body.plantType,
        waterCurrent: 0,
        waterMax: req.body.waterMax,
        generalNotes: req.body.generalNotes,
        profile_id: req.body.profile_id
        // ...req.body,

  })
  .then(dbPlantData => res.json(dbPlantData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

router.put('/:id', (req, res) => {
  Plant.update({
    name: req.body.name,
    species: req.body.species,
    scientificName: req.body.scientificName,
    adoptionDate: req.body.adoptionDate,
    height: req.body.height,
    stage: req.body.stage,
    waterNeeds: req.body.waterNeeds,
    waterCurrent: req.body.waterCurrent,
    watered: req.body.watered,
    sunshineNeeds: req.body.sunshineNeeds,
    generalNotes: req.body.generalNotes,
  },
  {
    where: {
    id: req.params.id
    }
  })
  .then(dbPlantData => res.json(dbPlantData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})



  module.exports = router;

