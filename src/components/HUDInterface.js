import Chart from 'chart.js/auto';

export class HUDInterface {
  constructor() {
    this.inputChart = null;
    this.outputChart = null;
  }

  initializeCharts() {
    Chart.defaults.color = '#e0ffff';
    Chart.defaults.borderColor = '#004547';
    
    const inputCtx = document.getElementById('inputChart');
    const outputCtx = document.getElementById('outputChart');

    this.inputChart = new Chart(inputCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Input Signal',
          data: [],
          borderColor: '#00f7ff',
          backgroundColor: 'rgba(0, 247, 255, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#00f7ff',
          pointBorderColor: '#00f7ff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00f7ff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: this.getChartOptions('Input Signal Analysis')
    });

    this.outputChart = new Chart(outputCtx, {
      type: 'bar',
      data: {
        labels: ['Output 1', 'Output 2'],
        datasets: [{
          label: 'Network Output',
          data: [0, 0],
          backgroundColor: 'rgba(0, 247, 255, 0.5)',
          borderColor: '#00f7ff',
          borderWidth: 2,
          borderRadius: 5,
          hoverBackgroundColor: '#00f7ff'
        }]
      },
      options: this.getChartOptions('Network Output Analysis')
    });
  }

  getChartOptions(title) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: title,
          color: '#e0ffff',
          font: {
            family: 'Orbitron',
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 247, 255, 0.1)',
            lineWidth: 1
          },
          ticks: {
            color: '#e0ffff',
            font: {
              family: 'Orbitron'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 247, 255, 0.1)',
            lineWidth: 1
          },
          ticks: {
            color: '#e0ffff',
            font: {
              family: 'Orbitron'
            }
          }
        }
      }
    };
  }

  updateMetrics(metrics) {
    const elements = {
      accuracy: document.getElementById('accuracyMetric'),
      loss: document.getElementById('lossMetric'),
      iterations: document.getElementById('iterationsMetric'),
      time: document.getElementById('timeMetric')
    };

    const animations = {
      accuracy: this.animateValue(elements.accuracy, metrics.accuracy, '%'),
      loss: this.animateValue(elements.loss, metrics.loss, '', 3),
      iterations: this.animateValue(elements.iterations, metrics.iterations),
      time: this.animateValue(elements.time, parseFloat(metrics.time), 's', 1)
    };

    Object.values(animations).forEach(animation => animation.start());
  }

  animateValue(element, endValue, suffix = '', decimals = 1) {
    const startValue = parseFloat(element.textContent) || 0;
    const duration = 1000;
    const steps = 60;
    const step = (endValue - startValue) / steps;
    let currentStep = 0;

    return {
      start() {
        const interval = setInterval(() => {
          currentStep++;
          const currentValue = startValue + (step * currentStep);
          element.textContent = currentValue.toFixed(decimals) + suffix;

          if (currentStep >= steps) {
            clearInterval(interval);
            element.textContent = endValue.toFixed(decimals) + suffix;
          }
        }, duration / steps);
      }
    };
  }

  updateCharts(inputData) {
    // Update input chart with animation
    this.inputChart.data.labels = inputData.map((_, i) => `T${i}`);
    this.inputChart.data.datasets[0].data = inputData;
    this.inputChart.update('active');

    // Update output chart with animation
    const outputData = [
      Math.random(),
      Math.random()
    ];
    
    this.outputChart.data.datasets[0].data = outputData;
    this.outputChart.update('active');
  }

  updateStatus(status) {
    const metrics = document.querySelector('.metrics-panel');
    metrics.className = `metrics-panel ${status}`;
  }
}