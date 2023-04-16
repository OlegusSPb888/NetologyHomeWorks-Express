const express = require('express')
const router = express.Router()

const library = {
    user: { 
        id: 1, 
        lastName: "Иванов" 
    }
};

router.get('/login', (req, res) => {
    const {user} = library
    res.json({user})
})

module.exports = router