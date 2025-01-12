console.log("background init")

function sendNotification(title, message) {
    chrome.notifications.create({
        type: "basic",
        title: title,
        message: message,
        iconUrl: "https://i.imgur.com/IrWr6kc.png"
    })
}

chrome.runtime.onMessage.addListener((res, sender, sendResponse) => {
    console.log(res)
    if (res.type == "notification") {
        sendNotification(res.title, res.message)
        sendResponse(true)
        return true
    }
})

browser.tabs.onUpdated.addListener((tabId, changeInfo, { url }) => {
    if (changeInfo.status !== 'complete' || !/https:\/\/.+roblox.com\//g.test(url)) return

    browser.scripting.insertCSS({
        target: { tabId: tabId },
        files: ["/css/style.css"],
    })

    browser.scripting.executeScript({
        target: { tabId: tabId },
        files: ["/js/jquery.js", "/load.js"],
    })
})