const ApiUrl = "http://localhost:8081";


export const cs = {
    agreeContract,
    rejectContract,
    getContractDetail,
    noticeContract,
    payContract,
    cancelContract,
    updateContract,
    complainContract,
}

function agreeContract(id_contract) {
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id_contract}),
    };

    return fetch(`${ApiUrl}/agree`, requestOption)
        .then(handleResponse);
}

function rejectContract(id_contract) {
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id_contract}),
    };

    return fetch(`${ApiUrl}/reject`, requestOption)
        .then(handleResponse);
}

function getContractDetail(id) {
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    };

    return fetch(`${ApiUrl}/getContractDetail`, requestOption)
        .then(handleResponse);
}

function noticeContract(contractInfo) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify(contractInfo),
    };

    return fetch(`${ApiUrl}/users/contractNotice`, requestOption)
        .then(handleResponse);
}

function payContract(contractInfo) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify(contractInfo),
    };

    return fetch(`${ApiUrl}/users/endContract`, requestOption)
        .then(handleResponse);
}

function cancelContract(id) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id: id}),
    };

    return fetch(`${ApiUrl}/users/cancelContract`, requestOption)
        .then(handleResponse);
}

function updateContract(id, description, rating, feedback) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id: id, description: description, rating: rating, feedback: feedback}),
    };

    return fetch(`${ApiUrl}/users/updateContract`, requestOption)
        .then(handleResponse);
}

function complainContract(id, complain) {
    let token = JSON.parse(localStorage.getItem('user')).token;
    const requestOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        body: JSON.stringify({id: id, complain: complain,}),
    };

    return fetch(`${ApiUrl}/users/complainContract`, requestOption)
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