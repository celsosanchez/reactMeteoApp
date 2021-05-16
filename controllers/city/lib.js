const User = require("../../schema/user.js");

async function add(req, res) {
  const  city  = req.body.city;
  const email = req.session.email
  console.log(city)
  console.log(req.body)
  if (!city) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide city vide"
    });
  }

  // On check en base si l'utilisateur existe déjà
  try {
    //fix error when no session 
    console.log(req.session.email)
    const found = await User.findOne({ email });
    console.log(found)
    if (!found) {
      return res.status(401).json({
        text: "L'utilisateur n'existe pas"
      });
    }
  } catch (error) {
    console.log("error 1")
    return res.status(500).json({ error });
  }
  try {
    const found = await User.findOne({ email });
    if (!found.city.includes(city)) {
      console.log(city+"caca")
      found.city.push(city)
      console.log(found)
      await found.save();
      return res.status(200).json({
        text: "City added",
        user: found
      });
    } else {
      return res.status(401).json({
        text: "Cette ville est deja inclue"
      });
    }
  } catch (error) {
    console.log("error 2")
    return res.status(500).json({ error });
  }
}


async function del(req, res) {

  const { city } = req.body;
  const email = req.session.email
  if (!city) {
    return res.status(400).json({ //if email or password is not set
      text: "Requête invalide"
    });
  }
  try {// On check en base si l'utilisateur existe déjà
    const found = await User.findOne({ email });//fix error when no session 
    if (!found) {
      return res.status(401).json({
        text: "L'utilisateur n'existe pas"
      });
    }
  } catch (error) {
    console.log("error 1")
    return res.status(500).json({ error });
  }
  try {
    const found = await User.findOne({ email });
    found.city.pull(city)
    console.log(found)
    await found.save();
    return res.status(200).json({
      text: "City deleted",
      user: found
    });
  } catch (error) {
    console.log("error 2")
    return res.status(500).json({ error });
  }
}

//On exporte nos deux fonctions

exports.del = del;
exports.add = add;