const KEY = '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';
const CLIENT_ID_QUERY = `?client_id=${KEY}`;
const PER_PAGE = 3;

const URL = 'https://api.unsplash.com/photos/';

export const fetchImages = async page => {
    const response = await fetch(`${URL}${CLIENT_ID_QUERY}&per_page=${PER_PAGE}&page=${page}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
}
