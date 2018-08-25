import { getRatesData } from '../scripts/getRatesData.js';
import mockAxios from 'axios';

describe('getRatesData', () => {
    it('should be able to return the rates based on the currency', () => {
        const response = {"AUD":1.3693,"BGN":1.6878,"CHF":0.9836,"CNY":6.8455}
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
              data: { rates: response }
            })
        );
        return getRatesData('USD').then(function (rates) {
            expect(rates['AUD']).toBe(response['AUD']);
        })
    })
})
