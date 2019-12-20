const ApiUrl = "http://localhost:8081";


export const us = {
    normalLogin,
    facebookLogin,
    googleLogin,    
    registerStudent,
    registerTutor,
    changePassword,
}


function normalLogin(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${ApiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log("login:");
            console.log(user);
            if (user !== false) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function facebookLogin(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${ApiUrl}/login-facebook`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user !== false) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function googleLogin(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${ApiUrl}/login-google`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user !== false) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function registerStudent(user) {
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };

    return fetch(`${ApiUrl}/register-student`, requestOption)
        .then(handleResponse);
}

function registerTutor(user) {  
    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };

    return fetch(`${ApiUrl}/register-tutor`, requestOption)
        .then(handleResponse);
}

function changePassword(changePassForm) {
    if(changePassForm.newPass === '123')
    {
        return {
            code: 1,
            info: {
                message: "Success",
            }
        };
    }
    else
    {
        return {
            code: 0,
            info: {
                message: 'Failure',
            }
        }
    }
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

export default us;