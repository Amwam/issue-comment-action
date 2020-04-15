"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKeyword = (keywords, content) => {
    return keywords.some((keyword) => {
        if (content.title.toLowerCase().includes(keyword.toLowerCase())) {
            return true;
        }
        if (content.body.toLowerCase().includes(keyword.toLowerCase())) {
            return true;
        }
        return content.comments.some((c) => c.toLowerCase().includes(keyword.toLowerCase()));
    });
};
