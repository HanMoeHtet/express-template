import { i18next } from '@src/config/lang.config';

export const i18nextMiddleware = (socket, next) => {
  const i18n = i18next.cloneInstance({ initImmediate: false });
  i18n.on('languageChanged', (lng) => {
    // Keep language in sync
    socket.data.language = socket.data.locale = socket.data.lng = lng;

    socket.data.languages =
      i18next.services.languageUtils.toResolveHierarchy(lng);

    if (i18next.services.languageDetector) {
      i18next.services.languageDetector.cacheUserLanguage(lng);
    }
  });

  let lng = socket.data.lng;

  if (!lng) {
    lng =
      socket.handshake.query.lng || socket.request.headers['accept-language'];
  }

  socket.data.language = socket.data.locale = socket.data.lng = lng;

  socket.data.languages =
    i18next.services.languageUtils.toResolveHierarchy(lng);

  i18n.changeLanguage(lng || i18next.options.fallbackLng?.[0]);

  const t = i18n.t.bind(i18n);
  const exists = i18n.exists.bind(i18n);

  socket.data.t = t;
  socket.data.exists = exists;

  if (i18next.services.languageDetector) {
    i18next.services.languageDetector.cacheUserLanguage(lng);
  }

  // load resources
  if (!socket.data.lng) return next();
  i18next.loadLanguages(socket.data.lng, () => next());
};
