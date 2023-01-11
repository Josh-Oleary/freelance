var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import Profile from '../Classes/Profile.js';
const router = express.Router();
/* eslint-disable @typescript-eslint/no-misused-promises */
// Create profile
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        const payload = req.body;
        const profile = new Profile();
        const response = yield profile.create(userID, payload);
        res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// Edit profile
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const id = req.params.id;
        const profile = new Profile();
        const response = yield profile.update(id, payload);
        res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// List profiles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = new Profile();
        const response = yield profile.fetchMany();
        res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// Retrieve profile
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const profile = new Profile();
        const response = yield profile.fetchOne(id);
        res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const profile = new Profile();
        const response = yield profile.delete(id);
        res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
/* eslint-disable @typescript-eslint/no-misused-promises */
export default router;
