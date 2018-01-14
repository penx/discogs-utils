function getReleases(client, user, collection = 0) {
  const allReleases = [];

  function addFirstPageToReleases() {
    console.log("addFirstPageToReleases");
    return client
      .user()
      .collection()
      .getReleases(user, collection, { page: 1, per_page: 100 })
      .then(data => {
        allReleases.push(data.releases);
        return data.pagination.pages;
      })
      .catch(error => {
        console.log("connection error for first page");
        console.log(error);
      });
  }
  function addPageToReleases(pageNumber) {
    console.log(`addPageToReleases ${collection}.${pageNumber}`);
    return client
      .user()
      .collection()
      .getReleases(user, collection, { page: pageNumber, per_page: 100 })
      .then(data => {
        console.log(`pushed ${collection}.${pageNumber}`);
        allReleases.push(data.releases);
      })
      .catch(error => {
        console.log("connection error for subsequent page");
        console.log(error);
      });
  }

  return addFirstPageToReleases().then(pages => {
    const promises = [];
    for (let page = 2; page <= pages; page++) {
      promises.push(addPageToReleases(page));
    }
    if (!promises.length) {
      return allReleases;
    }
    return Promise.all(promises)
      .then(() => {
        console.log(`completed collection ${collection}`);
        return allReleases;
      })
      .catch(error => console.log(error));
  });
}

module.exports = getReleases;
