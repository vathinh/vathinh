import fetch from 'node-fetch'
// Your code here

interface GitHubRepo {
    html_url: string;
    full_name: string;
    stargazers_count: number;
    forks_count: number;
    description: string; // Ensure 'description' property exists
}

export async function fetchGitHubData(repos: Array<string>): Promise<string> {
    const owner = "vathinh";

    const list = await Promise.all(
        repos.map(async (repo) => {
            const urlGithub = `https://api.github.com/repos/${owner}/${repo}`;

            const response = await fetch(urlGithub);
            if (!response.ok) {
                throw new Error(`"${owner}/${repo}" not found. Kindly review your list of repositories. This is the URL: ${urlGithub}`);
            }
            const data = await response.json() as GitHubRepo;

            const {
                html_url: url,
                full_name: name,
                stargazers_count: stars,
                forks_count: forks,
                description: desc
            } = data;

            return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`;
        })
    );

    return `<ul>${list.join("")}\n<li>More coming soon :).</li>\n</ul>`;
}
