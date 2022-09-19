const express = require("express")
const { verify } = require("jsonwebtoken")
const {getAllMovies, addNewMovies, updateMovies, deleteMovies, getMoviesId} = require('../controller/moviesController')
const router = express.Router()
const upload = require('../helper/multer')
const verifyAuth = require("../helper/verifyAuth")

router.get('/', getAllMovies)
router.get('/:id', getMoviesId )
router.post('/', verifyAuth, upload.single('image'), addNewMovies)
router.patch('/:id',verifyAuth,upload.single('image'), updateMovies)
router.delete('/:id',verifyAuth, deleteMovies)

module.exports = router