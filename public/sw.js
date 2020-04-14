self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
    caches
      .open(`v1`)
      .then((cache) =>
        cache.addAll([
          `/`,
          `/index.html`,
          `/bundle.js`,
          `/css/style.css`,
          `/css/normalize.css`,
          `/fonts/HelveticaNeueCyr-Bold.woff2`,
          `/fonts/HelveticaNeueCyr-Medium.woff2`,
          `/fonts/HelveticaNeueCyr-Roman.woff2`,
        ])
      )
  );
});

self.addEventListener(`activate`, () => {
  console.log(`sw activated`);
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((response) => response || fetch(evt.request))
      .catch((err) => console.log({ err }))
  );
});
