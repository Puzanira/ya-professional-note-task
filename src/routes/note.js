const Note = require('../models/note.js');

module.exports.post = async (req, res) => {
    const note = new Note({
		title: req.body.title,
		content: req.body.content,
	})
	await note.save()
	res.send(note)
}

module.exports.get = async(req, res) => {
	const queryString = req.query && req.query.query;
	if (!queryString) {
		const notes = await Note.find();
		res.send(notes);
	} else {
		const notes = await Note.find({
			$text : { 
				$search: queryString,         
				$caseSensitive: false, 
			}
		});
		res.send(notes);
	}
}

module.exports.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
		res.send(note)
	} catch {
		res.status(404)
		res.send({ error: "Note doesn't exist!" })
	}
}

module.exports.updateNote = async (req, res) => {
	try {
		const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.send(note)
	} catch {
		res.status(404)
		res.send({ error: "Note doesn't exist!" })
	}
}

module.exports.deleteNote = async (req, res) => {
	try {
		await Note.findByIdAndDelete(req.params.id);
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Note doesn't exist!" })
	}
}