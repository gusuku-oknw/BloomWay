import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { ThemeProvider, StyleReset } from 'atomize';

const engine = new Styletron();

const theme = {
    colors: {
        primary: 'tomato',
        accent: 'yellow',
        brand100: "#F9F8FC",
        brand200: "#F3F1FA",
        brand300: "#E9E6F6",
        brand400: "#D2CCEC",
        brand500: "#BCB3E2",
        brand600: "#9C8FD6",
        brand700: "#6F5CC3",
        brand800: "#553EB5",
        brand900: "#382683",
    },
    // Add more customizations here
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <ThemeProvider theme={theme}>
                <StyleReset />
                <App />
            </ThemeProvider>
        </StyletronProvider>
    </React.StrictMode>
);

reportWebVitals();
