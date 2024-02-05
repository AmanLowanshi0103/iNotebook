public class GcdOfNumber {
    public static int gcd(int a, int b) {
        if (a < b) {
            a = a + b;
            b = a - b;
            a = a - b;
        }
        if (a % b == 0) {
            return b;
        } else {
            return (gcd(b, a % b));
        }
    }

    public static void main(String[] args) {
        System.out.println(gcd(21, 7));
    }
}
