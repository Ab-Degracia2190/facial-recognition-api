"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const facial_recognition_backend_1 = require("@aldrin-degracia/facial-recognition-backend");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB per file
        files: 10 // Max 10 files
    }
});
const employeesController = new facial_recognition_backend_1.EmployeesController();
// Registration route -> backend register handler
// Accepts both single 'image' and multiple 'images' uploads
router.post('/employees/register', upload.any(), async (req, res) => {
    try {
        await employeesController.register(req, res);
    }
    catch (err) {
        console.error('Route error (register)', err);
        res.status(500).json({ message: 'Internal server error', error: String(err) });
    }
});
// Scanning/recognize route -> backend recognize handler
// Single image upload
router.post('/employees/recognize', upload.single('image'), async (req, res) => {
    try {
        await employeesController.recognize(req, res);
    }
    catch (err) {
        console.error('Route error (recognize)', err);
        res.status(500).json({ message: 'Internal server error', error: String(err) });
    }
});
exports.default = router;
