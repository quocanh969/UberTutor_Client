//const ApiUrl = "http://localhost:8081";
const ApiUrl = 'https://ut-1612018-1612175-sv-client.herokuapp.com';

export const ts = {
    getTopTutor,
    getTutorList,   
    getTutorDetail,
    getContracts,
    getPendingContracts,
    getExpiredContracts,
    getActiveContracts,
    getLearnerStudying,
    getStatisticByYear,
    getIncomeReport,
    updateTutorProfess,
    updateTutorSkill,
    clearTutorSkill,
}

function getTopTutor() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${ApiUrl}/getTopTutor`, requestOption)
        .then(handleResponse);
}

function getTutorList(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getTutorList`, requestOption)
        .then(handleResponse);
}

function getTutorDetail(id) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id}),
    };

    return fetch(`${ApiUrl}/getTutorDetail`, requestOption)
        .then(handleResponse);
}

function updateTutorProfess(tutorSkill) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify(tutorSkill),
    };

    return fetch(`${ApiUrl}/users/editProfessionalInfo`, requestOption)
        .then(handleResponse);
}

function updateTutorSkill(id, id_skill) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id, id_skill, type: 1,}),
    };

    return fetch(`${ApiUrl}/users/editSkill`, requestOption)
        .then(handleResponse);
}

function clearTutorSkill(id) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id}),
    };

    return fetch(`${ApiUrl}/users/clearSkill`, requestOption)
        .then(handleResponse);
}

function getContracts(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getContracts`, requestOption)
        .then(handleResponse);
}

function getPendingContracts(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getPendingContracts`, requestOption)
        .then(handleResponse);
}

function getExpiredContracts(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getExpiredContracts`, requestOption)
        .then(handleResponse);
}

function getActiveContracts(option) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
    };

    return fetch(`${ApiUrl}/getActiveContracts`, requestOption)
        .then(handleResponse);
}

function getLearnerStudying(id) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id: id}),
    };

    return fetch(`${ApiUrl}/users/getLearnerStudying`, requestOption)
        .then(handleResponse);
}

function getStatisticByYear(id, year) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id_tutor: id, year: year}),
    };

    return fetch(`${ApiUrl}/users/getStatisticByYear`, requestOption)
        .then(handleResponse);
}

function getIncomeReport(id, type) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id: id, type: type}),
    };

    return fetch(`${ApiUrl}/users/getIncomeReport`, requestOption)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                //logout();
                //window.location.reload(true);
                alert('code: 401');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}