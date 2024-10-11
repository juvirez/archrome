const domainsForOpenningInChrome = [
    'docs.google.com',
    'drive.google.com',
    'mail.google.com',
    'calendar.google.com',
    'slides.google.com',
    'admin.google.com',
];

const tabIdsToClose: number[] = [];

chrome.tabs.onCreated.addListener((tab) => {
    openViaFinickyIfNeeded(tab);
});

chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
    openViaFinickyIfNeeded(tab);
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        while (tabIdsToClose.length > 0) {
            const tabId = tabIdsToClose.pop();
            if (tabId !== undefined) {
                chrome.tabs.remove(tabId);
            }
        }
    }
});

function openViaFinickyIfNeeded(tab: chrome.tabs.Tab) {
    const url = getTabUrl(tab);
    const tabId = tab.id;
    if (url === undefined || tabId === undefined) {
        return;
    }

    if (domainsForOpenningInChrome.includes(url.hostname) && !tabIdsToClose.includes(tabId)) {
        let finickyUrl = url.toString();
        switch (url.protocol) {
            case 'https:':
                finickyUrl = finickyUrl.replace('https:', 'finickys:');
                break;
            case 'http:':
                finickyUrl = finickyUrl.replace('http:', 'finicky:');
                break;
            default:
                return;
        }
        console.log('Open in Chrome', finickyUrl);
        chrome.tabs.update(tabId, { url: finickyUrl });
        tabIdsToClose.push(tabId);
    }
}

function getTabUrl(tab: chrome.tabs.Tab): URL | undefined {
    if (tab.url === undefined) {
        return undefined;
    }

    try {
        return new URL(tab.pendingUrl || tab.url);
    } catch (e) {
        return undefined;
    }
}