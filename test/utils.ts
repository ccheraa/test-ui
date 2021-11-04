export const hostname = process.env.HOSTNAME || 'http://localhost/';
export const port = process.env.PORT || 5500;
export let url = hostname.replace(/([^:]+:\/\/)?([^\/:]+)(:[^\/]+)?(.*)/, `$1$2:${port.toString()}$4`);
if (url[url.length - 1] === '/') {
  url = url.slice(0, -1);
}