const router = require('express').Router()
let {saveData, addTag, deleteTag, getData, seacrhText } = require('../controllers/data')


// router.post('/save-data', saveData) //http://localhost:8080/api/data/save-data
router.get("/get-data", getData)//http://localhost:8080/api/data/all-data
router.post('/add-tag', addTag) //http://localhost:8080/api/data/add-tag
router.put('/delete-tag', deleteTag) //http://localhost:8080/api/data/delete-tag

router.get('/search', seacrhText) //http://localhost:8080/api/data/search?q=string


module.exports = router

