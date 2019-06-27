export default class Timer {
  private _timer?: number;
  private _remaining: number = 0;

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties
    private readonly _duration: number,
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties
    private readonly _onEnd: () => void,
    // eslint-disable-next-line @typescript-eslint/no-parameter-properties
    private readonly _onProgress?: (progressValue: number) => void,
  ) {
    this._remaining = _duration;
    this.resume();
  }

  pause = (): void => {
    window.clearTimeout(this._timer);
  };

  resume = (): void => {
    window.clearTimeout(this._timer);
    this._timer = window.setInterval(this.handleProgress, this._duration / 10);
  };

  end = (): void => {
    window.clearTimeout(this._timer);
    this._timer = undefined;
    this._remaining = 0;
  };

  handleProgress = (): void => {
    this._remaining = this._remaining - this._duration / 10;

    if (this._onProgress) {
      this._onProgress((this._remaining / this._duration) * 100);
    }

    if (this._remaining <= 0) {
      this._onEnd();
      this.end();
    }
  };
}
