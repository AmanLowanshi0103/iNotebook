import java.util.ArrayList;
import java.util.List;

class lc1447 {
    public static List<String> simplifiedFractions(int n) {
        List<String> list = new ArrayList<>();
        StringBuilder s = new StringBuilder("");
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j < n; j++) {
                s.delete(0, s.length());
                System.out.println((double) 2 / 4);
                if (j / i < 1 && ((i % j) != 0) || j == 1) {
                    // System.out.println(4 % 2);
                    s.append(String.valueOf(j) + "/" + String.valueOf(i));
                    list.add(s.toString());
                }
            }
        }
        return list;
    }

    public static void main(String[] args) {
        System.out.println(simplifiedFractions(4));
    }
}