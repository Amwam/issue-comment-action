"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKeyword = (keywords, comment) => {
    return keywords.some((keyword) => {
        return comment.toLowerCase().includes(keyword.toLowerCase());
    });
};
