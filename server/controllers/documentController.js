const db = require('../models/index.js')
const Document = db.documents

const insertDocument = async (req, res) => {
    const document_name = req.body.document_name
    console.log('Document to be inserted: ' + document_name)
    const document_path = req.body.document_path
    const note_id = req.body.note_id
    // const document_buffer = Buffer.from(document_path, 'base64')

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

        const document_id = newDocument.get('document_id')
        console.log('document_id:', document_id)
        res.status(201).json({
            message: 'Document created',
            document: newDocument,
            document_id: document_id, // Include the document_id in the response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
const getDocumentNameAndId = async (req, res) => {
    const note_id = req.body.note_id
    console.log('note_id: ' + note_id)
    try {
        const documents = await Document.findAll({
            attributes: ['document_id', 'document_name'],
            where: {
                note_id: note_id,
            },
        })
        res.status(200).json(documents)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
const deleteDocument = async (req, res) => {
    const document_id = req.body.document_id
    try {
        await Document.destroy({
            where: {
                document_id: document_id,
            },
        })
        res.status(200).json({ message: 'Document deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.name })
    }
}
module.exports = { insertDocument, getDocumentNameAndId, deleteDocument }
