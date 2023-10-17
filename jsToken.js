const axios = require("axios");
const querystring = require("querystring");

var g = {
  pin: "",
  oid: "",
  bizId: "JD-DCHD",
  fc: null,
  mode: "strict",
  p: "s",
  fp: "cb14c4fded197129eeb8d9c7236ecad9", // 设备信息和图片hash128
  ctype: 1,
  v: "3.1.1.0",
  f: "3",
  o: "wbbny.m.jd.com/pb/014710620/mTPLZGkAcayB5UvZ6uZCtL3M6ca/index.html", // 活动URL
  qs: "from=home&babelChannel=jdfuceng&sid=0b069fd0e75a85f6555a1fab3ee88e0w#/pages/home/index/index", //QS
  jsTk: null,
  qi: "",
};
var f = {
  ts: {
    deviceTime: new Date().getTime(),
    deviceEndTime: new Date().getTime() + 123,
  },
  ca: {
    tdHash: "c93bc25a4f9579edb60d240a12528af0", // 一个图片的base64编码后的md5加密
    contextName: "webgl,experimental-webgl",
    webglversion: "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    shadingLV: "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    vendor: "WebKit",
    renderer: "WebKit WebGL",
    extensions: [
      "ANGLE_instanced_arrays",
      "EXT_blend_minmax",
      "EXT_color_buffer_half_float",
      "EXT_float_blend",
      "EXT_texture_filter_anisotropic",
      "EXT_sRGB",
      "OES_element_index_uint",
      "OES_fbo_render_mipmap",
      "OES_standard_derivatives",
      "OES_texture_float",
      "OES_texture_float_linear",
      "OES_texture_half_float",
      "OES_texture_half_float_linear",
      "OES_vertex_array_object",
      "WEBGL_color_buffer_float",
      "WEBGL_compressed_texture_astc",
      "WEBGL_compressed_texture_etc",
      "WEBGL_compressed_texture_etc1",
      "WEBGL_debug_renderer_info",
      "WEBGL_debug_shaders",
      "WEBGL_depth_texture",
      "WEBGL_lose_context",
      "WEBGL_multi_draw",
    ],
    wuv: "Qualcomm",
    wur: "Adreno (TM) 640",
  },
  m: {
    compatMode: "BackCompat",
  },
  fo: ["Bauhaus 93", "Casual"],
  n: {
    vendorSub: "",
    productSub: "20030107",
    vendor: "Google Inc.",
    maxTouchPoints: 5,
    pdfViewerEnabled: false,
    hardwareConcurrency: 8,
    cookieEnabled: true,
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion:
      "5.0;appBuild/98730;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1684862185481%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJO%3D%22%2C%22ad%22%3A%22DJdtZNdtZNY1DJYmCJDuCq%3D%3D%22%2C%22od%22%3A%22DwO5DJrtZwG5ZNCyDJu3ZK%3D%3D%22%2C%22ov%22%3A%22CzK%3D%22%2C%22ud%22%3A%22DJdtZNdtZNY1DJYmCJDuCq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.77 Mobile Safari/537.36",
    platform: "Linux armv8l",
    product: "Gecko",
    userAgent:
      "jdapp;android;11.8.0;;;M/5.0;appBuild/98730;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1684862185481%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJO%3D%22%2C%22ad%22%3A%22DJdtZNdtZNY1DJYmCJDuCq%3D%3D%22%2C%22od%22%3A%22DwO5DJrtZwG5ZNCyDJu3ZK%3D%3D%22%2C%22ov%22%3A%22CzK%3D%22%2C%22ud%22%3A%22DJdtZNdtZNY1DJYmCJDuCq%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.77 Mobile Safari/537.36",
    language: "zh-CN",
    onLine: true,
    webdriver: false,
    javaEnabled: false,
    deviceMemory: 4,
    enumerationOrder: [
      "sendBeacon",
      "vendorSub",
      "productSub",
      "vendor",
      "maxTouchPoints",
      "scheduling",
      "userActivation",
      "doNotTrack",
      "geolocation",
      "connection",
      "plugins",
      "mimeTypes",
      "pdfViewerEnabled",
      "webkitTemporaryStorage",
      "webkitPersistentStorage",
      "hardwareConcurrency",
      "cookieEnabled",
      "appCodeName",
      "appName",
      "appVersion",
      "platform",
      "product",
      "userAgent",
      "language",
      "languages",
      "onLine",
      "webdriver",
      "getGamepads",
      "javaEnabled",
      "vibrate",
      "clipboard",
      "credentials",
      "keyboard",
      "managed",
      "mediaDevices",
      "storage",
      "serviceWorker",
      "virtualKeyboard",
      "wakeLock",
      "deviceMemory",
      "contacts",
      "ink",
      "locks",
      "mediaCapabilities",
      "gpu",
      "clearAppBadge",
      "getBattery",
      "getUserMedia",
      "requestMIDIAccess",
      "requestMediaKeySystemAccess",
      "setAppBadge",
      "webkitGetUserMedia",
    ],
  },
  p: [],
  w: {
    devicePixelRatio: 2.700000047683716,
    screenTop: 0,
    screenLeft: 0,
  },
  s: {
    availHeight: 867,
    availWidth: 400,
    colorDepth: 24,
    height: 867,
    width: 400,
    pixelDepth: 24,
  },
  sc: {
    ActiveBorder: "rgb(118, 118, 118)",
    ActiveCaption: "rgb(0, 0, 0)",
    AppWorkspace: "rgb(255, 255, 255)",
    Background: "rgb(255, 255, 255)",
    ButtonFace: "rgb(239, 239, 239)",
    ButtonHighlight: "rgb(239, 239, 239)",
    ButtonShadow: "rgb(239, 239, 239)",
    ButtonText: "rgb(0, 0, 0)",
    CaptionText: "rgb(0, 0, 0)",
    GrayText: "rgb(128, 128, 128)",
    Highlight: "rgb(181, 213, 255)",
    HighlightText: "rgb(0, 0, 0)",
    InactiveBorder: "rgb(118, 118, 118)",
    InactiveCaption: "rgb(255, 255, 255)",
    InactiveCaptionText: "rgb(128, 128, 128)",
    InfoBackground: "rgb(255, 255, 255)",
    InfoText: "rgb(0, 0, 0)",
    Menu: "rgb(255, 255, 255)",
    MenuText: "rgb(0, 0, 0)",
    Scrollbar: "rgb(255, 255, 255)",
    ThreeDDarkShadow: "rgb(118, 118, 118)",
    ThreeDFace: "rgb(239, 239, 239)",
    ThreeDHighlight: "rgb(118, 118, 118)",
    ThreeDLightShadow: "rgb(118, 118, 118)",
    ThreeDShadow: "rgb(118, 118, 118)",
    Window: "rgb(255, 255, 255)",
    WindowFrame: "rgb(118, 118, 118)",
    WindowText: "rgb(0, 0, 0)",
  },
  ss: {
    cookie: true,
    localStorage: true,
    sessionStorage: true,
    globalStorage: false,
    indexedDB: true,
  },
  tz: -480,
  lil: "",
  wil: "",
};

var l = TDEncrypt(f);
var a = "https://gia.jd.com/jsTk.do?a=" + TDEncrypt(g);

async function getJsToken() {
  let { status, data } = await axios({
    url: a,
    method: "POST",
    data: querystring.stringify({
      d: l,
    }),
  });
  if (status === 200 && data.data) {
    return data.data;
  } else return null;
}

function TDEncrypt(n) {
  n = JSON.stringify(n);
  n = encodeURIComponent(n);
  var m = "",
    g = 0;
  do {
    var f = n.charCodeAt(g++);
    var d = n.charCodeAt(g++);
    var a = n.charCodeAt(g++);
    var b = f >> 2;
    f = ((f & 3) << 4) | (d >> 4);
    var e = ((d & 15) << 2) | (a >> 6);
    var c = a & 63;
    isNaN(d) ? (e = c = 64) : isNaN(a) && (c = 64);
    m =
      m +
      "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(b) +
      "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(f) +
      "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(e) +
      "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(c);
  } while (g < n.length);
  return m + "/";
}

module.exports.jsToken = getJsToken;
