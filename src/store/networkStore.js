import { create } from 'zustand';

const useNetworkStore = create((set) => ({
  neurons: 21,
  layerDepth: 3,
  metrics: {
    accuracy: 0.95,
    loss: 0.05,
    epochs: 100,
    learningRate: 0.001
  },
  setNeurons: (count) => set({ neurons: count }),
  setLayerDepth: (depth) => set({ layerDepth: depth }),
  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics }
  }))
}));

export default useNetworkStore;