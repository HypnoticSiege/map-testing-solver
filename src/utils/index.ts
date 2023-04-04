function stripHTML(html: string) {
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, ' ').trim().replace(/\s\s+/g, ' ');
}

export default {
    stripHTML,
}