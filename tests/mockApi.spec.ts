import { test, expect } from '@playwright/test';

test('Mock API response', async ({ page, request }) => {
    // Setup route interception to respond with mock data
    await page.route('/booking/2', route => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
            "firstname": "James",
            "lastname": "Broq",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        })
    }));
   

    // Make the GET request
    const response = await request.get('/booking/2');
    const responseBody = await response.json();
    
    // Assertions
    expect(response.status()).toBe(200);
    expect(responseBody.firstname).toBe('James');
    expect(responseBody.lastname).toBe('Broq');
    expect(responseBody.totalprice).toBe(111);
    expect(responseBody.depositpaid).toBe(true);
    expect(responseBody.bookingdates.checkin).toBe('2018-01-01');
    expect(responseBody.bookingdates.checkout).toBe('2019-01-01');
    expect(responseBody.additionalneeds).toBe("Breakfast");
});

test('Mock API response with original fetch', async ({ page, request }) => {
/*
1.Route Interception: page.route() kullanarak istenen URL için istekleri yakalıyoruz.
2.Fetch Original Response: route.fetch() ile orijinal yanıtı alıyoruz.
3.Modify and Respond: Orijinal yanıtı değiştirerek yeni bir yanıt oluşturuyoruz ve route.fulfill() ile bu yanıtı döndürüyoruz.
4.Assertions: Testin sonunda, döndürülen yanıtın beklenen değişiklikleri içerip içermediğini kontrol ediyoruz.
*/
    // Route interception to fetch original response and modify it
    await page.route('/booking/1', async route => {
        // Fetch the original response
        const originalResponse = await route.fetch();

        // Use the original response's body and modify it
        const originalBody = await originalResponse.json();
        const modifiedBody = {
            ...originalBody,
            firstname: "James", // Override the firstname
            lastname: "Bro",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };
        // Fulfill the route with modified response
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(modifiedBody)
        });
    });

    const response = await request.get('/booking/1');
    const responseBody = await response.json();
    
    expect(response.status()).toBe(200);
    expect(responseBody.firstname).toBe('James');
    expect(responseBody.lastname).toBe('Bro');    
})
