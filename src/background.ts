const domainsForOpenningInChrome = [
    'docs.google.com',
    'drive.google.com',
    'mail.google.com',
    'calendar.google.com',
    'slides.google.com',
    'admin.google.com',
    'meet.google.com',
];

const autoOpenLinksMenuItemId = 'auto-open-links';

const tabIdsToClose: number[] = [];

chrome.tabs.onCreated.addListener((tab) => {
    processTab(tab);
});

chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
    processTab(tab);
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

chrome.action.disable();
chrome.action.onClicked.addListener((tab) => {
    openUrlViaFinicky(tab);
});

let isAutoOpenLinksViaFinicky: boolean = false;
chrome.storage.local.get('autoOpenLinks').then(({ autoOpenLinks }) => {
    isAutoOpenLinksViaFinicky = autoOpenLinks ?? true;
    chrome.contextMenus.create({
        id: autoOpenLinksMenuItemId,
        title: 'Automatically open google workspace links via Finicky',
        checked: isAutoOpenLinksViaFinicky,
        type: 'checkbox',
        contexts: ['action'],
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === autoOpenLinksMenuItemId) {
        isAutoOpenLinksViaFinicky = info.checked ?? true;
        chrome.storage.local.set({ autoOpenLinks: isAutoOpenLinksViaFinicky });
    }
});

function processTab(tab: chrome.tabs.Tab) {
    if (isneedToOpenViaFinicky(tab)) {
        if (isAutoOpenLinksViaFinicky) {
            openUrlViaFinicky(tab);
        } else {
            chrome.action.enable(tab.id);
        }
    }
}

function openUrlViaFinicky(tab: chrome.tabs.Tab) {
    const url = createURL(tab.pendingUrl || tab.url);
    const tabId = tab.id;
    if (url === undefined || tabId === undefined || tabIdsToClose.includes(tabId)) {
        return;
    }

    const finickyUrl = createFinickyUrl(url);
    console.log('Open in Finicky', finickyUrl);
    chrome.tabs.update(tabId, { url: finickyUrl });
    tabIdsToClose.push(tabId);
}

function isneedToOpenViaFinicky(tab: chrome.tabs.Tab): boolean {
    const url = createURL(tab.pendingUrl || tab.url);
    if (url === undefined) {
        return false;
    }
    return domainsForOpenningInChrome.includes(url.hostname);
}

function createURL(url: string | undefined): URL | undefined {
    if (url === undefined) {
        return undefined;
    }
    try {
        return new URL(url);
    } catch (e) {
        return undefined;
    }
}

function createFinickyUrl(url: URL): string | undefined {
    let urlString = url.toString();
    if (url.hostname === 'admin.google.com' && url.searchParams.get('continue')?.startsWith('http')) {
        const redirectUrl = createURL(url.searchParams.get('continue') ?? undefined);
        if (redirectUrl !== undefined && domainsForOpenningInChrome.includes(redirectUrl.hostname)) {
            urlString = redirectUrl.toString();
        }
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