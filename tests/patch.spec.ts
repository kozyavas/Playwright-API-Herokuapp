import { test, expect } from '@playwright/test';

test.describe('PATCH booking partial update tests', () => {
    
    test('Partially update booking details using PATCH', async ({ request }) => {        
        const response = await request.patch('https://restful-booker.herokuapp.com/booking/1', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },
            data: {
                totalprice: 250,
                depositpaid: false
            }
        });
        expect(response.status()).toBe(200);

        const updatedBooking = await response.json();
        expect(updatedBooking.totalprice).toBe(250);
        expect(updatedBooking.depositpaid).toBeFalsy();
    });
});