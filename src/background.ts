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
        const finickyUrl = createFinickyUrl(url);
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

function createFinickyUrl(url: URL): string | undefined {
    let urlString = url.toString();
    if (url.hostname === 'admin.google.com' && url.searchParams.get('continue')?.startsWith('http')) {
        urlString = url.searchParams.get('continue') || urlString
    }
    switch (url.protocol) {
        case 'https:':
            return urlString.replace('https:', 'finickys:');
        case 'http:':
            return urlString.replace('http:', 'finicky:');
        default:
            return;
    }
}
