import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from "util";

// Polyfill para Jest + jsdom
(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;
