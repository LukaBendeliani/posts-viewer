const getData = async (setter: any, url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  if (typeof json === "object") setter(json);
  else setter(JSON.parse(json));
};

export default getData;
