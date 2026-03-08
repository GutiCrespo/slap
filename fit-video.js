const video = document.createElement("video")
video.src = "video.mp4"
video.autoplay = true
video.loop = true
video.muted = true
video.playsInline = true

function drawVideoCover(ctx, canvas){

    const vw = video.videoWidth
    const vh = video.videoHeight

    const cw = canvas.width
    const ch = canvas.height

    if(!vw || !vh) return

    const scale = Math.max(cw/vw, ch/vh)

    const w = vw * scale
    const h = vh * scale

    const x = (cw - w) / 2
    const y = (ch - h) / 2

    ctx.drawImage(video, x, y, w, h)
}