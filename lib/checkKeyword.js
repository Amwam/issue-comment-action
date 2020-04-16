"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKeyword = (keywords, comment) => {
    return keywords.some((keyword) => {
        comment.toLowerCase().includes(keyword.toLowerCase());
    });
};
