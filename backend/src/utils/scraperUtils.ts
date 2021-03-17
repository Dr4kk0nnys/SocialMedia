import IScraperData from "../interfaces/ScraperData";

const scraperCheck = (data: IScraperData) => {
    const { title, link, description, image } = data;

    if (!title || title === '') return false;
    if (!link || link === 'undefined' || !link.startsWith('https://')) return false;
    if (!description || description === '') return false;
    if (!image || image === '') return false;

    return true;
}

export { scraperCheck };