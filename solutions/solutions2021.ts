const processFormSubmissions = async (form: HTMLFormElement, submitter: HTMLButtonElement) => {
  //get the input from the form and run it through the appropriate solution according to the left 5 characters from the form's id property
  const day = form.id.substring(0, 5);
  const input = (form.querySelector(`#${day}Input`) as HTMLInputElement)?.value ?? "";
  const solution: Function = solutions[(day + (submitter.id === day + "button" ? "" : "part2")) as SolutionsKey];
  const output: string = await solution(input);
  (form.querySelector(`#${day}Output`) as HTMLElement).textContent = output;
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
      processFormSubmissions(event.target as HTMLFormElement, event.submitter as HTMLButtonElement);
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
  const depths: number[] = input.split("\n").map(Number);
  return countIncreases(depths);
};

const countIncreases = (numbers: number[]) => {
  let increases: number = 0;
  for (let i: number = 1; i < numbers.length; i++) {
    let last: number = numbers[i - 1] ?? numbers[i];
    if (numbers[i] > last) {
      increases++;
    }
  }
  return increases;
};

//Day 2 part 2
//Same as day 1 except instead of comparing individual depths, compare sums of 3-measurement arrays
const day01part2 = async (input: string) => {
  const depths: number[] = input.split("\n").map(Number);
  const depthWindows = [];
  for (let i = 0; i < depths.length; i++) {
    depthWindows.push(depths[i] + (depths[i + 1] ?? 0) + (depths[i + 2] ?? 0));
  }
  return countIncreases(depthWindows);
}

const solutions = {
  "day01": day01
  ,"day01part2": day01part2
};
type SolutionsKey = keyof typeof solutions;
