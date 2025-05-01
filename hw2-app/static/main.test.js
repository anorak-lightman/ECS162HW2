const fetchKey = require('./testFunctions/fetchKey.js');
const getSacStories = require('./testFunctions/getSacStories.js');
const getDavisStories = require('./testFunctions/getDavisStories.js');
const fetch = require('node-fetch');    
global.fetch = fetch;
test('basic sanity check', () => {
    expect(1 + 1).toBe(2);
});

test('fetch api key', async () => {
    const apiKey = await fetchKey();
    expect(apiKey).toBe('rFSzaY1UbSRUSoBOt6lsYpXubk49bygA');
});

test('get sacramento stories', async () => {
    const sacStories = await getSacStories(0);
    expect(sacStories[0]).toBeDefined();
    expect(sacStories[0].headline.main).toBeDefined();
    expect(sacStories[0].snippet).toBeDefined();
    expect(sacStories[0].multimedia).toBeDefined();
    expect(sacStories[0].multimedia.default.url).toBeDefined();
    expect(sacStories[0].multimedia.default.width).toBeDefined();
    expect(sacStories[0].multimedia.default.height).toBeDefined();
    expect(sacStories[0].web_url).toBeDefined();
});

test('get davis stories', async () => {
    const davisStories = await getDavisStories(0);
    expect(davisStories[0]).toBeDefined();
    expect(davisStories[0].headline.main).toBeDefined();
    expect(davisStories[0].snippet).toBeDefined();
    expect(davisStories[0].multimedia).toBeDefined();
    expect(davisStories[0].multimedia.default.url).toBeDefined();
    expect(davisStories[0].multimedia.default.width).toBeDefined();
    expect(davisStories[0].multimedia.default.height).toBeDefined();
    expect(davisStories[0].web_url).toBeDefined();
});