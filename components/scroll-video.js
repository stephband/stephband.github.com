// Make the background video seek with scroll position
import { limit, prepad } from '../../fn/module.js';
import { get, replace, create } from '../../dom/module.js';

const assign = Object.assign;
const define = Object.defineProperties;

var video = get('scrolling-video');

// Image replacement 'video'

const createUrls = () => {
    if(!window.config.font || window.config.font.frames_count === undefined) {
        return
    }
    const length = window.config.font.frames_count;
    const path   = window.config.font.frames_path;
    const ext    = window.config.font.frames_extension || '.jpg';
    const urls   = [];

    let n = 0;

    while (n++ < length) {
        const name = prepad('0', 3, n);
        urls.push(path + name + ext);
    }

    return urls;
}

function ImageVideo(imgs) {
    assign(this, imgs);
    this.length = imgs.length;
    this.node = create('canvas', {
        width:  imgs[0].width,
        height: imgs[0].height
    });
    this.context = this.node.getContext('2d');
    this.duration = imgs.length / 25;
    this.currentTime = 0;
}

define(ImageVideo.prototype, {
    currentTime: {
        get: function() {
            return this._currentTime;
        },

        set: function(value) {
            this._currentTime = parseFloat(value);
            let i = Math.floor(this.length * this._currentTime / this.duration);
            i = i < 0 ? 0 :
                i >= this.length ? this.length - 1 :
                i ;
            if (this.frame === i) { return; }
            this.frame = i;
            const img = this[i];
            this.context.drawImage(img, 0, 0);
            return this._currentTime;
        }
    }
});

assign(ImageVideo.prototype, {
    duration: 0,
    length: 0
});

const requestImageVideo = (urls) => {
    return Promise.all(urls.map(function(url) {
        return new Promise(function(pass, fail) {
            const img = create('img', {
                onload: function(e) { pass(img); },
                onerror: fail,
                src: url
            });
        });
    }))
    .then(function(imgs) {
        return new ImageVideo(imgs);
    });
}


// Track video with wheel movement

const trackVideoWithWheel = (video) => {
    //let time  = 0;
    //let delta = 0;
    //let frame;

    //function update() {
    //    time = limit(0, video.duration, time + delta / 400);
    //    video.currentTime = time;
    //    delta = 0;
    //    frame = undefined;
    //}

    //window.onwheel = function(e) {
    //    delta += e.deltaY;
    //    if (document.scrollingElement.scrollTop > 0) { return; }
    //    if (time < video.duration || e.deltaY < 0) {
    //        e.preventDefault();
    //        if (frame) { return; }
    //        frame = requestAnimationFrame(update);
    //    }
    //}

    window.addEventListener('scroll', function(e) {
        const height = window.innerHeight;
        const top = document.scrollingElement.scrollTop;
        const time = limit(0, video.duration, video.duration * (top / height));
        video.currentTime = time;
    });
}

const urls = createUrls();

if(urls && urls.length) {
    requestImageVideo(urls)
    .then(function(object) {
        replace(video, object.node);
        trackVideoWithWheel(object);
        console.log('SWTY Banner video ready,', object.length, 'frames.')
    });
}