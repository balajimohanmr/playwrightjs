/*
Given a string s consisting of words and spaces, return the length of the last word in the string.
 
Example 1:
 
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
 
Example 2:
 
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.

Example 3: 

Write a function to check if two strings are anagrams.

 Input: isAnagram('listen', 'silent')
 Output: true
 Input: isAnagram('hello', 'world') 
 Output: false
 Explanation: An anagram is when you mix up the letters of a word to make a new one, using all the letters.
 
*/

//solution 1)

let s = "   fly me   to   the moon   "
function lengthOfLastWord(s){
    let arr=s.trim().split(/\s+/)
    console.log(arr[arr.length-1].length)
}
lengthOfLastWord(s)

//solution 2)

function isAnagram(word1,word2){
    
    if (word1.split("").sort().join()==word2.split("").sort().join()) return true
    else return false
}

console.log(isAnagram('listen','silent'))