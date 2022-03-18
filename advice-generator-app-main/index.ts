const ENDPOINT = "https://api.adviceslip.com/advice";
const btn = document.querySelector(".card__btn");
const number = document.querySelector(".card__number");
const text = document.querySelector(".card__text");

interface AdviseResponse extends Response {
  slip: {
    id: number;
    advice: string;
  };
}

const fetchApi = async (): Promise<AdviseResponse> => {
  try {
    const req = await fetch(ENDPOINT);
    const res = await req.json();
    return res;
  } catch (err) {
    console.error(err);
    return <AdviseResponse>{
      slip: {
        id: 500,
        advice: err,
      },
    };
  }
};

const getAdvice = () => {
  fetchApi().then(({ slip: { id, advice } }) => {
    number.textContent = id.toString();
    text.textContent = `"${advice}"`;
  });
};

getAdvice();
btn.addEventListener("click", getAdvice, true);
