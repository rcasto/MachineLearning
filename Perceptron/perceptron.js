function Perceptron() {
    this.weights = null;
    this.bias = 0;
}

Perceptron.prototype.train = function (features, label) {
    if (!this.weights) {
        this.weights = features;
        this.bias = 1;
    }
    var guess = this.predict(features);
    // incorrect guess, update weights
    if (guess !== label) {
        var gradient = label - guess;
        this.weights = this.weights.map(function (weight, i) {
            return weight + gradient * features[i];
        });
        this.bias += gradient;
    }
    return this;
};

Perceptron.prototype.predict = function (features) {
    if (!this.weights) { return; }
    var score = 0;
    this.weights.forEach(function (weight, i) {
        score += weight * features[i];
    });
    score += this.bias;
    return score > 0 ? 1 : -1;
};