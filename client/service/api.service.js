export const apiService = ({
    baseUrl: 'http://localhost:3002/',
    get(url) {
        return fetch(this.baseUrl + url).then(res => res.json());
    }
});