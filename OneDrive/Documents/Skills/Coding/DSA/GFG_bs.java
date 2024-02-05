//{ Driver Code Starts
// Initial Template for Java

import java.io.*;
import java.util.*;

  public class GFG_bs {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();
        while (T > 0) {
            int n = sc.nextInt();
            int arr[] = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = sc.nextInt();
            }

            int key = sc.nextInt();
            Solution g = new Solution();
            System.out.println(g.binarysearch(arr, n, key));
            T--;
        }
    }
}

// } Driver Code Ends


// User function Template for Java
//iterative
// class Solution {
//     int binarysearch(int arr[], int n, int k) {
//         int l=0,r=n-1;
//         while(l<=r){
//             int m=l+(r-l)/2;
//             // System.out.println(m);
//             if(arr[m]==k){
//                 return m;
//             }
//             else if(arr[m]>k){
//                 r=m-1;
//             }
//             else{
//                 l=m+1;
//             }
//         }
//         return -1;
//     }
// }

class Solution {
    int binarysearch(int arr[], int n, int k) {
      return bsearch(arr,0,n-1,k);
    }
    int bsearch(int[] arr,int l,int r,int k){
        int m=l+(r-l)/2;
        if(l<=r){
        if(arr[m]==k){
            return m;
        }    
        else if(arr[m]>k){
            return bsearch(arr, l, m-1, k);
        }
        else{
            return bsearch(arr, m+1, r, k);
        }
        }
        return -1;

    }
}