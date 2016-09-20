'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');

var verifyFile = require('./lib/verify-file');
var readVersion = require('./lib/read-version');

var platform = os.platform() + '-' + os.arch();
var version = readVersion(platform);

var binary = os.platform() === 'win32' ? 'ffmpeg.exe' : 'ffmpeg';

var npm3Path = path.resolve(__dirname, '..', platform, binary);
var npm2Path = path.resolve(__dirname, 'node_modules', '@ffmpeg-installer', platform, binary);

var ffmpegPath;
if (verifyFile(npm3Path)) {
    ffmpegPath = npm3Path;
} else if (verifyFile(npm2Path)) {
    ffmpegPath = npm2Path;
} else {
    throw 'Could not find ffmpeg executable, tried "' + npm3Path + '" and "' + npm2Path + '"';
}

module.exports = {
    path: ffmpegPath,
    version: version
};
