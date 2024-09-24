import { test, expect } from '@playwright/test';

test.describe('Basic Authentication Tests', () => {
    
    test('Successful login with Basic Authentication', async ({ request }) => {
        // Node.js ortamında kullanıcı adı ve şifrenin Base64 formatına kodlanması için kullanılan yöntem.
        const auth = Buffer.from('admin:password123').toString('base64');
        const response = await request.get('/booking', {
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
        const authResponse = await request.post('/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        const authData = await authResponse.json();
        token = authData.token;
    })

    test('Access protected endpoint with Bearer Token', async ({ request }) => {
        const response = await request.get('/booking/1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(200);
    });
});
