

const parceCsvFile = () => {
  const fileInput = document.getElementById('file-input');
  Papa.parse(fileInput.files[0], {
    complete: function (results) {
      console.log(results);
    }
  });
}
