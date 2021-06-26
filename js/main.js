const parseCsvFile = () => {
    const fileInput = document.getElementById('file-input');
    let uniqueNames = [];
    let uniqueDates = [];
    let reformatUniqueDates = [];
    let workerList;
    let headers;
    Papa.parse(fileInput.files[0], {
        complete: function (results) {
            results.data.shift();
            uniqueNames = findUniqueData(results.data, 0);
            uniqueDates = findUniqueData(results.data, 1);
            workerList = setWorkersList(results.data, uniqueNames);
            uniqueDates.forEach(elem => {
                reformatUniqueDates.push(reformatDate(elem));
            })
            headers = createHeaders(reformatUniqueDates);
            result(workerList, headers, uniqueNames, uniqueDates)
        }
    });
    fileInput.value = '';
}

const result = (workerList, headers, names, dates) => {
    let result = '';

    headers.forEach((header, index) => {
        result += header + (index !== headers.length - 1 ? ',' : '');
    })
    result += '\n';

    names.forEach(name => {
        result += name + ',';
        let worker = workerList.filter(elem => elem.name === name);
        let fullWorkerInfo = findElement(worker, dates);
        dates.forEach((workDay, index) => {
            result += fullWorkerInfo[index][workDay] + (index !== fullWorkerInfo.length - 1 ? ',' : '');
        });
        result += '\n'
    })
    downloadResultFile(result);
}

function downloadResultFile(text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'result.csv');
    element.click();
}

const findElement = (workers, dates) => {
    return dates.map(date => {
        const person = workers.find(person => person.date === date);
        return {
            [date]: person?.workHours || '0'
        }
    });
}

const findUniqueData = (data, i) => {
    const uniqueData = [];
    data.forEach(elem => {
        if (!uniqueData.includes(elem[i])) {
            uniqueData.push(elem[i]);
        }
    });
    return uniqueData;
}

const reformatDate = (date) => {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();

    if (month < 10)
        month = '0' + month;
    if (day < 10)
        day = '0' + day;

    return [year, month, day].join('-');
}

const setWorkersList = (data, uniqueNames) => {
    const workersList = [];
    uniqueNames.forEach(name => {
        data.forEach(elem => {
            if (elem[0] === name) {
                workersList.push({name: name, date: elem[1], workHours: elem[2]});
            }
        });
    });
    return workersList;
}

const createHeaders = (date) => {
    let headers = [];
    let i = 1;
    headers[0] = "Name/Date";

    date.forEach(elem => {
        headers[i] = elem;
        i++;
    });
    return headers;
}
