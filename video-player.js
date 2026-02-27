// Video data mapping
const videoSources = {
    'video1': 'videos/video1.mp4',  // Update with your actual video paths
    'M4-website-screen-recording': 'videos/M4-website-screen-recording.mp4',
    'FES-ScreenRecording': 'videos/FES-ScreenRecording.mp4',
    // Add more videos as needed
};

// Get modal elements
const modal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const closeBtn = document.getElementsByClassName('close')[0];

// Add click event to all video previews
document.querySelectorAll('.video-preview').forEach(preview => {
    preview.addEventListener('click', function(e) {
        // Don't open if clicking on channel link or other interactive elements
        if (e.target.closest('.channel-picture') || e.target.closest('.video-author')) {
            return;
        }
        
        const videoId = this.dataset.videoId;
        playVideo(videoId);
    });
});

// Also make thumbnails clickable
document.querySelectorAll('.thumbnail-row').forEach(thumbnail => {
    thumbnail.addEventListener('click', function(e) {
        e.stopPropagation();
        const videoPreview = this.closest('.video-preview');
        const videoId = videoPreview.dataset.videoId;
        playVideo(videoId);
    });
});

// Function to play video
function playVideo(videoId) {
    const videoPath = videoSources[videoId];
    
    if (videoPath) {
        videoPlayer.src = videoPath;
        modal.style.display = 'block';
        videoPlayer.play();
    } else {
        alert('Video not found!');
    }
}

// Close modal when clicking X
closeBtn.onclick = function() {
    closeVideo();
}

// Close modal when clicking outside the video
window.onclick = function(event) {
    if (event.target == modal) {
        closeVideo();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeVideo();
    }
});

// Function to close video and stop playback
function closeVideo() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoPlayer.src = '';
    modal.style.display = 'none';
}