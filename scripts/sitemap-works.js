const fs = require("fs");
const prettier = require("prettier");
const DOMAIN = "https://baeseonghyeon.github.io";
const getDate = new Date().toISOString();
const works = require("../src/data/work.json");

const lowerCaseParser = (text) => {
    let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

    if (text) {
        text = text.replace(reg, "");
        return text.toLowerCase().replace(/ /g, "-");
    }
};

const getWorkPopupId = (title, category) => {
    return `${lowerCaseParser(title)}-${lowerCaseParser(category)}`;
};

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });
(async () => {
    const worksSitemap = `
    ${works.data
        .map((work) => {
            const workId = getWorkPopupId(work.title.en, work.info.category[0]);
            return `
                <url>
                <loc>${`${DOMAIN}/works/${workId}`}</loc>
                <lastmod>${getDate}</lastmod>
                </url>`;
        })
        .join("")}
    `;

    const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  	<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
        ${worksSitemap}
    </urlset>
    `;
    const formattedSitemap = [formatted(generatedSitemap)];

    fs.writeFileSync(
        "../public/sitemap/sitemap-works.xml",
        formattedSitemap.toString(),
        "utf8",
    );
})();
