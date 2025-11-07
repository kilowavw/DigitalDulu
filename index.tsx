import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fix: Augment the JSX.IntrinsicElements interface to include the 'ion-icon' custom element.
// The previous declaration was overwriting the interface, causing TypeScript to not recognize
// standard HTML tags and leading to widespread JSX-related type errors.
// This declaration merging syntax correctly adds 'ion-icon' without removing existing elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name: string;
      };
    }
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);