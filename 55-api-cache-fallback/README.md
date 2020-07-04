# API Cache - Fallback

Modify our *API Cache* script to fallback to the cache if the API call fails—even if data has expired. Showing something, even if it’s a bit out of date, is better than showing nothing at all.

1. If there’s data in `localStorage`, and it hasn’t expired, use it.
2. Otherwise, call the API to get fresh data.
3. If the API fails and there’s expired data in `localStorage`, use that instead.

## Links

[Demo](https://meterrill.github.io/vanilla-js-academy/55-api-cache-fallback/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
