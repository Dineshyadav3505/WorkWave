export default function Share({ link, location, id }) {
    let url = `${location}${link}/${id}`;
    navigator.clipboard.writeText(url)
    return true;
}