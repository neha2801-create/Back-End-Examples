import {readFile} from "fs/promises";

(async () => {
    try {
        const data = await readFile("words.txt", "utf-8");
        for (const word of data.split(" ")) {
            console.log(word);
        }
    } catch (error) {
        console.error(error);
    }
})();