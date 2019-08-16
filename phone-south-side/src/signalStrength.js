const MAX_SIGNAL_STRENGTH = 5;

class SignalStrength {
  constructor() {
    this.interval = -1;
  }

  start(interval, callback) {
    callback(this._getRandomStrength());
    this.interval = setInterval(() => {
      callback(this._getRandomStrength());
    }, interval);
  }

  stop() {
    if (this.interval !== -1) {
      clearInterval(this.interval);
    }
  }

  _getRandomStrength() {
    return Math.round(Math.random() * MAX_SIGNAL_STRENGTH);
  }
}

module.exports = SignalStrength;
