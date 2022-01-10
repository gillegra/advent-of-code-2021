"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const processFormSubmissions = (form, submitter) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //get the input from the form and run it through the appropriate solution according to the left 5 characters from the form's id property
    const day = form.id.substring(0, 5);
    const input = (_b = (_a = form.querySelector(`#${day}Input`)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
    const solution = solutions[(day + (submitter.id === day + "button" ? "" : "part2"))];
    const output = yield solution(input);
    form.querySelector(`#${day}Output`).textContent = output;
});
//launch the app
document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
        initApp();
    }
});
const initApp = () => {
    //prep each form with listeners and default values
    const forms = document.querySelectorAll("form");
    for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        //submit button runs associated day's solution
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            processFormSubmissions(event.target, event.submitter);
        });
        //contents of each form's textarea are populated with it's own placeholder property value
        const textarea = form.querySelector("textarea");
        textarea.value = textarea.placeholder;
    }
};
//SOLUTIONS
//Day 1 part 1
const day01 = (input) => __awaiter(void 0, void 0, void 0, function* () {
    //turn the input into an array of numbers, then count the number of times a number is greater than its predecessor, excluding the very first number
    const depths = input.split("\n").map(Number);
    return countIncreases(depths);
});
const countIncreases = (numbers) => {
    var _a;
    let increases = 0;
    for (let i = 1; i < numbers.length; i++) {
        let last = (_a = numbers[i - 1]) !== null && _a !== void 0 ? _a : numbers[i];
        if (numbers[i] > last) {
            increases++;
        }
    }
    return increases;
};
//Day 2 part 2
//Same as day 1 except instead of comparing individual depths, compare sums of 3-measurement arrays
const day01part2 = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const depths = input.split("\n").map(Number);
    const depthWindows = [];
    for (let i = 0; i < depths.length; i++) {
        depthWindows.push(depths[i] + ((_c = depths[i + 1]) !== null && _c !== void 0 ? _c : 0) + ((_d = depths[i + 2]) !== null && _d !== void 0 ? _d : 0));
    }
    return countIncreases(depthWindows);
});
const solutions = {
    "day01": day01,
    "day01part2": day01part2
};
