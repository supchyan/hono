import { __Desmos as Desmos } from '../local_modules/desmos.js';
import { showTable } from './calculator.js';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const tracking = require('tracking/build/tracking');
const video = document.getElementById('video');

tracking.ColorTracker.registerColor('red', (r, g, b) => {
    return r > 100 && g < 50 && b < 50;
});
tracking.ColorTracker.registerColor('green', (r, g, b) => {
    return r < 50 && g > 100 && b < 50;
});
tracking.ColorTracker.registerColor('blue', (r, g, b) => {
    return r < 50 && g < 50 && b > 100;
});

let dotColor = Desmos.Colors.BLACK;

let colTracker = new tracking.ColorTracker();
function setColor(R,G,B) {
    // return colTracker.setColors(['red'])
    if(R > G && R > B) {
        dotColor = Desmos.Colors.RED;
        return colTracker.setColors(['red'])
    }

    else if(G > R && G > B) {
        dotColor = Desmos.Colors.GREEN;
        return colTracker.setColors(['green'])
    }

    else if(B > R && B > G) {
        dotColor = Desmos.Colors.BLUE;
        return colTracker.setColors(['blue'])
    }
}


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
    alpha: false,
});
const coords = {
    x: 0,
    y: 0
}
const data = {
    x: [],
    y: [],
    t: []
};

function convertVideo(srcPath, convertedPath) {
    return ffmpeg(srcPath)
        .noAudio()
        .videoCodec('libx264')
        .size('640x?').aspect('1:1').autopad(true) // .size('640x?') should increase performance
        .on('end', () => {
            clearCache();
            startTracking(video, convertedPath);
        })
        .save(convertedPath)
}

function startTracking(video, videoSrc) {
    video.setAttribute('src', videoSrc)
    function drawCanvas() {
        ctx.drawImage(video, 0, 0, 640, 640);  
        requestAnimationFrame(drawCanvas);
    }
    
    video.addEventListener('loadeddata', function() {
        drawCanvas();
    });

    colTracker.on('track', function(event) {
        if (event.data.length === 0) {

        } else {
            event.data.forEach(function(rect) {
                coords.x = rect.x;
                coords.y = -rect.y;

                if(video.paused) return;

                let size = 0.03;
                data.x.push(rect.x/640 * size); 
                data.y.push(-rect.y/640 * size);
                data.t.push(video.currentTime);

                showTable(data.x, data.y, data.t);
            });
        }
    });
    
    // TODO: лагает сильно
    setInterval(() => {
        tracking.track('#canvas', colTracker, {
            audio: false,
            camera: false,
        });
    }, 1)
}

function clearCache() {
    coords.x = 0;
    coords.y = 0;
    data.x = [];
    data.y = [];
    data.t = [];
    showTable(data.x, data.y, data.t);
}

export {
    data,
    coords,
    dotColor,
    startTracking,
    convertVideo,
    clearCache,
    setColor
}