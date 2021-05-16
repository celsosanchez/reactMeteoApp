import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:3000";

export default {

    login: function (email, password) {// will call express api 
        return axios.post(  //with post method
            `${burl}/login`,
            {
                email, // pass this data
                password
            },
            {
                headers: headers
            }
        );
    },

    signup: function (send) {
        return axios.post(`${burl}/signup`, send, { headers: headers });
    },

    isAuth: function () {
        return localStorage.getItem("token") !== null; //check security
    },
    logout: function () {
        localStorage.clear();
    },

    getCities: async function () {
        return axios.get(`${burl}/home`, { headers: headers}).then(res => {
            console.log(res)
            return res
        })
    },
    delCity: async function (city) {
        console.log(city)
        return axios.delete(`${burl}/home`,{data: {city: city}}).then(res => {
            console.log(res)
            
        })
    },

    setCities: async function (city) {
        console.log(city)
        return await axios.put(`${burl}/home`, { city: city}      
        )
    }
};