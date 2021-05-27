const apiAdapter = require('../routes/apiAdapter');
const jwt = require('jsonwebtoken')
const { 
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const user = await api.get('/media', req.body);
            return res.send(user.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }
            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    },
    registerUser: async (req, res) => {
        console.log(req.body)
        try {
            const user = await api.post('/users/register', req.body);
            return res.send(user.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    }, 
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await api.delete(`/media/${id}`);
            return res.send(user.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    },
    userLogin: async (req, res) => {
        try {
            const user = await api.post('/users/login', req.body);
            const data = user.data.data

            const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
            const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED })

            await api.post('/refresh_tokens', { refresh_token: refreshToken, user_id: data.id })

            return res.send({
                status: 'success',
                data: {
                    token,
                    refreshToken
                }
            })
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data)
        }
    },
    updateProfile: async (req, res) => {
        try {
            const id = req.user.data.id
            const user = await api.put(`/users/${id}`, req.body)

            return res.send(user.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data) 
        }
    },
    getProfile: async (req, res) => {
        try {
            const id = req.user.data.id
            const user = await api.get(`/users/${id}`)

            return res.send(user.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data) 
        }
    },
    logout: async (req, res) => {
        try {
            const id = req.user.data.id
            const user = await api.post(`/users/logout`, { user_id: id })

            return res.send(user.data)
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data) 
        }
    }
}