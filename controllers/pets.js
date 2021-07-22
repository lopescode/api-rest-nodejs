const Pet = require('../models/pets')

module.exports = app => {
    // CRUD
    
    // Create
    app.post('/pet', (req, res) => {
        const pet = req.body

        Pet.create(pet, res)
    })
}