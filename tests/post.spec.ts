import { test, expect } from '@playwright/test';

let token; // Token'ı global olarak tanımlıyoruz.
test.describe('POST tests', async () => {

    test.beforeEach(async ({ request }) => {
        const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        const authData = await authResponse.json();
        token = authData.token; // Token'ı güncelliyoruz.
    })
    test('POST to authenticate and receive a token', async ({ request }) => {
        // 1. Kimlik doğrulama için gerekli kullanıcı adı ve şifre ile POST isteği yapılıyor.POST'da body olur
        // Authorization'i beforeEach'te kullanarak her test icin gecerli yapabiliriz.
        const response = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.token).toBeDefined();
        expect(data.token).not.toBeNull();
    });

    test('Create a new booking with POST request', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                firstname: 'Jane',
                lastname: 'Keanu',
                totalprice: 120,
                depositpaid: true,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-05'
                },
                additionalneeds: 'Breakfast'
            }
        });
        expect(response.status()).toBe(200);

        const bookingData = await response.json();        
        console.log(bookingData.bookingid);
        
        expect(bookingData.booking.firstname).toBe('Jane');
        expect(bookingData.booking.lastname).toBe('Keanu');
    });
});