const express = require('express');
const router = express.Router();
const { Profile, Plant } = require("../../models");

//for insomnia testing
router.get('/', async (req, res) => {
  try {
    const profData = await Profile.findAll();
    res.json(profData);
  } catch (err) {
    res.json('somethings fucky');
  }
});

router.get('/:id', (req, res) => {
  Profile.findOne({
    attributes: { 
      exclude: ['password']
    },
    where: {
      id: req.params.id
    },
    include: [
      {model: Plant,
      attributes: [
        'name',
        'species',
        'scientificName',
        'adoptionDate',
        'height',
        'stage',
        'waterNeeds',
        'watered',
        'sunshineNeeds',
        'generalNotes'
      ]}
    ]
  })
  .then(dbProfileData => res.json(dbProfileData))
  // if there was a server error, return the error
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

//post method to root
router.post("/", async (req, res) => {
  try {
    const profileData = await Profile.create(req.body);
    req.session.save(() => {
      req.session.profile_id = profileData.id;
      req.session.logged_in = true;
      res.status(200).json(profileData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const profileData = await Profile.findOne({
      where: { username: req.body.username },
    });
    //if statement validating username======================================================================================
    if (!profileData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const correctPassword = await profileData.checkPassword(req.body.password);

    //if statement validating password======================================================================================
    if (!correctPassword) {
      res
        .status(400)
        .json({
          message:
            "Incorrect username or password, please try again! (remember passwords are case sensitive)",
        });
      return;
    }
    //session for keeping profile logged in====================================================================================
    req.session.save(() => {
      req.session.profile_id = profileData.id;
      req.session.logged_in = true;
    
      res.json({
        profile: profileData,
        message: "Welcome back! You're now logged in."
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//post for log out "destroy" active session=================================================================================
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  const deadProfile = Profile.destroy({
    where: { id: req.params.id }
  });
  res.json('profile destroyed');
})

module.exports = router;
