const apiAdapter = require('../routes/apiAdapter');
const { URL_SERVICE_MEDIA } = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = {
    getAllMedia: async (req, res) => {
        try {
            const media = await api.get('/media', req.body);
            return res.send(media.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }
            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    },
    addMedia: async (req, res) => {
        try {
            const media = await api.post('/media/upload', req.body);
            return res.send(media.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }
            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    }, 
    deleteMedia: async (req, res) => {
        try {
            const id = req.params.id;
            const media = await api.delete(`/media/${id}`);
            return res.send(media.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }
            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    }
}