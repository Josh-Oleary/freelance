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
import { User } from '../Classes/Users.js';
/* eslint-disable @typescript-eslint/no-misused-promises */
const router = express.Router();
// Create user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = new User();
        const userResult = yield user.create(payload);
        res.status(userResult.statusCode).json(userResult.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            Message: 'User not created',
            Error: error
        });
    }
}));
// Update user
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        const user = new User();
        const payload = req.body;
        const updatedUser = yield user.update(userID, payload);
        res.status(updatedUser.statusCode).json(updatedUser.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
// Delete user
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        const user = new User();
        const deletedUser = yield user.delete(userID);
        res.status(deletedUser.statusCode).json(deletedUser.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// Retrieve user
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        const user = new User();
        const userData = yield user.fetchOne(userID);
        res.status(userData.statusCode).json(userData.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
// List users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User();
        const users = yield user.fetchMany();
        res.status(users.statusCode).json(users.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}));
/* eslint-disable @typescript-eslint/no-misused-promises */
export default router;
