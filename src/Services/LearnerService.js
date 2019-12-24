const ApiUrl = "http://localhost:8081";


export const ls = {
    getLearnerDetail,
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