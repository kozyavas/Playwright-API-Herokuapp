import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test.describe('Booking DELETE tests', () => {
    
    test('Delete a booking', async ({ request }) => {
        const token = 'Basic YWRtaW46cGFzc3dvcmQxMjM=';

        const bookingId = 123;
        const response = await request.delete(`/booking/${bookingId}`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        expect(response.status()).toBe(201);
        const confirmResponse = await request.get(`/booking/${bookingId}`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        expect(confirmResponse.status()).toBe(404);
    });
});