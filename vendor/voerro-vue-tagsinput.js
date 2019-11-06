!function (e) { function t(a) { if (n[a]) return n[a].exports; var i = n[a] = { i: a, l: !1, exports: {} }; return e[a].call(i.exports, i, i.exports, t), i.l = !0, i.exports } var n = {}; t.m = e, t.c = n, t.d = function (e, n, a) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: a }) }, t.n = function (e) { var n = e && e.__esModule ? function () { return e.default } : function () { return e }; return t.d(n, "a", n), n }, t.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "/dist/", t(t.s = 1) }([function (e, t, n) { "use strict"; t.a = { props: { elementId: String, existingTags: { type: Array, default: function () { return [] } }, value: { type: Array, default: function () { return [] } }, typeahead: { type: Boolean, default: !1 }, typeaheadStyle: { type: String, default: "badges" }, typeaheadActivationThreshold: { type: Number, default: 1 }, typeaheadMaxResults: { type: Number, default: 0 }, placeholder: { type: String, default: "Add a tag" }, limit: { type: Number, default: 0 }, onlyExistingTags: { type: Boolean, default: !1 }, deleteOnBackspace: { type: Boolean, default: !0 }, allowDuplicates: { type: Boolean, default: !1 }, validate: { type: Function, default: function () { return !0 } }, addTagsOnComma: { type: Boolean, default: !1 }, addTagsOnBlur: { type: Boolean, default: !1 }, wrapperClass: { type: String, default: "tags-input-wrapper-default" }, sortSearchResults: { type: Boolean, default: !0 }, caseSensitiveTags: { type: Boolean, default: !1 }, beforeAddingTag: { type: Function, default: function () { return !0 } }, beforeRemovingTag: { type: Function, default: function () { return !0 } } }, data: function () { return { badgeId: 0, tags: [], input: "", oldInput: "", hiddenInput: "", searchResults: [], searchSelection: 0, selectedTag: -1 } }, created: function () { this.tagsFromValue(), this.$emit("initialized") }, watch: { input: function (e, t) { if (this.searchTag(!1), e.length && e != t) { e.substring(t.length, e.length); this.addTagsOnComma && (e = e.trim(), e.endsWith(",") && (this.input = e.substring(0, e.length - 1), this.tagFromInput(!0))) } }, tags: function () { this.hiddenInput = JSON.stringify(this.tags), this.$emit("input", this.tags) }, value: function () { this.tagsFromValue() } }, methods: { escapeRegExp: function (e) { return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") }, tagFromInput: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; if (this.searchResults.length && this.searchSelection >= 0 && !e) this.tagFromSearch(this.searchResults[this.searchSelection]), this.input = ""; else { var t = this.input.trim(); if (!this.onlyExistingTags && t.length && this.validate(t)) { this.input = ""; var n = { key: "", value: t }, a = this.escapeRegExp(this.caseSensitiveTags ? n.value : n.value.toLowerCase()), i = !0, s = !1, r = void 0; try { for (var o, u = this.existingTags[Symbol.iterator](); !(i = (o = u.next()).done); i = !0) { var l = o.value; if (a === (this.caseSensitiveTags ? l.value : l.value.toLowerCase())) { n = Object.assign({}, l); break } } } catch (e) { s = !0, r = e } finally { try { !i && u.return && u.return() } finally { if (s) throw r } } this.addTag(n) } } }, tagFromSearchOnClick: function (e) { this.tagFromSearch(e), this.$refs.taginput.blur() }, tagFromSearch: function (e) { var t = this; this.clearSearchResults(), this.addTag(e), this.$nextTick(function () { t.input = "", t.oldInput = "" }) }, addTag: function (e) { var t = this; return !!this.beforeAddingTag(e) && (this.limit > 0 && this.tags.length >= this.limit ? (this.$emit("limit-reached"), !1) : void (this.tagSelected(e) || (this.tags.push(e), this.$nextTick(function () { t.$emit("tag-added", e), t.$emit("tags-updated") })))) }, removeLastTag: function () { !this.input.length && this.deleteOnBackspace && this.removeTag(this.tags.length - 1) }, removeTag: function (e) { var t = this, n = this.tags[e]; if (!this.beforeRemovingTag(n)) return !1; this.tags.splice(e, 1), this.$nextTick(function () { t.$emit("tag-removed", n), t.$emit("tags-updated") }) }, searchTag: function () { if (!0 !== this.typeahead) return !1; if (this.oldInput != this.input || !this.searchResults.length && 0 == this.typeaheadActivationThreshold) { this.searchResults = [], this.searchSelection = 0; var e = this.input.trim(); if (e.length && e.length >= this.typeaheadActivationThreshold || 0 == this.typeaheadActivationThreshold) { var t = this.escapeRegExp(this.caseSensitiveTags ? e : e.toLowerCase()), n = !0, a = !1, i = void 0; try { for (var s, r = this.existingTags[Symbol.iterator](); !(n = (s = r.next()).done); n = !0) { var o = s.value; (this.caseSensitiveTags ? o.value : o.value.toLowerCase()).search(t) > -1 && !this.tagSelected(o) && this.searchResults.push(o) } } catch (e) { a = !0, i = e } finally { try { !n && r.return && r.return() } finally { if (a) throw i } } this.sortSearchResults && this.searchResults.sort(function (e, t) { return e.value < t.value ? -1 : e.value > t.value ? 1 : 0 }), this.typeaheadMaxResults > 0 && (this.searchResults = this.searchResults.slice(0, this.typeaheadMaxResults)) } this.oldInput = this.input } }, hideTypeahead: function () { var e = this; this.input.length || this.$nextTick(function () { e.clearSearchResults() }) }, nextSearchResult: function () { this.searchSelection + 1 <= this.searchResults.length - 1 && this.searchSelection++ }, prevSearchResult: function () { this.searchSelection > 0 && this.searchSelection-- }, clearSearchResults: function () { this.searchResults = [], this.searchSelection = 0 }, clearTags: function () { this.tags.splice(0, this.tags.length) }, tagsFromValue: function () { if (this.value && this.value.length) { if (!Array.isArray(this.value)) return void console.error("Voerro Tags Input: the v-model value must be an array!"); var e = this.value; if (this.tags == e) return; this.clearTags(); var t = !0, n = !1, a = void 0; try { for (var i, s = e[Symbol.iterator](); !(t = (i = s.next()).done); t = !0) { var r = i.value; this.addTag(r) } } catch (e) { n = !0, a = e } finally { try { !t && s.return && s.return() } finally { if (n) throw a } } } else { if (0 == this.tags.length) return; this.clearTags() } }, tagSelected: function (e) { if (this.allowDuplicates) return !1; if (!e) return !1; var t = this.escapeRegExp(this.caseSensitiveTags ? e.value : e.value.toLowerCase()), n = !0, a = !1, i = void 0; try { for (var s, r = this.tags[Symbol.iterator](); !(n = (s = r.next()).done); n = !0) { var o = s.value, u = this.caseSensitiveTags ? o.value : o.value.toLowerCase(); if (o.key === e.key && u.search(t) > -1) return !0 } } catch (e) { a = !0, i = e } finally { try { !n && r.return && r.return() } finally { if (a) throw i } } return !1 }, onKeyUp: function (e) { this.$emit("keyup", e) }, onKeyDown: function (e) { this.$emit("keydown", e) }, onFocus: function (e) { this.$emit("focus", e), this.searchTag() }, onBlur: function (e) { this.$emit("blur", e), this.addTagsOnBlur && this.tagFromInput(!0), this.hideTypeahead() } } } }, function (e, t, n) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }); var a = n(2); window.VoerroTagsInput = a.a, t.default = a.a }, function (e, t, n) { "use strict"; function a(e) { n(3) } var i = n(0), s = n(9), r = n(8), o = a, u = r(i.a, s.a, !1, o, null, null); t.a = u.exports }, function (e, t, n) { var a = n(4); "string" == typeof a && (a = [[e.i, a, ""]]), a.locals && (e.exports = a.locals); n(6)("60612ac6", a, !0, {}) }, function (e, t, n) { t = e.exports = n(5)(!1), t.push([e.i, ".tags-input-root{position:relative}", ""]) }, function (e, t) { function n(e, t) { var n = e[1] || "", i = e[3]; if (!i) return n; if (t && "function" == typeof btoa) { var s = a(i); return [n].concat(i.sources.map(function (e) { return "/*# sourceURL=" + i.sourceRoot + e + " */" })).concat([s]).join("\n") } return [n].join("\n") } function a(e) { return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e)))) + " */" } e.exports = function (e) { var t = []; return t.toString = function () { return this.map(function (t) { var a = n(t, e); return t[2] ? "@media " + t[2] + "{" + a + "}" : a }).join("") }, t.i = function (e, n) { "string" == typeof e && (e = [[null, e, ""]]); for (var a = {}, i = 0; i < this.length; i++) { var s = this[i][0]; "number" == typeof s && (a[s] = !0) } for (i = 0; i < e.length; i++) { var r = e[i]; "number" == typeof r[0] && a[r[0]] || (n && !r[2] ? r[2] = n : n && (r[2] = "(" + r[2] + ") and (" + n + ")"), t.push(r)) } }, t } }, function (e, t, n) { function a(e) { for (var t = 0; t < e.length; t++) { var n = e[t], a = c[n.id]; if (a) { a.refs++; for (var i = 0; i < a.parts.length; i++)a.parts[i](n.parts[i]); for (; i < n.parts.length; i++)a.parts.push(s(n.parts[i])); a.parts.length > n.parts.length && (a.parts.length = n.parts.length) } else { for (var r = [], i = 0; i < n.parts.length; i++)r.push(s(n.parts[i])); c[n.id] = { id: n.id, refs: 1, parts: r } } } } function i() { var e = document.createElement("style"); return e.type = "text/css", h.appendChild(e), e } function s(e) { var t, n, a = document.querySelector("style[" + y + '~="' + e.id + '"]'); if (a) { if (f) return g; a.parentNode.removeChild(a) } if (m) { var s = p++; a = d || (d = i()), t = r.bind(null, a, s, !1), n = r.bind(null, a, s, !0) } else a = i(), t = o.bind(null, a), n = function () { a.parentNode.removeChild(a) }; return t(e), function (a) { if (a) { if (a.css === e.css && a.media === e.media && a.sourceMap === e.sourceMap) return; t(e = a) } else n() } } function r(e, t, n, a) { var i = n ? "" : a.css; if (e.styleSheet) e.styleSheet.cssText = S(t, i); else { var s = document.createTextNode(i), r = e.childNodes; r[t] && e.removeChild(r[t]), r.length ? e.insertBefore(s, r[t]) : e.appendChild(s) } } function o(e, t) { var n = t.css, a = t.media, i = t.sourceMap; if (a && e.setAttribute("media", a), v.ssrId && e.setAttribute(y, t.id), i && (n += "\n/*# sourceURL=" + i.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), e.styleSheet) e.styleSheet.cssText = n; else { for (; e.firstChild;)e.removeChild(e.firstChild); e.appendChild(document.createTextNode(n)) } } var u = "undefined" != typeof document; if ("undefined" != typeof DEBUG && DEBUG && !u) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."); var l = n(7), c = {}, h = u && (document.head || document.getElementsByTagName("head")[0]), d = null, p = 0, f = !1, g = function () { }, v = null, y = "data-vue-ssr-id", m = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()); e.exports = function (e, t, n, i) { f = n, v = i || {}; var s = l(e, t); return a(s), function (t) { for (var n = [], i = 0; i < s.length; i++) { var r = s[i], o = c[r.id]; o.refs-- , n.push(o) } t ? (s = l(e, t), a(s)) : s = []; for (var i = 0; i < n.length; i++) { var o = n[i]; if (0 === o.refs) { for (var u = 0; u < o.parts.length; u++)o.parts[u](); delete c[o.id] } } } }; var S = function () { var e = []; return function (t, n) { return e[t] = n, e.filter(Boolean).join("\n") } }() }, function (e, t) { e.exports = function (e, t) { for (var n = [], a = {}, i = 0; i < t.length; i++) { var s = t[i], r = s[0], o = s[1], u = s[2], l = s[3], c = { id: e + ":" + i, css: o, media: u, sourceMap: l }; a[r] ? a[r].parts.push(c) : n.push(a[r] = { id: r, parts: [c] }) } return n } }, function (e, t) { e.exports = function (e, t, n, a, i, s) { var r, o = e = e || {}, u = typeof e.default; "object" !== u && "function" !== u || (r = e, o = e.default); var l = "function" == typeof o ? o.options : o; t && (l.render = t.render, l.staticRenderFns = t.staticRenderFns, l._compiled = !0), n && (l.functional = !0), i && (l._scopeId = i); var c; if (s ? (c = function (e) { e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), a && a.call(this, e), e && e._registeredComponents && e._registeredComponents.add(s) }, l._ssrRegister = c) : a && (c = a), c) { var h = l.functional, d = h ? l.render : l.beforeCreate; h ? (l._injectStyles = c, l.render = function (e, t) { return c.call(t), d(e, t) }) : l.beforeCreate = d ? [].concat(d, c) : [c] } return { esModule: r, exports: o, options: l } } }, function (e, t, n) { "use strict"; var a = function () { var e = this, t = e.$createElement, n = e._self._c || t; return n("div", { staticClass: "tags-input-root" }, [n("div", { class: e.wrapperClass + " tags-input" }, [e._l(e.tags, function (t, a) { return n("span", { key: a, staticClass: "tags-input-badge tags-input-badge-pill tags-input-badge-selected-default" }, [n("span", { domProps: { innerHTML: e._s(t.value) } }), e._v(" "), n("i", { staticClass: "tags-input-remove", attrs: { href: "#" }, on: { click: function (t) { t.preventDefault(), e.removeTag(a) } } })]) }), e._v(" "), n("input", { directives: [{ name: "model", rawName: "v-model", value: e.input, expression: "input" }], ref: "taginput", attrs: { type: "text", placeholder: e.placeholder }, domProps: { value: e.input }, on: { keydown: [function (t) { if (!("button" in t) && e._k(t.keyCode, "enter", 13, t.key)) return null; t.preventDefault(), e.tagFromInput(!1) }, function (t) { if (!("button" in t) && 8 !== t.keyCode) return null; e.removeLastTag(t) }, function (t) { if (!("button" in t) && e._k(t.keyCode, "down", 40, t.key)) return null; e.nextSearchResult(t) }, function (t) { if (!("button" in t) && e._k(t.keyCode, "up", 38, t.key)) return null; e.prevSearchResult(t) }, e.onKeyDown], keyup: [e.onKeyUp, function (t) { if (!("button" in t) && e._k(t.keyCode, "esc", 27, t.key)) return null; e.clearSearchResults(t) }], focus: e.onFocus, blur: e.onBlur, value: e.tags, input: function (t) { t.target.composing || (e.input = t.target.value) } } }), e._v(" "), e.elementId ? n("input", { directives: [{ name: "model", rawName: "v-model", value: e.hiddenInput, expression: "hiddenInput" }], attrs: { type: "hidden", name: e.elementId, id: e.elementId }, domProps: { value: e.hiddenInput }, on: { input: function (t) { t.target.composing || (e.hiddenInput = t.target.value) } } }) : e._e()], 2), e._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: e.searchResults.length, expression: "searchResults.length" }] }, ["badges" === e.typeaheadStyle ? n("p", { class: "typeahead-" + e.typeaheadStyle }, [n("span", { staticClass: "tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default", on: { click: function (t) { t.preventDefault(), e.clearSearchResults(t) } } }, [e._v("Discard Search Results")]), e._v(" "), e._l(e.searchResults, function (t, a) { return n("span", { key: a, staticClass: "tags-input-badge", class: { "tags-input-typeahead-item-default": a != e.searchSelection, "tags-input-typeahead-item-highlighted-default": a == e.searchSelection }, domProps: { innerHTML: e._s(t.value) }, on: { mouseover: function (t) { e.searchSelection = a }, mousedown: function (n) { n.preventDefault(), e.tagFromSearchOnClick(t) } } }) })], 2) : "dropdown" === e.typeaheadStyle ? n("ul", { class: "typeahead-" + e.typeaheadStyle }, [n("li", { staticClass: "tags-input-typeahead-item-default typeahead-hide-btn", on: { mousedown: function (t) { t.preventDefault(), e.clearSearchResults(t) } } }, [e._v("Discard search results")]), e._v(" "), e._l(e.searchResults, function (t, a) { return n("li", { key: a, class: { "tags-input-typeahead-item-default": a != e.searchSelection, "tags-input-typeahead-item-highlighted-default": a == e.searchSelection }, domProps: { innerHTML: e._s(t.value) }, on: { mouseover: function (t) { e.searchSelection = a }, mousedown: function (n) { n.preventDefault(), e.tagFromSearchOnClick(t) } } }) })], 2) : e._e()])]) }, i = [], s = { render: a, staticRenderFns: i }; t.a = s }]);
//# sourceMappingURL=voerro-vue-tagsinput.js.map