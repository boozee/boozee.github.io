/**
 * Music Player with YouTube Integration
 */
class MusicPlayer {
  constructor() {
    this.playlist = [];
    this.currentTrackIndex = -1;
    this.player = null;
    this.isPlayerReady = false;
    this.isVisible = true; // Always visible now
    this.isExpanded = false;
    
    this.initializeElements();
    this.loadPlaylistData();
    this.shufflePlaylist(); // Shuffle on each session
    this.bindEvents();
    this.loadYouTubeAPI();
    this.showPlayer(); // Show player immediately
  }
  
  initializeElements() {
    this.playerElement = document.getElementById('music-player');
    this.playerBar = document.getElementById('music-player-bar');
    this.playlistElement = document.getElementById('music-player-playlist');
    this.toggleBtn = document.getElementById('music-toggle');
    this.expandBtn = document.getElementById('expand-btn');
    this.collapseBtn = document.getElementById('collapse-btn');
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.playIcon = document.getElementById('play-icon');
    this.pauseIcon = document.getElementById('pause-icon');
    this.loadingIcon = document.getElementById('loading-icon');
    this.currentTitle = document.getElementById('current-track-title');
    this.currentArtist = document.getElementById('current-track-artist');
  }
  
  loadPlaylistData() {
    const dataElement = document.getElementById('music-playlist-data');
    if (dataElement) {
      try {
        this.playlist = JSON.parse(dataElement.textContent);
        // Keep a copy of the original order for reference
        this.originalPlaylist = [...this.playlist];
      } catch (e) {
        console.error('Failed to load playlist data:', e);
        this.playlist = [];
        this.originalPlaylist = [];
      }
    }
  }
  
  getOriginalTrackData(originalIndex) {
    return this.originalPlaylist[originalIndex];
  }
  
  shufflePlaylist() {
    // Fisher-Yates shuffle algorithm
    for (let i = this.playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
    }
  }
  
  showPlayer() {
    // Make player visible immediately
    if (this.playerElement) {
      this.playerElement.classList.add('visible');
      document.body.classList.add('music-player-visible');
    }
  }
  
  bindEvents() {
    // Toggle player visibility
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.togglePlayer());
    }
    
    // Expand/collapse playlist - make expand button toggle
    if (this.expandBtn) {
      this.expandBtn.addEventListener('click', () => this.togglePlaylist());
    }
    
    if (this.collapseBtn) {
      this.collapseBtn.addEventListener('click', () => this.collapsePlaylist());
    }
    
    // Player controls
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    }
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousTrack());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextTrack());
    }
    
    // Track selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.music-track')) {
        const trackElement = e.target.closest('.music-track');
        const originalIndex = parseInt(trackElement.dataset.index);
        
        // Find the track in our shuffled playlist by matching the original data
        const originalTrackData = this.getOriginalTrackData(originalIndex);
        const shuffledIndex = this.playlist.findIndex(track => 
          track.title === originalTrackData.title && 
          track.artist === originalTrackData.artist
        );
        
        if (shuffledIndex !== -1) {
          this.playTrack(shuffledIndex);
        }
      }
    });
    
    // Click outside to close playlist
    document.addEventListener('click', (e) => {
      if (this.isVisible && this.isExpanded) {
        // Check if click is outside the music player
        if (!e.target.closest('#music-player') && !e.target.closest('#music-toggle')) {
          this.collapsePlaylist();
        }
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.code) {
        case 'Space':
          if (this.isVisible) {
            e.preventDefault();
            this.togglePlayPause();
          }
          break;
        case 'ArrowLeft':
          if (this.isVisible) {
            e.preventDefault();
            this.previousTrack();
          }
          break;
        case 'ArrowRight':
          if (this.isVisible) {
            e.preventDefault();
            this.nextTrack();
          }
          break;
        case 'Escape':
          if (this.isVisible && this.isExpanded) {
            e.preventDefault();
            this.collapsePlaylist();
          }
          break;
      }
    });
  }
  
  loadYouTubeAPI() {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      // Set global callback
      window.onYouTubeIframeAPIReady = () => this.onYouTubeAPIReady();
    } else {
      this.onYouTubeAPIReady();
    }
  }
  
  onYouTubeAPIReady() {
    this.player = new YT.Player('youtube-player', {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: () => this.onPlayerReady(),
        onStateChange: (event) => this.onPlayerStateChange(event),
        onError: (event) => this.onPlayerError(event)
      }
    });
  }
  
  onPlayerReady() {
    this.isPlayerReady = true;
    console.log('Music player ready');
  }
  
  onPlayerStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        this.hideLoadingState();
        this.updatePlayPauseButton(true);
        break;
      case YT.PlayerState.PAUSED:
      case YT.PlayerState.ENDED:
        this.hideLoadingState();
        this.updatePlayPauseButton(false);
        break;
      case YT.PlayerState.BUFFERING:
        this.showLoadingState();
        break;
    }
  }
  
  onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    // Skip to next track on error
    setTimeout(() => {
      this.nextTrack();
    }, 1000);
  }
  
  togglePlayer() {
    this.isVisible = !this.isVisible;
    
    if (this.isVisible) {
      this.playerElement.classList.add('visible');
      document.body.classList.add('music-player-visible');
      if (this.toggleBtn) {
        this.toggleBtn.classList.add('active');
      }
    } else {
      this.playerElement.classList.remove('visible');
      document.body.classList.remove('music-player-visible');
      this.collapsePlaylist();
      if (this.toggleBtn) {
        this.toggleBtn.classList.remove('active');
      }
    }
  }
  
  togglePlaylist() {
    if (this.isExpanded) {
      this.collapsePlaylist();
    } else {
      this.expandPlaylist();
    }
  }
  
  expandPlaylist() {
    this.isExpanded = true;
    this.playlistElement.classList.add('expanded');
    this.playerElement.classList.add('expanded'); // Add expanded class to parent
  }
  
  collapsePlaylist() {
    this.isExpanded = false;
    this.playlistElement.classList.remove('expanded');
    this.playerElement.classList.remove('expanded'); // Remove expanded class from parent
  }
  
  playTrack(index) {
    if (!this.isPlayerReady || index < 0 || index >= this.playlist.length) {
      return;
    }
    
    const track = this.playlist[index];
    this.currentTrackIndex = index;
    
    // Show loading state
    this.showLoadingState();
    
    // Update UI
    this.updateCurrentTrackDisplay(track);
    this.updateTrackSelection();
    
    // Load and play video
    try {
      this.player.loadVideoById(track.youtubeId);
    } catch (error) {
      console.error('Error loading track:', error);
      this.hideLoadingState();
      this.nextTrack();
    }
  }
  
  togglePlayPause() {
    if (!this.isPlayerReady || this.currentTrackIndex === -1) {
      // If no track selected, play first track
      if (this.playlist.length > 0) {
        this.playTrack(0);
      }
      return;
    }
    
    const state = this.player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  }
  
  previousTrack() {
    if (this.playlist.length === 0) return;
    
    let newIndex = this.currentTrackIndex - 1;
    if (newIndex < 0) {
      newIndex = this.playlist.length - 1;
    }
    this.playTrack(newIndex);
  }
  
  nextTrack() {
    if (this.playlist.length === 0) return;
    
    let newIndex = this.currentTrackIndex + 1;
    if (newIndex >= this.playlist.length) {
      newIndex = 0;
    }
    this.playTrack(newIndex);
  }
  
  updateCurrentTrackDisplay(track) {
    if (this.currentTitle) {
      this.currentTitle.textContent = track.title;
      this.currentTitle.title = track.title; // Add tooltip
    }
    if (this.currentArtist) {
      this.currentArtist.textContent = track.artist;
      this.currentArtist.title = track.artist; // Add tooltip
    }

    // Adjust vertical alignment if no artist is present
    const musicPlayerTrack = document.querySelector('.music-player-track');
    if (musicPlayerTrack) {
      if (track.artist && track.artist.trim() !== '') {
        musicPlayerTrack.classList.remove('no-artist');
      } else {
        musicPlayerTrack.classList.add('no-artist');
      }
    }
  }
  
  updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
      this.playIcon.style.display = 'none';
      this.pauseIcon.style.display = 'block';
      this.loadingIcon.style.display = 'none';
    } else {
      this.playIcon.style.display = 'block';
      this.pauseIcon.style.display = 'none';
      this.loadingIcon.style.display = 'none';
    }
  }
  
  showLoadingState() {
    this.playIcon.style.display = 'none';
    this.pauseIcon.style.display = 'none';
    this.loadingIcon.style.display = 'block';
    this.playPauseBtn.disabled = true;
  }
  
  hideLoadingState() {
    this.loadingIcon.style.display = 'none';
    this.playPauseBtn.disabled = false;
  }
  
  updateTrackSelection() {
    // Remove previous selection
    document.querySelectorAll('.music-track').forEach(track => {
      track.classList.remove('playing');
    });
    
    // Find the HTML element that corresponds to the currently playing track
    if (this.currentTrackIndex >= 0 && this.currentTrackIndex < this.playlist.length) {
      const currentTrack = this.playlist[this.currentTrackIndex];
      
      // Find the HTML element by matching title and artist
      const trackElements = document.querySelectorAll('.music-track');
      trackElements.forEach(element => {
        const titleElement = element.querySelector('.music-track-title');
        const artistElement = element.querySelector('.music-track-artist');
        
        if (titleElement && artistElement &&
            titleElement.textContent === currentTrack.title &&
            artistElement.textContent === currentTrack.artist) {
          element.classList.add('playing');
        }
      });
    }
  }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.musicPlayer = new MusicPlayer();
});
