const express = require('express');

const NoteController = require('./note');

const routes = new express.Router();

routes.post('/notes', NoteController.post);
routes.get('/notes', NoteController.get);
routes.get('/notes/:id', NoteController.getNote);
routes.put('/notes/:id', NoteController.updateNote);
routes.delete('/notes/:id', NoteController.deleteNote);

module.exports = routes;