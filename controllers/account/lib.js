const User = require("../../schema/user.js");
const passwordHash = require("password-hash");


async function signup(req, res) {
  const { name, password, email } = req.body;
  if (!email || !password || !name) {
    //the case of invalid email, password or name 
    return res.status(400).json({
      text: "invalid request"
    });
  }
  // User creation with hashed password
  const user = {
    name,
    email,
    password: passwordHash.generate(password) // the pass is stored hashed
  };
  //checking if the user already exists
  try {
    const fondUser = await User.findOne({
      email
    });
    if (fondUser) {
      return res.status(400).json({
        text: "The User already exists"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // save user in DB
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "User Created",
      token: userObject.getToken() //jwt method in User Schema
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, email } = req.body;
  if (!email || !password) { // empty password or email
    return res.status(400).json({
      text: "Invalid request"
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(401).json({
        text: "The User doesn't exists"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Wrong password"
      });
    const user = await User.findOne({ email });

    req.session.email = user.email;
    console.log(req.session) // save the user in session using the email
    return res.status(200).json({
      token: findUser.getToken(),
      text: "Authenticated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      error
    });
  }

}

function logout(req, res) {
  if (!req.session.email) {
    return res.status(400).json({
      text: "The User Logged Out"
    });
  } try {
    req.session.destroy(() => res.status(200).json({
      text: "user logged out",
    }))//good way to cast multiple res: using callbacks

  } catch (error) {
    return res.sendStatus(500).json({ error }).then(res.redirect('/'));
  }

}

//exporting the methods

exports.login = login;
exports.signup = signup;
exports.logout = logout;