// a working file for run debug development localy

import { translateToValidModuleName } from './src/str.js';
import { ppp } from './src/debug.js';


// javascript download video from the youtube by a link  in a formats 720p mp4
// reactjs search videos and display result
// https://www.youtube.com/@user-ps2tv7rs8i/videos
// https://www.youtube.com/watch?v=r6QtHMyDCGY&list=PL4k-KcJx7YQDWma7lH7ypVl8bUV7GNFtO
// show avalible formats
// 720p 480p mp3 m4a
// folder for dowloading
// auth keys
// youtube
    // search by filters duration
    // show my subscription news
    // show my history
    // getVideoInfo
    // download video
    // download playlist
// vk
    // download video from vk course
    // download video from vk by link
// vimeo
    // download video from vimeo by link

// const ytdl = require('ytdl-core');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');

const videoUrl = 'https://www.youtube.com/watch?v=Xb0fvMVsRhQ';

async function downloadVideo(url, format) {
    try {
        const videoInfo = await ytdl.getInfo(url);
        const videoTitle = videoInfo.videoDetails.title;
        let videoStream;

        switch (format) {
            case '720p':
                videoStream = ytdl(url, { quality: 'highestvideo[height<=720]+bestaudio' });
                break;
            case '480p':
                videoStream = ytdl(url, { quality: 'highestvideo[height<=480]+bestaudio' });
                break;
            case 'mp3':
                videoStream = ytdl(url, { quality: 'highestaudio' });
                break;
            case 'm4a':
                videoStream = ytdl(url, { quality: 'highestaudio' });
                break;
            default:
                ppp('Invalid format');
                return;
        }

        videoStream.pipe(fs.createWriteStream(`${videoTitle}.${format}`));
        ppp(`Downloading ${format} format of '${videoTitle}' from YouTube...`);

        videoStream.on('end', () => {
            ppp(`Downloaded ${format} format of '${videoTitle}'!`);
            if (format === 'mp3' || format === 'm4a') {
                convertToAudio(format, `${videoTitle}.${format}`);
            }
        });

    } catch (error) {
        console.error('Error downloading video:', error);
    }
}
function convertToAudio(format, filename) {
    ffmpeg(filename)
        .audioBitrate(128)
        .save(`${filename.replace(/\.[^/.]+$/, '')}.${format}`)
        .on('end', () => {
            ppp(`Converted ${format} audio of '${filename}'!`);
        });
}
// downloadVideo(videoUrl, '720p');
// downloadVideo(videoUrl, '480p');
// downloadVideo(videoUrl, 'mp3');
// downloadVideo(videoUrl, 'm4a');


const formats = [
    { quality: 'highestvideo', format: 'mp4' }, // 720p mp4
    { quality: 'medium', format: 'mp4' },       // 480p mp4
    { quality: 'highestaudio', format: 'm4a' }  // audio only (m4a)
];

async function downloadVideo2(url, format) {
    try {
        const info = await ytdl.getInfo(url);
        const formatInfo = info.formats.find(f => f.qualityLabel === format.quality && f.container === format.format);

        if (formatInfo) {
            console.log(`Downloading ${format.quality}.${format.format}...`);
            ytdl(url, { format: formatInfo })
                .pipe(fs.createWriteStream(`${info.title}.${format.format}`));
            console.log(`Downloaded ${format.quality}.${format.format}`);
        } else {
            console.log(`Could not find ${format.quality}.${format.format}`);
        }
    } catch (error) {
        console.error('Error downloading video:', error);
    }
}

// Loop through each format and download
// formats.forEach(format => downloadVideo2(videoUrl, format));
// downloadVideo2(videoUrl, 'mp4')

async function getVideoInfo(videoUrl) {
    try {
        const info = await ytdl.getInfo(videoUrl);
        console.log('Video Title:', info.videoDetails.title);
        console.log('Formats Available:');
        info.formats.forEach(format => {
            console.log(format.qualityLabel, format.container);
        });
    } catch (error) {
        console.error('Error fetching video info:', error);
    }
}

// getVideoInfo(videoUrl);

const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube Data API key

async function getVideoInfo2() {
  try {
    const videoId = videoUrl.split('v=')[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;
    const response = await axios.get(apiUrl);

    if (response.data.items.length > 0) {
      const videoDetails = response.data.items[0];
      const title = videoDetails.snippet.title;
      console.log(`Downloading video: ${title}`);

      // Get available formats
      const formats = await ytdl.getInfo(videoUrl);
      const format = formats.formats.find(format => format.resolution === '720p' && format.container === 'mp4');

      if (format) {
        // Download the video
        const video = ytdl(videoUrl, { quality: format.itag });
        video.pipe(fs.createWriteStream(`${title}.mp4`));
        console.log('Downloading...');

        video.on('end', () => {
          console.log('Video downloaded successfully.');
        });
      } else {
        console.error('Could not find the specified format (720p mp4).');
      }
    } else {
      console.error('Video not found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// getVideoInfo2();
