const getJokes = async (req, res, next) => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    return res.status(200).json({ data, message: null });
  } catch (error) {
    next(error);
  }
};

module.exports = getJokes;
