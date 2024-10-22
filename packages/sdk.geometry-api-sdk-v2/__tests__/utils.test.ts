import {
    contentDispositionFromFilename,
    extractFileInfo,
    filenameFromContentDisposition,
} from '../src';

describe('extractFileInfo', function () {
    test('no header', () => {
        const res = extractFileInfo(undefined);
        expect(res['filename']).toBeUndefined();
        expect(res['size']).toBeUndefined();
    });

    test('full header', () => {
        const res = extractFileInfo({
            'Content-Length': '165030',
            'Content-Disposition': 'attachment; filename="foobar.txt"',
        });
        expect(res['filename']).toBe('foobar.txt');
        expect(res['size']).toBe(165030);
    });
});

describe('contentDispositionFromFilename', function () {
    test('ascii characters', () => {
        const res = contentDispositionFromFilename('foobar.txt');
        expect(res).toBe('attachment; filename="foobar.txt"');
    });

    test('non-ascii characters', () => {
        const res = contentDispositionFromFilename('ä€öü.jpg');
        expect(res).toBe(
            'attachment; filename="aou.jpg"; ' +
                "filename*=UTF-8''a%CC%88%E2%82%ACo%CC%88u%CC%88.jpg"
        );
    });
});

describe('filenameFromContentDisposition', function () {
    test('invalid format', () => {
        const res = filenameFromContentDisposition('attachment; somethign="else"');
        expect(res).toBeUndefined();
    });

    test('ascii characters', () => {
        const res = filenameFromContentDisposition('attachment; filename="foobar.txt"');
        expect(res).toBe('foobar.txt');
    });

    test('non-ascii characters with encoding', () => {
        const res = filenameFromContentDisposition(
            'attachment; filename="aou.jpg"; ' +
                "filename*=UTF-8''a%CC%88%E2%82%ACo%CC%88u%CC%88.jpg"
        );
        expect(res).toBe('ä€öü.jpg');
    });

    test('non-ascii characters without encoding', () => {
        const res = filenameFromContentDisposition(
            'attachment; filename="aEURou.jpg"; filename*=a%CC%88%E2%82%ACo%CC%88u%CC%88.jpg'
        );
        expect(res).toBe('ä€öü.jpg');
    });
});
