const fs = require('fs');
const path = require('path');

const pageTopics = {
    'sayfa6.html': ['Pi', 'ENIAC'],
    'sayfa8.html': ['House_of_Wisdom', 'Astrolabe'],
    'sayfa9.html': ['Euclid'],
    'sayfa10.html': ['Cahit_Arf'],
    'sayfa11.html': ['Muhammad_ibn_Musa_al-Khwarizmi'],
    'sayfa12.html': ['Hypatia'],
    'sayfa13.html': ['Emmy_Noether'],
    'sayfa14.html': ['Isaac_Newton'],
    'sayfa15.html': ['Alan_Turing'],
    'sayfa16.html': ['Srinivasa_Ramanujan'],
    'sayfa17.html': ['Golden_ratio'],
    'sayfa18.html': ['Fibonacci'],
    'sayfa19.html': ['Mandelbrot_set'],
    'sayfa20.html': ['Observable_universe'],
    'sayfa23.html': ['Enigma_machine'],
    'sayfa24.html': ['John_von_Neumann'],
    'sayfa27.html': ['Pythagoras'],
    'sayfa28.html': ['Vitruvian_Man']
};

async function getWikiImage(title) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=800`;
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const page = Object.values(pages)[0];
        return page.thumbnail ? page.thumbnail.source : null;
    } catch (e) {
        console.error(`Failed to fetch image for ${title}`, e);
        return null;
    }
}

async function run() {
    const pagesDir = path.join(__dirname, 'pages');
    const files = fs.readdirSync(pagesDir).filter(f => f.startsWith('sayfa') && f.endsWith('.html'));

    let count = 0;

    for (const file of files) {
        if (!pageTopics[file]) continue;

        const filePath = path.join(pagesDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        const topics = pageTopics[file];
        let originalContent = content;

        // Find all placeholder URLs
        const placeholderRegex = /https:\/\/via\.placeholder\.com\/[^"']+/g;
        let match;
        let topicIndex = 0;

        // We need to replace match by match, so we split and join
        let newContent = '';
        let lastIndex = 0;

        while ((match = placeholderRegex.exec(content)) !== null) {
            if (topicIndex < topics.length) {
                const topic = topics[topicIndex];
                const realImgUrl = await getWikiImage(topic);
                
                if (realImgUrl) {
                    newContent += content.substring(lastIndex, match.index) + realImgUrl;
                    console.log(`[${file}] Replaced with ${topic} image`);
                } else {
                    newContent += content.substring(lastIndex, match.index) + match[0];
                    console.log(`[${file}] No image found for ${topic}`);
                }
                topicIndex++;
            } else {
                // If no more topics, keep the original placeholder or remove it.
                // Or maybe just use a generic math image
                const generic = await getWikiImage('Mathematics');
                if (generic) {
                    newContent += content.substring(lastIndex, match.index) + generic;
                } else {
                    newContent += content.substring(lastIndex, match.index) + match[0];
                }
            }
            lastIndex = placeholderRegex.lastIndex;
        }
        newContent += content.substring(lastIndex);

        if (newContent !== originalContent) {
            // Further optimization: adjust the styles to ensure no overflow
            // Reduce height slightly to be safe (from 140px/100px to 120px)
            newContent = newContent.replace(/height:\s*140px;/g, 'height: 125px;');
            newContent = newContent.replace(/height:\s*100px;/g, 'height: 110px;');

            fs.writeFileSync(filePath, newContent, 'utf-8');
            count++;
        }
    }

    console.log(`\nSuccessfully replaced placeholders in ${count} files with real Wikipedia images!`);
}

run();
