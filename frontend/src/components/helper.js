import blueBall from "../assets/meme/blueBall.png";
import alright from "../assets/meme/alright.png";
import nick from "../assets/meme/nick.png";

export const getResultMeme = (wpm) => {
  if (wpm < 30) {
    return {
      image: blueBall,
      title: "Keep practicing",
    };
  }

  if (wpm < 70) {
    return {
      image: alright,
      title: "Good progress",
    };
  }

  return {
    image: nick,
    title: "Excellent speed",
  };
};