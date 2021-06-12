! function(a) {
    function b(c, d) { return this instanceof b ? (a.isPlainObject(c) ? d = c : (d = d || {}, d.alias = c), this.el = void 0, this.opts = a.extend(!0, {}, this.defaults, d), this.noMasksCache = d && void 0 !== d.definitions, this.userOptions = d || {}, this.events = {}, void e(this.opts.alias, d, this.opts)) : new b(c, d) }

    function c(a) {
        var b = document.createElement("input"),
            c = "on" + a,
            d = c in b;
        return d || (b.setAttribute(c, "return;"), d = "function" == typeof b[c]), b = null, d
    }

    function d(b, c) {
        var d = b.getAttribute("type"),
            e = "INPUT" === b.tagName && -1 !== a.inArray(d, c.supportsInputType) || b.isContentEditable || "TEXTAREA" === b.tagName;
        if (!e && "INPUT" === b.tagName) {
            var f = document.createElement("input");
            f.setAttribute("type", d), e = "text" === f.type, f = null
        }
        return e
    }

    function e(b, c, d) { var f = d.aliases[b]; return f ? (f.alias && e(f.alias, void 0, d), a.extend(!0, d, f), a.extend(!0, d, c), !0) : (null === d.mask && (d.mask = b), !1) }

    function f(b, c, d) {
        function f(a, c) { c = void 0 !== c ? c : b.getAttribute("data-inputmask-" + a), null !== c && ("string" == typeof c && (0 === a.indexOf("on") ? c = window[c] : "false" === c ? c = !1 : "true" === c && (c = !0)), d[a] = c) }
        var g, h, i, j, k = b.getAttribute("data-inputmask");
        if (k && "" !== k && (k = k.replace(new RegExp("'", "g"), '"'), h = JSON.parse("{" + k + "}")), h) {
            i = void 0;
            for (j in h)
                if ("alias" === j.toLowerCase()) { i = h[j]; break }
        }
        f("alias", i), d.alias && e(d.alias, d, c);
        for (g in c) {
            if (h) {
                i = void 0;
                for (j in h)
                    if (j.toLowerCase() === g.toLowerCase()) { i = h[j]; break }
            }
            f(g, i)
        }
        return a.extend(!0, c, d), c
    }

    function g(c, d) {
        function e(b) {
            function d(a, b, c, d) { this.matches = [], this.isGroup = a || !1, this.isOptional = b || !1, this.isQuantifier = c || !1, this.isAlternator = d || !1, this.quantifier = { min: 1, max: 1 } }

            function e(b, d, e) {
                var f = c.definitions[d];
                e = void 0 !== e ? e : b.matches.length;
                var g = b.matches[e - 1];
                if (f && !r) {
                    f.placeholder = a.isFunction(f.placeholder) ? f.placeholder(c) : f.placeholder;
                    for (var h = f.prevalidator, i = h ? h.length : 0, j = 1; j < f.cardinality; j++) {
                        var k = i >= j ? h[j - 1] : [],
                            l = k.validator,
                            m = k.cardinality;
                        b.matches.splice(e++, 0, { fn: l ? "string" == typeof l ? new RegExp(l) : new function() { this.test = l } : new RegExp("."), cardinality: m ? m : 1, optionality: b.isOptional, newBlockMarker: void 0 === g || g.def !== (f.definitionSymbol || d), casing: f.casing, def: f.definitionSymbol || d, placeholder: f.placeholder, mask: d }), g = b.matches[e - 1]
                    }
                    b.matches.splice(e++, 0, { fn: f.validator ? "string" == typeof f.validator ? new RegExp(f.validator) : new function() { this.test = f.validator } : new RegExp("."), cardinality: f.cardinality, optionality: b.isOptional, newBlockMarker: void 0 === g || g.def !== (f.definitionSymbol || d), casing: f.casing, def: f.definitionSymbol || d, placeholder: f.placeholder, mask: d })
                } else b.matches.splice(e++, 0, { fn: null, cardinality: 0, optionality: b.isOptional, newBlockMarker: void 0 === g || g.def !== d, casing: null, def: c.staticDefinitionSymbol || d, placeholder: void 0 !== c.staticDefinitionSymbol ? d : void 0, mask: d }), r = !1
            }

            function f(a, b) { a.isGroup && (a.isGroup = !1, e(a, c.groupmarker.start, 0), b !== !0 && e(a, c.groupmarker.end)) }

            function g(a, b, c, d) { b.matches.length > 0 && (void 0 === d || d) && (c = b.matches[b.matches.length - 1], f(c)), e(b, a) }

            function h() {
                if (t.length > 0) {
                    if (m = t[t.length - 1], g(k, m, o, !m.isAlternator), m.isAlternator) {
                        n = t.pop();
                        for (var a = 0; a < n.matches.length; a++) n.matches[a].isGroup = !1;
                        t.length > 0 ? (m = t[t.length - 1], m.matches.push(n)) : s.matches.push(n)
                    }
                } else g(k, s, o)
            }

            function i(a) {
                function b(a) { return a === c.optionalmarker.start ? a = c.optionalmarker.end : a === c.optionalmarker.end ? a = c.optionalmarker.start : a === c.groupmarker.start ? a = c.groupmarker.end : a === c.groupmarker.end && (a = c.groupmarker.start), a }
                a.matches = a.matches.reverse();
                for (var d in a.matches) {
                    var e = parseInt(d);
                    if (a.matches[d].isQuantifier && a.matches[e + 1] && a.matches[e + 1].isGroup) {
                        var f = a.matches[d];
                        a.matches.splice(d, 1), a.matches.splice(e + 1, 0, f)
                    }
                    void 0 !== a.matches[d].matches ? a.matches[d] = i(a.matches[d]) : a.matches[d] = b(a.matches[d])
                }
                return a
            }
            for (var j, k, l, m, n, o, p, q = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, r = !1, s = new d, t = [], u = []; j = q.exec(b);)
                if (k = j[0], r) h();
                else switch (k.charAt(0)) {
                    case c.escapeChar:
                        r = !0;
                        break;
                    case c.optionalmarker.end:
                    case c.groupmarker.end:
                        if (l = t.pop(), void 0 !== l)
                            if (t.length > 0) {
                                if (m = t[t.length - 1], m.matches.push(l), m.isAlternator) {
                                    n = t.pop();
                                    for (var v = 0; v < n.matches.length; v++) n.matches[v].isGroup = !1;
                                    t.length > 0 ? (m = t[t.length - 1], m.matches.push(n)) : s.matches.push(n)
                                }
                            } else s.matches.push(l);
                        else h();
                        break;
                    case c.optionalmarker.start:
                        t.push(new d(!1, !0));
                        break;
                    case c.groupmarker.start:
                        t.push(new d(!0));
                        break;
                    case c.quantifiermarker.start:
                        var w = new d(!1, !1, !0);
                        k = k.replace(/[{}]/g, "");
                        var x = k.split(","),
                            y = isNaN(x[0]) ? x[0] : parseInt(x[0]),
                            z = 1 === x.length ? y : isNaN(x[1]) ? x[1] : parseInt(x[1]);
                        if (("*" === z || "+" === z) && (y = "*" === z ? 0 : 1), w.quantifier = { min: y, max: z }, t.length > 0) {
                            var A = t[t.length - 1].matches;
                            j = A.pop(), j.isGroup || (p = new d(!0), p.matches.push(j), j = p), A.push(j), A.push(w)
                        } else j = s.matches.pop(), j.isGroup || (p = new d(!0), p.matches.push(j), j = p), s.matches.push(j), s.matches.push(w);
                        break;
                    case c.alternatormarker:
                        t.length > 0 ? (m = t[t.length - 1], o = m.matches.pop()) : o = s.matches.pop(), o.isAlternator ? t.push(o) : (n = new d(!1, !1, !1, !0), n.matches.push(o), t.push(n));
                        break;
                    default:
                        h()
                }
            for (; t.length > 0;) l = t.pop(), f(l, !0), s.matches.push(l);
            return s.matches.length > 0 && (o = s.matches[s.matches.length - 1], f(o), u.push(s)), c.numericInput && i(u[0]), u
        }

        function f(f, g) {
            if (null === f || "" === f) return void 0;
            if (1 === f.length && c.greedy === !1 && 0 !== c.repeat && (c.placeholder = ""), c.repeat > 0 || "*" === c.repeat || "+" === c.repeat) {
                var h = "*" === c.repeat ? 0 : "+" === c.repeat ? 1 : c.repeat;
                f = c.groupmarker.start + f + c.groupmarker.end + c.quantifiermarker.start + h + "," + c.repeat + c.quantifiermarker.end
            }
            var i;
            return void 0 === b.prototype.masksCache[f] || d === !0 ? (i = { mask: f, maskToken: e(f), validPositions: {}, _buffer: void 0, buffer: void 0, tests: {}, metadata: g }, d !== !0 && (b.prototype.masksCache[c.numericInput ? f.split("").reverse().join("") : f] = i, i = a.extend(!0, {}, b.prototype.masksCache[c.numericInput ? f.split("").reverse().join("") : f]))) : i = a.extend(!0, {}, b.prototype.masksCache[c.numericInput ? f.split("").reverse().join("") : f]), i
        }

        function g(a) { return a = a.toString() }
        var h;
        if (a.isFunction(c.mask) && (c.mask = c.mask(c)), a.isArray(c.mask)) {
            if (c.mask.length > 1) { c.keepStatic = null === c.keepStatic ? !0 : c.keepStatic; var i = "("; return a.each(c.numericInput ? c.mask.reverse() : c.mask, function(b, c) { i.length > 1 && (i += ")|("), i += g(void 0 === c.mask || a.isFunction(c.mask) ? c : c.mask) }), i += ")", f(i, c.mask) }
            c.mask = c.mask.pop()
        }
        return c.mask && (h = void 0 === c.mask.mask || a.isFunction(c.mask.mask) ? f(g(c.mask), c.mask) : f(g(c.mask.mask), c.mask)), h
    }

    function h(e, f, g) {
        function i(a, b, c) {
            b = b || 0;
            var d, e, f, h = [],
                i = 0,
                j = o();
            do {
                if (a === !0 && m().validPositions[i]) {
                    var k = m().validPositions[i];
                    e = k.match, d = k.locator.slice(), h.push(c === !0 ? k.input : I(i, e))
                } else f = r(i, d, i - 1), e = f.match, d = f.locator.slice(), (g.jitMasking === !1 || j > i || isFinite(g.jitMasking) && g.jitMasking > i) && h.push(I(i, e));
                i++
            } while ((void 0 === ha || ha > i - 1) && null !== e.fn || null === e.fn && "" !== e.def || b >= i);
            return "" === h[h.length - 1] && h.pop(), h
        }

        function m() { return f }

        function n(a) {
            var b = m();
            b.buffer = void 0, a !== !0 && (b.tests = {}, b._buffer = void 0, b.validPositions = {}, b.p = 0)
        }

        function o(a, b) {
            var c = -1,
                d = -1,
                e = m().validPositions;
            void 0 === a && (a = -1);
            for (var f in e) {
                var g = parseInt(f);
                e[g] && (b || null !== e[g].match.fn) && (a >= g && (c = g), g >= a && (d = g))
            }
            return -1 !== c && a - c > 1 || a > d ? c : d
        }

        function p(b, c, d, e) {
            if (e || g.insertMode && void 0 !== m().validPositions[b] && void 0 === d) {
                var f, h = a.extend(!0, {}, m().validPositions),
                    i = o();
                for (f = b; i >= f; f++) delete m().validPositions[f];
                m().validPositions[b] = c;
                var j, k = !0,
                    l = m().validPositions;
                for (f = j = b; i >= f; f++) {
                    var p = h[f];
                    if (void 0 !== p)
                        for (var q = j, r = -1; q < D() && (null == p.match.fn && l[f] && (l[f].match.optionalQuantifier === !0 || l[f].match.optionality === !0) || null != p.match.fn);)
                            if (null === p.match.fn || !g.keepStatic && l[f] && (void 0 !== l[f + 1] && v(f + 1, l[f].locator.slice(), f).length > 1 || void 0 !== l[f].alternation) ? q++ : q = E(j), t(q, p.match.def)) { var s = B(q, p.input, !0, !0); if (k = s !== !1, j = s.caret || s.insert ? o() : q, k) break } else {
                                if (k = null == p.match.fn, r === q) break;
                                r = q
                            }
                    if (!k) break
                }
                if (!k) return m().validPositions = a.extend(!0, {}, h), n(!0), !1
            } else m().validPositions[b] = c;
            return n(!0), !0
        }

        function q(a, b, c, d) {
            function e(a) {
                var b = m().validPositions[a];
                if (void 0 !== b && null === b.match.fn) {
                    var c = m().validPositions[a - 1],
                        d = m().validPositions[a + 1];
                    return void 0 !== c && void 0 !== d
                }
                return !1
            }
            var f, h = a;
            for (m().p = a, f = b - 1; f >= h; f--) void 0 !== m().validPositions[f] && (c === !0 || !e(f) && g.canClearPosition(m(), f, o(), d, g) !== !1) && delete m().validPositions[f];
            for (n(!0), f = h + 1; f <= o();) {
                for (; void 0 !== m().validPositions[h];) h++;
                var i = m().validPositions[h];
                if (h > f && (f = h + 1), void 0 === m().validPositions[f] && C(f) || void 0 !== i) f++;
                else {
                    var j = r(f);
                    t(h, j.match.def) ? B(h, j.input || I(f), !0) !== !1 && (delete m().validPositions[f], f++) : C(f) || (f++, h--), h++
                }
            }
            n(!0)
        }

        function r(a, b, c) {
            var d = m().validPositions[a];
            if (void 0 === d)
                for (var e = v(a, b, c), f = o(), h = m().validPositions[f] || v(0)[0], i = void 0 !== h.alternation ? h.locator[h.alternation].toString().split(",") : [], j = 0; j < e.length && (d = e[j], !(d.match && (g.greedy && d.match.optionalQuantifier !== !0 || (d.match.optionality === !1 || d.match.newBlockMarker === !1) && d.match.optionalQuantifier !== !0) && (void 0 === h.alternation || h.alternation !== d.alternation || void 0 !== d.locator[h.alternation] && A(d.locator[h.alternation].toString().split(","), i)))); j++);
            return d
        }

        function s(a) { return m().validPositions[a] ? m().validPositions[a].match : v(a)[0].match }

        function t(a, b) {
            for (var c = !1, d = v(a), e = 0; e < d.length; e++)
                if (d[e].match && d[e].match.def === b) { c = !0; break }
            return c
        }

        function u(b, c) {
            var d, e;
            return (m().tests[b] || m().validPositions[b]) && a.each(m().tests[b] || [m().validPositions[b]], function(a, b) {
                var f = b.alternation ? b.locator[b.alternation].toString().indexOf(c) : -1;
                (void 0 === e || e > f) && -1 !== f && (d = b, e = f)
            }), d
        }

        function v(b, c, d) {
            function e(c, d, f, h) {
                function j(f, h, o) {
                    function p(b, c) { var d = 0 === a.inArray(b, c.matches); return d || a.each(c.matches, function(a, e) { return e.isQuantifier === !0 && (d = p(b, c.matches[a - 1])) ? !1 : void 0 }), d }

                    function q(a, b) { var c = u(a, b); return c ? c.locator.slice(c.alternation + 1) : [] }
                    if (i > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + m().mask;
                    if (i === b && void 0 === f.matches) return k.push({ match: f, locator: h.reverse(), cd: n }), !0;
                    if (void 0 !== f.matches) {
                        if (f.isGroup && o !== f) { if (f = j(c.matches[a.inArray(f, c.matches) + 1], h)) return !0 } else if (f.isOptional) {
                            var r = f;
                            if (f = e(f, d, h, o)) {
                                if (g = k[k.length - 1].match, !p(g, r)) return !0;
                                l = !0, i = b
                            }
                        } else if (f.isAlternator) {
                            var s, t = f,
                                v = [],
                                w = k.slice(),
                                x = h.length,
                                y = d.length > 0 ? d.shift() : -1;
                            if (-1 === y || "string" == typeof y) {
                                var z, A = i,
                                    B = d.slice(),
                                    C = [];
                                if ("string" == typeof y) C = y.split(",");
                                else
                                    for (z = 0; z < t.matches.length; z++) C.push(z);
                                for (var D = 0; D < C.length; D++) {
                                    if (z = parseInt(C[D]), k = [], d = q(i, z), f = j(t.matches[z] || c.matches[z], [z].concat(h), o) || f, f !== !0 && void 0 !== f && C[C.length - 1] < t.matches.length) {
                                        var E = a.inArray(f, c.matches) + 1;
                                        c.matches.length > E && (f = j(c.matches[E], [E].concat(h.slice(1, h.length)), o), f && (C.push(E.toString()), a.each(k, function(a, b) { b.alternation = h.length - 1 })))
                                    }
                                    s = k.slice(), i = A, k = [];
                                    for (var F = 0; F < B.length; F++) d[F] = B[F];
                                    for (var G = 0; G < s.length; G++) {
                                        var H = s[G];
                                        H.alternation = H.alternation || x;
                                        for (var I = 0; I < v.length; I++) { var J = v[I]; if (H.match.def === J.match.def && ("string" != typeof y || -1 !== a.inArray(H.locator[H.alternation].toString(), C))) { H.match.mask === J.match.mask && (s.splice(G, 1), G--), -1 === J.locator[H.alternation].toString().indexOf(H.locator[H.alternation]) && (J.locator[H.alternation] = J.locator[H.alternation] + "," + H.locator[H.alternation], J.alternation = H.alternation); break } }
                                    }
                                    v = v.concat(s)
                                }
                                "string" == typeof y && (v = a.map(v, function(b, c) {
                                    if (isFinite(c)) {
                                        var d, e = b.alternation,
                                            f = b.locator[e].toString().split(",");
                                        b.locator[e] = void 0, b.alternation = void 0;
                                        for (var g = 0; g < f.length; g++) d = -1 !== a.inArray(f[g], C), d && (void 0 !== b.locator[e] ? (b.locator[e] += ",", b.locator[e] += f[g]) : b.locator[e] = parseInt(f[g]), b.alternation = e);
                                        if (void 0 !== b.locator[e]) return b
                                    }
                                })), k = w.concat(v), i = b, l = k.length > 0
                            } else f = j(t.matches[y] || c.matches[y], [y].concat(h), o);
                            if (f) return !0
                        } else if (f.isQuantifier && o !== c.matches[a.inArray(f, c.matches) - 1])
                            for (var K = f, L = d.length > 0 ? d.shift() : 0; L < (isNaN(K.quantifier.max) ? L + 1 : K.quantifier.max) && b >= i; L++) { var M = c.matches[a.inArray(K, c.matches) - 1]; if (f = j(M, [L].concat(h), M)) { if (g = k[k.length - 1].match, g.optionalQuantifier = L > K.quantifier.min - 1, p(g, M)) { if (L > K.quantifier.min - 1) { l = !0, i = b; break } return !0 } return !0 } } else if (f = e(f, d, h, o)) return !0
                    } else i++
                }
                for (var o = d.length > 0 ? d.shift() : 0; o < c.matches.length; o++)
                    if (c.matches[o].isQuantifier !== !0) { var p = j(c.matches[o], [o].concat(f), h); if (p && i === b) return p; if (i > b) break }
            }

            function f(a) { var b = a[0] || a; return b.locator.slice() }
            var g, h = m().maskToken,
                i = c ? d : 0,
                j = c || [0],
                k = [],
                l = !1,
                n = c ? c.join("") : "";
            if (b > -1) {
                if (void 0 === c) {
                    for (var o, p = b - 1; void 0 === (o = m().validPositions[p] || m().tests[p]) && p > -1;) p--;
                    void 0 !== o && p > -1 && (j = f(o), n = j.join(""), o = o[0] || o, i = p)
                }
                if (m().tests[b] && m().tests[b][0].cd === n) return m().tests[b];
                for (var q = j.shift(); q < h.length; q++) { var r = e(h[q], j, [q]); if (r && i === b || i > b) break }
            }
            return (0 === k.length || l) && k.push({ match: { fn: null, cardinality: 0, optionality: !0, casing: null, def: "" }, locator: [] }), m().tests[b] = a.extend(!0, [], k), m().tests[b]
        }

        function w() { return void 0 === m()._buffer && (m()._buffer = i(!1, 1)), m()._buffer }

        function x(a) {
            if (void 0 === m().buffer || a === !0) {
                if (a === !0)
                    for (var b in m().tests) void 0 === m().validPositions[b] && delete m().tests[b];
                m().buffer = i(!0, o(), !0)
            }
            return m().buffer
        }

        function y(a, b, c) {
            var d;
            if (c = c, a === !0) n(), a = 0, b = c.length;
            else
                for (d = a; b > d; d++) delete m().validPositions[d], delete m().tests[d];
            for (d = a; b > d; d++) n(!0), c[d] !== g.skipOptionalPartCharacter && B(d, c[d], !0, !0)
        }

        function z(a, b) {
            switch (b.casing) {
                case "upper":
                    a = a.toUpperCase();
                    break;
                case "lower":
                    a = a.toLowerCase()
            }
            return a
        }

        function A(b, c) {
            for (var d = g.greedy ? c : c.slice(0, 1), e = !1, f = 0; f < b.length; f++)
                if (-1 !== a.inArray(b[f], d)) { e = !0; break }
            return e
        }

        function B(c, d, e, f) {
            function h(a) { return ja ? a.begin - a.end > 1 || a.begin - a.end === 1 && g.insertMode : a.end - a.begin > 1 || a.end - a.begin === 1 && g.insertMode }

            function i(b, d, e, f) {
                var i = !1;
                return a.each(v(b), function(j, k) {
                    for (var l = k.match, r = d ? 1 : 0, s = "", t = l.cardinality; t > r; t--) s += G(b - (t - 1));
                    if (d && (s += d), x(!0), i = null != l.fn ? l.fn.test(s, m(), b, e, g, h(c)) : d !== l.def && d !== g.skipOptionalPartCharacter || "" === l.def ? !1 : { c: l.placeholder || l.def, pos: b }, i !== !1) {
                        var u = void 0 !== i.c ? i.c : d;
                        u = u === g.skipOptionalPartCharacter && null === l.fn ? l.placeholder || l.def : u;
                        var v = b,
                            w = x();
                        if (void 0 !== i.remove && (a.isArray(i.remove) || (i.remove = [i.remove]), a.each(i.remove.sort(function(a, b) { return b - a }), function(a, b) { q(b, b + 1, !0) })), void 0 !== i.insert && (a.isArray(i.insert) || (i.insert = [i.insert]), a.each(i.insert.sort(function(a, b) { return a - b }), function(a, b) { B(b.pos, b.c, !1, f) })), i.refreshFromBuffer) { var A = i.refreshFromBuffer; if (e = !0, y(A === !0 ? A : A.start, A.end, w), void 0 === i.pos && void 0 === i.c) return i.pos = o(), !1; if (v = void 0 !== i.pos ? i.pos : b, v !== b) return i = a.extend(i, B(v, u, !0, f)), !1 } else if (i !== !0 && void 0 !== i.pos && i.pos !== b && (v = i.pos, y(b, v, x().slice()), v !== b)) return i = a.extend(i, B(v, u, !0)), !1;
                        return i !== !0 && void 0 === i.pos && void 0 === i.c ? !1 : (j > 0 && n(!0), p(v, a.extend({}, k, { input: z(u, l) }), f, h(c)) || (i = !1), !1)
                    }
                }), i
            }

            function j(b, c, d, e) {
                for (var f, h, i, j, k, l, p = a.extend(!0, {}, m().validPositions), q = a.extend(!0, {}, m().tests), s = o(); s >= 0 && (j = m().validPositions[s], !j || void 0 === j.alternation || (f = s, h = m().validPositions[f].alternation, r(f).locator[j.alternation] === j.locator[j.alternation])); s--);
                if (void 0 !== h) {
                    f = parseInt(f);
                    for (var t in m().validPositions)
                        if (t = parseInt(t), j = m().validPositions[t], t >= f && void 0 !== j.alternation) {
                            var v;
                            0 === f ? (v = [], a.each(m().tests[f], function(a, b) { void 0 !== b.locator[h] && (v = v.concat(b.locator[h].toString().split(","))) })) : v = m().validPositions[f].locator[h].toString().split(",");
                            var w = void 0 !== j.locator[h] ? j.locator[h] : v[0];
                            w.length > 0 && (w = w.split(",")[0]);
                            for (var x = 0; x < v.length; x++) {
                                var y = [],
                                    z = 0,
                                    A = 0;
                                if (w < v[x]) {
                                    for (var C, D, E = t; E >= 0; E--)
                                        if (C = m().validPositions[E], void 0 !== C) {
                                            var F = u(E, v[x]);
                                            m().validPositions[E].match.def !== F.match.def && (y.push(m().validPositions[E].input), m().validPositions[E] = F, m().validPositions[E].input = I(E), null === m().validPositions[E].match.fn && A++, C = F), D = C.locator[h], C.locator[h] = parseInt(v[x]);
                                            break
                                        }
                                    if (w !== C.locator[h]) {
                                        for (k = t + 1; k < o(void 0, !0) + 1; k++) l = m().validPositions[k], l && null != l.match.fn ? y.push(l.input) : b > k && z++, delete m().validPositions[k], delete m().tests[k];
                                        for (n(!0), g.keepStatic = !g.keepStatic, i = !0; y.length > 0;) { var G = y.shift(); if (G !== g.skipOptionalPartCharacter && !(i = B(o(void 0, !0) + 1, G, !1, e))) break }
                                        if (C.alternation = h, C.locator[h] = D, i) {
                                            var H = o(b) + 1;
                                            for (k = t + 1; k < o() + 1; k++) l = m().validPositions[k], (void 0 === l || null == l.match.fn) && b > k && A++;
                                            b += A - z, i = B(b > H ? H : b, c, d, e)
                                        }
                                        if (g.keepStatic = !g.keepStatic, i) return i;
                                        n(), m().validPositions = a.extend(!0, {}, p), m().tests = a.extend(!0, {}, q)
                                    }
                                }
                            }
                            break
                        }
                }
                return !1
            }

            function k(b, c) {
                for (var d = m().validPositions[c], e = d.locator, f = e.length, g = b; c > g; g++)
                    if (void 0 === m().validPositions[g] && !C(g, !0)) {
                        var h = v(g),
                            i = h[0],
                            j = -1;
                        a.each(h, function(a, b) { for (var c = 0; f > c && (void 0 !== b.locator[c] && A(b.locator[c].toString().split(","), e[c].toString().split(","))); c++) c > j && (j = c, i = b) }), p(g, a.extend({}, i, { input: i.match.placeholder || i.match.def }), !0)
                    }
            }
            e = e === !0;
            var l = c;
            void 0 !== c.begin && (l = ja && !h(c) ? c.end : c.begin);
            for (var s = !1, t = a.extend(!0, {}, m().validPositions), w = l - 1; w > -1 && !m().validPositions[w]; w--);
            var F;
            for (w++; l > w; w++) void 0 === m().validPositions[w] && (g.jitMasking === !1 || g.jitMasking > w) && ((F = r(w)).match.def === g.radixPointDefinitionSymbol || !C(w, !0) || a.inArray(g.radixPoint, x()) < w && F.match.fn && F.match.fn.test(I(w), m(), w, !1, g)) && i(o(w, !0) + 1, F.match.placeholder || (null == F.match.fn ? F.match.def : "" !== I(w) ? I(w) : x()[w]), !0, f);
            if (h(c) && (Q(void 0, b.keyCode.DELETE, c), l = m().p), l < D() && (s = i(l, d, e, f), (!e || f === !0) && s === !1)) {
                var H = m().validPositions[l];
                if (!H || null !== H.match.fn || H.match.def !== d && d !== g.skipOptionalPartCharacter) {
                    if ((g.insertMode || void 0 === m().validPositions[E(l)]) && !C(l, !0)) {
                        var J = r(l).match;
                        J = J.placeholder || J.def, i(l, J, e, f);
                        for (var K = l + 1, L = E(l); L >= K; K++)
                            if (s = i(K, d, e, f), s !== !1) { k(l, K), l = K; break }
                    }
                } else s = { caret: E(l) }
            }
            return s === !1 && g.keepStatic && (s = j(l, d, e, f)), s === !0 && (s = { pos: l }), a.isFunction(g.postValidation) && s !== !1 && !e && f !== !0 && (s = g.postValidation(x(!0), s, g) ? s : !1), void 0 === s.pos && (s.pos = l), s === !1 && (n(!0), m().validPositions = a.extend(!0, {}, t)), s
        }

        function C(a, b) { var c; if (b ? (c = r(a).match, "" === c.def && (c = s(a))) : c = s(a), null != c.fn) return c.fn; if (b !== !0 && a > -1 && !g.keepStatic && void 0 === m().validPositions[a]) { var d = v(a); return d.length > 2 } return !1 }

        function D() {
            var a;
            ha = void 0 !== fa ? fa.maxLength : void 0, -1 === ha && (ha = void 0);
            var b, c = o(),
                d = m().validPositions[c],
                e = void 0 !== d ? d.locator.slice() : void 0;
            for (b = c + 1; void 0 === d || null !== d.match.fn || null === d.match.fn && "" !== d.match.def; b++) d = r(b, e, b - 1), e = d.locator.slice();
            var f = s(b - 1);
            return a = "" !== f.def ? b : b - 1, void 0 === ha || ha > a ? a : ha
        }

        function E(a, b) { var c = D(); if (a >= c) return c; for (var d = a; ++d < c && (b === !0 && (s(d).newBlockMarker !== !0 || !C(d)) || b !== !0 && !C(d) && (g.nojumps !== !0 || g.nojumpsThreshold > d));); return d }

        function F(a, b) { var c = a; if (0 >= c) return 0; for (; --c > 0 && (b === !0 && s(c).newBlockMarker !== !0 || b !== !0 && !C(c));); return c }

        function G(a) { return void 0 === m().validPositions[a] ? I(a) : m().validPositions[a].input }

        function H(b, c, d, e, f) {
            if (e && a.isFunction(g.onBeforeWrite)) {
                var h = g.onBeforeWrite(e, c, d, g);
                if (h) {
                    if (h.refreshFromBuffer) {
                        var i = h.refreshFromBuffer;
                        y(i === !0 ? i : i.start, i.end, h.buffer || c), c = x(!0)
                    }
                    void 0 !== d && (d = void 0 !== h.caret ? h.caret : d)
                }
            }
            b.inputmask._valueSet(c.join("")), void 0 === d || void 0 !== e && "blur" === e.type || L(b, d), f === !0 && (la = !0, a(b).trigger("input"))
        }

        function I(a, b) {
            if (b = b || s(a), void 0 !== b.placeholder) return b.placeholder;
            if (null === b.fn) {
                if (a > -1 && !g.keepStatic && void 0 === m().validPositions[a]) {
                    var c, d = v(a),
                        e = 0;
                    if (d.length > 2)
                        for (var f = 0; f < d.length; f++)
                            if (d[f].match.optionality !== !0 && d[f].match.optionalQuantifier !== !0 && (null === d[f].match.fn || void 0 === c || d[f].match.fn.test(c.match.def, m(), a, !0, g) !== !1) && (e++, null === d[f].match.fn && (c = d[f]), e > 1)) return g.placeholder.charAt(a % g.placeholder.length)
                }
                return b.def
            }
            return g.placeholder.charAt(a % g.placeholder.length)
        }

        function J(c, d, e, f) {
            function h() {
                var a = !1,
                    b = w().slice(l, E(l)).join("").indexOf(k);
                if (-1 !== b && !C(l)) {
                    a = !0;
                    for (var c = w().slice(l, l + b), d = 0; d < c.length; d++)
                        if (" " !== c[d]) { a = !1; break }
                }
                return a
            }
            var i, j = f.slice(),
                k = "",
                l = 0;
            if (n(), m().p = E(-1), !e)
                if (g.autoUnmask !== !0) {
                    var p = w().slice(0, E(-1)).join(""),
                        q = j.join("").match(new RegExp("^" + b.escapeRegex(p), "g"));
                    q && q.length > 0 && (j.splice(0, q.length * p.length), l = E(l))
                } else l = E(l);
            a.each(j, function(b, d) {
                if (void 0 !== d) {
                    var f = new a.Event("keypress");
                    f.which = d.charCodeAt(0), k += d;
                    var j = o(void 0, !0),
                        p = m().validPositions[j],
                        q = r(j + 1, p ? p.locator.slice() : void 0, j);
                    if (!h() || e || g.autoUnmask) {
                        var s = e ? b : null == q.match.fn && q.match.optionality && j + 1 < m().p ? j + 1 : m().p;
                        i = S.call(c, f, !0, !1, e, s), l = s + 1, k = ""
                    } else i = S.call(c, f, !0, !1, !0, j + 1);
                    if (!e && a.isFunction(g.onBeforeWrite) && (i = g.onBeforeWrite(f, x(), i.forwardPosition, g), i && i.refreshFromBuffer)) {
                        var t = i.refreshFromBuffer;
                        y(t === !0 ? t : t.start, t.end, i.buffer), n(!0), i.caret && (m().p = i.caret)
                    }
                }
            }), d && H(c, x(), document.activeElement === c ? E(o(0)) : void 0, new a.Event("checkval"))
        }

        function K(b) {
            if (b && void 0 === b.inputmask) return b.value;
            var c = [],
                d = m().validPositions;
            for (var e in d) d[e].match && null != d[e].match.fn && c.push(d[e].input);
            var f = 0 === c.length ? null : (ja ? c.reverse() : c).join("");
            if (null !== f) {
                var h = (ja ? x().slice().reverse() : x()).join("");
                a.isFunction(g.onUnMask) && (f = g.onUnMask(h, f, g) || f)
            }
            return f
        }

        function L(a, b, c, d) {
            function e(a) {
                if (d !== !0 && ja && "number" == typeof a && (!g.greedy || "" !== g.placeholder)) {
                    var b = x().join("").length;
                    a = b - a
                }
                return a
            }
            var f;
            if ("number" != typeof b) return a.setSelectionRange ? (b = a.selectionStart, c = a.selectionEnd) : window.getSelection ? (f = window.getSelection().getRangeAt(0), (f.commonAncestorContainer.parentNode === a || f.commonAncestorContainer === a) && (b = f.startOffset, c = f.endOffset)) : document.selection && document.selection.createRange && (f = document.selection.createRange(), b = 0 - f.duplicate().moveStart("character", -a.inputmask._valueGet().length), c = b + f.text.length), { begin: e(b), end: e(c) };
            b = e(b), c = e(c), c = "number" == typeof c ? c : b;
            var h = parseInt(((a.ownerDocument.defaultView || window).getComputedStyle ? (a.ownerDocument.defaultView || window).getComputedStyle(a, null) : a.currentStyle).fontSize) * c;
            if (a.scrollLeft = h > a.scrollWidth ? h : 0, j || g.insertMode !== !1 || b !== c || c++, a.setSelectionRange) a.selectionStart = b, a.selectionEnd = c;
            else if (window.getSelection) {
                if (f = document.createRange(), void 0 === a.firstChild || null === a.firstChild) {
                    var i = document.createTextNode("");
                    a.appendChild(i)
                }
                f.setStart(a.firstChild, b < a.inputmask._valueGet().length ? b : a.inputmask._valueGet().length), f.setEnd(a.firstChild, c < a.inputmask._valueGet().length ? c : a.inputmask._valueGet().length), f.collapse(!0);
                var k = window.getSelection();
                k.removeAllRanges(), k.addRange(f)
            } else a.createTextRange && (f = a.createTextRange(), f.collapse(!0), f.moveEnd("character", c), f.moveStart("character", b), f.select())
        }

        function M(b) {
            var c, d, e = x(),
                f = e.length,
                g = o(),
                h = {},
                i = m().validPositions[g],
                j = void 0 !== i ? i.locator.slice() : void 0;
            for (c = g + 1; c < e.length; c++) d = r(c, j, c - 1), j = d.locator.slice(), h[c] = a.extend(!0, {}, d);
            var k = i && void 0 !== i.alternation ? i.locator[i.alternation] : void 0;
            for (c = f - 1; c > g && (d = h[c], (d.match.optionality || d.match.optionalQuantifier || k && (k !== h[c].locator[i.alternation] && null != d.match.fn || null === d.match.fn && d.locator[i.alternation] && A(d.locator[i.alternation].toString().split(","), k.toString().split(",")) && "" !== v(c)[0].def)) && e[c] === I(c, d.match)); c--) f--;
            return b ? { l: f, def: h[f] ? h[f].match : void 0 } : f
        }

        function N(a) { for (var b = M(), c = a.length - 1; c > b && !C(c); c--); return a.splice(b, c + 1 - b), a }

        function O(b) {
            if (a.isFunction(g.isComplete)) return g.isComplete(b, g);
            if ("*" === g.repeat) return void 0;
            var c = !1,
                d = M(!0),
                e = F(d.l);
            if (void 0 === d.def || d.def.newBlockMarker || d.def.optionality || d.def.optionalQuantifier) { c = !0; for (var f = 0; e >= f; f++) { var h = r(f).match; if (null !== h.fn && void 0 === m().validPositions[f] && h.optionality !== !0 && h.optionalQuantifier !== !0 || null === h.fn && b[f] !== I(f, h)) { c = !1; break } } }
            return c
        }

        function P(b) {
            function c(b) {
                if (a.valHooks && (void 0 === a.valHooks[b] || a.valHooks[b].inputmaskpatch !== !0)) {
                    var c = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function(a) { return a.value },
                        d = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function(a, b) { return a.value = b, a };
                    a.valHooks[b] = { get: function(a) { if (a.inputmask) { if (a.inputmask.opts.autoUnmask) return a.inputmask.unmaskedvalue(); var b = c(a); return -1 !== o() || g.nullable !== !0 ? b : "" } return c(a) }, set: function(b, c) { var e, f = a(b); return e = d(b, c), b.inputmask && f.trigger("setvalue"), e }, inputmaskpatch: !0 }
                }
            }

            function d() { return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== o() || g.nullable !== !0 ? document.activeElement === this && g.clearMaskOnLostFocus ? (ja ? N(x().slice()).reverse() : N(x().slice())).join("") : h.call(this) : "" : h.call(this) }

            function e(b) { i.call(this, b), this.inputmask && a(this).trigger("setvalue") }

            function f(b) {
                oa.on(b, "mouseenter", function(b) {
                    var c = a(this),
                        d = this,
                        e = d.inputmask._valueGet();
                    e !== x().join("") && c.trigger("setvalue")
                })
            }
            var h, i;
            if (!b.inputmask.__valueGet) {
                if (Object.getOwnPropertyDescriptor) {
                    var j = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(b), "value") : void 0;
                    j && j.get && j.set ? (h = j.get, i = j.set, Object.defineProperty(b, "value", { get: d, set: e, configurable: !0 })) : "INPUT" !== b.tagName && (h = function() { return this.textContent }, i = function(a) { this.textContent = a }, Object.defineProperty(b, "value", { get: d, set: e, configurable: !0 }))
                } else document.__lookupGetter__ && b.__lookupGetter__("value") && (h = b.__lookupGetter__("value"), i = b.__lookupSetter__("value"), b.__defineGetter__("value", d), b.__defineSetter__("value", e));
                void 0 === h && (h = function() { return b.value }, i = function(a) { b.value = a }, c(b.type), f(b)), b.inputmask.__valueGet = h, b.inputmask._valueGet = function(a) { return ja && a !== !0 ? h.call(this.el).split("").reverse().join("") : h.call(this.el) }, b.inputmask.__valueSet = i, b.inputmask._valueSet = function(a, b) { i.call(this.el, null === a || void 0 === a ? "" : b !== !0 && ja ? a.split("").reverse().join("") : a) }
            }
        }

        function Q(c, d, e, f) {
            function h() {
                if (g.keepStatic) {
                    n(!0);
                    var b, d = [],
                        e = a.extend(!0, {}, m().validPositions);
                    for (b = o(); b >= 0; b--) { var f = m().validPositions[b]; if (f && (null != f.match.fn && d.push(f.input), delete m().validPositions[b], void 0 !== f.alternation && f.locator[f.alternation] === r(b).locator[f.alternation])) break }
                    if (b > -1)
                        for (; d.length > 0;) {
                            m().p = E(o());
                            var h = new a.Event("keypress");
                            h.which = d.pop().charCodeAt(0), S.call(c, h, !0, !1, !1, m().p)
                        } else m().validPositions = a.extend(!0, {}, e)
                }
            }
            if ((g.numericInput || ja) && (d === b.keyCode.BACKSPACE ? d = b.keyCode.DELETE : d === b.keyCode.DELETE && (d = b.keyCode.BACKSPACE), ja)) {
                var i = e.end;
                e.end = e.begin, e.begin = i
            }
            d === b.keyCode.BACKSPACE && (e.end - e.begin < 1 || g.insertMode === !1) ? (e.begin = F(e.begin), void 0 === m().validPositions[e.begin] || m().validPositions[e.begin].input !== g.groupSeparator && m().validPositions[e.begin].input !== g.radixPoint || e.begin--) : d === b.keyCode.DELETE && e.begin === e.end && (e.end = C(e.end) ? e.end + 1 : E(e.end) + 1, void 0 === m().validPositions[e.begin] || m().validPositions[e.begin].input !== g.groupSeparator && m().validPositions[e.begin].input !== g.radixPoint || e.end++), q(e.begin, e.end, !1, f), f !== !0 && h();
            var j = o(e.begin);
            j < e.begin ? (-1 === j && n(), m().p = E(j)) : f !== !0 && (m().p = e.begin)
        }

        function R(d) {
            var e = this,
                f = a(e),
                h = d.keyCode,
                i = L(e);
            if (h === b.keyCode.BACKSPACE || h === b.keyCode.DELETE || l && h === b.keyCode.BACKSPACE_SAFARI || d.ctrlKey && h === b.keyCode.X && !c("cut")) d.preventDefault(), Q(e, h, i), H(e, x(), m().p, d, ea !== x().join("")), e.inputmask._valueGet() === w().join("") ? f.trigger("cleared") : O(x()) === !0 && f.trigger("complete"), g.showTooltip && (e.title = g.tooltip || m().mask);
            else if (h === b.keyCode.END || h === b.keyCode.PAGE_DOWN) {
                d.preventDefault();
                var j = E(o());
                g.insertMode || j !== D() || d.shiftKey || j--, L(e, d.shiftKey ? i.begin : j, j, !0)
            } else h === b.keyCode.HOME && !d.shiftKey || h === b.keyCode.PAGE_UP ? (d.preventDefault(), L(e, 0, d.shiftKey ? i.begin : 0, !0)) : (g.undoOnEscape && h === b.keyCode.ESCAPE || 90 === h && d.ctrlKey) && d.altKey !== !0 ? (J(e, !0, !1, ea.split("")), f.trigger("click")) : h !== b.keyCode.INSERT || d.shiftKey || d.ctrlKey ? g.tabThrough === !0 && h === b.keyCode.TAB ? (d.shiftKey === !0 ? (null === s(i.begin).fn && (i.begin = E(i.begin)), i.end = F(i.begin, !0), i.begin = F(i.end, !0)) : (i.begin = E(i.begin, !0), i.end = E(i.begin, !0), i.end < D() && i.end--), i.begin < D() && (d.preventDefault(), L(e, i.begin, i.end))) : g.insertMode !== !1 || d.shiftKey || (h === b.keyCode.RIGHT ? setTimeout(function() {
                var a = L(e);
                L(e, a.begin)
            }, 0) : h === b.keyCode.LEFT && setTimeout(function() {
                var a = L(e);
                L(e, ja ? a.begin + 1 : a.begin - 1)
            }, 0)) : (g.insertMode = !g.insertMode, L(e, g.insertMode || i.begin !== D() ? i.begin : i.begin - 1));
            g.onKeyDown.call(this, d, x(), L(e).begin, g), ma = -1 !== a.inArray(h, g.ignorables)
        }

        function S(c, d, e, f, h) {
            var i = this,
                j = a(i),
                k = c.which || c.charCode || c.keyCode;
            if (!(d === !0 || c.ctrlKey && c.altKey) && (c.ctrlKey || c.metaKey || ma)) return k === b.keyCode.ENTER && ea !== x().join("") && (ea = x().join(""), setTimeout(function() { j.trigger("change") }, 0)), !0;
            if (k) {
                46 === k && c.shiftKey === !1 && "," === g.radixPoint && (k = 44);
                var l, o = d ? { begin: h, end: h } : L(i),
                    p = String.fromCharCode(k);
                m().writeOutBuffer = !0;
                var q = B(o, p, f);
                if (q !== !1) {
                    var r = q.pos;
                    if (n(!0), void 0 !== q.caret) l = q.caret;
                    else {
                        var s = m().validPositions;
                        l = !g.keepStatic && (void 0 !== s[r + 1] && v(r + 1, s[r].locator.slice(), r).length > 1 || void 0 !== s[r].alternation) ? r + 1 : E(r)
                    }
                    m().p = l
                }
                if (e !== !1) {
                    var t = this;
                    if (setTimeout(function() { g.onKeyValidation.call(t, k, q, g) }, 0), m().writeOutBuffer && q !== !1) {
                        var u = x();
                        H(i, u, g.numericInput && void 0 === q.caret ? F(l) : l, c, d !== !0), d !== !0 && setTimeout(function() { O(u) === !0 && j.trigger("complete") }, 0)
                    }
                }
                if (g.showTooltip && (i.title = g.tooltip || m().mask), c.preventDefault(), d) return q.forwardPosition = l, q
            }
        }

        function T(b) {
            var c, d = this,
                e = b.originalEvent || b,
                f = a(d),
                h = d.inputmask._valueGet(!0),
                i = L(d);
            ja && (c = i.end, i.end = i.begin, i.begin = c);
            var j = h.substr(0, i.begin),
                k = h.substr(i.end, h.length);
            j === (ja ? w().reverse() : w()).slice(0, i.begin).join("") && (j = ""), k === (ja ? w().reverse() : w()).slice(i.end).join("") && (k = ""), ja && (c = j, j = k, k = c), window.clipboardData && window.clipboardData.getData ? h = j + window.clipboardData.getData("Text") + k : e.clipboardData && e.clipboardData.getData && (h = j + e.clipboardData.getData("text/plain") + k);
            var l = h;
            if (a.isFunction(g.onBeforePaste)) {
                if (l = g.onBeforePaste(h, g), l === !1) return b.preventDefault();
                l || (l = h)
            }
            return J(d, !1, !1, ja ? l.split("").reverse() : l.toString().split("")), H(d, x(), E(o()), b, !0), O(x()) === !0 && f.trigger("complete"), b.preventDefault()
        }

        function U(c) {
            var d = this,
                e = d.inputmask._valueGet();
            if (x().join("") !== e) {
                var f = L(d);
                if (e = e.replace(new RegExp("(" + b.escapeRegex(w().join("")) + ")*"), ""), k) { var g = e.replace(x().join(""), ""); if (1 === g.length) { var h = new a.Event("keypress"); return h.which = g.charCodeAt(0), S.call(d, h, !0, !0, !1, m().validPositions[f.begin - 1] ? f.begin : f.begin - 1), !1 } }
                if (f.begin > e.length && (L(d, e.length), f = L(d)), x().length - e.length !== 1 || e.charAt(f.begin) === x()[f.begin] || e.charAt(f.begin + 1) === x()[f.begin] || C(f.begin)) {
                    for (var i = o() + 1, j = x().slice(i).join(""); null === e.match(b.escapeRegex(j) + "$");) j = j.slice(1);
                    e = e.replace(j, ""), e = e.split(""), J(d, !0, !1, e), O(x()) === !0 && a(d).trigger("complete")
                } else c.keyCode = b.keyCode.BACKSPACE, R.call(d, c);
                c.preventDefault()
            }
        }

        function V(b) {
            var c = this,
                d = c.inputmask._valueGet();
            J(c, !0, !1, (a.isFunction(g.onBeforeMask) ? g.onBeforeMask(d, g) || d : d).split("")), ea = x().join(""), (g.clearMaskOnLostFocus || g.clearIncomplete) && c.inputmask._valueGet() === w().join("") && c.inputmask._valueSet("")
        }

        function W(a) {
            var b = this,
                c = b.inputmask._valueGet();
            g.showMaskOnFocus && (!g.showMaskOnHover || g.showMaskOnHover && "" === c) ? b.inputmask._valueGet() !== x().join("") && H(b, x(), E(o())) : na === !1 && L(b, E(o())), g.positionCaretOnTab === !0 && setTimeout(function() { L(b, E(o())) }, 0), ea = x().join("")
        }

        function X(a) {
            var b = this;
            if (na = !1, g.clearMaskOnLostFocus && document.activeElement !== b) {
                var c = x().slice(),
                    d = b.inputmask._valueGet();
                d !== b.getAttribute("placeholder") && "" !== d && (-1 === o() && d === w().join("") ? c = [] : N(c), H(b, c))
            }
        }

        function Y(b) {
            function c(b) {
                if (g.radixFocus && "" !== g.radixPoint) {
                    var c = m().validPositions;
                    if (void 0 === c[b] || c[b].input === I(b)) {
                        if (b < E(-1)) return !0;
                        var d = a.inArray(g.radixPoint, x());
                        if (-1 !== d) {
                            for (var e in c)
                                if (e > d && c[e].input !== I(e)) return !1;
                            return !0
                        }
                    }
                }
                return !1
            }
            var d = this;
            setTimeout(function() {
                if (document.activeElement === d) {
                    var b = L(d);
                    if (b.begin === b.end)
                        if (c(b.begin)) L(d, g.numericInput ? E(a.inArray(g.radixPoint, x())) : a.inArray(g.radixPoint, x()));
                        else {
                            var e = b.begin,
                                f = o(e, !0),
                                h = E(f);
                            if (h > e) L(d, C(e) || C(e - 1) ? e : E(e));
                            else {
                                var i = I(h);
                                ("" !== i && x()[h] !== i || !C(h, !0) && s(h).def === i) && (h = E(h)),
                                L(d, h)
                            }
                        }
                }
            }, 0)
        }

        function Z(a) {
            var b = this;
            setTimeout(function() { L(b, 0, E(o())) }, 0)
        }

        function $(c) {
            var d = this,
                e = a(d),
                f = L(d),
                h = c.originalEvent || c,
                i = window.clipboardData || h.clipboardData,
                j = ja ? x().slice(f.end, f.begin) : x().slice(f.begin, f.end);
            i.setData("text", ja ? j.reverse().join("") : j.join("")), document.execCommand && document.execCommand("copy"), Q(d, b.keyCode.DELETE, f), H(d, x(), m().p, c, ea !== x().join("")), d.inputmask._valueGet() === w().join("") && e.trigger("cleared"), g.showTooltip && (d.title = g.tooltip || m().mask)
        }

        function _(b) {
            var c = a(this),
                d = this;
            if (d.inputmask) {
                var e = d.inputmask._valueGet(),
                    f = x().slice();
                ea !== f.join("") && setTimeout(function() { c.trigger("change"), ea = f.join("") }, 0), "" !== e && (g.clearMaskOnLostFocus && (-1 === o() && e === w().join("") ? f = [] : N(f)), O(f) === !1 && (setTimeout(function() { c.trigger("incomplete") }, 0), g.clearIncomplete && (n(), f = g.clearMaskOnLostFocus ? [] : w().slice())), H(d, f, void 0, b))
            }
        }

        function aa(a) {
            var b = this;
            na = !0, document.activeElement !== b && g.showMaskOnHover && b.inputmask._valueGet() !== x().join("") && H(b, x())
        }

        function ba(a) { ea !== x().join("") && ga.trigger("change"), g.clearMaskOnLostFocus && -1 === o() && fa.inputmask._valueGet && fa.inputmask._valueGet() === w().join("") && fa.inputmask._valueSet(""), g.removeMaskOnSubmit && (fa.inputmask._valueSet(fa.inputmask.unmaskedvalue(), !0), setTimeout(function() { H(fa, x()) }, 0)) }

        function ca(a) { setTimeout(function() { ga.trigger("setvalue") }, 0) }

        function da(b) {
            if (fa = b, ga = a(fa), g.showTooltip && (fa.title = g.tooltip || m().mask), ("rtl" === fa.dir || g.rightAlign) && (fa.style.textAlign = "right"), ("rtl" === fa.dir || g.numericInput) && (fa.dir = "ltr", fa.removeAttribute("dir"), fa.inputmask.isRTL = !0, ja = !0), oa.off(fa), P(fa), d(fa, g) && (oa.on(fa, "submit", ba), oa.on(fa, "reset", ca), oa.on(fa, "mouseenter", aa), oa.on(fa, "blur", _), oa.on(fa, "focus", W), oa.on(fa, "mouseleave", X), oa.on(fa, "click", Y), oa.on(fa, "dblclick", Z), oa.on(fa, "paste", T), oa.on(fa, "dragdrop", T), oa.on(fa, "drop", T), oa.on(fa, "cut", $), oa.on(fa, "complete", g.oncomplete), oa.on(fa, "incomplete", g.onincomplete), oa.on(fa, "cleared", g.oncleared), oa.on(fa, "keydown", R), oa.on(fa, "keypress", S), oa.on(fa, "input", U)), oa.on(fa, "setvalue", V), "" !== fa.inputmask._valueGet() || g.clearMaskOnLostFocus === !1 || document.activeElement === fa) {
                var c = a.isFunction(g.onBeforeMask) ? g.onBeforeMask(fa.inputmask._valueGet(), g) || fa.inputmask._valueGet() : fa.inputmask._valueGet();
                J(fa, !0, !1, c.split(""));
                var e = x().slice();
                ea = e.join(""), O(e) === !1 && g.clearIncomplete && n(), g.clearMaskOnLostFocus && document.activeElement !== fa && (-1 === o() ? e = [] : N(e)), H(fa, e), document.activeElement === fa && L(fa, E(o()))
            }
        }
        var ea, fa, ga, ha, ia, ja = !1,
            ka = !1,
            la = !1,
            ma = !1,
            na = !0,
            oa = {
                on: function(c, d, e) {
                    var f = function(c) {
                        if (void 0 === this.inputmask && "FORM" !== this.nodeName) {
                            var d = a.data(this, "_inputmask_opts");
                            d ? new b(d).mask(this) : oa.off(this)
                        } else {
                            if ("setvalue" === c.type || !(this.disabled || this.readOnly && !("keydown" === c.type && c.ctrlKey && 67 === c.keyCode || g.tabThrough === !1 && c.keyCode === b.keyCode.TAB))) {
                                switch (c.type) {
                                    case "input":
                                        if (la === !0) return la = !1, c.preventDefault();
                                        break;
                                    case "keydown":
                                        ka = !1, la = !1;
                                        break;
                                    case "keypress":
                                        if (ka === !0) return c.preventDefault();
                                        ka = !0;
                                        break;
                                    case "click":
                                        if (k) { var f = this; return setTimeout(function() { e.apply(f, arguments) }, 0), !1 }
                                }
                                var h = e.apply(this, arguments);
                                return h === !1 && (c.preventDefault(), c.stopPropagation()), h
                            }
                            c.preventDefault()
                        }
                    };
                    c.inputmask.events[d] = c.inputmask.events[d] || [], c.inputmask.events[d].push(f), -1 !== a.inArray(d, ["submit", "reset"]) ? null != c.form && a(c.form).on(d, f) : a(c).on(d, f)
                },
                off: function(b, c) {
                    if (b.inputmask && b.inputmask.events) {
                        var d;
                        c ? (d = [], d[c] = b.inputmask.events[c]) : d = b.inputmask.events, a.each(d, function(c, d) {
                            for (; d.length > 0;) { var e = d.pop(); - 1 !== a.inArray(c, ["submit", "reset"]) ? null != b.form && a(b.form).off(c, e) : a(b).off(c, e) }
                            delete b.inputmask.events[c]
                        })
                    }
                }
            };
        if (void 0 !== e) switch (e.action) {
            case "isComplete":
                return fa = e.el, O(x());
            case "unmaskedvalue":
                return fa = e.el, void 0 !== fa && void 0 !== fa.inputmask ? (f = fa.inputmask.maskset, g = fa.inputmask.opts, ja = fa.inputmask.isRTL) : (ia = e.value, g.numericInput && (ja = !0), ia = (a.isFunction(g.onBeforeMask) ? g.onBeforeMask(ia, g) || ia : ia).split(""), J(void 0, !1, !1, ja ? ia.reverse() : ia), a.isFunction(g.onBeforeWrite) && g.onBeforeWrite(void 0, x(), 0, g)), K(fa);
            case "mask":
                fa = e.el, f = fa.inputmask.maskset, g = fa.inputmask.opts, ja = fa.inputmask.isRTL, ea = x().join(""), da(fa);
                break;
            case "format":
                return g.numericInput && (ja = !0), ia = (a.isFunction(g.onBeforeMask) ? g.onBeforeMask(e.value, g) || e.value : e.value).split(""), J(void 0, !1, !1, ja ? ia.reverse() : ia), a.isFunction(g.onBeforeWrite) && g.onBeforeWrite(void 0, x(), 0, g), e.metadata ? { value: ja ? x().slice().reverse().join("") : x().join(""), metadata: h({ action: "getmetadata" }, f, g) } : ja ? x().slice().reverse().join("") : x().join("");
            case "isValid":
                g.numericInput && (ja = !0), e.value ? (ia = e.value.split(""), J(void 0, !1, !0, ja ? ia.reverse() : ia)) : e.value = x().join("");
                for (var pa = x(), qa = M(), ra = pa.length - 1; ra > qa && !C(ra); ra--);
                return pa.splice(qa, ra + 1 - qa), O(pa) && e.value === x().join("");
            case "getemptymask":
                return w().join("");
            case "remove":
                fa = e.el, ga = a(fa), f = fa.inputmask.maskset, g = fa.inputmask.opts, fa.inputmask._valueSet(K(fa)), oa.off(fa);
                var sa;
                Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (sa = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(fa), "value"), sa && fa.inputmask.__valueGet && Object.defineProperty(fa, "value", { get: fa.inputmask.__valueGet, set: fa.inputmask.__valueSet, configurable: !0 })) : document.__lookupGetter__ && fa.__lookupGetter__("value") && fa.inputmask.__valueGet && (fa.__defineGetter__("value", fa.inputmask.__valueGet), fa.__defineSetter__("value", fa.inputmask.__valueSet)), fa.inputmask = void 0;
                break;
            case "getmetadata":
                if (a.isArray(f.metadata)) {
                    for (var ta, ua = o(void 0, !0), va = ua; va >= 0; va--)
                        if (m().validPositions[va] && void 0 !== m().validPositions[va].alternation) { ta = m().validPositions[va].alternation; break }
                    return void 0 !== ta ? f.metadata[m().validPositions[va].locator[ta]] : []
                }
                return f.metadata
        }
    }
    b.prototype = {
        defaults: { placeholder: "_", optionalmarker: { start: "[", end: "]" }, quantifiermarker: { start: "{", end: "}" }, groupmarker: { start: "(", end: ")" }, alternatormarker: "|", escapeChar: "\\", mask: null, oncomplete: a.noop, onincomplete: a.noop, oncleared: a.noop, repeat: 0, greedy: !0, autoUnmask: !1, removeMaskOnSubmit: !1, clearMaskOnLostFocus: !0, insertMode: !0, clearIncomplete: !1, aliases: {}, alias: null, onKeyDown: a.noop, onBeforeMask: null, onBeforePaste: function(b, c) { return a.isFunction(c.onBeforeMask) ? c.onBeforeMask(b, c) : b }, onBeforeWrite: null, onUnMask: null, showMaskOnFocus: !0, showMaskOnHover: !0, onKeyValidation: a.noop, skipOptionalPartCharacter: " ", showTooltip: !1, tooltip: void 0, numericInput: !1, rightAlign: !1, undoOnEscape: !0, radixPoint: "", radixPointDefinitionSymbol: void 0, groupSeparator: "", radixFocus: !1, nojumps: !1, nojumpsThreshold: 0, keepStatic: null, positionCaretOnTab: !1, tabThrough: !1, supportsInputType: ["text", "tel", "password"], definitions: { 9: { validator: "[0-9]", cardinality: 1, definitionSymbol: "*" }, a: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1, definitionSymbol: "*" }, "*": { validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1 } }, ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123], isComplete: null, canClearPosition: a.noop, postValidation: null, staticDefinitionSymbol: void 0, jitMasking: !1, nullable: !0 },
        masksCache: {},
        mask: function(c) {
            var d = this;
            return "string" == typeof c && (c = document.getElementById(c) || document.querySelectorAll(c)), c = c.nodeName ? [c] : c, a.each(c, function(c, e) {
                var i = a.extend(!0, {}, d.opts);
                f(e, i, a.extend(!0, {}, d.userOptions));
                var j = g(i, d.noMasksCache);
                void 0 !== j && (void 0 !== e.inputmask && e.inputmask.remove(), e.inputmask = new b, e.inputmask.opts = i, e.inputmask.noMasksCache = d.noMasksCache, e.inputmask.userOptions = a.extend(!0, {}, d.userOptions), e.inputmask.el = e, e.inputmask.maskset = j, e.inputmask.isRTL = !1, a.data(e, "_inputmask_opts", i), h({ action: "mask", el: e }))
            }), c && c[0] ? c[0].inputmask || this : this
        },
        option: function(b) { return "string" == typeof b ? this.opts[b] : "object" == typeof b ? (a.extend(this.opts, b), a.extend(this.userOptions, b), this.el && (void 0 !== b.mask || void 0 !== b.alias ? this.mask(this.el) : (a.data(this.el, "_inputmask_opts", this.opts), h({ action: "mask", el: this.el }))), this) : void 0 },
        unmaskedvalue: function(a) { return h({ action: "unmaskedvalue", el: this.el, value: a }, this.el && this.el.inputmask ? this.el.inputmask.maskset : g(this.opts, this.noMasksCache), this.opts) },
        remove: function() { return this.el ? (h({ action: "remove", el: this.el }), this.el.inputmask = void 0, this.el) : void 0 },
        getemptymask: function() { return h({ action: "getemptymask" }, this.maskset || g(this.opts, this.noMasksCache), this.opts) },
        hasMaskedValue: function() { return !this.opts.autoUnmask },
        isComplete: function() { return h({ action: "isComplete", el: this.el }, this.maskset || g(this.opts, this.noMasksCache), this.opts) },
        getmetadata: function() { return h({ action: "getmetadata" }, this.maskset || g(this.opts, this.noMasksCache), this.opts) },
        isValid: function(a) { return h({ action: "isValid", value: a }, this.maskset || g(this.opts, this.noMasksCache), this.opts) },
        format: function(a, b) { return h({ action: "format", value: a, metadata: b }, this.maskset || g(this.opts, this.noMasksCache), this.opts) }
    }, b.extendDefaults = function(c) { a.extend(!0, b.prototype.defaults, c) }, b.extendDefinitions = function(c) { a.extend(!0, b.prototype.defaults.definitions, c) }, b.extendAliases = function(c) { a.extend(!0, b.prototype.defaults.aliases, c) }, b.format = function(a, c, d) { return b(c).format(a, d) }, b.unmask = function(a, c) { return b(c).unmaskedvalue(a) }, b.isValid = function(a, c) { return b(c).isValid(a) }, b.remove = function(b) { a.each(b, function(a, b) { b.inputmask && b.inputmask.remove() }) }, b.escapeRegex = function(a) { var b = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"]; return a.replace(new RegExp("(\\" + b.join("|\\") + ")", "gim"), "\\$1") }, b.keyCode = { ALT: 18, BACKSPACE: 8, BACKSPACE_SAFARI: 127, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91, X: 88 };
    var i = navigator.userAgent,
        j = /mobile/i.test(i),
        k = /iemobile/i.test(i),
        l = /iphone/i.test(i) && !k;
    /android.*safari.*/i.test(i) && !k;
    return window.Inputmask = b, b
}(jQuery),
function(a, b) {
    return void 0 === a.fn.inputmask && (a.fn.inputmask = function(c, d) {
        var e, f = this[0];
        if (void 0 === d && (d = {}), "string" == typeof c) switch (c) {
            case "unmaskedvalue":
                return f && f.inputmask ? f.inputmask.unmaskedvalue() : a(f).val();
            case "remove":
                return this.each(function() { this.inputmask && this.inputmask.remove() });
            case "getemptymask":
                return f && f.inputmask ? f.inputmask.getemptymask() : "";
            case "hasMaskedValue":
                return f && f.inputmask ? f.inputmask.hasMaskedValue() : !1;
            case "isComplete":
                return f && f.inputmask ? f.inputmask.isComplete() : !0;
            case "getmetadata":
                return f && f.inputmask ? f.inputmask.getmetadata() : void 0;
            case "setvalue":
                a(f).val(d), f && void 0 !== f.inputmask && a(f).triggerHandler("setvalue");
                break;
            case "option":
                if ("string" != typeof d) return this.each(function() { return void 0 !== this.inputmask ? this.inputmask.option(d) : void 0 });
                if (f && void 0 !== f.inputmask) return f.inputmask.option(d);
                break;
            default:
                return d.alias = c, e = new b(d), this.each(function() { e.mask(this) })
        } else { if ("object" == typeof c) return e = new b(c), void 0 === c.mask && void 0 === c.alias ? this.each(function() { return void 0 !== this.inputmask ? this.inputmask.option(c) : void e.mask(this) }) : this.each(function() { e.mask(this) }); if (void 0 === c) return this.each(function() { e = new b(d), e.mask(this) }) }
    }), a.fn.inputmask
}(jQuery, Inputmask),
function(a, b) {
    return b.extendDefinitions({ h: { validator: "[01][0-9]|2[0-3]", cardinality: 2, prevalidator: [{ validator: "[0-2]", cardinality: 1 }] }, s: { validator: "[0-5][0-9]", cardinality: 2, prevalidator: [{ validator: "[0-5]", cardinality: 1 }] }, d: { validator: "0[1-9]|[12][0-9]|3[01]", cardinality: 2, prevalidator: [{ validator: "[0-3]", cardinality: 1 }] }, m: { validator: "0[1-9]|1[012]", cardinality: 2, prevalidator: [{ validator: "[01]", cardinality: 1 }] }, y: { validator: "(19|20)\\d{2}", cardinality: 4, prevalidator: [{ validator: "[12]", cardinality: 1 }, { validator: "(19|20)", cardinality: 2 }, { validator: "(19|20)\\d", cardinality: 3 }] } }), b.extendAliases({
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: { val1pre: new RegExp("[0-3]"), val1: new RegExp("0[1-9]|[12][0-9]|3[01]"), val2pre: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|[12][0-9]|3[01])" + c + "[01])") }, val2: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|[12][0-9])" + c + "(0[1-9]|1[012]))|(30" + c + "(0[13-9]|1[012]))|(31" + c + "(0[13578]|1[02]))") } },
            leapday: "29/02/",
            separator: "/",
            yearrange: { minyear: 1900, maxyear: 2099 },
            isInYearRange: function(a, b, c) {
                if (isNaN(a)) return !1;
                var d = parseInt(a.concat(b.toString().slice(a.length))),
                    e = parseInt(a.concat(c.toString().slice(a.length)));
                return (isNaN(d) ? !1 : d >= b && c >= d) || (isNaN(e) ? !1 : e >= b && c >= e)
            },
            determinebaseyear: function(a, b, c) { var d = (new Date).getFullYear(); if (a > d) return a; if (d > b) { for (var e = b.toString().slice(0, 2), f = b.toString().slice(2, 4); e + c > b;) e--; var g = e + f; return a > g ? a : g } if (d >= a && b >= d) { for (var h = d.toString().slice(0, 2); h + c > b;) h--; var i = h + c; return a > i ? a : i } return d },
            onKeyDown: function(c, d, e, f) {
                var g = a(this);
                if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) {
                    var h = new Date;
                    g.val(h.getDate().toString() + (h.getMonth() + 1).toString() + h.getFullYear().toString()), g.trigger("setvalue")
                }
            },
            getFrontValue: function(a, b, c) {
                for (var d = 0, e = 0, f = 0; f < a.length && "2" !== a.charAt(f); f++) {
                    var g = c.definitions[a.charAt(f)];
                    g ? (d += e, e = g.cardinality) : e++
                }
                return b.join("").substr(d, e)
            },
            definitions: {
                1: {
                    validator: function(a, b, c, d, e) { var f = e.regex.val1.test(a); return d || f || a.charAt(1) !== e.separator && -1 === "-./".indexOf(a.charAt(1)) || !(f = e.regex.val1.test("0" + a.charAt(0))) ? f : (b.buffer[c - 1] = "0", { refreshFromBuffer: { start: c - 1, end: c }, pos: c, c: a.charAt(0) }) },
                    cardinality: 2,
                    prevalidator: [{
                        validator: function(a, b, c, d, e) {
                            var f = a;
                            isNaN(b.buffer[c + 1]) || (f += b.buffer[c + 1]);
                            var g = 1 === f.length ? e.regex.val1pre.test(f) : e.regex.val1.test(f);
                            if (!d && !g) { if (g = e.regex.val1.test(a + "0")) return b.buffer[c] = a, b.buffer[++c] = "0", { pos: c, c: "0" }; if (g = e.regex.val1.test("0" + a)) return b.buffer[c] = "0", c++, { pos: c } }
                            return g
                        },
                        cardinality: 1
                    }]
                },
                2: { validator: function(a, b, c, d, e) { var f = e.getFrontValue(b.mask, b.buffer, e); - 1 !== f.indexOf(e.placeholder[0]) && (f = "01" + e.separator); var g = e.regex.val2(e.separator).test(f + a); if (!d && !g && (a.charAt(1) === e.separator || -1 !== "-./".indexOf(a.charAt(1))) && (g = e.regex.val2(e.separator).test(f + "0" + a.charAt(0)))) return b.buffer[c - 1] = "0", { refreshFromBuffer: { start: c - 1, end: c }, pos: c, c: a.charAt(0) }; if (e.mask.indexOf("2") === e.mask.length - 1 && g) { var h = b.buffer.join("").substr(4, 4) + a; if (h !== e.leapday) return !0; var i = parseInt(b.buffer.join("").substr(0, 4), 10); return i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1 } return g }, cardinality: 2, prevalidator: [{ validator: function(a, b, c, d, e) { isNaN(b.buffer[c + 1]) || (a += b.buffer[c + 1]); var f = e.getFrontValue(b.mask, b.buffer, e); - 1 !== f.indexOf(e.placeholder[0]) && (f = "01" + e.separator); var g = 1 === a.length ? e.regex.val2pre(e.separator).test(f + a) : e.regex.val2(e.separator).test(f + a); return d || g || !(g = e.regex.val2(e.separator).test(f + "0" + a)) ? g : (b.buffer[c] = "0", c++, { pos: c }) }, cardinality: 1 }] },
                y: {
                    validator: function(a, b, c, d, e) { if (e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)) { var f = b.buffer.join("").substr(0, 6); if (f !== e.leapday) return !0; var g = parseInt(a, 10); return g % 4 === 0 ? g % 100 === 0 ? g % 400 === 0 ? !0 : !1 : !0 : !1 } return !1 },
                    cardinality: 4,
                    prevalidator: [{ validator: function(a, b, c, d, e) { var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear); if (!d && !f) { var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 1); if (f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), { pos: c }; if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + "0").toString().slice(0, 2), f = e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(0), b.buffer[c++] = g.charAt(1), { pos: c } } return f }, cardinality: 1 }, {
                        validator: function(a, b, c, d, e) {
                            var f = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                            if (!d && !f) {
                                var g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2);
                                if (f = e.isInYearRange(a[0] + g[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear)) return b.buffer[c++] = g.charAt(1), { pos: c };
                                if (g = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2), e.isInYearRange(g + a, e.yearrange.minyear, e.yearrange.maxyear)) {
                                    var h = b.buffer.join("").substr(0, 6);
                                    if (h !== e.leapday) f = !0;
                                    else {
                                        var i = parseInt(a, 10);
                                        f = i % 4 === 0 ? i % 100 === 0 ? i % 400 === 0 ? !0 : !1 : !0 : !1
                                    }
                                } else f = !1;
                                if (f) return b.buffer[c - 1] = g.charAt(0), b.buffer[c++] = g.charAt(1), b.buffer[c++] = a.charAt(0), { refreshFromBuffer: { start: c - 3, end: c }, pos: c }
                            }
                            return f
                        },
                        cardinality: 2
                    }, { validator: function(a, b, c, d, e) { return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear) }, cardinality: 3 }]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy",
            regex: { val2pre: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])") }, val2: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") },
            leapday: "02/29/",
            onKeyDown: function(c, d, e, f) {
                var g = a(this);
                if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) {
                    var h = new Date;
                    g.val((h.getMonth() + 1).toString() + h.getDate().toString() + h.getFullYear().toString()), g.trigger("setvalue")
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyDown: function(c, d, e, f) {
                var g = a(this);
                if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) {
                    var h = new Date;
                    g.val(h.getFullYear().toString() + (h.getMonth() + 1).toString() + h.getDate().toString()), g.trigger("setvalue")
                }
            }
        },
        "dd.mm.yyyy": { mask: "1.2.y", placeholder: "dd.mm.yyyy", leapday: "29.02.", separator: ".", alias: "dd/mm/yyyy" },
        "dd-mm-yyyy": { mask: "1-2-y", placeholder: "dd-mm-yyyy", leapday: "29-02-", separator: "-", alias: "dd/mm/yyyy" },
        "mm.dd.yyyy": { mask: "1.2.y", placeholder: "mm.dd.yyyy", leapday: "02.29.", separator: ".", alias: "mm/dd/yyyy" },
        "mm-dd-yyyy": { mask: "1-2-y", placeholder: "mm-dd-yyyy", leapday: "02-29-", separator: "-", alias: "mm/dd/yyyy" },
        "yyyy.mm.dd": { mask: "y.1.2", placeholder: "yyyy.mm.dd", leapday: ".02.29", separator: ".", alias: "yyyy/mm/dd" },
        "yyyy-mm-dd": { mask: "y-1-2", placeholder: "yyyy-mm-dd", leapday: "-02-29", separator: "-", alias: "yyyy/mm/dd" },
        datetime: { mask: "1/2/y h:s", placeholder: "dd/mm/yyyy hh:mm", alias: "dd/mm/yyyy", regex: { hrspre: new RegExp("[012]"), hrs24: new RegExp("2[0-4]|1[3-9]"), hrs: new RegExp("[01][0-9]|2[0-4]"), ampm: new RegExp("^[a|p|A|P][m|M]"), mspre: new RegExp("[0-5]"), ms: new RegExp("[0-5][0-9]") }, timeseparator: ":", hourFormat: "24", definitions: { h: { validator: function(a, b, c, d, e) { if ("24" === e.hourFormat && 24 === parseInt(a, 10)) return b.buffer[c - 1] = "0", b.buffer[c] = "0", { refreshFromBuffer: { start: c - 1, end: c }, c: "0" }; var f = e.regex.hrs.test(a); if (!d && !f && (a.charAt(1) === e.timeseparator || -1 !== "-.:".indexOf(a.charAt(1))) && (f = e.regex.hrs.test("0" + a.charAt(0)))) return b.buffer[c - 1] = "0", b.buffer[c] = a.charAt(0), c++, { refreshFromBuffer: { start: c - 2, end: c }, pos: c, c: e.timeseparator }; if (f && "24" !== e.hourFormat && e.regex.hrs24.test(a)) { var g = parseInt(a, 10); return 24 === g ? (b.buffer[c + 5] = "a", b.buffer[c + 6] = "m") : (b.buffer[c + 5] = "p", b.buffer[c + 6] = "m"), g -= 12, 10 > g ? (b.buffer[c] = g.toString(), b.buffer[c - 1] = "0") : (b.buffer[c] = g.toString().charAt(1), b.buffer[c - 1] = g.toString().charAt(0)), { refreshFromBuffer: { start: c - 1, end: c + 6 }, c: b.buffer[c] } } return f }, cardinality: 2, prevalidator: [{ validator: function(a, b, c, d, e) { var f = e.regex.hrspre.test(a); return d || f || !(f = e.regex.hrs.test("0" + a)) ? f : (b.buffer[c] = "0", c++, { pos: c }) }, cardinality: 1 }] }, s: { validator: "[0-5][0-9]", cardinality: 2, prevalidator: [{ validator: function(a, b, c, d, e) { var f = e.regex.mspre.test(a); return d || f || !(f = e.regex.ms.test("0" + a)) ? f : (b.buffer[c] = "0", c++, { pos: c }) }, cardinality: 1 }] }, t: { validator: function(a, b, c, d, e) { return e.regex.ampm.test(a + "m") }, casing: "lower", cardinality: 1 } }, insertMode: !1, autoUnmask: !1 },
        datetime12: { mask: "1/2/y h:s t\\m", placeholder: "dd/mm/yyyy hh:mm xm", alias: "datetime", hourFormat: "12" },
        "mm/dd/yyyy hh:mm xm": {
            mask: "1/2/y h:s t\\m",
            placeholder: "mm/dd/yyyy hh:mm xm",
            alias: "datetime12",
            regex: { val2pre: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[13-9]|1[012])" + c + "[0-3])|(02" + c + "[0-2])") }, val2: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + c + "30)|((0[13578]|1[02])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") },
            leapday: "02/29/",
            onKeyDown: function(c, d, e, f) {
                var g = a(this);
                if (c.ctrlKey && c.keyCode === b.keyCode.RIGHT) {
                    var h = new Date;
                    g.val((h.getMonth() + 1).toString() + h.getDate().toString() + h.getFullYear().toString()), g.trigger("setvalue")
                }
            }
        },
        "hh:mm t": { mask: "h:s t\\m", placeholder: "hh:mm xm", alias: "datetime", hourFormat: "12" },
        "h:s t": { mask: "h:s t\\m", placeholder: "hh:mm xm", alias: "datetime", hourFormat: "12" },
        "hh:mm:ss": { mask: "h:s:s", placeholder: "hh:mm:ss", alias: "datetime", autoUnmask: !1 },
        "hh:mm": { mask: "h:s", placeholder: "hh:mm", alias: "datetime", autoUnmask: !1 },
        date: { alias: "dd/mm/yyyy" },
        "mm/yyyy": { mask: "1/y", placeholder: "mm/yyyy", leapday: "donotuse", separator: "/", alias: "mm/dd/yyyy" },
        shamsi: { regex: { val2pre: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "[0-3])") }, val2: function(a) { var c = b.escapeRegex.call(this, a); return new RegExp("((0[1-9]|1[012])" + c + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + c + "30)|((0[1-6])" + c + "31)") }, val1pre: new RegExp("[01]"), val1: new RegExp("0[1-9]|1[012]") }, yearrange: { minyear: 1300, maxyear: 1499 }, mask: "y/1/2", leapday: "/12/30", placeholder: "yyyy/mm/dd", alias: "mm/dd/yyyy", clearIncomplete: !0 }
    }), b
}(jQuery, Inputmask),
function(a, b) { return b.extendDefinitions({ A: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1, casing: "upper" }, "&": { validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", cardinality: 1, casing: "upper" }, "#": { validator: "[0-9A-Fa-f]", cardinality: 1, casing: "upper" } }), b.extendAliases({ url: { definitions: { i: { validator: ".", cardinality: 1 } }, mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}", insertMode: !1, autoUnmask: !1 }, ip: { mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]", definitions: { i: { validator: function(a, b, c, d, e) { return c - 1 > -1 && "." !== b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > -1 && "." !== b.buffer[c - 2] ? b.buffer[c - 2] + a : "0" + a) : a = "00" + a, new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(a) }, cardinality: 1 } }, onUnMask: function(a, b, c) { return a } }, email: { mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}[.-{1,63}][.-{1,63}][.-{1,63}]", greedy: !1, onBeforePaste: function(a, b) { return a = a.toLowerCase(), a.replace("mailto:", "") }, definitions: { "*": { validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]", cardinality: 1, casing: "lower" }, "-": { validator: "[0-9A-Za-z-]", cardinality: 1, casing: "lower" } }, onUnMask: function(a, b, c) { return a } }, mac: { mask: "##:##:##:##:##:##" }, vin: { mask: "V{13}9{4}", definitions: { V: { validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", cardinality: 1, casing: "upper" } }, clearIncomplete: !0, autoUnmask: !0 } }), b }(jQuery, Inputmask),
function(a, b) {
    return b.extendAliases({
        numeric: {
            mask: function(a) {
                function b(b) { for (var c = "", d = 0; d < b.length; d++) c += a.definitions[b.charAt(d)] || a.optionalmarker.start === b.charAt(d) || a.optionalmarker.end === b.charAt(d) || a.quantifiermarker.start === b.charAt(d) || a.quantifiermarker.end === b.charAt(d) || a.groupmarker.start === b.charAt(d) || a.groupmarker.end === b.charAt(d) || a.alternatormarker === b.charAt(d) ? "\\" + b.charAt(d) : b.charAt(d); return c }
                if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator === a.radixPoint && ("." === a.radixPoint ? a.groupSeparator = "," : "," === a.radixPoint ? a.groupSeparator = "." : a.groupSeparator = ""), " " === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && "" !== a.groupSeparator, a.autoGroup && ("string" == typeof a.groupSize && isFinite(a.groupSize) && (a.groupSize = parseInt(a.groupSize)), isFinite(a.integerDigits))) {
                    var c = Math.floor(a.integerDigits / a.groupSize),
                        d = a.integerDigits % a.groupSize;
                    a.integerDigits = parseInt(a.integerDigits) + (0 === d ? c - 1 : c), a.integerDigits < 1 && (a.integerDigits = "*")
                }
                a.placeholder.length > 1 && (a.placeholder = a.placeholder.charAt(0)), a.radixFocus = a.radixFocus && "" !== a.placeholder && a.integerOptional === !0, a.definitions[";"] = a.definitions["~"], a.definitions[";"].definitionSymbol = "~", a.numericInput === !0 && (a.radixFocus = !1, a.digitsOptional = !1, isNaN(a.digits) && (a.digits = 2), a.decimalProtect = !1);
                var e = b(a.prefix);
                return e += "[+]", e += a.integerOptional === !0 ? "~{1," + a.integerDigits + "}" : "~{" + a.integerDigits + "}", void 0 !== a.digits && (isNaN(a.digits) || parseInt(a.digits) > 0) && (a.decimalProtect && (a.radixPointDefinitionSymbol = ":"), e += a.digitsOptional ? "[" + (a.decimalProtect ? ":" : a.radixPoint) + ";{1," + a.digits + "}]" : (a.decimalProtect ? ":" : a.radixPoint) + ";{" + a.digits + "}"), e += "[-]", e += b(a.suffix), a.greedy = !1, e
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            groupSeparator: "",
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            negationSymbol: { front: "-", back: "" },
            integerDigits: "+",
            integerOptional: !0,
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            min: null,
            max: null,
            step: 1,
            insertMode: !0,
            autoUnmask: !1,
            unmaskAsNumber: !1,
            postFormat: function(c, d, e) {
                e.numericInput === !0 && (c = c.reverse(), isFinite(d) && (d = c.join("").length - d - 1));
                var f, g, h = !1;
                c.length >= e.suffix.length && c.join("").indexOf(e.suffix) === c.length - e.suffix.length && (c.length = c.length - e.suffix.length, h = !0), d = d >= c.length ? c.length - 1 : d < e.prefix.length ? e.prefix.length : d;
                var i = !1,
                    j = c[d],
                    k = c.slice();
                j === e.groupSeparator && (k.splice(d--, 1), j = k[d]), j !== e.radixPoint && j !== e.negationSymbol.front && j !== e.negationSymbol.back && (k[d] = "?");
                var l = k.join(""),
                    m = l;
                if (l.length > 0 && e.autoGroup || -1 !== l.indexOf(e.groupSeparator)) {
                    var n = b.escapeRegex(e.groupSeparator);
                    i = 0 === l.indexOf(e.groupSeparator), l = l.replace(new RegExp(n, "g"), "");
                    var o = l.split(e.radixPoint);
                    if (l = "" === e.radixPoint ? l : o[0], l !== e.prefix + "?0" && l.length >= e.groupSize + e.prefix.length)
                        for (var p = new RegExp("([-+]?[\\d?]+)([\\d?]{" + e.groupSize + "})"); p.test(l) && "" !== e.groupSeparator;) l = l.replace(p, "$1" + e.groupSeparator + "$2"), l = l.replace(e.groupSeparator + e.groupSeparator, e.groupSeparator);
                    "" !== e.radixPoint && o.length > 1 && (l += e.radixPoint + o[1])
                }
                for (i = m !== l, c.length = l.length, f = 0, g = l.length; g > f; f++) c[f] = l.charAt(f);
                var q = a.inArray("?", c);
                if (-1 === q && (q = a.inArray(j, c)), c[q] = j, !i && h)
                    for (f = 0, g = e.suffix.length; g > f; f++) c.push(e.suffix.charAt(f));
                return q = e.numericInput && isFinite(d) ? c.join("").length - q - 1 : q, e.numericInput && (c = c.reverse(), a.inArray(e.radixPoint, c) < q && c.join("").length - e.suffix.length !== q && (q -= 1)), { pos: q, refreshFromBuffer: i, buffer: c }
            },
            onBeforeWrite: function(c, d, e, f) {
                var g;
                if (c && ("blur" === c.type || "checkval" === c.type || "keydown" === c.type)) {
                    var h = f.numericInput ? d.slice().reverse().join("") : d.join(""),
                        i = h.replace(f.prefix, "");
                    i = i.replace(f.suffix, ""), i = i.replace(new RegExp(b.escapeRegex(f.groupSeparator), "g"), ""), "," === f.radixPoint && (i = i.replace(f.radixPoint, "."));
                    var j = i.match(new RegExp("[-" + b.escapeRegex(f.negationSymbol.front) + "]", "g"));
                    if (j = null !== j && 1 === j.length, i = i.replace(new RegExp("[-" + b.escapeRegex(f.negationSymbol.front) + "]", "g"), ""), i = i.replace(new RegExp(b.escapeRegex(f.negationSymbol.back) + "$"), ""), i = i === f.negationSymbol.front ? i + "0" : i, "" !== i && isFinite(i)) {
                        var k = parseFloat(i),
                            l = j ? -1 * k : k;
                        if (null !== f.min && isFinite(f.min) && l < parseFloat(f.min) ? (k = Math.abs(f.min), j = f.min < 0) : null !== f.max && isFinite(f.max) && l > parseFloat(f.max) && (k = Math.abs(f.max), j = f.max < 0), i = k.toString().replace(".", f.radixPoint).split(""), isFinite(f.digits)) {
                            var m = a.inArray(f.radixPoint, i),
                                n = a.inArray(f.radixPoint, h); - 1 === m && (i.push(f.radixPoint), m = i.length - 1);
                            for (var o = 1; o <= f.digits; o++) f.digitsOptional || void 0 !== i[m + o] && i[m + o] !== f.placeholder.charAt(0) ? -1 !== n && void 0 !== h[n + o] && (i[m + o] = i[m + o] || h[n + o]) : i[m + o] = "0";
                            i[i.length - 1] === f.radixPoint && delete i[i.length - 1]
                        }
                        if (k.toString() !== i && k.toString() + "." !== i || j) return !j || 0 === k && "blur" === c.type || (i.unshift(f.negationSymbol.front), i.push(f.negationSymbol.back)), i = (f.prefix + i.join("")).split(""), f.numericInput && (i = i.reverse()), g = f.postFormat(i, f.numericInput ? e : e - 1, f), g.buffer && (g.refreshFromBuffer = g.buffer.join("") !== d.join("")), g
                    }
                }
                return f.autoGroup ? (g = f.postFormat(d, f.numericInput ? e : e - 1, f), g.caret = e <= f.prefix.length ? g.pos : g.pos + 1, g) : void 0
            },
            regex: { integerPart: function(a) { return new RegExp("[" + b.escapeRegex(a.negationSymbol.front) + "+]?\\d+") }, integerNPart: function(a) { return new RegExp("[\\d" + b.escapeRegex(a.groupSeparator) + b.escapeRegex(a.placeholder.charAt(0)) + "]+") } },
            signHandler: function(a, b, c, d, e) { if (!d && e.allowMinus && "-" === a || e.allowPlus && "+" === a) { var f = b.buffer.join("").match(e.regex.integerPart(e)); if (f && f[0].length > 0) return b.buffer[f.index] === ("-" === a ? "+" : e.negationSymbol.front) ? "-" === a ? "" !== e.negationSymbol.back ? { pos: f.index, c: e.negationSymbol.front, remove: f.index, caret: c, insert: { pos: b.buffer.length - e.suffix.length - 1, c: e.negationSymbol.back } } : { pos: f.index, c: e.negationSymbol.front, remove: f.index, caret: c } : "" !== e.negationSymbol.back ? { pos: f.index, c: "+", remove: [f.index, b.buffer.length - e.suffix.length - 1], caret: c } : { pos: f.index, c: "+", remove: f.index, caret: c } : b.buffer[f.index] === ("-" === a ? e.negationSymbol.front : "+") ? "-" === a && "" !== e.negationSymbol.back ? { remove: [f.index, b.buffer.length - e.suffix.length - 1], caret: c - 1 } : { remove: f.index, caret: c - 1 } : "-" === a ? "" !== e.negationSymbol.back ? { pos: f.index, c: e.negationSymbol.front, caret: c + 1, insert: { pos: b.buffer.length - e.suffix.length, c: e.negationSymbol.back } } : { pos: f.index, c: e.negationSymbol.front, caret: c + 1 } : { pos: f.index, c: a, caret: c + 1 } } return !1 },
            radixHandler: function(b, c, d, e, f) {
                if (!e && f.numericInput !== !0 && b === f.radixPoint && void 0 !== f.digits && (isNaN(f.digits) || parseInt(f.digits) > 0)) {
                    var g = a.inArray(f.radixPoint, c.buffer),
                        h = c.buffer.join("").match(f.regex.integerPart(f));
                    if (-1 !== g && c.validPositions[g]) return c.validPositions[g - 1] ? { caret: g + 1 } : { pos: h.index, c: h[0], caret: g + 1 };
                    if (!h || "0" === h[0] && h.index + 1 !== d) return c.buffer[h ? h.index : d] = "0", { pos: (h ? h.index : d) + 1, c: f.radixPoint }
                }
                return !1
            },
            leadingZeroHandler: function(b, c, d, e, f, g) {
                if (!e)
                    if (f.numericInput === !0) {
                        var h = c.buffer.slice("").reverse(),
                            i = h[f.prefix.length];
                        if ("0" === i) return { pos: d, remove: h.length - f.prefix.length - 1 }
                    } else {
                        var j = a.inArray(f.radixPoint, c.buffer),
                            k = c.buffer.slice(0, -1 !== j ? j : void 0).join("").match(f.regex.integerNPart(f));
                        if (k && (-1 === j || j >= d)) { var l = -1 === j ? 0 : parseInt(c.buffer.slice(j + 1).join("")); if (0 === k[0].indexOf("" !== f.placeholder ? f.placeholder.charAt(0) : "0") && (k.index + 1 === d || g !== !0 && 0 === l)) return c.buffer.splice(k.index, 1), d = k.index, { pos: d, remove: k.index }; if ("0" === b && d <= k.index && k[0] !== f.groupSeparator) return !1 }
                    }
                return !0
            },
            definitions: {
                "~": {
                    validator: function(c, d, e, f, g, h) {
                        var i = g.signHandler(c, d, e, f, g);
                        if (!i && (i = g.radixHandler(c, d, e, f, g), !i && (i = f ? new RegExp("[0-9" + b.escapeRegex(g.groupSeparator) + "]").test(c) : new RegExp("[0-9]").test(c), i === !0 && (i = g.leadingZeroHandler(c, d, e, f, g, h), i === !0)))) {
                            var j = a.inArray(g.radixPoint, d.buffer);
                            i = -1 !== j && (g.digitsOptional === !1 || d.validPositions[e]) && g.numericInput !== !0 && e > j && !f ? { pos: e, remove: e } : { pos: e }
                        }
                        return i
                    },
                    cardinality: 1
                },
                "+": { validator: function(a, b, c, d, e) { var f = e.signHandler(a, b, c, d, e); return !f && (d && e.allowMinus && a === e.negationSymbol.front || e.allowMinus && "-" === a || e.allowPlus && "+" === a) && (f = d || "-" !== a ? !0 : "" !== e.negationSymbol.back ? { pos: c, c: "-" === a ? e.negationSymbol.front : "+", caret: c + 1, insert: { pos: b.buffer.length, c: e.negationSymbol.back } } : { pos: c, c: "-" === a ? e.negationSymbol.front : "+", caret: c + 1 }), f }, cardinality: 1, placeholder: "" },
                "-": { validator: function(a, b, c, d, e) { var f = e.signHandler(a, b, c, d, e); return !f && d && e.allowMinus && a === e.negationSymbol.back && (f = !0), f }, cardinality: 1, placeholder: "" },
                ":": {
                    validator: function(a, c, d, e, f) {
                        var g = f.signHandler(a, c, d, e, f);
                        if (!g) {
                            var h = "[" + b.escapeRegex(f.radixPoint) + "]";
                            g = new RegExp(h).test(a), g && c.validPositions[d] && c.validPositions[d].match.placeholder === f.radixPoint && (g = { caret: d + 1 })
                        }
                        return g ? { c: f.radixPoint } : g
                    },
                    cardinality: 1,
                    placeholder: function(a) { return a.radixPoint }
                }
            },
            onUnMask: function(a, c, d) {
                var e = a.replace(d.prefix, "");
                return e = e.replace(d.suffix, ""), e = e.replace(new RegExp(b.escapeRegex(d.groupSeparator), "g"), ""), d.unmaskAsNumber ? ("" !== d.radixPoint && -1 !== e.indexOf(d.radixPoint) && (e = e.replace(b.escapeRegex.call(this, d.radixPoint), ".")),
                    Number(e)) : e
            },
            isComplete: function(a, c) {
                var d = a.join(""),
                    e = a.slice();
                if (c.postFormat(e, 0, c), e.join("") !== d) return !1;
                var f = d.replace(c.prefix, "");
                return f = f.replace(c.suffix, ""), f = f.replace(new RegExp(b.escapeRegex(c.groupSeparator), "g"), ""), "," === c.radixPoint && (f = f.replace(b.escapeRegex(c.radixPoint), ".")), isFinite(f)
            },
            onBeforeMask: function(a, c) {
                if ("" !== c.radixPoint && isFinite(a)) a = a.toString().replace(".", c.radixPoint);
                else {
                    var d = a.match(/,/g),
                        e = a.match(/\./g);
                    e && d ? e.length > d.length ? (a = a.replace(/\./g, ""), a = a.replace(",", c.radixPoint)) : d.length > e.length ? (a = a.replace(/,/g, ""), a = a.replace(".", c.radixPoint)) : a = a.indexOf(".") < a.indexOf(",") ? a.replace(/\./g, "") : a = a.replace(/,/g, "") : a = a.replace(new RegExp(b.escapeRegex(c.groupSeparator), "g"), "")
                }
                if (0 === c.digits && (-1 !== a.indexOf(".") ? a = a.substring(0, a.indexOf(".")) : -1 !== a.indexOf(",") && (a = a.substring(0, a.indexOf(",")))), "" !== c.radixPoint && isFinite(c.digits) && -1 !== a.indexOf(c.radixPoint)) {
                    var f = a.split(c.radixPoint),
                        g = f[1].match(new RegExp("\\d*"))[0];
                    if (parseInt(c.digits) < g.toString().length) {
                        var h = Math.pow(10, parseInt(c.digits));
                        a = a.replace(b.escapeRegex(c.radixPoint), "."), a = Math.round(parseFloat(a) * h) / h, a = a.toString().replace(".", c.radixPoint)
                    }
                }
                return a.toString()
            },
            canClearPosition: function(a, b, c, d, e) {
                var f = a.validPositions[b].input,
                    g = f !== e.radixPoint || null !== a.validPositions[b].match.fn && e.decimalProtect === !1 || isFinite(f) || b === c || f === e.groupSeparator || f === e.negationSymbol.front || f === e.negationSymbol.back;
                return g
            },
            onKeyDown: function(c, d, e, f) {
                var g = a(this);
                if (c.ctrlKey) switch (c.keyCode) {
                    case b.keyCode.UP:
                        g.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(f.step)), g.trigger("setvalue");
                        break;
                    case b.keyCode.DOWN:
                        g.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(f.step)), g.trigger("setvalue")
                }
            }
        },
        currency: { prefix: "$ ", groupSeparator: ",", alias: "numeric", placeholder: "0", autoGroup: !0, digits: 2, digitsOptional: !1, clearMaskOnLostFocus: !1 },
        decimal: { alias: "numeric" },
        integer: { alias: "numeric", digits: 0, radixPoint: "" },
        percentage: { alias: "numeric", digits: 2, radixPoint: ".", placeholder: "0", autoGroup: !1, min: 0, max: 100, suffix: " %", allowPlus: !1, allowMinus: !1 }
    }), b
}(jQuery, Inputmask),
function(a, b) {
    return b.extendAliases({
        phone: {
            url: "phone-codes/phone-codes.js",
            countrycode: "",
            phoneCodeCache: {},
            mask: function(b) {
                if (void 0 === b.phoneCodeCache[b.url]) {
                    var c = [];
                    b.definitions["#"] = b.definitions[9], a.ajax({ url: b.url, async: !1, type: "get", dataType: "json", success: function(a) { c = a }, error: function(a, c, d) { alert(d + " - " + b.url) } }), b.phoneCodeCache[b.url] = c.sort(function(a, b) { return (a.mask || a) < (b.mask || b) ? -1 : 1 })
                }
                return b.phoneCodeCache[b.url]
            },
            keepStatic: !1,
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function(a, b) { var c = a.replace(/^0{1,2}/, "").replace(/[\s]/g, ""); return (c.indexOf(b.countrycode) > 1 || -1 === c.indexOf(b.countrycode)) && (c = "+" + b.countrycode + c), c }
        },
        phonebe: { alias: "phone", url: "phone-codes/phone-be.js", countrycode: "32", nojumpsThreshold: 4 }
    }), b
}(jQuery, Inputmask),
function(a, b) {
    return b.extendAliases({
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(a, b) { return new RegExp(b.regex).test(a.join("")) },
            definitions: {
                r: {
                    validator: function(b, c, d, e, f) {
                        function g(a, b) { this.matches = [], this.isGroup = a || !1, this.isQuantifier = b || !1, this.quantifier = { min: 1, max: 1 }, this.repeaterPart = void 0 }

                        function h() {
                            var a, b, c = new g,
                                d = [];
                            for (f.regexTokens = []; a = f.tokenizer.exec(f.regex);) switch (b = a[0], b.charAt(0)) {
                                case "(":
                                    d.push(new g(!0));
                                    break;
                                case ")":
                                    k = d.pop(), d.length > 0 ? d[d.length - 1].matches.push(k) : c.matches.push(k);
                                    break;
                                case "{":
                                case "+":
                                case "*":
                                    var e = new g(!1, !0);
                                    b = b.replace(/[{}]/g, "");
                                    var h = b.split(","),
                                        i = isNaN(h[0]) ? h[0] : parseInt(h[0]),
                                        j = 1 === h.length ? i : isNaN(h[1]) ? h[1] : parseInt(h[1]);
                                    if (e.quantifier = { min: i, max: j }, d.length > 0) {
                                        var l = d[d.length - 1].matches;
                                        a = l.pop(), a.isGroup || (k = new g(!0), k.matches.push(a), a = k), l.push(a), l.push(e)
                                    } else a = c.matches.pop(), a.isGroup || (k = new g(!0), k.matches.push(a), a = k), c.matches.push(a), c.matches.push(e);
                                    break;
                                default:
                                    d.length > 0 ? d[d.length - 1].matches.push(b) : c.matches.push(b)
                            }
                            c.matches.length > 0 && f.regexTokens.push(c)
                        }

                        function i(b, c) {
                            var d = !1;
                            c && (m += "(", o++);
                            for (var e = 0; e < b.matches.length; e++) {
                                var f = b.matches[e];
                                if (f.isGroup === !0) d = i(f, !0);
                                else if (f.isQuantifier === !0) {
                                    var g = a.inArray(f, b.matches),
                                        h = b.matches[g - 1],
                                        k = m;
                                    if (isNaN(f.quantifier.max)) {
                                        for (; f.repeaterPart && f.repeaterPart !== m && f.repeaterPart.length > m.length && !(d = i(h, !0)););
                                        d = d || i(h, !0), d && (f.repeaterPart = m), m = k + f.quantifier.max
                                    } else {
                                        for (var l = 0, n = f.quantifier.max - 1; n > l && !(d = i(h, !0)); l++);
                                        m = k + "{" + f.quantifier.min + "," + f.quantifier.max + "}"
                                    }
                                } else if (void 0 !== f.matches)
                                    for (var p = 0; p < f.length && !(d = i(f[p], c)); p++);
                                else {
                                    var q;
                                    if ("[" == f.charAt(0)) {
                                        q = m, q += f;
                                        for (var r = 0; o > r; r++) q += ")";
                                        var s = new RegExp("^(" + q + ")$");
                                        d = s.test(j)
                                    } else
                                        for (var t = 0, u = f.length; u > t; t++)
                                            if ("\\" !== f.charAt(t)) { q = m, q += f.substr(0, t + 1), q = q.replace(/\|$/, ""); for (var r = 0; o > r; r++) q += ")"; var s = new RegExp("^(" + q + ")$"); if (d = s.test(j)) break }
                                    m += f
                                }
                                if (d) break
                            }
                            return c && (m += ")", o--), d
                        }
                        var j, k, l = c.buffer.slice(),
                            m = "",
                            n = !1,
                            o = 0;
                        null === f.regexTokens && h(), l.splice(d, 0, b), j = l.join("");
                        for (var p = 0; p < f.regexTokens.length; p++) { var q = f.regexTokens[p]; if (n = i(q, q.isGroup)) break }
                        return n
                    },
                    cardinality: 1
                }
            }
        }
    }), b
}(jQuery, Inputmask);