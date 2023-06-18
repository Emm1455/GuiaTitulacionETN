export default async function fetchData(url, conf) {
  const response = await fetch(url, conf);
  return await response.json();
}
