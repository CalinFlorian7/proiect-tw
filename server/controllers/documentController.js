const db = require('../models/index.js')
const Document = db.documents

const insertDocument = async (req, res) => {
    const document_name = req.body.document_name
    console.log('Document to be inserted: ' + document_name)
    const document_path = req.body.document_path
    const note_id = req.body.note_id
    console.log('document path to be inserted: "' + document_path + '"')

    try {
        const newDocument = await Document.create(
            {
                document_name: document_name,
                document_path: document_path,
                note_id: note_id,
            },
            {
                fields: ['document_name', 'document_path', 'note_id'],
            }
        )
        res.status(201).json({
            message: 'Document created',
            document: newDocument,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}

module.exports = { insertDocument }
