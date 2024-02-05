
class lc387 {
    public static int firstUniqChar(String s) {

        for (int i = 0; i < s.length(); i++) {
            // System.out.println(s.lastIndexOf(s.charAt(i)));
            // System.out.println(s.indexOf(s.charAt(i)));
            if (s.lastIndexOf(s.charAt(i)) == i && s.indexOf(s.charAt(i))==i) {
                return i;
            }
        }
        return -1;

    }

    public static void main(String[] args) {
        System.out.println(firstUniqChar("abcdefghabcd"));
    }

}