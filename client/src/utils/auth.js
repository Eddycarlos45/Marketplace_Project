import axios from 'axios'

export const login = (usuario) => {

    return new Promise((resolve, reject) => {
        const authUser = { email: usuario.email, senha: usuario.senha }

        axios.post('http://localhost:3030/login', authUser)
            .then(res => {
                return resolve(res)
            })
            .catch(err => {
                return reject(err)
            })
    })
}


export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null
}

