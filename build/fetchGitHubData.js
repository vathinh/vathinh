"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGitHubData = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchGitHubData(repos) {
    return __awaiter(this, void 0, void 0, function* () {
        const owner = "vathinh";
        const list = yield Promise.all(repos.map((repo) => __awaiter(this, void 0, void 0, function* () {
            const urlGithub = `https://api.github.com/repos/${owner}/${repo}`;
            const response = yield (0, node_fetch_1.default)(urlGithub);
            if (!response.ok) {
                throw new Error(`"${owner}/${repo}" not found. Kindly review your list of repositories. This is the URL: ${urlGithub}`);
            }
            const data = yield response.json();
            const { html_url: url, full_name: name, stargazers_count: stars, forks_count: forks, description: desc } = data;
            return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`;
        })));
        return `<ul>${list.join("")}\n<li>More coming soon :).</li>\n</ul>`;
    });
}
exports.fetchGitHubData = fetchGitHubData;
