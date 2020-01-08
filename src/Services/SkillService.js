//const ApiUrl = "http://localhost:8081";
const ApiUrl = 'https://ut-1612018-1612175-sv-client.herokuapp.com';

export const skillSer = {    
    getSkillList,
}


function getSkillList() {
    const requestOption = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${ApiUrl}/getSkills`, requestOption)
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