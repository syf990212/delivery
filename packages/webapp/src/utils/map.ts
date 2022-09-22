import AMapLoader from '@amap/amap-jsapi-loader'

import settings from '@/settings'

export function initMap(plugins?: string[]) {
  // https://lbs.amap.com/api/jsapi-v2/documentation
  return AMapLoader.load({
    key: settings.mapKey,
    version: '2.0',
    plugins: plugins
  })
}
