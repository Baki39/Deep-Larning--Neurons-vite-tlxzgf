import * as tf from '@tensorflow/tfjs';

export class DeepLearningNetwork {
  constructor() {
    this.model = null;
    this.inputLayer = null;
    this.hiddenLayers = [];
    this.outputLayer = null;
    this.isTraining = false;
    this.metrics = {
      accuracy: 0,
      loss: 0,
      iterations: 0,
      time: 0
    };
  }

  async initialize(config = {
    inputSize: 4,
    hiddenLayers: [21],
    outputSize: 1
  }) {
    this.model = tf.sequential();
    
    // Input layer
    this.model.add(tf.layers.dense({
      units: config.hiddenLayers[0],
      inputShape: [config.inputSize],
      activation: 'relu'
    }));

    // Hidden layers
    for (let i = 1; i < config.hiddenLayers.length; i++) {
      this.model.add(tf.layers.dense({
        units: config.hiddenLayers[i],
        activation: 'relu'
      }));
    }

    // Output layer
    this.model.add(tf.layers.dense({
      units: config.outputSize,
      activation: 'sigmoid'
    }));

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });

    return this.model;
  }

  async processInput(inputData) {
    const tensor = tf.tensor2d([inputData]);
    const prediction = await this.model.predict(tensor).data();
    tensor.dispose();
    return prediction;
  }

  async train(trainingData, labels, epochs = 50) {
    this.isTraining = true;
    const startTime = performance.now();

    const xs = tf.tensor2d(trainingData);
    const ys = tf.tensor2d(labels);

    try {
      const history = await this.model.fit(xs, ys, {
        epochs,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            this.metrics.accuracy = logs.acc * 100;
            this.metrics.loss = logs.loss;
            this.metrics.iterations = epoch + 1;
            this.metrics.time = (performance.now() - startTime) / 1000;
          }
        }
      });

      this.isTraining = false;
      xs.dispose();
      ys.dispose();
      
      return history;
    } catch (error) {
      console.error('Training error:', error);
      this.isTraining = false;
      xs.dispose();
      ys.dispose();
      throw error;
    }
  }

  getLayerInfo() {
    return {
      inputLayer: this.model.layers[0].getConfig(),
      hiddenLayers: this.model.layers.slice(1, -1).map(layer => layer.getConfig()),
      outputLayer: this.model.layers[this.model.layers.length - 1].getConfig()
    };
  }

  async predict(input) {
    const tensor = tf.tensor2d([input]);
    const prediction = await this.model.predict(tensor).data();
    tensor.dispose();
    return prediction;
  }
}

export const networkInstance = new DeepLearningNetwork();