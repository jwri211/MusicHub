//Controller file for all mongo calls. 
const TrackModel = require('../models/track');

//REQUIREMENT 1: Get information about multiple objects.
//API Call to get ALL tracks
module.exports.getAll = (req, res) => {
    TrackModel.find({}, (error, result) => {
        if (error) {
          res.send(error);
        }
        res.send(result);
      });
}
//API Call to get all tracks matching ARTIST param.
module.exports.getByArtist = (req, res) => {
  TrackModel.find({artist : req.params.artist}, (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
}

//API Call to get all tracks matching ALBUM param.
module.exports.getByAlbum = (req, res) => {
  TrackModel.find({album : req.params.album}, (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
}

//API Call to get all tracks matching GENRE param.
module.exports.getByGenre = (req, res) => {
  TrackModel.find({genre : req.params.genre}, (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
}

//REQUIREMENT 2: Get information about a specific object.
//API Call to get all information on one TRACK
module.exports.getTrack = (req, res) => {
  TrackModel.find({title : req.params.title}, (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }); 
}

//API Call to get ARTIST information from one given track.
module.exports.getTrackArtist = (req, res) => {
  TrackModel.find({title : req.params.title}, 
                  {_id: 0, artist : 1}, 
                  (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }); 
}

//API Call to get ALBUM information from one track.
module.exports.getTrackAlbum = (req, res) => {
  TrackModel.find({title : req.params.title}, 
                  {_id: 0, album : 1}, //uses a mongo deature called 'projection' to return only specified fields.
                  (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }); 
}

//API Call to get GENRE information from one track.
module.exports.getTrackGenre = (req, res) => {
  TrackModel.find({title : req.params.title}, 
                  {_id: 0, genre : 1}, 
                  (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }); 
}

//REQUIREMENT 3: Delete an object based on a specific parameter.
//API Call to delete track based on TITLE
module.exports.deleteTrack = (req, res) => {
  TrackModel.findOneAndDelete({title : req.params.title}, 
                  (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send("Deleted");
    }); 
}

//API Call to delete All tracks based on ALBUM
module.exports.deleteAlbum = (req, res) => {
  TrackModel.deleteMany({album : req.params.album}, 
                  (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }); 
}

//REQUIREMENT 4: Update object based on specific parameters.
//API call to UPDATE a tracks ARTIST with a new value.
module.exports.updateTrackArtist = (req, res) => {
  TrackModel.findOneAndUpdate(
    {title : req.params.title}, //find based on title given in route parameters.
    {artist : req.params.newArtist}, //assign the artist the new value.
    (error, result) => {
      if (error) {
        res.send(error);
      }
      res.status(200).send("Updated artist name.");
  }); 
}

//API call to UPDATE a tracks ALBUM with a new value.
module.exports.updateTrackAlbum = (req, res) => {
  TrackModel.findOneAndUpdate(
    req.params.title, //find based on title given in route parameters.
    {album : req.params.newAlbum}, //assign the artist the new value.
    (error, result) => {
      if (error) {
        res.send(error);
      }
      res.status(200).send("Updated Album name.");
  }); 
}

