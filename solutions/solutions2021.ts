const processFormSubmissions = async (form: HTMLFormElement) => {
  //get the input from the form and run it through the appropriate solution according to the left 5 characters from the form's id property
  const day: SolutionsKey = form.id.substring(0, 5) as SolutionsKey;
  const input: string = (form.querySelector(`#${day}Input`) as HTMLInputElement)?.value ?? "";
  const solution: Function = solutions[day];
  const output: string = await solution(input);
  (form.querySelector(`#${day}Output`) as HTMLElement).textContent += output;
};

//launch the app
document.addEventListener("readystatechange", (event: Event) => {
  if (document.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  //prep each form with listeners and default values
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
  for (let i = 0; i < forms.length; i++) {
    const form: HTMLFormElement = forms[i];

    //submit button runs associated day's solution
    form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      processFormSubmissions(event.target as HTMLFormElement);
    });

    //contents of each form's textarea are populated with it's own placeholder property value
    const textarea: HTMLTextAreaElement = form.querySelector("textarea") as HTMLTextAreaElement;
    textarea.value = textarea.placeholder;

  }
};


//SOLUTIONS

//Day 1 part 1
const day01 = async (input: string) => {
  //turn the input into an array of numbers, then count the number of times a number is greater than its predecessor, excluding the very first number
  const numbers = input.split("\n").map(Number);
  let count: number = 0;
  for (let i = 1; i < numbers.length; i++) {
    let last = numbers[i - 1] ?? numbers[i];
    if (numbers[i] > last) {
      count++;
    }
  }
  return count;
};

const solutions = {
  "day01": day01
};
type SolutionsKey = keyof typeof solutions;
