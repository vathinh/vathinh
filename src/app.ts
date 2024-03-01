import * as fs from "fs";
const md = require("markdown-it")({
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true // Autoconvert URL-like text to links
});
import { fetchGitHubData } from "./fetchGitHubData";

const ossProjectRepos = [
    "vathinh"
];
const ossLearningMaterialRepos = ["vathinh"];

const githubUsername = "vathinh";
const websiteUrl = "https://koffeeaddicted.com/";
const linkedinUrl = "https://www.linkedin.com/in/thinh-tran-java/";
const githubSponsorsUrl = "https://github.com/sponsors/vathinh";

async function generateMarkdown() {
    const websiteBadge = `[![Website Badge](https://img.shields.io/badge/-Website-3B7EBF?style=for-the-badge&logo=amp&logoColor=white)](${websiteUrl})`;
    const linkedinBadge = `[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-3B7EBF?style=for-the-badge&logo=Linkedin&logoColor=white)](${linkedinUrl})`;
    const githubSponsorsBadge = `[![GitHub Sponsors Badge](https://img.shields.io/badge/-github%20sponsors-3B7EBF?style=for-the-badge&logo=github&logoColor=white)](${githubSponsorsUrl})`;
    const profileCountBadge = `![Profile Views Count Badge](https://komarev.com/ghpvc/?username=${githubUsername}&style=for-the-badge)`;

    const githubStatsCardDark = `[![GitHub-Stats-Card-Dark](https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=FFF&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-dark-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-dark-mode-only)`;
    const githubStatsCardLight = `[![GitHub-Stats-Card-Light](https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&include_all_commits=true&card_width=600&custom_title=GitHub%20Open%20Source%20Stats&title_color=3B7EBF&text_color=474A4E&icon_color=3B7EBF&hide=contribs&show=reviews,prs_merged,prs_merged_percentage&theme=transparent#gh-light-mode-only)](https://github.com/${githubUsername}/${githubUsername}#gh-light-mode-only)`;

    const skillIcons = `[![My Skills](https://skillicons.dev/icons?i=java,spring,maven,aws,docker,kubernetes,github,idea)](https://skillicons.dev)`;

    const markdownText = `<div align="center">\n

  ${websiteBadge} ${linkedinBadge} ${githubSponsorsBadge} ${profileCountBadge}\n
  
  ${skillIcons}\n
  
  ---\n
  
👋🏾 Hi, I'm vathinh, a Java developer specializing in microservices architecture with Spring Boot. I have extensive experience deploying applications on AWS, orchestrating containerized environments with Kubernetes, and implementing CI/CD pipelines using GitHub Actions and Bitbucket Pipelines. Proficient in Docker for containerization, I excel in building robust, scalable solutions for modern software development.
  
  ---\n

  ${githubStatsCardDark}\n
  ${githubStatsCardLight}\n

  </div>\n
  
  ---\n
  
  ## Highlights
  
  <details>\n
  <summary>Projects</summary>\n
  <br />
  Here are some of my other projects you might want to check out that are not pinned:\n
  <br />\n<br />
  ${await fetchGitHubData(ossProjectRepos)}\n
  </details>\n
  
  <details>\n
  <summary>Learning Materials</summary>\n
  <br />
  Here are some of my unique-styled workshop materials you can use to learn key concepts at your own pace:\n
  <br />\n<br />
  ${await fetchGitHubData(ossLearningMaterialRepos)}\n
  </details>\n\n
    
  <a href="https://github.com/vathinh/vathinh/actions/workflows/build.yml"><img src="https://github.com/vathinh/vathinh/actions/workflows/build.yml/badge.svg" align="right" alt="Rebuild README.md file"></a>\n
   <p>💬 How to reach me: Email </p>\n
   
  <div align="center">\n
    tv.thinh2000@gmail.com
  </div>`;



    const result = md.render(markdownText);

    fs.writeFile("README.md", result, (error) => {
        if (error) throw new Error(`Something went wrong: ${error}.`);
        console.log(`✅ README.md file was succesfully generated.`);
    });
}

generateMarkdown();