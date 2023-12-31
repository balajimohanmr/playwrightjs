/*
1) Move Zeroes:
 
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 
Example 1:
 
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:
 
Input: nums = [0]
Output: [0]

2) Array intersection
 
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.
 
Example 1:
 
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
 
Example 2:
 
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.

3) Find the maximum and minimum:

Given an integer array, find the maximum amd minimum elements in an array and return their indices.

Example: 
Input: nums = [34, 7, 21, 89, 54, 10, 91, 67]
Output: Maximum Element: 91, Index: 6
Minimum Element: 7, Index: 1

4) Remove Duplicates:

Given an integer array with duplicate elements as input, return a new array with duplicates 
elements removed. The order of the elements in the resulting array should be same as the order
in the original array.

Example: 
Input: iputArray = [1, 2, 3, 4, 2, 5, 6, 1, 6]
Output: resultArray = [1, 2, 3, 4, 5, 6]

*/
//Solution 1:

function moveZeros(num){
    
    let arr1=num.filter(i=>(i==0))
    let arr=num.filter((i)=>(i!=0)).sort((a,b)=>(a-b))
    console.log(arr.concat(arr1))
    
}
moveZeros([0,1,0,3,12])

//Solution 2:

function arrayIntersection(arr1,arr2){
    return arr1.filter(i=>arr2.includes(i) ).filter((i,index,self)=>self.indexOf(i)===index)
}
let nums1 = [1,2,2,1]
let nums2 = [2,2]
console.log(arrayIntersection(nums1,nums2))

//Solution 3:

function maximumandMinimum(nums){
    console.log("Maximum Element : "+Math.max(...nums)+", "+"Index : "+nums.indexOf(Math.max(...nums)) )
    console.log("Minimum Element : "+Math.min(...nums)+", "+"Index : "+nums.indexOf(Math.min(...nums)) )

} 

nums = [34, 7, 21, 89, 54, 10, 91, 67]
maximumandMinimum(nums)

//Solution 4:

function removeDuplicates(arr){
    console.log(arr.filter((i,index,self)=>self.indexOf(i)===index))
}

let inputArray = [1, 2, 3, 4, 2, 5, 6, 1, 6]
removeDuplicates(inputArray)
