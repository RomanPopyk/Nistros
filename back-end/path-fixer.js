/* Function to conditionally fix paths for GitHub Pages hosting.
* It prepends '.' to relative src or href attributes of elements
* with the 'js-path-fixer' class, ONLY if the website is hosted on GitHub Pages.
*/
const applyPathFixer = () => {
// The base path (your GitHub repository name)
    const basePath = '/Nistros/'; 
// Check if the current host is a GitHub Pages domain
    const isGitHubPages =   window.location.hostname.endsWith('.github.io') || 
                        window.location.hostname.includes('github.io'); // More robust check

    if (!isGitHubPages) {
        console.log("Not on GitHub Pages, skipping path fixing.");
        return; // Exit if not on GitHub Pages
    }

    // Select all elements marked for path fixing
    const elementsToFix = document.querySelectorAll('.js-path-fixer');

    elementsToFix.forEach(element => {
        let originalPath = '';
        let attributeName = '';

        // Determine if the element uses 'src' or 'href'
        if (element.hasAttribute('src')) {
            originalPath = element.getAttribute('src');
            attributeName = 'src';
        } else if (element.hasAttribute('href')) {
            originalPath = element.getAttribute('href');
            attributeName = 'href';
        }

        // Only apply the fix if:
        // 1. The path exists.
        // 2. It starts with '/' (is a root-relative path).
        // 3. It's not already an absolute URL (http/https/double-slash).
        // 4.  It doesn't already have the basePath prepended.
        if (originalPath && attributeName && originalPath.startsWith('/') &&
            !originalPath.startsWith('http://') && !originalPath.startsWith('https://') &&
            !originalPath.startsWith('//') && !originalPath.startsWith(basePath)) {
            
            // Prepend the basePath. Remove the leading '/' from originalPath to avoid '//'
            element.setAttribute(attributeName, basePath + originalPath.substring(1));
            console.log(`Path fixed for ${attributeName}: ${originalPath} -> ${element.getAttribute(attributeName)}`);
        }
    });
};
// Apply path fixer on initial load
applyPathFixer();

window.addEventListener('load', function() {
    // Check if we've already refreshed
    if (!sessionStorage.getItem('hasRefreshed')) {
        // Mark that we're about to refresh
        sessionStorage.setItem('hasRefreshed', 'true');
        
        setTimeout(function() {
            location.reload();
        }, 1000);
    }
});
