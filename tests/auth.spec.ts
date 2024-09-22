import { test, expect } from '@playwright/test';

test.describe('Basic Authentication Tests', () => {
    
    test('Successful login with Basic Authentication', async ({ request }) => {
        const auth = Buffer.from('admin:password123').toString('base64');
        const response = await request.get('https://restful-booker.herokuapp.com/booking', {
            headers: {
                'Authorization': `Basic $(auth)`
            }
        });
        expect(response.status()).toBe(200);
    });
})

test.describe('Bearer Token Authentication Tests', () =>{
    let token;

    test.beforeAll(async ({ request }) => {
        const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        const authData = await authResponse.json();
        token = authData.token;
    })

    test('Access protected endpoint with Bearer Token', async ({ request }) => {
        const response = await request.get('https://restful-booker.herokuapp.com/booking/1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(200);
    });
});
