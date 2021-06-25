const parseCsvFile = async () => {
    const fileInput = document.getElementById('file-input');

    let uniqueNames = [];
    let uniqueDates = [];
    let reformatUniqueDates = [];
    let workerList;
     Papa.parse(fileInput.files[0], {
        complete: function (results) {
            uniqueNames = findUniqueData(results.data, 0);
            uniqueDates = findUniqueData(results.data, 1)
            workerList = setWorkersList(results.data, uniqueNames);

            uniqueDates.forEach(elem => {
                reformatUniqueDates.push(reformatDate(elem));
            })

            console.log(uniqueNames)
            console.log(reformatUniqueDates)
            console.log(workerList);
        }
    });
    console.log(workerList);
}

const findUniqueData = (data, i) => {
    data.shift();
    const uniqueNames = [];
    data.forEach(elem => {
        if (!uniqueNames.includes(elem[i])) {
            uniqueNames.push(elem[i]);
        }
    });
    return uniqueNames;
}

const reformatDate = (date) => {
    let options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }
    let d = new Date(date);
   return d.toLocaleString('ru', options);
}


const setWorkersList = (data, uniqueNames) => {
    let worker = [];
    const workersList = [];
    uniqueNames.forEach(name => {
        worker = [];
        data.forEach(elem => {
            if (elem[0] === name) {
                worker.push({name: name, date: elem[1], workHours: elem[2]});

            }
        });
        workersList.push(worker);
    });
    return workersList;
}
