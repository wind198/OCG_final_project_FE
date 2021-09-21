import app from '../app.js';
const ApiServices = {
    query(resource, params) {
        return app.axios.get(resource, params)
    },
    get(resource, id = "") {
        return app.axios.post(`${resource}/${id}`);
    },
}

export default ApiServices;