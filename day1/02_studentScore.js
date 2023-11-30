/*
1. Create a function named `calculateGrade` that takes a student's score as a parameter.

2. Use `switch` statement inside the function - 
   - Use a `switch` statement with the condition `true`.
   - Use `case` statements to check different score ranges and return the corresponding grade.

3. Declare and initialize the variable

4. Call the function and print the result


*/

function calculateGrade(score){
      switch(true){
         case score<60:
            console.log("Grade C")
            break
         case score<70:
            console.log("Grade B")
            break
         default:
            console.log("Grade A")
                       
      }
}

calculateGrade(70)