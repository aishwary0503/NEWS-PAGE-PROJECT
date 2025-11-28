import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "articles.json");

export function getAllArticles() {
  const file = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(file);
}
