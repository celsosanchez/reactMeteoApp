const User = require("../schema/user.js");

async function home(req, res) {
    console.log(req.body)
    try {
        // const email = req.session.email;
        const email = req.session.email
        console.log(email)
        console.log("does it arrive?")
        const found = await User.findOne({ email });
        const name = found.name;
        const city = found.city
        return res.status(200).json({
            user: name,
            city: city
        })
    } catch{
        if (req.session.mail) {
            return res.status(500).json({
                text: req.session.mail
            });
        }
        else {
            return res.status(500).json({
                text: "User not logged in" + req.session.mail
            });
        }
    }
}

exports.home = home;