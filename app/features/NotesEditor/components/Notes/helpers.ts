export class RowVisibilityHelper {
  private startIndex = 0;
  private endIndex = 0;
  rowHeight = 0;

  computeVisibility(nRows: number, rowHeight: number, top: number, bottom: number): void {
    const nRowsFromTop = Math.floor(top / rowHeight);
    const visibleRows = Math.floor((bottom - top) / rowHeight);

    this.endIndex = nRows - nRowsFromTop;
    this.startIndex = Math.max(this.endIndex - visibleRows - 1, 0);
  }

  getIndices() {
    return { startIndex: this.startIndex, endIndex: this.endIndex };
  }
}
