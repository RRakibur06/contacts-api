const Contact = require("./Contact");
const router = require("express").Router();

//CREATE CONTACT
router.post("/create", async (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    profile_picture: req.body.profile_picture,
  });

  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET ALL CONTACTS
router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE CONTACTS
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CONTACT
router.put("/update/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CONTACT
router.delete("/delete/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json("Contact has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//MAKE A CONTACT FAVOURITE (TOGGLE)
router.put("/favourite/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      [{ $set: { favourite: { $not: "$favourite" } } }]
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
