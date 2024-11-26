import React, { useState } from "react";
import ReactD3Tree from "react-d3-tree";

const TreeVisualizer = ({ tree }) => {
  // Estado para mostrar todo el árbol
  const [showLeavesOnly, setShowLeavesOnly] = useState(false);
  if (!tree) return null;

  // Función para estructurar el árbol según los nodos de Huffman
  const renderTree = (node) => {
    if (!node) return null;

    return {
      name: node.weight.toString(), // Representa el peso del nodo
      children: [
        node.left ? renderTree(node.left) : null,
        node.right ? renderTree(node.right) : null,
      ].filter(Boolean),
    };
  };

  const data = renderTree(tree);


  return (
    <div className="w-full">
      <div className="max-w-full sm:px-20 h-[320px] ">
        <div className=" flex justify-center mt-5">
          <button
            onClick={() => setShowLeavesOnly(!showLeavesOnly)}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            {showLeavesOnly ? "Mostrar todo el árbol" : "Mostrar solo hojas"}
          </button>
        </div>
        <ReactD3Tree
          data={data}
          orientation="vertical" // Cambia la orientación a vertical
          nodeSize={{ x: 80, y: 50 }} // Ajusta el tamaño de los nodos
          renderCustomNodeElement={({ nodeDatum }) => {
            // Solo mostrar nodos si no es una hoja y si se ha activado el estado 'showLeavesOnly'
            if (showLeavesOnly) {
              if (
                Array.isArray(nodeDatum.children) &&
                nodeDatum.children.length === 0
              ) {
                return (
                  <g>
                    <circle r="20" fill="lightblue" />
                    <text
                      fill="black"
                      fontSize="18"
                      fontFamily="Arial"
                      dy="6"
                      textAnchor="middle"
                    >
                      {nodeDatum.name}
                    </text>
                  </g>
                );
              } else {
                return null;
              }
            } else {
              return (
                <g>
                  <circle r="20" fill="lightblue" />
                  <text
                    fill="black"
                    fontSize="18"
                    fontFamily="Arial"
                    dy="6"
                    textAnchor="middle"
                  >
                    {nodeDatum.name}
                  </text>
                </g>
              );
            }
          }}
          styles={{
            links: { stroke: "black", strokeWidth: 2 }, // Estilo de las líneas de conexión
            nodes: {
              node: { stroke: "black", strokeWidth: 2 },
              name: { fontSize: "20px" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TreeVisualizer;
