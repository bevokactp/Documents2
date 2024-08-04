
// quickSort(arr, 0, sizeof(arr)/sizeof(arr[0]) - 1);
// quickSort(массив, 0, длина - 1)
void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pivot = arr[high];
    int idx = low;
    for (int i = low; i <= high; i++) {
      if (arr[i] <= pivot) {
        int buf = arr[idx];
        arr[idx] = arr[i];
        arr[i] = buf;
        idx++;
      }
    }
    idx--;
    quickSort(arr, low, idx - 1);
    quickSort(arr, idx + 1, high);
  }
}
