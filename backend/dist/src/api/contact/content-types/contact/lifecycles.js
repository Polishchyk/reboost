"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = __importDefault(require("../../../../services/email"));
exports.default = {
    async afterCreate(event) {
        const { result } = event;
        await email_1.default.sendEmail('sergey@reboost.ch', 'New Contact Form Submission', `You received a new message from ${result.email}\n\nName: ${result.your_name}\n\nPhone: ${result.phone_number}\n\nMessage:\n${result.message}\n\n`);
    },
};
