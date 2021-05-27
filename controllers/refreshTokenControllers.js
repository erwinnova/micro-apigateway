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
    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.body.refresh_token
            const email = req.body.email

            if (!refreshToken || !email) {
                return res.status(400).send({
                    status: 'error',
                    message: 'invalid token'
                })
            }

            await api.get('/refresh_tokens', { params: { refresh_token: refreshToken }})

            jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
                if (err) {
                    res.status(403).send({
                        status: 'error',
                        message: err.message
                    })
                }

                if (email !== decoded.data.email) {
                    res.status(403).send({
                        status: 'error',
                        message: 'email not valid'
                    })
                }

                const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
                return res.send({
                    status: 'success',
                    data: {
                        token
                    }
                })
            })
        } catch(err) {
            if (err.code === 'ECONNREFUSED') {
                return res.status(500).send({ status: 'error', message: 'service unavailable' })
            }

            const { status, data } = err.response;
            return res.status(status).send(data) 
        }
    }
}