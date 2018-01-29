async function addPageToReleases(client, user, collection, pageNumber = 1) {
  console.log(`addPageToReleases ${collection}.${pageNumber}`);
  return await client
    .user()
    .collection()
    .getReleases(user, collection, { page: pageNumber, per_page: 100 });
}

async function getReleases(client, user, collection = 0) {
  console.log(`getReleases ${collection}`);
  const data = await addPageToReleases(client, user, collection);
  const allReleases = data.releases;
  const pages = data.pagination.pages;

  console.log(`getReleases first page completed ${collection} (${pages})`);
  // console.log(data);

  for (let page = 2; page <= pages; page++) {
    console.log(`getReleases ${collection}.${page}`);
    const newData = await addPageToReleases(client, user, collection, page);
    allReleases.push(newData.releases);
  }
  return allReleases;
}

module.exports = getReleases;
