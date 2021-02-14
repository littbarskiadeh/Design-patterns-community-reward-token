var express = require('express')
var router = express.Router()
const DBO = require('../helper/dbo')

//Setup DBO
let dbo = new DBO()

//Login User
//http://localhost:8000/users?username=1&address=2
router.get('/login', async function (req, res, next) {
  console.log('Login:')
  console.log(req.query)

  let User = await dbo.findUser(req.query.username)
  console.log('User Query Complete')
  if (User != null) {
    if (User.isLoggedIn) {
      res.json({
        isLoggedIn: User.isLoggedIn,
        username: User.UserName,
        address: User.PublicAddress,
      })
    } else {
      User = await dbo.loginUser(req.query.username)
      if (User.PublicAddress == req.query.address && User.isLoggedIn) {
        res.json({
          exist: true,
          username: User.UserName,
          address: User.PublicAddress,
        })
      }
    }
  } else {
    res.json({ exist: false })
  }
})

router.get('/logout', async function (req, res, next) {
  console.log('Logout:')
  console.log(req.query)

  const User = await dbo.logoutUser(req.query.username)
  if (User.PublicAddress == req.query.address && !User.isLoggedIn) {
    res.json({
      isLoggedIn: User.isLoggedIn,
      username: User.UserName,
      address: User.PublicAddress,
    })
  }
})

//Register User
//http://localhost:8000/users
router.post('/register', async function (req, res, next) {
  console.log('Register:')
  console.log(req.body)
  const registeredUser = await dbo.createNewUser(req.body)
  res.json({ username: registeredUser.UserName })
})

module.exports = router
