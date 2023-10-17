const CryptoJS = require("crypto-js");

var _appId = "35fa0",
  _storageFormatVersionKey = "WQ_lite_f_v",
  _storageFpKey = "WQ_lite_vk1",
  _defaultToken = "",
  Rx = CryptoJS.enc.Hex,
  Lx = CryptoJS.MD5,
  kx = CryptoJS.SHA256,
  Tx = CryptoJS.HmacSHA256,
  _defaultAlgorithm = {
    local_key_1: Lx,
    local_key_2: kx,
    local_key_3: Tx,
  },
  _version = "3.1",
  _formatVersion = "2.1",
  _fingerprint = "",
  i = { debug: false, appId: _appId, preRequest: false },
  ab = ["h5st", "_stk", "_ste"],
  lb = {
    version: "1.2.0",
    bstr: function (t, r) {
      var n = 1,
        e = 0,
        o = t.length,
        i = 0;
      "number" == typeof r && ((n = 65535 & r), (e = r >>> 16));
      for (var u = 0; u < o; ) {
        for (i = Math.min(o - u, 3850) + u; u < i; u++) e += n += 255 & t.charCodeAt(u);
        (n = 15 * (n >>> 16) + (65535 & n)), (e = 15 * (e >>> 16) + (65535 & e));
      }
      return (e % 65521 << 16) | n % 65521;
    },
    buf: function (t, r) {
      var n = 1,
        e = 0,
        o = t.length,
        i = 0;
      "number" == typeof r && ((n = 65535 & r), (e = (r >>> 16) & 65535));
      for (var u = 0; u < o; ) {
        for (i = Math.min(o - u, 3850) + u; u < i; u++) e += n += 255 & t[u];
        (n = 15 * (n >>> 16) + (65535 & n)), (e = 15 * (e >>> 16) + (65535 & e));
      }
      return (e % 65521 << 16) | n % 65521;
    },
    str: function (t, r) {
      var n = 1,
        e = 0,
        o = t.length,
        i = 0,
        u = 0,
        a = 0;
      "number" == typeof r && ((n = 65535 & r), (e = r >>> 16));
      for (var c = 0; c < o; ) {
        for (i = Math.min(o - c, 3850); i > 0; )
          (u = t.charCodeAt(c++)) < 128
            ? (n += u)
            : u < 2048
            ? ((e += n += 192 | ((u >> 6) & 31)), --i, (n += 128 | (63 & u)))
            : u >= 55296 && u < 57344
            ? ((e += n += 240 | (((u = 64 + (1023 & u)) >> 8) & 7)),
              --i,
              (e += n += 128 | ((u >> 2) & 63)),
              --i,
              (e += n += 128 | (((a = 1023 & t.charCodeAt(c++)) >> 6) & 15) | ((3 & u) << 4)),
              --i,
              (n += 128 | (63 & a)))
            : ((e += n += 224 | ((u >> 12) & 15)), --i, (e += n += 128 | ((u >> 6) & 63)), --i, (n += 128 | (63 & u))),
            (e += n),
            --i;
        (n = 15 * (n >>> 16) + (65535 & n)), (e = 15 * (e >>> 16) + (65535 & e));
      }
      return (e % 65521 << 16) | n % 65521;
    },
  };
__iniConfig(i);

function yw(t) {
  return "[object Object]" === Object.prototype.toString.call(t);
}

function __iniConfig(t) {
  var i = t.appId;
  var u = t.debug;
  if ("string" !== typeof t.appId || !t.appId) {
    console.error("settings.appId must be a non-empty string");
  }
  _appId = i || "";
  if (_appId) {
    _storageFormatVersionKey = "".concat(_storageFormatVersionKey, "_").concat(_appId);
    _storageFpKey = "".concat(_storageFpKey, "_").concat(_appId);
  }
  _debug = Boolean(u);
}

function __checkParams(t) {
  if (!_appId) {
    console.log("appId is required");
    return null;
  }
  if (!yw(t)) {
    console.log("params is not a plain object");
    return null;
  }
  const keys = Object.keys(t);
  if (yw(t) && !keys.length) {
    console.log("params is empty");
    return null;
  }

  for (n = 0; n < keys.length; n++) {
    var e = keys[n];
    if (ab.indexOf(e) >= 0) {
      console.log("params contains reserved param name.");
      return null;
    }
  }

  var r = Object.keys(t)
    .sort()
    .map(function (r) {
      return {
        key: r,
        value: t[r],
      };
    });

  var u = r.filter(function (t) {
    let type = typeof t.value;
    return ("number" == type && !isNaN(t.value)) || "string" == type || "boolean" == type;
  });
  if (0 === u.length) {
    return null;
  }
  return u;
}

function __requestDeps() {
  _fingerprint = Qx();
}

function Eb() {
  return {
    sua: "Linux; Android 13; SM-G9980 Build/TP1A.220624.014; wv",
    pp: {},
    extend: { wd: 0, l: 0, ls: 0, wk: 0 },
    random: eb({
      size: 10,
      dictType: "max",
      customDict: null,
    }),
    referer: "",
    v: "v_lite_f_0.1.6",
  };
}

function __collect() {
  const r = Eb(1);
  r.fp = _fingerprint;
  const n = JSON.stringify(r, null, 2);
  const e = CryptoJS.AES.encrypt(n, CryptoJS.enc.Utf8.parse("wm0!@w_ZBCvYl1flo("), {
    iv: CryptoJS.enc.Utf8.parse("0102030405060708"),
  });
  return e.ciphertext.toString();
}

function __makeSign(t, r) {
  var c = "";
  var _ = Date.now();
  var s = nx(_, "yyyyMMddhhmmssSSS");
  _defaultToken = yb(_fingerprint);
  c = __genDefaultKey(_defaultToken, _fingerprint, s, _appId);
  var f = {};
  if (!c) {
    return f;
  }
  var g = __genSign(c, t);
  var b = t
    .map(function (t) {
      return t.key;
    })
    .join(",");
  var w = 1;
  var m = __genSignParams(g, _, s, r);

  f = {
    _stk: b,
    _ste: w,
    h5st: m,
  };

  return f;
}

function yb(t) {
  const magic = "tk";
  const version = "02";
  const platform = "w";
  const expires = "41";
  const producer = "l";
  const expr = Cb();
  const cipher = mb(t);
  const adler32 = (function (t) {
    const c = lb.str(t) >>> 0;
    return ("00000000" + c.toString(16)).substr(-8);
  })(magic + version + platform + expires + producer + expr + cipher);

  return magic + version + platform + adler32 + expires + producer + expr + cipher;
}

function mb(t) {
  const K = {
    size: 32,
    dictType: "max",
    customDict: null,
  };
  var U = eb(K);
  var R = "";
  var F = Date.now();
  var G = U.substr(0, 2);
  var W = U.substr(0, 12);
  var q = wb(t, F, G, W);
  R += bb(q);
  R += bb(G);
  R += bb(W);
  R += Sb(F);
  R += bb(t);

  var H = CryptoJS.enc.Hex.parse(R);
  const I = CryptoJS.AES.encrypt(H, CryptoJS.enc.Utf8.parse("dp0!@w_s#ll0flo("), {
    iv: CryptoJS.enc.Utf8.parse("0102030405060708"),
  });
  return fb(CryptoJS.enc.Base64.stringify(I.ciphertext));
}

function bb(t) {
  var l = new Uint8Array(t.length);
  l.forEach(function (r, n, e) {
    e[n] = t.charCodeAt(n);
  });
  return xb(l);
}

function __genDefaultKey(t, r, n, e) {
  var _ = __parseToken(t, 16, 28),
    C = "",
    O = "".concat(t).concat(r).concat(n).concat(e),
    D = CryptoJS.enc.Base64.parse((_ + "===".slice((_.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/")),
    E = CryptoJS.enc.Utf8.stringify(D).match(/^[1,2,3]{1}([x,+]{1}[1,2,3]{1})+/);
  if (E) {
    var B = E[0].split(""),
      z = _defaultAlgorithm,
      M = "";
    B.forEach(function (r) {
      var e = ["+", "x"];
      if (isNaN(r)) e.indexOf(r) >= 0 && (M = r);
      else {
        var b = "".concat("local_key_").concat(r);
        if (z[b])
          switch (M) {
            case "+":
              C = "".concat(C).concat(__algorithm(b, O, t));
              break;
            case "x":
              C = __algorithm(b, C, t);
              break;
            default:
              C = __algorithm(b, O, t);
          }
      }
    });
  }
  return C;
}

function __parseToken(t, r, n) {
  return t ? t.slice(r, n) : "";
}

function __algorithm(t, r, n) {
  var i = _defaultAlgorithm[t];
  return t === "local_key_3" ? i(r, n).toString(Rx) : i(r).toString(Rx);
}

function xb(t) {
  return t
    .map(function (t) {
      var r = "00" + (t & 255).toString(16);
      return r.slice(-2);
    })
    .join("");
}

function Sb(t) {
  return xb(_b(t));
}

function _b(t) {
  var E, B, z;
  var N = ((E = void 0), (B = void 0), (z = void 0), (z = new ArrayBuffer(2)), new DataView(z).setInt16(0, 256, !0), new Int16Array(z)[0] === 256);
  var P = Math.floor(t / Math.pow(2, 32));
  var I = t % Math.pow(2, 32);
  var R = new ArrayBuffer(8);
  var T = new DataView(R);
  N ? (T.setUint32(0, I, N), T.setUint32(4, P, N)) : (T.setUint32(0, P, N), T.setUint32(4, I, N));
  return new Uint8Array(R);
}

function wb(t, r, n, e) {
  var K = new Uint8Array(16);
  K.forEach(function (r, n, e) {
    e[n] = t.charCodeAt(n);
  });
  var H = _b(r);
  var U = new Uint8Array(2);
  U.forEach(function (t, r, e) {
    e[r] = n.charCodeAt(r);
  });
  var G = new Uint8Array(12);
  G.forEach(function (t, r, n) {
    n[r] = e.charCodeAt(r);
  });
  var Z = new Uint8Array(38);
  Z.set(U);
  Z.set(G, 2);
  Z.set(H, 14);
  Z.set(K, 22);
  var Y = lb.buf(Z);
  Y >>>= 0;
  var q = "00000000" + Y.toString(16);
  return q.substr(q.length - 8);
}

function Cb() {
  var j = {
    size: 32,
    dictType: "max",
    customDict: null,
  };
  var L = eb(j);
  var R = ["1", "2", "3"];
  var P = ["+", "x"];
  var I = 2 + Math.floor(Math.random() * 4);
  var F = "";
  for (var W = 0; W < I; W++) (F += R[Math.floor(Math.random() * 3)]), W < I - 1 && (F += P[Math.floor(Math.random() * 2)]);

  F.length < 9 && (F += L.substr(0, 9 - F.length));
  var T = CryptoJS.enc.Utf8.parse("2+3x2x1dr");
  var N = CryptoJS.enc.Base64.stringify(T);
  return fb(N);
}

function fb(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function eb() {
  var t,
    r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    n = r.size,
    e = void 0 === n ? 10 : n,
    o = r.dictType,
    i = void 0 === o ? "number" : o,
    u = r.customDict,
    a = "";
  if (u && "string" == typeof u) t = u;
  else
    switch (i) {
      case "alphabet":
        t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case "max":
        t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
        break;
      case "number":
      default:
        t = "0123456789";
    }
  for (; e--; ) a += t[(Math.random() * t.length) | 0];
  return a;
}
function nx() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
    n = new Date(t),
    r = e,
    o = {
      "M+": n.getMonth() + 1,
      "d+": n.getDate(),
      "D+": n.getDate(),
      "h+": n.getHours(),
      "H+": n.getHours(),
      "m+": n.getMinutes(),
      "s+": n.getSeconds(),
      "w+": n.getDay(),
      "q+": Math.floor((n.getMonth() + 3) / 3),
      "S+": n.getMilliseconds(),
    };
  return (
    /(y+)/i.test(r) && (r = r.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length))),
    Object.keys(o).forEach(function (t) {
      if (new RegExp("(".concat(t, ")")).test(r)) {
        var e = "S+" === t ? "000" : "00";
        r = r.replace(RegExp.$1, 1 == RegExp.$1.length ? o[t] : "".concat(e).concat(o[t]).substr("".concat(o[t]).length));
      }
    }),
    r
  );
}

function __genSign(t, r) {
  var f = r
    .map(function (t) {
      return t.key + ":" + t.value;
    })
    .join("&");
  var c = Tx(f, t).toString(Rx);
  return c;
}

function __genSignParams(t, r, n, e) {
  return ["".concat(n), "".concat(_fingerprint), "".concat(_appId), "".concat(_defaultToken), "".concat(t), "".concat(_version), "".concat(r), "".concat(e)].join(";");
}

function sign(I) {
  var u = ["functionId", "appid", "client", "body", "clientVersion", "sign", "t", "jsonp"].reduce(function (e, r) {
    var n = I[r];
    return n && ("body" === r && (n = CryptoJS.SHA256(n).toString(CryptoJS.enc.Hex)), (e[r] = n)), e;
  }, {});

  const R = __checkParams(u);
  if (R === null) {
    return u;
  }

  __requestDeps();
  const W = __collect();
  const F = __makeSign(R, W);
  return Object.assign({}, u, F);
}

function Qx() {
  var j = "0123456789";
  var P = tb(j, 3);
  var L = $x();
  var T = nb(j, P);
  var I = {
    size: L,
    num: T,
  };
  var R =
    rb(I) +
    P +
    rb({
      size: 12 - L,
      num: T,
    }) +
    L;
  var N = R.split("");
  var W = [];
  for (; N.length > 0; ) {
    W.push(9 - parseInt(N.pop()));
  }
  var F = W.join("");
  return F;
}

function $x() {
  return (Math.random() * 10) | 0;
}

function rb(t) {
  var p = t.size;
  for (var y = t.num, g = ""; p--; ) {
    g += y[(Math.random() * y.length) | 0];
  }
  return g;
}

function nb(t, r) {
  for (a = 0; a < r.length; a++) {
    -1 !== t.indexOf(r[a]) && (t = t.replace(r[a], ""));
  }
  return t;
}

function tb(t, r) {
  var _ = [];

  var A,
    C = t.length,
    O = Zx(t);
  try {
    for (O.s(); !(A = O.n()).done; ) {
      var D = A.value;
      if (Math.random() * C < r && (_.push(D), --r == 0)) break;
      C--;
    }
  } catch (t) {
    O.e(t);
  } finally {
    O.f();
  }
  for (var E = "", B = 0; B < _.length; B++) {
    var z = (Math.random() * (_.length - B)) | 0;
    (E += _[z]), (_[z] = _[_.length - B - 1]);
  }
  return E;
}

function Zx(t, r) {
  var n;
  // if (typeof zd === undefined || kw(t) == null) {
  if (typeof zd === undefined || t[Symbol.iterator] == null) {
    if (jw(t) || (n = Yx(t)) || (r && t && typeof t.length === "number")) {
      n && (t = n);
      var F = 0;
      return {
        s: function () {},
        n: function () {
          var r = {
            done: !0,
          };
          if (F >= t.length) return r;
          var o = {
            done: !1,
            value: t[F++],
          };
          return o;
        },
        e: function (t) {
          throw t;
        },
        f: function () {},
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance. In order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var H,
    K = !0,
    U = !1;

  return {
    s: function () {
      n = t[Symbol.iterator]();
    },
    n: function () {
      var i = n.next();
      return (K = i.done), i;
    },
    e: function (t) {
      (U = !0), (H = t);
    },
    f: function () {
      try {
        !K && n.return != null && n.return();
      } finally {
        if (U) throw H;
      }
    },
  };
}

module.exports.h5st = sign