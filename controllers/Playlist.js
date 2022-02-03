const Playlist = require("../Models/Playlist");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../error");
const Song = require("../Models/Song");

// const library = {
//   songs: [song, song, song]
// }

const getAllPlaylists = async (req, res) => {
  //Gets all the playlists for the user
  const playlists = await Playlist.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ playlists, count: playlists.length });
};

const getPlaylist = async (req, res) => {
  //Gets one playlist from user

  const { userID } = req.body;
  const { id: playlistID } = req.params;

  const playlist = await Playlist.findById({
    _id: playlistID,
    createdBy: userID,
  });

  if (!playlist) {
    throw new NotFoundError(`no playist with id ${playlistID}`);
  }

  res.status(StatusCodes.OK).json({ playlist });
};

const createPlaylist = async (req, res) => {
  // const {userID} = req.user;
  //creates/adds playlist to playlists
  req.body.createdBy = req.user.userID;
  const playlist = await Playlist.create(req.body);

  res.status(StatusCodes.CREATED).json({ playlist });
};

const updatePlaylist = async (req, res) => {
  //Updates a playlist by either changing the name of it, adding a song, or deleting a song
  const { name } = req.body;
  const { userID } = req.user;
  const { id: playlistID } = req.params;

  if (!name) {
    throw new BadRequestError("name field must be filled");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    { _id: playlistID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );

  if (!playlist) {
    throw new NotFoundError(`no playlist with id ${playlistID}`);
  }
  res.status(StatusCodes.OK).json({ playlist });
};

const deletePlaylist = async (req, res) => {
  const {
    user: { userID },
    params: { id: playlistID },
  } = req;

  const playlist = await Playlist.findByIdAndRemove({
    _id: playlistID,
    createdBy: userID,
  });
  if (!playlist) {
    throw new NotFoundError(`no playlist with id ${playlistID}`);
  }
  res.status(StatusCodes.OK).json({ playlist });
};

const deleteSong = async (req, res) => {
  const {
    user: { userID },
    params: { id: songID },
  } = req;

  const song = await Song.findByIdAndRemove({
    _id: songID,
    createdBy: userID,
  });
  if (!song) {
    throw new NotFoundError(`no song with id ${songID}`);
  }
  res.status(StatusCodes.OK).json({ song });
};

const addSong = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const song = await Song.create(req.body);
  res.status(StatusCodes.CREATED).json({ song });
};

const getSong = async (req, res) => {
  const { userID } = req.user;
  const { id: songID } = req.params;

  const song = await Song.findById({
    _id: songID,
    createdBy: userID,
  });

  if (!song) {
    throw new NotFoundError(`no song with id ${songID}`);
  }

  res.status(StatusCodes.OK).json({ song });
};

const getAllSongs = async (req, res) => {
  const songs = await Song.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ songs, count: songs.length });
};

const editSong = async (req, res) => {
  //edits specified son
  const { name, artist, playlist } = req.body;
  const { userID } = req.user;
  const { id: songID } = req.params;

  if (!name || !artist || !playlist) {
    throw new BadRequestError("name, artist, and playlist field must be filled");
  }

  const song = await Song.findByIdAndUpdate(
    { _id: songID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );

  if (!song) {
    throw new NotFoundError(`no song with id ${songID}`);
  }
  res.status(StatusCodes.OK).json({ song });
};

module.exports = {
  addSong,
  deleteSong,
  editSong,
  updatePlaylist,
  createPlaylist,
  getPlaylist,
  getAllPlaylists,
  deletePlaylist,
  getSong,
  getAllSongs,
};
