import React from 'react';

const ProcessSteps = ({ steps }) => (
  <div > 
    <h3 className=' mt-5 text-2xl font-semibold'>Pasos del Proceso</h3>
    <ul>
      {steps.map((step, idx) => (
        <li key={idx}>
          Paso {idx + 1}: Combinar {step.leftWeight} y {step.rightWeight} →{' '}
          {step.combinedWeight}. Restantes: {step.remaining.join(', ')}.
        </li>
      ))}
    </ul>
  </div>
);

export default ProcessSteps;
