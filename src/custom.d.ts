// src/custom.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define your custom property here
    }
  }
}
