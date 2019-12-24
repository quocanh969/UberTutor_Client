const ApiUrl = "http://localhost:8081";

export const as = {    
    getAreaList,
}


function getAreaList() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${ApiUrl}/getAreas`, requestOption)
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