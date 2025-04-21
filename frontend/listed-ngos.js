async function fetchNGOs() {
    try {
        const res = await fetch("http://localhost:5000/api/ngos");
        const ngos = await res.json();

        const ngoList = document.getElementById("ngoList");
        ngoList.innerHTML = ""; // Clear placeholder

        ngos.forEach((ngo) => {
            const div = document.createElement("div");
            div.className = "bg-white p-4 rounded-lg shadow-md";

            div.innerHTML = `
                <p class="text-sm font-semibold text-[#140547]">Name: ${ngo.name}</p>
                <p class="text-sm font-semibold text-[#140547]">Email: ${ngo.email}</p>
                <p class="text-sm font-semibold text-[#140547]">Public Key:</p>
                <p class="truncate w-full text-sm font-mono bg-gray-100 text-[#140547] px-2 py-1 rounded" title="${ngo.publicKey}">
                    ${ngo.publicKey}
                </p>
                <button class="mt-2 px-4 py-1 text-sm font-semibold bg-[#140547] text-white rounded hover:opacity-90 transition"
                    onclick="copyToClipboard('${ngo.publicKey}')">
                    Copy Public Key
                </button>
            `;

            ngoList.appendChild(div);
        });
    } catch (err) {
        console.error("Failed to fetch NGOs:", err);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Public key copied to clipboard!");
    });
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast toast-success fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md";
    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("opacity-0");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000); // Toast disappears after 3 seconds
}

// Call on load
fetchNGOs();
