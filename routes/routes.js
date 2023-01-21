const {Router} = require('express');
const express = require("express");
const router = Router();
const musicController = require('../controllers/musicController');
const userController = require('../controllers/userController');

//needed for getting the body of the request.
router.use(express.urlencoded({ extended: true }));

//AUTHENTICATION:
router.post('/auth/register', userController.register)     
router.post('/auth/sign_in', userController.sign_in) 

//Applies the login requirement to all following routes.
router.all('/*', userController.loginRequired)

//REQUIREMENT 1: Get information about multiple objects:
//Gets all tracks from the given parameters. 
router.get('/', musicController.getAll)                     
router.get('/artist/:artist', musicController.getByArtist)  
router.get('/album/:album', musicController.getByAlbum)     
router.get('/genre/:genre', musicController.getByGenre)     

//REQUIREMENT 2: Get information about a specific object:
//Gets select information about a single track.
router.get('/:title', musicController.getTrack)                   
router.get('/:title/artist', musicController.getTrackArtist)    
router.get('/:title/album', musicController.getTrackAlbum)      
router.get('/:title/genre', musicController.getTrackGenre)      

//REQUIREMENT 3: Delete a track based on a certain parameter.
//Deletes a track given a title, and all tracks given an album.
router.delete('/delete/:title', musicController.deleteTrack)        
router.delete('/delete/album/:album', musicController.deleteAlbum)  

//REQUIREMENT 4: Update a track based on a certain parameter.
//Updates the tracks artist and album names.
router.put('/:title/updateArtist/:newArtist', musicController.updateTrackArtist)    
router.put('/:title/updateAlbum/:newAlbum', musicController.updateTrackAlbum)  

module.exports = router;
