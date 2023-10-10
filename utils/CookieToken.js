const getToken = require("./getToken");


const cookiesToken = async(userDetails, res) => {
  const token =  getToken(userDetails.id, userDetails.email);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: "none",
    path: "/",
  };
  userDetails.password = undefined;
  res.status(200).cookie("token", token, options).json({
    data: userDetails,
    message: null,
  });
};

module.exports = cookiesToken;
