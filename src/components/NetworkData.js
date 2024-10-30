export class NetworkData {
  constructor() {
    this.layers = [
      { id: 'input', neurons: 4, label: 'Input Layer' },
      { id: 'hidden1', neurons: 6, label: 'Hidden Layer 1' },
      { id: 'hidden2', neurons: 8, label: 'Hidden Layer 2' },
      { id: 'output', neurons: 2, label: 'Output Layer' }
    ];
    
    this.connections = this.generateConnections();
  }

  generateConnections() {
    const connections = [];
    for (let i = 0; i < this.layers.length - 1; i++) {
      const currentLayer = this.layers[i];
      const nextLayer = this.layers[i + 1];
      
      for (let j = 0; j < currentLayer.neurons; j++) {
        for (let k = 0; k < nextLayer.neurons; k++) {
          connections.push({
            source: { layer: i, index: j },
            target: { layer: i + 1, index: k },
            weight: Math.random()
          });
        }
      }
    }
    return connections;
  }

  updateWeights() {
    this.connections.forEach(conn => {
      conn.weight = Math.random();
    });
  }
}