const isAdmin = (req, res, next) => {
  if (req.query.role === 'admin') {
    next();

    return;
  }

  res.status(401).send('You are not admin');

  return;
};

module.exports = { isAdmin };
