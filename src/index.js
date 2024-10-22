import React from 'react';
import { createRoot } from 'react-dom/client';
import Homepage from './Homepage'; // changed to open homepage on initial load

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<Homepage />); // changed to open homepage on initial load