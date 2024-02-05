// import org.omg.CosNaming._BindingIteratorImplBase;

public class lc1945 {
    public static void main(String[] args) {
        String s = "zbax";
        // int x = 2;
        StringBuilder sb = new StringBuilder("");
        for (int i = 0; i < s.length(); i++) {
            sb.append(s.charAt(i) - 96);
        }
        int n = 0;
        for (int i = 0; i < sb.length(); i++) {
            n += sb.charAt(i) - '0';
        }
        System.out.println(n);
        // System.out.println(sb);
    }
}
