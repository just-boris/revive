import {jsdom} from 'jsdom';

export default function() {
    beforeAll(function() {
        global.document = jsdom('<html><head></head><body></body></html>', {});
        global.window = global.document.defaultView;
        global.navigator = global.window.navigator;
        global.location = global.window.location;
    });

    afterAll(function() {
        global.window.close();
    });
}
