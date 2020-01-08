//const ApiUrl = "http://localhost:8081";
const ApiUrl = 'https://ut-1612018-1612175-sv-client.herokuapp.com';

export const ls = {
    getLearnerDetail,
    updateLearnerDetail,
    enrollClass,
}


function getLearnerDetail(id) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id}),
    };

    return fetch(`${ApiUrl}/users/getLearnerDetail`, requestOption)
        .then(handleResponse);
}

function updateLearnerDetail(user) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify(user),
    };

    return fetch(`${ApiUrl}/users/editPersonalInfo`, requestOption)
        .then(handleResponse);
}

function enrollClass(contractForm) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify(contractForm),
    };

    return fetch(`${ApiUrl}/users/newContract`, requestOption)
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