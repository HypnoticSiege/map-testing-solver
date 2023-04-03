function stripHTML(html: string) {
    return html.replace(/<[^>]*>/g, "").replace(/\s\s+/g, ' ');
}

export default {
    stripHTML,
}