import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class RowInfo implements Comparable<RowInfo> {
    int rowIndex;
    int soldierCount;

    public RowInfo(int rowIndex, int soldierCount) {
        this.rowIndex = rowIndex;
        this.soldierCount = soldierCount;
    }

    @Override
    public int compareTo(RowInfo other) {
        if (this.soldierCount != other.soldierCount) {
            return Integer.compare(this.soldierCount, other.soldierCount);
        } else {
            return Integer.compare(this.rowIndex, other.rowIndex);
        }
    }
}

public class lc1337 {
    public int[] kWeakestRows(int[][] mat, int k) {
        int m = mat.length;
        List<RowInfo> rowInfoList = new ArrayList<>();

        for (int i = 0; i < m; i++) {
            int soldierCount = countSoldiers(mat[i]);
            rowInfoList.add(new RowInfo(i, soldierCount));
        }

        Collections.sort(rowInfoList);

        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = rowInfoList.get(i).rowIndex;
        }

        return result;
    }

    private int countSoldiers(int[] row) {
        int count = 0;
        for (int num : row) {
            if (num == 1) {
                count++;
            } else {
                break; // Soldiers are positioned in front of civilians
            }
        }
        return count;
    }

    public static void main(String[] args) {
        int[][] mat = {
                { 1, 1, 0, 0, 0 },
                { 1, 1, 1, 1, 0 },
                { 1, 0, 0, 0, 0 },
                { 1, 1, 0, 0, 0 },
                { 1, 1, 1, 1, 1 }
        };

        int k = 3;

        lc1337 solution = new lc1337();
        int[] weakestRows = solution.kWeakestRows(mat, k);

        for (int index : weakestRows) {
            System.out.println(index);
        }
    }
}
