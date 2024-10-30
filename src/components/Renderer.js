import * as d3 from 'd3';

export class NetworkRenderer {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.width = 1200;
    this.height = 800;
    this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
    this.init();
  }

  init() {
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'neural-network');

    this.g = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Initialize gradients
    this.defineGradients();
  }

  defineGradients() {
    const defs = this.svg.append('defs');
    
    const gradient = defs.append('linearGradient')
      .attr('id', 'neuron-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('style', 'stop-color:#4fc3f7;stop-opacity:1');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('style', 'stop-color:#0288d1;stop-opacity:1');
  }

  render() {
    if (!this.data || !this.data.layers) return;

    const layerSpacing = (this.width - this.margin.left - this.margin.right) / 
                        (this.data.layers.length - 1);
    const maxNeurons = Math.max(...this.data.layers.map(l => l.neurons));
    const neuronSpacing = (this.height - this.margin.top - this.margin.bottom) / 
                         (maxNeurons - 1);

    this.renderConnections(layerSpacing, neuronSpacing);
    this.renderNeurons(layerSpacing, neuronSpacing);
    this.addLayerLabels(layerSpacing);
    this.addHUDElements();
  }

  renderNeurons(layerSpacing, neuronSpacing) {
    this.data.layers.forEach((layer, layerIndex) => {
      const neurons = d3.range(layer.neurons);
      const x = layerIndex * layerSpacing;

      this.g.selectAll(`.neuron-${layerIndex}`)
        .data(neurons)
        .join('circle')
        .attr('class', `neuron-${layerIndex}`)
        .attr('cx', x)
        .attr('cy', i => i * neuronSpacing)
        .attr('r', 15)
        .attr('fill', 'url(#neuron-gradient)')
        .attr('stroke', '#0288d1')
        .attr('stroke-width', 2);
    });
  }

  renderConnections(layerSpacing, neuronSpacing) {
    const connections = this.data.connections;
    
    this.g.selectAll('.connection')
      .data(connections)
      .join('line')
      .attr('class', 'connection')
      .attr('x1', d => d.source.layer * layerSpacing)
      .attr('y1', d => d.source.index * neuronSpacing)
      .attr('x2', d => d.target.layer * layerSpacing)
      .attr('y2', d => d.target.index * neuronSpacing)
      .attr('stroke', '#80deea')
      .attr('stroke-width', d => d.weight * 2)
      .attr('opacity', 0.6);
  }

  addLayerLabels(layerSpacing) {
    this.g.selectAll('.layer-label')
      .data(this.data.layers)
      .join('text')
      .attr('class', 'layer-label')
      .attr('x', (d, i) => i * layerSpacing)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e0f7fa')
      .text(d => d.label);
  }

  addHUDElements() {
    // Add metrics display
    const metrics = this.svg.append('g')
      .attr('class', 'hud-metrics')
      .attr('transform', `translate(${this.width - 200}, 20)`);

    metrics.append('rect')
      .attr('width', 180)
      .attr('height', 100)
      .attr('fill', 'rgba(0, 150, 200, 0.1)')
      .attr('stroke', '#00bcd4')
      .attr('rx', 5);

    metrics.append('text')
      .attr('x', 10)
      .attr('y', 30)
      .attr('fill', '#e0f7fa')
      .text('Network Status: Active');

    // Add processing indicators
    const indicators = this.svg.append('g')
      .attr('class', 'hud-indicators')
      .attr('transform', `translate(20, 20)`);

    indicators.append('circle')
      .attr('r', 8)
      .attr('fill', '#00ff00')
      .attr('class', 'status-indicator');
  }

  update() {
    this.data.updateWeights();
    this.render();
  }
}