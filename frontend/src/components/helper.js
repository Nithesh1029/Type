import blueBall from "../assets/meme/blueBall.png";
import alright from "../assets/meme/alright.png";
import nick from "../assets/meme/nick.png";
import speed from "../assets/meme/spped.png";
import ken from "../assets/meme/ken-clap.gif";

export const getResultMeme = (wpm) => {
  if (wpm < 30) {
    return {
      image: blueBall,
      title: "Fastest in your bloodline? 💀",
    };
  }

  if (wpm < 40) {
    return {
      image: alright,
      title: "I mean... it's alright 😐",
    };
  }

  if (wpm < 60) {
    return {
      image: speed,
      title: "Careful with that keyboard",
    };
  }

  if (wpm < 80) {
    return {
      image: ken,
      title: "Damn dude 👏",
    };
  }

  return {
    image: nick,
    title: "touch some grass 🌱",
    };
};