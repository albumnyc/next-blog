const { createServer } = require('http');
const { parse } = require('url');
const { join } = require('path');
const koa = require('koa');
const next = require('next');
const fs = require('fs');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const fetch = require('isomorphic-unfetch');
const rootStaticFiles = ['/favicon.ico', '/assets'];
const exec = require('child_process').exec;
const SUMMARY_JSON = require('./content/summary.json');
const path = require('path');

const urlHandlers = ({ pathname, res, req, parsedUrl, query }) => [{
    condition: pathname.includes('www'),
    resolution: () => app.setAssetPrefix('')
}, {
    condition: rootStaticFiles.filter((file) => pathname.indexOf(file) > -1).length > 0,
    resolution: () => app.serveStatic(req, res, join(__dirname, 'static', pathname))
}, {
    condition: pathname.indexOf('/posts') === 0,
    resolution: () => {
        return app.render(req, res, '/post', query)
    }
}, {
    condition: pathname.indexOf('/catogary') === 0,
    resolution: () => { return app.render(req, res, '/catogary', query) }
}, {
    condition: true,
    resolution: () => handle(req, res, parsedUrl),
}]


app.prepare().then(() => {
    const server = new koa();
    server.use(async (ctx, next) => {
        const { req, res } = ctx;
        const parsedUrl = parse(req.url, true);
        let { pathname, query } = parsedUrl;
        pathname = decodeURIComponent(pathname);
        const list = urlHandlers({ pathname, res, req, parsedUrl, query });
        for (let i = 0; i < list.length; i++) {
            if (list[i].condition) {
                await list[i].resolution();
                break;
            }
        }
    })

    server.listen(3000, (err) => {
        app.render(err || '错了');
        console.log('> Ready on http://localhost:3000');
    });
});

function watch() {
    // const child = exec('node server.js');
    const watcher = fs.watch(path.resolve(__dirname, 'server.js'), (e) => {
        console.log('observe the file ${server.js} changed');
        // child.kill();
        watcher.close();
        watch();
    })
}
watch();