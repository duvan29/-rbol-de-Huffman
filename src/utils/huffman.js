// utils/huffman.js

// Calcular el peso total W(T) = Σ(w_i * l_i)
export function calculateTreeWeight(tree, level = 0) {
    if (!tree) return 0;
  
    if (!tree.left && !tree.right) {
      return tree.weight * level; // Nodo hoja
    }
  
    // Recursivamente calcular peso para hijos izquierdo y derecho
    return (
      calculateTreeWeight(tree.left, level + 1) +
      calculateTreeWeight(tree.right, level + 1)
    );
  }
  
  // Generar el árbol de Huffman y pasos
  export function huffmanTreeWithProcess(weights) {
    const steps = [];
    const nodes = weights.map((weight, idx) => ({
      id: `node-${idx}`,
      weight,
      left: null,
      right: null,
    }));
  
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.weight - b.weight);
      const left = nodes.shift();
      const right = nodes.shift();
      const combinedWeight = left.weight + right.weight;
  
      const parent = {
        id: `node-${nodes.length + weights.length}`,
        weight: combinedWeight,
        left,
        right,
      };
  
      nodes.push(parent);
  
      steps.push({
        combinedWeight,
        leftWeight: left.weight,
        rightWeight: right.weight,
        remaining: nodes.map((node) => node.weight),
      });
    }
  
    const tree = nodes[0];
    const weightedSum = calculateTreeWeight(tree);
  
    return { tree, steps, weightedSum };
  }
  