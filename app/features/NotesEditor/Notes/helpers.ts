// TODO: Eventually handle different track heights
export class RowVisibilityHelper {
  startIndex = 0;
  endIndex = 0;
  rowHeight = 0;

  computeVisibility(nRows: number, rowHeight: number, top: number, bottom: number): void {
    const nRowsFromTop = Math.floor(top / rowHeight);
    const visibleRows = Math.floor((bottom - top) / rowHeight);

    this.endIndex = nRows - nRowsFromTop;
    this.startIndex = this.endIndex - visibleRows;
  }
}
