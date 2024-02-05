import java.util.*;

class Solution {
    public static int minimumRightShifts(List<Integer> nums) {
        StringBuilder s = new StringBuilder();
        for (Integer a : nums) {
            s.append(a);
        }
        System.out.println(s);
        for (int i = s.length() - 1; i > 0; i--) {
            // System.out.println(s.charAt(i));
            if (s.charAt(i) < s.charAt(i - 1)) {
                s.insert(s.length() % (i + 1), s.charAt(i + 1));
                System.out.println(s);
                s.deleteCharAt((s.length() % (i + 1) + 1));
            }
        }
        return 0;
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        List<Integer> l = new ArrayList<>();
        l.add(3);
        l.add(4);
        l.add(5);
        l.add(1);
        l.add(2);
        minimumRightShifts(l);
    }
}
