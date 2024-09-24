import { test, expect } from '@playwright/test';

let token;
test.describe('PUT update tests', async () => {
    
    test('Update an entire booking using PUT', async ({ request }) => {
        const response = await request.put('/booking/1', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            },

            data: {
                firstname: 'Alice',
                lastname: 'Johnson',
                totalprice: 200,
                depositpaid: true,
                bookingdates: {
                    checkin: '2024-03-01',
                    checkout: '2024-03-10'
                },
                additionalneeds: 'Late checkout'
            }
        });
        expect(response.status()).toBe(200);

        const updateBooking = await response.json();
        expect(updateBooking.firstname).toBe('Alice');
        expect(updateBooking.lastname).toBe('Johnson');
        expect(updateBooking.totalprice).toBe(200);
        expect(updateBooking.depositpaid).toBeTruthy();
        expect(updateBooking.bookingdates.checkin).toBe('2024-03-01');
        expect(updateBooking.bookingdates.checkout).toBe('2024-03-10');
        expect(updateBooking.additionalneeds).toBe('Late checkout');
    });
});