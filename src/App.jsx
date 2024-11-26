import React, { useState } from "react";
import ProcessSteps from "./components/ProcessSteps";
import TreeVisualizer from "./components/TreeVisualizer";
import { huffmanTreeWithProcess } from "./utils/huffman";

const App = () => {
  const [weights, setWeights] = useState("");
  const [treeData, setTreeData] = useState(null);

  const handleGenerateTree = () => {
    const weightsArray = weights.split(",").map((w) => parseInt(w.trim(), 10));
    const { tree, steps, weightedSum } = huffmanTreeWithProcess(weightsArray);
    setTreeData({ tree, steps, weightedSum });
  };

  return (
    <>
      <div className=" flex flex-wrap items-start justify-start sm:justify-center w-screen  p-5 sm:p-10 ">
        <div>
          <div style={{ flex: 1 }}>
            <h1 className=" text-4xl sm:text-5xl font-bold">
              Árbol de Huffman
            </h1>
            <input
              type="text"
              placeholder="Ingresa pesos separados por comas (e.g., 2,3,4,5)"
              value={weights}
              onChange={(e) => setWeights(e.target.value)}
              className=" w-full p-2 my-2 border border-gray-300 rounded"
            />
            <div className=" flex justify-center">
              <button
                onClick={handleGenerateTree}
                className="px-4  py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Generar Árbol
              </button>
            </div>
          </div>
          <div>
            {treeData && (
              <div>
                <ProcessSteps steps={treeData.steps} />
                <h3 className=' mt-5 text-2xl font-semibold'>Peso Total del Árbol: </h3>
                <strong className=" font-normal">
                  W(T) = ∑<sub>i=1</sub>
                  <sup>t</sup> w<sub>i</sub> l<sub>i</sub> ={" "}
                  {treeData.weightedSum}
                </strong>
                <h2 className="text-2xl mt-5  font-semibold">
                  Árbol Binario Óptimo
                </h2>
              </div>
            )}
          </div>
        </div>
        {treeData && (
          <>
            <TreeVisualizer tree={treeData.tree} />
          </>
        )}
      </div>
      <footer className="bg-gray-800 text-white text-center p-1 fixed bottom-0 w-full">
        <p>
          Creado por{" "}
          <a
            href="https://github.com/duvan29"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Duvan Serrano
          </a>
        </p>
      </footer>
    </>
  );
};

export default App;
