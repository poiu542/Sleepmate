Stream = require('node-rtsp-stream')
stream = new Stream({
	name: 'name',
	streamUrl: 'rtsp://admin:ssafy@192.168.119.162:554/stream_ch00_0',
	wsPort: 9999,
	ffmpegOptions: { 
		'-stats': '', 
		'-r': 30 
	}
})