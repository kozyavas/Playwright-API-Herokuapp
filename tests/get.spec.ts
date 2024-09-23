import {test, expect } from '@playwright/test';
import { request } from 'http';


test.describe('GET tests', async() => {
    test('GetBookingIds', async ({ request }) => {
        const response = await request.get('/booking/1');

        expect(response.status()).toBe(200);

        const data = await response.json();
    
        expect(data.firstname).toBe('Jim');
        expect(data.lastname).toBe('Brown');
        expect(data.totalprice).toBe(879);
        expect(data.bookingdates.checkin).toBe('2024-08-30');
        expect(data).toHaveProperty('firstname');
    })

    test('GET request response time is acceptable', async ({ request }) => {
        const startTime = Date.now();
        const response = await request.get('/booking/1');
        const endTime = Date.now();

        const responseTime = endTime - startTime;
        expect(responseTime).toBeLessThan(1000); // Yanıt süresi 500 ms'den kısa olmalı
    })

    test('GET request with query parameters', async ({ request }) => {
        // 1. Query parameters (sorgu parametreleri) ile GET isteği yapıyoruz (userId=1).
        const response = await request.get('https://jsonplaceholder.typicode.com/posts?userId=1');

        expect(response.status()).toBe(200);

        const data = await response.json();

        // 4. Dönen her verinin userId'sinin 1 olduğunu kontrol ediyoruz.
        data.forEach(post  => {
            expect(post.userId).toBe(1);
        });
    })

    test('GET request with authorization header', async ({ request }) => {
        const response = await request.get('https://restful-booker.herokuapp.com/auth', {
        });
    });   
});