import axios from 'axios';

const Api = URL => {
    const client = axios.create({
        baseURL: URL
    })

    const token = localStorage.getItem('token');    
    const get = endpoint => client.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {
        getUser: id => get(`/users/${id}`)
    }
}

export default Api;