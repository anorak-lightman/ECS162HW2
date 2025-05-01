const fetchKey = require('./testFunctions/fetchKey');

test('basic sanity check', () => {
    expect(1 + 1).toBe(2);
});

test('fetch api key', async () => {
    const apiKey = await fetchKey();
    expect(apiKey).toBe('rFSzaY1UbSRUSoBOt6lsYpXubk49bygA');
});