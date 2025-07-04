"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKeyword = void 0;
const checkKeyword = (keywords, comment) => {
    return keywords.some((keyword) => {
        return comment.toLowerCase().includes(keyword.toLowerCase());
    });
};
exports.checkKeyword = checkKeyword;
