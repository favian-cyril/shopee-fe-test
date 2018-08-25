import axios from 'axios';

export function getRatesData(base) {
    return axios.get('https://api.exchangeratesapi.io/latest', {
        params: {
            base: base
        }
    }).then(function (response) {
        return response.data.rates
    }).catch(function (error) {
        console.log('Error:' + error.message);
    });
}
