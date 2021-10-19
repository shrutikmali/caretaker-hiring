const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.auth.split(" ")[1];
  const valid = jwt.verify(token, 'salt');
  if(valid) {
    const { id } = jwt.decode(token, 'salt');
    req.id = id;
    next();
  }
  else {
    res.status(500).send("Invalid token");
  }
}

module.exports = auth;