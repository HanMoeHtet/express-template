import { app } from '@src/config/app.config';

const _getRegisteredRoutesRecursive = (stack, segments = [], layers = []) => {
  const routes = [];
  const currentLayers = [...layers];
  stack.forEach((layer) => {
    if (layer.handle.stack) {
      const segment = layer.regexp.source
        .replace(/\\/g, '')
        .replace('?(?=/|$)', '')
        .replace('^', '');
      routes.push(
        ..._getRegisteredRoutesRecursive(
          layer.handle.stack,
          [...segments, segment],
          currentLayers
        )
      );
    } else if (layer.route) {
      routes.push({
        segments: [...segments, layer.route.path.replace(/\(.*\)/, '')],
        method: layer.route.stack[0].method.toUpperCase(),
        layers: [
          ...layers.map((layer) => layer.name),
          ...layer.route.stack.map((layer) => layer.name),
        ],
      });
    } else {
      currentLayers.push(layer);
    }
  });
  return routes;
};

export const getRegisteredRoutes = () => {
  return _getRegisteredRoutesRecursive(app._router.stack);
};
