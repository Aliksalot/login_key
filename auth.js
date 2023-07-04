
const authenticate = (req, res, next) => {

    const excludedRoutes = ['/login', '/login/try_key']

    if(excludedRoutes.includes(req.path)){
      next()
    }else{
      if (req.session.admin === undefined) {

          res.redirect('/login');
        } else {
          next()
        }
    }
}

module.exports = {
  authenticate
}