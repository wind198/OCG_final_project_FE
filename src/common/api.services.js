import app from '../app.js';
const ApiServices = {
    query(resource, params) {
        return app.axios.get(resource, params)
    },
 
    post(resource,params){
        return app.axios.post(resource,params)
    }
}

export default ApiServices;