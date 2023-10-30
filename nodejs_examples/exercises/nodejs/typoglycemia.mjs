import { readFile } from 'node:fs/promises';
try {
  const data = await readFile('exercises/words.txt', 'utf8');

  const words = data.split(' ');

  const shuffledWords = words.map(word => {
    if (word.length > 3) {
      word = word.replace(/[.,\/#!?'$%\^&\*;:{}=\-_`~()]/g, "");
      word = word.replace(/\s{2,}/g, " ");
      let innerLetters = word.slice(1, -1);
      innerLetters = innerLetters.split("").sort(letter => { return .5 - Math.random() }).join("")

      return word.charAt(0) + innerLetters + word.charAt(word.length - 1);
    }
    else{
      return word;
    }
  });

  console.log(shuffledWords.join(" "));
  //   console.log(finalString);

} catch (err) {
  console.error(err.message);
}