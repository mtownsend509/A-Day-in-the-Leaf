const withAuth = (req, res, next) => {
      // If the user isn't logged in, redirect them to the login route
      if (!req.session.user_id) {
          res.redirect('/login');
      } else {
          next();
      }
  };
  
  module.exports = withAuth;