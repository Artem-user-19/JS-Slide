class Carousel {
    constructor (params) {
  
      const settings = {...{interval: 5000, containerID: '#carousel', slideID: '.slide', isPlaying: true}, ...params};
  
      this.container = document.querySelector(settings.containerID);
      this.slideItems = this.container.querySelectorAll(settings.slideID);
      this.isPlaying = settings.isPlaying;
      this.interval = settings.interval;
  
      this.slidesContainer = document.querySelector('#slides');
    }
  
    _initProps () {
      this.SLIDES_COUNT = this.slideItems.length;
      this.CODE_LEFT_ARROW = 'ArrowLeft';
      this.CODE_RIGHT_ARROW = 'ArrowRight';
      this.CODE_SPACE = 'Space';
      this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
      this.FA_PLAY = '<i class="far fa-play-circle"></i>';
      this.FA_PREV = '<i class="fas fa-angle-left"></i>';
      this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  
      this.currentSlide = 0;
    }
  
    _initControls () {
      const controls = document.createElement('div');
      const PAUSE = `<span id="pause-btn" class="control pause-play">${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}</span>`;
      const PREV = `<span id="prev-btn" class="control prev">${this.FA_PREV}</span>`;
      const NEXT = `<span id="next-btn" class="control next">${this.FA_NEXT}</span>`;
  
      controls.setAttribute('class', 'controls');
      controls.innerHTML = PAUSE + PREV + NEXT;
      this.slidesContainer.append(controls);
  
      this.pauseBtn = this.container.querySelector('#pause-btn');
      this.prevBtn = this.container.querySelector('#prev-btn');
      this.nextBtn = this.container.querySelector('#next-btn');
    }
  
    _initIndicators () {
      const indicators = document.createElement('div');
  
      indicators.setAttribute('class', 'indicators');
  
      for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
        const indicator = document.createElement('div');
  
        indicator.setAttribute('class', 'indicator');
        indicator.dataset.slideTo = `${i}`;
        i === 0 && indicator.classList.add('active');
  
        indicators.appendChild(indicator);
      };
  
      this.slidesContainer.appendChild(indicators);
  
      this.indContainer = this.container.querySelector('.indicators');
      this.indItems = this.container.querySelectorAll('.indicator');
    }
  
    _initListeners () {
      document.addEventListener('keydown', this._pressKey.bind(this));
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.indContainer.addEventListener('click', this._indicate.bind(this));
    }
  
    _goToNth(n) {
      this.slideItems[this.currentSlide].classList.toggle('active');
      this.indItems[this.currentSlide].classList.toggle('active');
      this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
      this.slideItems[this.currentSlide].classList.toggle('active');
      this.indItems[this.currentSlide].classList.toggle('active');
    }
  
    _goToPrev () {
      this._goToNth(this.currentSlide - 1)
    }
  
    _goToNext () {
      this._goToNth(this.currentSlide + 1)
    }
  
    _pause () {
      if (this.isPlaying) {
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = false;
        clearInterval(this.timerID);
      }
    }
  
    _play () {
      if (!this.isPlaying) {
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
        this.timerID = setInterval(() => this._goToNext(), this.interval);
      }
    }
  
    _indicate (e) {
      const target = e.target
  
      if (target && target.classList.contains('indicator')) {
        this._pause();
        this._goToNth(+target.dataset.slideTo);
      }
    }
  
    _pressKey (e) {
      if (e.code === this.CODE_LEFT_ARROW) this.prev();
      if (e.code === this.CODE_RIGHT_ARROW) this.next();
      if (e.code === this.CODE_SPACE) this.pausePlay();
    }
  
    pausePlay () {
      this.isPlaying ? this._pause() : this._play();
    }
  
    next() {
      this._pause();
      this._goToNext();
    }
  
    prev() {
      this._pause();
      this._goToPrev();
    }
  
    init () {
      this._initProps();
      this._initControls();
      this._initIndicators();
      this._initListeners();
      if (this.isPlaying) this.timerID = setInterval(() => this._goToNext(), this.interval);
    }
  }
  
  export default Carousel;