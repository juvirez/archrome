const domainsForOpenningInChrome = [
    'docs.google.com',
    'drive.google.com',
    'mail.google.com',
    'calendar.google.com',
    'slides.google.com',
    'admin.google.com',
];

chrome.tabs.onCreated.addListener((tab) => {
    const url = getTabUrl(tab);
    if (url === undefined || tab.id === undefined) {
        return;
    }

    if (domainsForOpenningInChrome.includes(url.hostname)) {
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
        chrome.tabs.update(tab.id, { url: finickyUrl });
    }
});

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