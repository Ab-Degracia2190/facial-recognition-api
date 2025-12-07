import express from 'express'
import multer from 'multer'
import { EmployeesController } from '@aldrin-degracia/facial-recognition-backend'
import type { Request, Response } from 'express'

const router = express.Router()
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10 // Max 10 files
  }
})
const employeesController = new EmployeesController()

// Registration route -> backend register handler
// Accepts both single 'image' and multiple 'images' uploads
router.post('/employees/register', upload.any(), async (req: Request, res: Response) => {
  try {
    await employeesController.register(req as any, res as any)
  } catch (err) {
    console.error('Route error (register)', err)
    res.status(500).json({ message: 'Internal server error', error: String(err) })
  }
})

// Scanning/recognize route -> backend recognize handler
// Single image upload
router.post('/employees/recognize', upload.single('image'), async (req: Request, res: Response) => {
  try {
    await employeesController.recognize(req as any, res as any)
  } catch (err) {
    console.error('Route error (recognize)', err)
    res.status(500).json({ message: 'Internal server error', error: String(err) })
  }
})

export default router