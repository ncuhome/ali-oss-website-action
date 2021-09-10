"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const process_1 = __importDefault(require("process"));
function getEnv(name) {
    return name ? process_1.default.env[name] : process_1.default.env;
}
exports.getEnv = getEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFZOUIsU0FBZ0IsTUFBTSxDQUFDLElBQWE7SUFDbEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBTyxDQUFDLEdBQUcsQ0FBQztBQUNoRCxDQUFDO0FBRkQsd0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcblxuaW50ZXJmYWNlIEVudnMgZXh0ZW5kcyBOb2RlSlMuUHJvY2Vzc0VudiB7XG4gIEZPTERFUjogc3RyaW5nO1xuICBBQ0NFU1NfS0VZX0lEOiBzdHJpbmc7XG4gIEFDQ0VTU19LRVlfU0VDUkVUOiBzdHJpbmc7XG4gIEJVQ0tFVDogc3RyaW5nO1xuICBFTkRQT0lOVDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW52KG5hbWU6IHN0cmluZyk6IHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudigpOiBFbnZzXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW52KG5hbWU/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5hbWUgPyBwcm9jZXNzLmVudltuYW1lXSA6IHByb2Nlc3MuZW52O1xufVxuIl19