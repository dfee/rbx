export default class Timer {
  private timer?: number;
  private remaining: number = 0;

  constructor(
    private duration: number,
    private onEnd: () => void,
    private onProgress?: (progressValue: number) => void,
  ) {
    this.remaining = duration;
    this.resume();
  }

  pause = () => {
    window.clearTimeout(this.timer);
  };

  resume = () => {
    window.clearTimeout(this.timer);
    this.timer = window.setInterval(this.handleProgress, this.duration / 10);
  };

  end = () => {
    window.clearTimeout(this.timer);
    this.timer = undefined;
    this.remaining = 0;
  };

  handleProgress = () => {
    this.remaining = this.remaining - this.duration / 10;

    if (this.onProgress) {
      this.onProgress((this.remaining / this.duration) * 100);
    }

    if (this.remaining <= 0) {
      this.onEnd();
      return this.end();
    }
  };
}
