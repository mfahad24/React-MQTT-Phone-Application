const MAX_SIGNAL_STRENGTH = 5;

class SignalStrength {
  constructor() {
    this.interval = -1;
  }

  start(interval, callback) {
    this.stop();
    this.interval = setInterval(() => {
      callback(this._getRandomStrength());
    }, interval);
  }

  stop() {
    if (this.interval !== -1) {
      clearInterval(this.interval);
      this.interval = -1;
    }
  }

  _getRandomStrength() {
    return Math.round(Math.random() * MAX_SIGNAL_STRENGTH);
  }
}

module.exports = SignalStrength;
