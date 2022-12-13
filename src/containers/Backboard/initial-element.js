/* import React from 'react';
import { MarkerType, Position } from 'reactflow'; */
import { v4 as uuidv4 } from 'uuid';
export const nodes = [
  {
    id: "start&"+uuidv4(),
    type: 'start',
    position: { x: 250, y: 25 },
  },
  {
    id: "gaussian&"+uuidv4(),
    type: 'gaussian',
    position: { x: 450, y: 35 },
    data: {
      label: 'Gaussian',
      kernelX: 7,
      kernelY: 7,
      sigmaX: 0,
      sigmaY: 0,
    },
  },
  {
    id: "addImage&1",
    type: 'addImage',
    position: { x: 350, y: 100 },
  },
  {
    id: "erode&"+uuidv4(),
    type: 'erode',
    position: { x: 650, y: 35 },
    data: {
      label: 'Erode',
      kernelX: 10,
      kernelY: 10,
      anchorX: -1,
      anchorY: -1,
      iterations: 1,
    },
  },
  {
    id: "erode&"+uuidv4(),
    type: 'erode',
    position: { x: 750, y: 35 },
    data: {
      label: 'Erode',
      kernelX: 3,
      kernelY: 3,
      anchorX: -1,
      anchorY: -1,
      iterations: 1,
      customKernel: [1,0,1,0,1,0,1,0,1]
    },
  },
];

export const edges = [
  {
    id: uuidv4(),
    source: nodes[0].id,
    target: nodes[2].id,
    type: 'edgebutton',
  },
  {
    id: uuidv4(),
    source: nodes[2].id,
    target: nodes[1].id,
    type: 'edgebutton',
  },
  {
    id: uuidv4(),
    source: nodes[1].id,
    target: nodes[3].id,
    type: 'edgebutton',
  },
  {
    id: uuidv4(),
    source: nodes[3].id,
    target: nodes[4].id,
    type: 'edgebutton',
  },

];
