async function addPageToReleases(client, user, collection, pageNumber = 1) {
  return await client
    .user()
    .collection()
    .getReleases(user, collection, { page: pageNumber, per_page: 100 });
}

async function getReleases(client, user, collection = 0) {
  const data = await addPageToReleases(client, user, collection);
  const allReleases = data.releases;
  const pages = data.pagination.pages;

  for (let page = 2; page <= pages; page++) {
    const newData = await addPageToReleases(client, user, collection, page);
    allReleases.push(newData.releases);
  }
  return allReleases;
}

module.exports = getReleases;
