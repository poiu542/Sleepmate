Stream = require("node-rtsp-stream");
stream = new Stream({
  name: "name",
  streamUrl: "rtsp://admin:ssafy9thspecial@sleepmate2.iptimecam.com:554/stream_ch00_0",
  wsPort: 9999,
  ffmpegOptions: {
    "-stats": "",
    "-r": 30,
  },
});
