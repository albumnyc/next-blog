const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

function watch() {
    const child = exec('node server.js');
    const watcher = fs.watch(path.resolve(__dirname, 'server.js'), (e) => {
        console.log('observe the file ${server.js} changed');
        child.kill();
        watcher.close();
        watch();
    })
}
watch();