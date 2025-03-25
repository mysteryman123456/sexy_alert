const style = document.createElement('style');
style.textContent = `
    :root {
        --sd-dark-bg: #1a1a1a;
        --sd-dark-text: #ffffff;
    }

    .sd_alert-container {
        font-family: 'Arial', sans-serif;
        position: fixed;
        top: 20px;
        right: 20px;
        width: 300px;
        z-index: 999999999999999;
    }

    .sd_alert-box {
        position: relative;
        padding: 12px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        animation: sd_slide-in 0.3s ease-in-out;
        background-color: var(--sd-dark-bg);
        color: var(--sd-dark-text);
    }

    .sd_alert-content {
        flex-grow: 1;
        margin-right: 10px;
    }

    .sd_alert-title {
        font-size: 15px;
        font-weight:550;
        margin-bottom: 4px;
        line-height: 1.2;
    }

    .sd_alert-message {
        font-size: 12px;
        line-height: 1.3;
    }

    .sd_alert-icon {
        margin-right: 15px;
        min-width: 28px;
        min-height: 28px;
        max-width: 28px;
        max-height: 28px;
    }

    .sd_close-btn {
        cursor: pointer;
        background-color: transparent;
        border: none;
        font-size: 23px;
        color: rgba(255,255,255,0.7);
        min-width: 25px;
        max-height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        transition: color 0.3s;
    }

    .sd_close-btn:hover {
        color: white;
    }

    @keyframes sd_slide-in {
        from { transform: translateX(115%); }
        to { transform: translateX(-15px); }
    }

    @keyframes sd_slide-out {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(110%); opacity: 0; }
    }

    .sd_alert-hidden {
        animation: sd_slide-out 0.3s ease-in-out forwards;
    }
`;
document.head.appendChild(style);

const alertContainer = document.createElement('div');
alertContainer.className = 'sd_alert-container';
document.body.appendChild(alertContainer);

const icons = {
    success: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path></svg>',
    failure: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>',
    warning: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path></svg>',
    info: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"></path></svg>',
    notify: '<svg class="sd_alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 17H20V10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10V17H2V19H22V17ZM15 23V21H9V23H15ZM9 9V7H15V9.41421L11.4142 13H15V15H9V12.5858L12.5858 9H9Z"></path></svg>',
}

function createAlert(type, title, message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('sd_alert-box', `sd_${type}`);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('sd_close-btn');
    closeButton.onclick = () => closeAlert(alertBox);

    alertBox.innerHTML = `
        ${icons[type]}
        <div class="sd_alert-content">
            <div class="sd_alert-title">${title}</div>
            <div class="sd_alert-message">${message}</div>
        </div>
    `;
    alertBox.appendChild(closeButton);

    alertContainer.appendChild(alertBox);
    setTimeout(() => closeAlert(alertBox), 3000);
}

function closeAlert(alertBox) {
    alertBox.classList.add('sd_alert-hidden');
    setTimeout(() => alertBox.remove(), 300); 
}

function success(message) {
    createAlert('success', 'Success', message);
}

function failure(message) {
    createAlert('failure', 'Error', message);
}

function warning(message) {
    createAlert('warning', 'Warning', message);
}

function info(message) {
    createAlert('info', 'Info', message);
}

function notify(message) {
    createAlert('notify', 'Notification', message);
}
