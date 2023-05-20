# SIN Validator

## Assumptions and Explanation

Upon first reading the question, I decided I would need two validators, a length validator (ensuring a SIN of 9 characters) and a "correctness" validator to satisfy parts 2 and 3 of the question (checking that the sum of the SIN with every second digit doubled was divisible by 10).

Since we are relying on user input, I thought it would be a safe bet to first clean up the input. I wrote a simple `trim` function to remove any whitespace, turning an input like, `123 123 123` into `123123123`. This is in case anyone tries to add spaces to their SIN as it may appear on any official documents.

Also, given the nature of Social Insurance _Numbers_, I assumed that we would **only** want numerical characters included in our input. So I went ahead wrote an additional validator to check if there are any unwanted letters or special characters in the input.

In order for the SIN number to be considered valid _all three_ of these validators must pass.

### Code Flow

The entry point for this program is the `validate` function which is called whenever the submit button is clicked or text is entered into the input field (for live validation feedback as you type).

The `validate` function `trims` the input before passing it to three different validators:

- **hasValidLength**: For this validator I am checking the length of the string to see if it is equal to `9`, otherwise it does not pass.
- **hasOnlyNumbers**: I use `split` to break the input into an array and use the `some` method with `isNaN` to find any non-numerical values.
- **hasSinPattern**: Similar to the above approach, I break the input into an array, using `map` to double every second digit, and then `join` to turn the doubled array back into a string (this helps with situations like `16` being treated as `1` and `6` instead of `16`). Next I take the new string and I break _that_ into an array and use `reduce` to sum up all the individual characters. Finally, I take the sum and use the `modulus` operator to ensure the number is divisible by `10`.

If all validators pass, then the SIN is valid. Valid or invalid, we send this result to the `setValidity` helper which displays the appropriate visual feedback to the user.

There is one final function in the form of an event listener that provides live feedback to the user as they enter a value into the text box. This started as a way for me to test without having to click submit all the time, but I like the user experience of seeing live validation so I left it in.
