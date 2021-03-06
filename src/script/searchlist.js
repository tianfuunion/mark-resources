!
function(a) {
    "use strict";
    function b(a) {
        return a ? c(a) : void 0
    }
    function c(a) {
        var c, d = b.prototype;
        for (c in d) Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        return a
    }
    function d(a, b) {
        var c;
        if (Array.prototype.indexOf) return a.indexOf(b);
        if (null == a) throw new TypeError;
        for (c = a.length; c--;) if (a[c] === b) return c;
        return - 1
    }
    b.prototype.getListeners = function(a) {
        var b = this._registry || (this._registry = {}),
        c = b[a] || (b[a] = []);
        return c
    },
    b.prototype.hasListeners = function(a) {
        return this.getListeners(a).length ? !0 : !1
    },
    b.prototype.on = function(a, b) {
        var c = this.getListeners(a);
        if ("function" != typeof b) throw new TypeError("Emitter.on(): the 2nd argument must be a function.");
        return - 1 === d(c, b) && c.push(b),
        this
    },
    b.prototype.once = function(a, b) {
        function c() {
            d.off(a, c),
            b.apply(this, arguments)
        }
        var d = this;
        return b._wrapper = c,
        this.on(a, c),
        this
    },
    b.prototype.off = function(a, b) {
        function c(a) {
            this._registry && (a ? delete this._registry[a] : delete this._registry)
        }
        var e, f, g = arguments.length;
        if (0 === g) return c.call(this),
        this;
        if (1 === g) return c.call(this, a),
        this;
        if ("function" != typeof b) throw new TypeError("Emitter.off(): the 2nd argument must be a function.");
        return e = this.getListeners(a),
        f = d(e, b),
        -1 === f && (f = d(e, b._wrapper)),
        -1 !== f && (e.splice(f, 1), 0 === e.length && c.call(this, a)),
        this
    },
    b.prototype.trigger = function(a) {
        var b = Array.prototype.slice.call(arguments, 1),
        c = this.getListeners(a),
        d = c.length;
        if (d) {
            c = c.slice(0);
            for (var e = 0; d > e; e += 1) c[e].apply(this, b)
        }
        return this
    },
    b.prototype.emit = b.prototype.trigger,
    "object" == typeof exports ? module.exports = b: "function" == typeof define && define.amd ? define(function() {
        return b
    }) : a.Emitter = b
} (this),
function(a, b) {
    "use strict";
    function c() {
        d.READY || (d.event.determineEventTypes(), d.utils.each(d.gestures,
        function(a) {
            d.detection.register(a)
        }), d.event.onTouch(d.DOCUMENT, d.EVENT_MOVE, d.detection.detect), d.event.onTouch(d.DOCUMENT, d.EVENT_END, d.detection.detect), d.READY = !0)
    }
    var d = function(a, b) {
        return new d.Instance(a, b || {})
    };
    d.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    },
    d.HAS_POINTEREVENTS = a.navigator.pointerEnabled || a.navigator.msPointerEnabled,
    d.HAS_TOUCHEVENTS = "ontouchstart" in a,
    d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i,
    d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && a.navigator.userAgent.match(d.MOBILE_REGEX),
    d.EVENT_TYPES = {},
    d.DIRECTION_DOWN = "down",
    d.DIRECTION_LEFT = "left",
    d.DIRECTION_UP = "up",
    d.DIRECTION_RIGHT = "right",
    d.POINTER_MOUSE = "mouse",
    d.POINTER_TOUCH = "touch",
    d.POINTER_PEN = "pen",
    d.EVENT_START = "start",
    d.EVENT_MOVE = "move",
    d.EVENT_END = "end",
    d.DOCUMENT = a.document,
    d.plugins = d.plugins || {},
    d.gestures = d.gestures || {},
    d.READY = !1,
    d.utils = {
        extend: function(a, c, d) {
            for (var e in c) a[e] !== b && d || (a[e] = c[e]);
            return a
        },
        each: function(a, c, d) {
            if ("forEach" in a) a.forEach(c, d);
            else if (a.length != b) {
                for (var e = 0,
                f = a.length; f > e; e++) if (c.call(d, a[e], e, a) === !1) return
            } else for (var e in a) if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1) return
        },
        hasParent: function(a, b) {
            for (; a;) {
                if (a == b) return ! 0;
                a = a.parentNode
            }
            return ! 1
        },
        getCenter: function(a) {
            var b = [],
            c = [];
            return d.utils.each(a,
            function(a) {
                b.push("undefined" != typeof a.clientX ? a.clientX: a.pageX),
                c.push("undefined" != typeof a.clientY ? a.clientY: a.pageY)
            }),
            {
                pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
                pageY: (Math.min.apply(Math, c) + Math.max.apply(Math, c)) / 2
            }
        },
        getVelocity: function(a, b, c) {
            return {
                x: Math.abs(b / a) || 0,
                y: Math.abs(c / a) || 0
            }
        },
        getAngle: function(a, b) {
            var c = b.pageY - a.pageY,
            d = b.pageX - a.pageX;
            return 180 * Math.atan2(c, d) / Math.PI
        },
        getDirection: function(a, b) {
            var c = Math.abs(a.pageX - b.pageX),
            e = Math.abs(a.pageY - b.pageY);
            return c >= e ? a.pageX - b.pageX > 0 ? d.DIRECTION_LEFT: d.DIRECTION_RIGHT: a.pageY - b.pageY > 0 ? d.DIRECTION_UP: d.DIRECTION_DOWN
        },
        getDistance: function(a, b) {
            var c = b.pageX - a.pageX,
            d = b.pageY - a.pageY;
            return Math.sqrt(c * c + d * d)
        },
        getScale: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
        },
        getRotation: function(a, b) {
            return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
        },
        isVertical: function(a) {
            return a == d.DIRECTION_UP || a == d.DIRECTION_DOWN
        },
        stopDefaultBrowserBehavior: function(a, b) {
            var c = ["webkit", "khtml", "moz", "Moz", "ms", "o", ""];
            b && a && a.style && (d.utils.each(c,
            function(e) {
                d.utils.each(b,
                function(b) {
                    e && (b = c + b.substring(0, 1).toUpperCase() + b.substring(1)),
                    b in a.style && (a.style[b] = b)
                })
            }), "none" == b.userSelect && (a.onselectstart = function() {
                return ! 1
            }), "none" == b.userDrag && (a.ondragstart = function() {
                return ! 1
            }))
        }
    },
    d.Instance = function(a, b) {
        var e = this;
        return c(),
        this.element = a,
        this.enabled = !0,
        this.options = d.utils.extend(d.utils.extend({},
        d.defaults), b || {}),
        this.options.stop_browser_behavior && d.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior),
        d.event.onTouch(a, d.EVENT_START,
        function(a) {
            e.enabled && d.detection.startDetect(e, a)
        }),
        this
    },
    d.Instance.prototype = {
        on: function(a, b) {
            var c = a.split(" ");
            return d.utils.each(c,
            function(a) {
                this.element.addEventListener(a, b, !1)
            },
            this),
            this
        },
        off: function(a, b) {
            var c = a.split(" ");
            return d.utils.each(c,
            function(a) {
                this.element.removeEventListener(a, b, !1)
            },
            this),
            this
        },
        trigger: function(a, b) {
            b || (b = {});
            var c = d.DOCUMENT.createEvent("Event");
            c.initEvent(a, !0, !0),
            c.gesture = b;
            var e = this.element;
            return d.utils.hasParent(b.target, e) && (e = b.target),
            e.dispatchEvent(c),
            this
        },
        enable: function(a) {
            return this.enabled = a,
            this
        }
    };
    var e = null,
    f = !1,
    g = !1;
    d.event = {
        bindDom: function(a, b, c) {
            var e = b.split(" ");
            d.utils.each(e,
            function(b) {
                a.addEventListener(b, c, !1)
            })
        },
        onTouch: function(a, b, c) {
            var h = this;
            this.bindDom(a, d.EVENT_TYPES[b],
            function(i) {
                var j = i.type.toLowerCase();
                if (!j.match(/mouse/) || !g) {
                    j.match(/touch/) || j.match(/pointerdown/) || j.match(/mouse/) && 1 === i.which ? f = !0 : j.match(/mouse/) && !i.which && (f = !1),
                    j.match(/touch|pointer/) && (g = !0);
                    var k = 0;
                    if (f) {
                        d.HAS_POINTEREVENTS && b != d.EVENT_END ? k = d.PointerEvent.updatePointer(b, i) : j.match(/touch/) ? k = i.touches.length: g || (k = j.match(/up/) ? 0 : 1),
                        k > 0 && b == d.EVENT_END ? b = d.EVENT_MOVE: k || (b = d.EVENT_END),
                        (k || null === e) && (e = i);
                        var l = /.*Android.*(UC|QQ).*/;
                        b == d.EVENT_MOVE && l.test(navigator.userAgent) ? (d._fakeEndEvent && d._fakeEndEvent(d.EVENT_MOVE), clearTimeout(d._timer), d._fakeEndEvent = function(b, e, f) {
                            c.call(d.detection, h.collectEventData(a, f, h.getTouchList(b, f), e)),
                            d.HAS_POINTEREVENTS && f == d.EVENT_END && (k = d.PointerEvent.updatePointer(f, e)),
                            d._fakeEndEvent = null
                        }.bind(this, e, i), d._timer = setTimeout(function() {
                            d._fakeEndEvent(d.EVENT_END)
                        },
                        400)) : (b == d.EVENT_END && (d._fakeEndEvent && d._fakeEndEvent(d.EVENT_MOVE), clearTimeout(d._timer)), c.call(d.detection, h.collectEventData(a, b, h.getTouchList(e, b), i)), d.HAS_POINTEREVENTS && b == d.EVENT_END && (k = d.PointerEvent.updatePointer(b, i))),
                        c.call(d.detection, h.collectEventData(a, b, h.getTouchList(e, b), i)),
                        d.HAS_POINTEREVENTS && b == d.EVENT_END && (k = d.PointerEvent.updatePointer(b, i))
                    }
                    k || (e = null, f = !1, g = !1, d.PointerEvent.reset())
                }
            })
        },
        determineEventTypes: function() {
            var a;
            a = d.HAS_POINTEREVENTS ? d.PointerEvent.getEvents() : d.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"],
            d.EVENT_TYPES[d.EVENT_START] = a[0],
            d.EVENT_TYPES[d.EVENT_MOVE] = a[1],
            d.EVENT_TYPES[d.EVENT_END] = a[2]
        },
        getTouchList: function(a) {
            return d.HAS_POINTEREVENTS ? d.PointerEvent.getTouchList() : a.touches ? a.touches: (a.indentifier = 1, [a])
        },
        collectEventData: function(a, b, c, e) {
            var f = d.POINTER_TOUCH;
            return (e.type.match(/mouse/) || d.PointerEvent.matchType(d.POINTER_MOUSE, e)) && (f = d.POINTER_MOUSE),
            {
                center: d.utils.getCenter(c),
                timeStamp: (new Date).getTime(),
                target: e.target,
                touches: c,
                eventType: b,
                pointerType: f,
                srcEvent: e,
                preventDefault: function() {
                    this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(),
                    this.srcEvent.preventDefault && this.srcEvent.preventDefault()
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function() {
                    return d.detection.stopDetect()
                }
            }
        }
    },
    d.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var a = this,
            b = [];
            return d.utils.each(a.pointers,
            function(a) {
                b.push(a)
            }),
            b
        },
        updatePointer: function(a, b) {
            return a == d.EVENT_END ? this.pointers = {}: (b.identifier = b.pointerId, this.pointers[b.pointerId] = b),
            Object.keys(this.pointers).length
        },
        matchType: function(a, b) {
            if (!b.pointerType) return ! 1;
            var c = b.pointerType,
            e = {};
            return e[d.POINTER_MOUSE] = c === b.MSPOINTER_TYPE_MOUSE || c === d.POINTER_MOUSE,
            e[d.POINTER_TOUCH] = c === b.MSPOINTER_TYPE_TOUCH || c === d.POINTER_TOUCH,
            e[d.POINTER_PEN] = c === b.MSPOINTER_TYPE_PEN || c === d.POINTER_PEN,
            e[a]
        },
        getEvents: function() {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function() {
            this.pointers = {}
        }
    },
    d.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(a, b) {
            this.current || (this.stopped = !1, this.current = {
                inst: a,
                startEvent: d.utils.extend({},
                b),
                lastEvent: !1,
                name: ""
            },
            this.detect(b))
        },
        detect: function(a) {
            if (this.current && !this.stopped) {
                a = this.extendEventData(a);
                var b = this.current.inst.options;
                return d.utils.each(this.gestures,
                function(c) {
                    return this.stopped || b[c.name] === !1 || c.handler.call(c, a, this.current.inst) !== !1 ? void 0 : (this.stopDetect(), !1)
                },
                this),
                this.current && (this.current.lastEvent = a),
                a.eventType == d.EVENT_END && !a.touches.length - 1 && this.stopDetect(),
                a
            }
        },
        stopDetect: function() {
            this.previous = d.utils.extend({},
            this.current),
            this.current = null,
            this.stopped = !0
        },
        extendEventData: function(a) {
            var b = this.current.startEvent; ! b || a.touches.length == b.touches.length && a.touches !== b.touches || (b.touches = [], d.utils.each(a.touches,
            function(a) {
                b.touches.push(d.utils.extend({},
                a))
            }));
            var c, e, f = a.timeStamp - b.timeStamp,
            g = a.center.pageX - b.center.pageX,
            h = a.center.pageY - b.center.pageY,
            i = d.utils.getVelocity(f, g, h);
            return "end" === a.eventType ? (c = this.current.lastEvent && this.current.lastEvent.interimAngle, e = this.current.lastEvent && this.current.lastEvent.interimDirection) : (c = this.current.lastEvent && d.utils.getAngle(this.current.lastEvent.center, a.center), e = this.current.lastEvent && d.utils.getDirection(this.current.lastEvent.center, a.center)),
            d.utils.extend(a, {
                deltaTime: f,
                deltaX: g,
                deltaY: h,
                velocityX: i.x,
                velocityY: i.y,
                distance: d.utils.getDistance(b.center, a.center),
                angle: d.utils.getAngle(b.center, a.center),
                interimAngle: c,
                direction: d.utils.getDirection(b.center, a.center),
                interimDirection: e,
                scale: d.utils.getScale(b.touches, a.touches),
                rotation: d.utils.getRotation(b.touches, a.touches),
                startEvent: b
            }),
            a
        },
        register: function(a) {
            var c = a.defaults || {};
            return c[a.name] === b && (c[a.name] = !0),
            d.utils.extend(d.defaults, c, !0),
            a.index = a.index || 1e3,
            this.gestures.push(a),
            this.gestures.sort(function(a, b) {
                return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
            }),
            this.gestures
        }
    },
    d.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            correct_for_drag_min_distance: !0,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function(a, b) {
            if (d.detection.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a),
            void(this.triggered = !1);
            if (! (b.options.drag_max_touches > 0 && a.touches.length > b.options.drag_max_touches)) switch (a.eventType) {
            case d.EVENT_START:
                this.triggered = !1;
                break;
            case d.EVENT_MOVE:
                if (a.distance < b.options.drag_min_distance && d.detection.current.name != this.name) return;
                if (d.detection.current.name != this.name && (d.detection.current.name = this.name, b.options.correct_for_drag_min_distance && a.distance > 0)) {
                    var c = Math.abs(b.options.drag_min_distance / a.distance);
                    d.detection.current.startEvent.center.pageX += a.deltaX * c,
                    d.detection.current.startEvent.center.pageY += a.deltaY * c,
                    a = d.detection.extendEventData(a)
                } (d.detection.current.lastEvent.drag_locked_to_axis || b.options.drag_lock_to_axis && b.options.drag_lock_min_distance <= a.distance) && (a.drag_locked_to_axis = !0);
                var e = d.detection.current.lastEvent.direction;
                a.drag_locked_to_axis && e !== a.direction && (d.utils.isVertical(e) ? a.direction = a.deltaY < 0 ? d.DIRECTION_UP: d.DIRECTION_DOWN: a.direction = a.deltaX < 0 ? d.DIRECTION_LEFT: d.DIRECTION_RIGHT),
                this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0),
                b.trigger(this.name, a),
                b.trigger(this.name + a.direction, a),
                (b.options.drag_block_vertical && d.utils.isVertical(a.direction) || b.options.drag_block_horizontal && !d.utils.isVertical(a.direction)) && a.preventDefault();
                break;
            case d.EVENT_END:
                this.triggered && b.trigger(this.name + "end", a),
                this.triggered = !1
            }
        }
    },
    d.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 1
        },
        timer: null,
        handler: function(a, b) {
            switch (a.eventType) {
            case d.EVENT_START:
                clearTimeout(this.timer),
                d.detection.current.name = this.name,
                this.timer = setTimeout(function() {
                    "hold" == d.detection.current.name && b.trigger("hold", a)
                },
                b.options.hold_timeout);
                break;
            case d.EVENT_MOVE:
                a.distance > b.options.hold_threshold && clearTimeout(this.timer);
                break;
            case d.EVENT_END:
                clearTimeout(this.timer)
            }
        }
    },
    d.gestures.Release = {
        name: "release",
        index: 1 / 0,
        handler: function(a, b) {
            a.eventType == d.EVENT_END && b.trigger(this.name, a)
        }
    },
    d.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            swipe_velocity: .7
        },
        handler: function(a, b) {
            if (a.eventType == d.EVENT_END) {
                if (b.options.swipe_max_touches > 0 && a.touches.length < b.options.swipe_min_touches && a.touches.length > b.options.swipe_max_touches) return; (a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
            }
        }
    },
    d.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        handler: function(a, b) {
            if (a.eventType == d.EVENT_END && "touchcancel" != a.srcEvent.type) {
                var c = d.detection.previous,
                e = !1;
                if (a.deltaTime > b.options.tap_max_touchtime || a.distance > b.options.tap_max_distance) return;
                c && "tap" == c.name && a.timeStamp - c.lastEvent.timeStamp < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a), e = !0),
                (!e || b.options.tap_always) && (d.detection.current.name = "tap", b.trigger(d.detection.current.name, a))
            }
        }
    },
    d.gestures.Touch = {
        name: "touch",
        index: -(1 / 0),
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function(a, b) {
            return b.options.prevent_mouseevents && a.pointerType == d.POINTER_MOUSE ? void a.stopDetect() : (b.options.prevent_default && a.preventDefault(), void(a.eventType == d.EVENT_START && b.trigger(this.name, a)))
        }
    },
    d.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: .01,
            transform_min_rotation: 1,
            transform_always_block: !1
        },
        triggered: !1,
        handler: function(a, b) {
            if (d.detection.current.name != this.name && this.triggered) return b.trigger(this.name + "end", a),
            void(this.triggered = !1);
            if (! (a.touches.length < 2)) switch (b.options.transform_always_block && a.preventDefault(), a.eventType) {
            case d.EVENT_START:
                this.triggered = !1;
                break;
            case d.EVENT_MOVE:
                var c = Math.abs(1 - a.scale),
                e = Math.abs(a.rotation);
                if (c < b.options.transform_min_scale && e < b.options.transform_min_rotation) return;
                d.detection.current.name = this.name,
                this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0),
                b.trigger(this.name, a),
                e > b.options.transform_min_rotation && b.trigger("rotate", a),
                c > b.options.transform_min_scale && (b.trigger("pinch", a), b.trigger("pinch" + (a.scale < 1 ? "in": "out"), a));
                break;
            case d.EVENT_END:
                this.triggered && b.trigger(this.name + "end", a),
                this.triggered = !1
            }
        }
    },
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return d
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = d: a.Hammer = d
} (this);
var Zepto = function() {
    function a(a) {
        return null == a ? String(a) : V[W.call(a)] || "object"
    }
    function b(b) {
        return "function" == a(b)
    }
    function c(a) {
        return null != a && a == a.window
    }
    function d(a) {
        return null != a && a.nodeType == a.DOCUMENT_NODE
    }
    function e(b) {
        return "object" == a(b)
    }
    function f(a) {
        return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
    }
    function g(a) {
        return a instanceof Array
    }
    function h(a) {
        return "number" == typeof a.length
    }
    function i(a) {
        return E.call(a,
        function(a) {
            return null != a
        })
    }
    function j(a) {
        return a.length > 0 ? y.fn.concat.apply([], a) : a
    }
    function k(a) {
        return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function l(a) {
        return a in H ? H[a] : H[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
    }
    function m(a, b) {
        return "number" != typeof b || I[k(a)] ? b: b + "px"
    }
    function n(a) {
        var b, c;
        return G[a] || (b = F.createElement(a), F.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), G[a] = c),
        G[a]
    }
    function o(a) {
        return "children" in a ? D.call(a.children) : y.map(a.childNodes,
        function(a) {
            return 1 == a.nodeType ? a: void 0
        })
    }
    function p(a, b, c) {
        for (x in b) c && (f(b[x]) || g(b[x])) ? (f(b[x]) && !f(a[x]) && (a[x] = {}), g(b[x]) && !g(a[x]) && (a[x] = []), p(a[x], b[x], c)) : b[x] !== w && (a[x] = b[x])
    }
    function q(a, b) {
        return null == b ? y(a) : y(a).filter(b)
    }
    function r(a, c, d, e) {
        return b(c) ? c.call(a, d, e) : c
    }
    function s(a, b, c) {
        null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
    }
    function t(a, b) {
        var c = a.className,
        d = c && c.baseVal !== w;
        return b === w ? d ? c.baseVal: c: void(d ? c.baseVal = b: a.className = b)
    }
    function u(a) {
        var b;
        try {
            return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null: /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? y.parseJSON(a) : a: b) : a
        } catch(c) {
            return a
        }
    }
    function v(a, b) {
        b(a);
        for (var c in a.childNodes) v(a.childNodes[c], b)
    }
    var w, x, y, z, A, B, C = [],
    D = C.slice,
    E = C.filter,
    F = window.document,
    G = {},
    H = {},
    I = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    },
    J = /^\s*<(\w+|!)[^>]*>/,
    K = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    L = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    M = /^(?:body|html)$/i,
    N = /([A-Z])/g,
    O = ["val", "css", "html", "text", "data", "width", "height", "offset"],
    P = ["after", "prepend", "before", "append"],
    Q = F.createElement("table"),
    R = F.createElement("tr"),
    S = {
        tr: F.createElement("tbody"),
        tbody: Q,
        thead: Q,
        tfoot: Q,
        td: R,
        th: R,
        "*": F.createElement("div")
    },
    T = /complete|loaded|interactive/,
    U = /^[\w-]*$/,
    V = {},
    W = V.toString,
    X = {},
    Y = F.createElement("div"),
    Z = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    };
    return X.matches = function(a, b) {
        if (!b || !a || 1 !== a.nodeType) return ! 1;
        var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
        if (c) return c.call(a, b);
        var d, e = a.parentNode,
        f = !e;
        return f && (e = Y).appendChild(a),
        d = ~X.qsa(e, b).indexOf(a),
        f && Y.removeChild(a),
        d
    },
    A = function(a) {
        return a.replace(/-+(.)?/g,
        function(a, b) {
            return b ? b.toUpperCase() : ""
        })
    },
    B = function(a) {
        return E.call(a,
        function(b, c) {
            return a.indexOf(b) == c
        })
    },
    X.fragment = function(a, b, c) {
        var d, e, g;
        return K.test(a) && (d = y(F.createElement(RegExp.$1))),
        d || (a.replace && (a = a.replace(L, "<$1></$2>")), b === w && (b = J.test(a) && RegExp.$1), b in S || (b = "*"), g = S[b], g.innerHTML = "" + a, d = y.each(D.call(g.childNodes),
        function() {
            g.removeChild(this)
        })),
        f(c) && (e = y(d), y.each(c,
        function(a, b) {
            O.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
        })),
        d
    },
    X.Z = function(a, b) {
        return a = a || [],
        a.__proto__ = y.fn,
        a.selector = b || "",
        a
    },
    X.isZ = function(a) {
        return a instanceof X.Z
    },
    X.init = function(a, c) {
        var d;
        if (!a) return X.Z();
        if ("string" == typeof a) if (a = a.trim(), "<" == a[0] && J.test(a)) d = X.fragment(a, RegExp.$1, c),
        a = null;
        else {
            if (c !== w) return y(c).find(a);
            d = X.qsa(F, a)
        } else {
            if (b(a)) return y(F).ready(a);
            if (X.isZ(a)) return a;
            if (g(a)) d = i(a);
            else if (e(a)) d = [a],
            a = null;
            else if (J.test(a)) d = X.fragment(a.trim(), RegExp.$1, c),
            a = null;
            else {
                if (c !== w) return y(c).find(a);
                d = X.qsa(F, a)
            }
        }
        return X.Z(d, a)
    },
    y = function(a, b) {
        return X.init(a, b)
    },
    y.extend = function(a) {
        var b, c = D.call(arguments, 1);
        return "boolean" == typeof a && (b = a, a = c.shift()),
        c.forEach(function(c) {
            p(a, c, b)
        }),
        a
    },
    y.merge = function(a) {
        var b, c = D.call(arguments, 1),
        d = {};
        return "boolean" == typeof a ? (b = a, a = c) : a = D.call(arguments, 0),
        y.extend.apply(y, [ !! b, d].concat(a)),
        d
    },
    X.qsa = function(a, b) {
        var c, e = "#" == b[0],
        f = !e && "." == b[0],
        g = e || f ? b.slice(1) : b,
        h = U.test(g);
        return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : D.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
    },
    y.contains = function(a, b) {
        return a !== b && a.contains(b)
    },
    y.type = a,
    y.isFunction = b,
    y.isWindow = c,
    y.isArray = g,
    y.isPlainObject = f,
    y.isEmptyObject = function(a) {
        var b;
        for (b in a) return ! 1;
        return ! 0
    },
    y.inArray = function(a, b, c) {
        return C.indexOf.call(b, a, c)
    },
    y.camelCase = A,
    y.trim = function(a) {
        return null == a ? "": String.prototype.trim.call(a)
    },
    y.uuid = 0,
    y.support = {},
    y.expr = {},
    y.map = function(a, b) {
        var c, d, e, f = [];
        if (h(a)) for (d = 0; d < a.length; d++) c = b(a[d], d),
        null != c && f.push(c);
        else for (e in a) c = b(a[e], e),
        null != c && f.push(c);
        return j(f)
    },
    y.each = function(a, b) {
        var c, d;
        if (h(a)) {
            for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a
        } else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
        return a
    },
    window.JSON && (y.parseJSON = JSON.parse),
    y.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase()
    }),
    y.importStyle = function(a) {
        y("<style>" + a + "</style>").appendTo("head")
    },
    y.fn = {
        forEach: C.forEach,
        reduce: C.reduce,
        push: C.push,
        sort: C.sort,
        indexOf: C.indexOf,
        concat: C.concat,
        map: function(a) {
            return y(y.map(this,
            function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return y(D.apply(this, arguments))
        },
        ready: function(a) {
            return T.test(F.readyState) && F.body ? a(y) : F.addEventListener("DOMContentLoaded",
            function() {
                a(y)
            },
            !1),
            this
        },
        get: function(a) {
            return a === w ? D.call(this) : this[a >= 0 ? a: a + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(a) {
            return C.every.call(this,
            function(b, c) {
                return a.call(b, c, b) !== !1
            }),
            this
        },
        filter: function(a) {
            return b(a) ? this.not(this.not(a)) : y(E.call(this,
            function(b) {
                return X.matches(b, a)
            }))
        },
        add: function(a, b) {
            return y(B(this.concat(y(a, b))))
        },
        is: function(a) {
            return this.length > 0 && X.matches(this[0], a)
        },
        not: function(a) {
            var c = [];
            if (b(a) && a.call !== w) this.each(function(b) {
                a.call(this, b) || c.push(this)
            });
            else {
                var d = "string" == typeof a ? this.filter(a) : h(a) && b(a.item) ? D.call(a) : y(a);
                this.forEach(function(a) {
                    d.indexOf(a) < 0 && c.push(a)
                })
            }
            return y(c)
        },
        has: function(a) {
            return this.filter(function() {
                return e(a) ? y.contains(this, a) : y(this).find(a).size()
            })
        },
        eq: function(a) {
            return - 1 === a ? this.slice(a) : this.slice(a, +a + 1)
        },
        first: function() {
            var a = this[0];
            return a && !e(a) ? a: y(a)
        },
        last: function() {
            var a = this[this.length - 1];
            return a && !e(a) ? a: y(a)
        },
        find: function(a) {
            var b, c = this;
            return b = "object" == typeof a ? y(a).filter(function() {
                var a = this;
                return C.some.call(c,
                function(b) {
                    return y.contains(b, a)
                })
            }) : 1 == this.length ? y(X.qsa(this[0], a)) : this.map(function() {
                return X.qsa(this, a)
            })
        },
        closest: function(a, b) {
            var c = this[0],
            e = !1;
            for ("object" == typeof a && (e = y(a)); c && !(e ? e.indexOf(c) >= 0 : X.matches(c, a));) c = c !== b && !d(c) && c.parentNode;
            return y(c)
        },
        parents: function(a) {
            for (var b = [], c = this; c.length > 0;) c = y.map(c,
            function(a) {
                return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
            });
            return q(b, a)
        },
        parent: function(a) {
            return q(B(this.pluck("parentNode")), a)
        },
        children: function(a) {
            return q(this.map(function() {
                return o(this)
            }), a)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(a) {
            return y.map(this,
            function(b) {
                return b[a]
            })
        },
        show: function(a, b) {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""),
                "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = n(this.nodeName))
            })
        },
        replaceWith: function(a) {
            return this.before(a).remove()
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function(a) {
            return this.css("display", "none")
        },
        toggle: function(a) {
            return this.each(function() {
                var b = y(this); (a === w ? "none" == b.css("display") : a) ? b.show() : b.hide()
            })
        },
        prev: function(a) {
            return y(this.pluck("previousElementSibling")).filter(a || "*")
        },
        next: function(a) {
            return y(this.pluck("nextElementSibling")).filter(a || "*")
        },
        html: function(a) {
            return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML: null: this.each(function(b) {
                var c = this.innerHTML;
                y(this).empty().append(r(this, a, b, c))
            })
        },
        text: function(a) {
            return 0 === arguments.length ? this.length > 0 ? this[0].textContent: null: this.each(function() {
                this.textContent = a === w ? "": "" + a
            })
        },
        attr: function(a, b) {
            var c;
            return "string" == typeof a && b === w ? 0 == this.length || 1 !== this[0].nodeType ? w: "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c: this.each(function(c) {
                if (1 === this.nodeType) if (e(a)) for (x in a) s(this, x, a[x]);
                else s(this, a, r(this, b, c, this.getAttribute(a)))
            })
        },
        removeAttr: function(a) {
            return this.each(function() {
                1 === this.nodeType && s(this, a)
            })
        },
        prop: function(a, b) {
            return a = Z[a] || a,
            b === w ? this[0] && this[0][a] : this.each(function(c) {
                this[a] = r(this, b, c, this[a])
            })
        },
        data: function(a, b) {
            var c = this.attr("data-" + a.replace(N, "-$1").toLowerCase(), b);
            return null !== c ? u(c) : w
        },
        val: function(a) {
            return 0 === arguments.length ? this[0] && (this[0].multiple ? y(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value) : this.each(function(b) {
                this.value = r(this, a, b, this.value)
            })
        },
        offset: function(a) {
            if (a) return this.each(function(b) {
                var c = y(this),
                d = r(this, a, b, c.offset()),
                e = c.offsetParent().offset(),
                f = {
                    top: d.top - e.top,
                    left: d.left - e.left
                };
                "static" == c.css("position") && (f.position = "relative"),
                c.css(f)
            });
            if (0 == this.length) return null;
            var b = this[0].getBoundingClientRect();
            return {
                left: b.left + window.pageXOffset,
                top: b.top + window.pageYOffset,
                width: Math.round(b.width),
                height: Math.round(b.height)
            }
        },
        css: function(b, c) {
            if (arguments.length < 2) {
                var d = this[0],
                e = getComputedStyle(d, "");
                if (!d) return;
                if ("string" == typeof b) return d.style[A(b)] || e.getPropertyValue(b);
                if (g(b)) {
                    var f = {};
                    return y.each(g(b) ? b: [b],
                    function(a, b) {
                        f[b] = d.style[A(b)] || e.getPropertyValue(b)
                    }),
                    f
                }
            }
            var h = "";
            if ("string" == a(b)) c || 0 === c ? h = k(b) + ":" + m(b, c) : this.each(function() {
                this.style.removeProperty(k(b))
            });
            else for (x in b) b[x] || 0 === b[x] ? h += k(x) + ":" + m(x, b[x]) + ";": this.each(function() {
                this.style.removeProperty(k(x))
            });
            return this.each(function() {
                this.style.cssText += ";" + h
            })
        },
        index: function(a) {
            return a ? this.indexOf(y(a)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(a) {
            return a ? C.some.call(this,
            function(a) {
                return this.test(t(a))
            },
            l(a)) : !1
        },
        addClass: function(a) {
            return a ? this.each(function(b) {
                z = [];
                var c = t(this),
                d = r(this, a, b, c);
                d.split(/\s+/g).forEach(function(a) {
                    y(this).hasClass(a) || z.push(a)
                },
                this),
                z.length && t(this, c + (c ? " ": "") + z.join(" "))
            }) : this
        },
        removeClass: function(a) {
            return this.each(function(b) {
                return a === w ? t(this, "") : (z = t(this), r(this, a, b, z).split(/\s+/g).forEach(function(a) {
                    z = z.replace(l(a), " ")
                }), void t(this, z.trim()))
            })
        },
        toggleClass: function(a, b) {
            return a ? this.each(function(c) {
                var d = y(this),
                e = r(this, a, c, t(this));
                e.split(/\s+/g).forEach(function(a) { (b === w ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
                })
            }) : this
        },
        scrollTop: function(a) {
            if (this.length) {
                var b = "scrollTop" in this[0];
                return a === w ? b ? this[0].scrollTop: this[0].pageYOffset: this.each(b ?
                function() {
                    this.scrollTop = a
                }: function() {
                    this.scrollTo(this.scrollX, a)
                })
            }
        },
        position: function() {
            if (this.length) {
                var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = M.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                }: b.offset();
                return c.top -= parseFloat(y(a).css("margin-top")) || 0,
                c.left -= parseFloat(y(a).css("margin-left")) || 0,
                d.top += parseFloat(y(b[0]).css("border-top-width")) || 0,
                d.left += parseFloat(y(b[0]).css("border-left-width")) || 0,
                {
                    top: c.top - d.top,
                    left: c.left - d.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || F.body; a && !M.test(a.nodeName) && "static" == y(a).css("position");) a = a.offsetParent;
                return a
            })
        }
    },
    y.fn.detach = y.fn.remove,
    ["width", "height"].forEach(function(a) {
        var b = a.replace(/./,
        function(a) {
            return a[0].toUpperCase()
        });
        y.fn[a] = function(e) {
            var f, g = this[0];
            return e === w ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
                g = y(this),
                g.css(a, r(this, e, b, g[a]()))
            })
        }
    }),
    P.forEach(function(b, c) {
        var d = c % 2;
        y.fn[b] = function() {
            var b, e, f = y.map(arguments,
            function(c) {
                return b = a(c),
                "object" == b || "array" == b || null == c ? c: X.fragment(c)
            }),
            g = this.length > 1;
            return f.length < 1 ? this: this.each(function(a, b) {
                e = d ? b: b.parentNode,
                b = 0 == c ? b.nextSibling: 1 == c ? b.firstChild: 2 == c ? b: null,
                f.forEach(function(a) {
                    if (g) a = a.cloneNode(!0);
                    else if (!e) return y(a).remove();
                    v(e.insertBefore(a, b),
                    function(a) {
                        null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
                    })
                })
            })
        },
        y.fn[d ? b + "To": "insert" + (c ? "Before": "After")] = function(a) {
            return y(a)[b](this),
            this
        }
    }),
    X.Z.prototype = y.fn,
    X.uniq = B,
    X.deserializeValue = u,
    y.zepto = X,
    y
} ();
window.Zepto = Zepto,
void 0 === window.$ && (window.$ = Zepto),
function(a) {
    function b(a) {
        return a._zid || (a._zid = m++)
    }
    function c(a, c, f, g) {
        if (c = d(c), c.ns) var h = e(c.ns);
        return (q[b(a)] || []).filter(function(a) {
            return a && (!c.e || a.e == c.e) && (!c.ns || h.test(a.ns)) && (!f || b(a.fn) === b(f)) && (!g || a.sel == g)
        })
    }
    function d(a) {
        var b = ("" + a).split(".");
        return {
            e: b[0],
            ns: b.slice(1).sort().join(" ")
        }
    }
    function e(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
    }
    function f(a, b) {
        return a.del || !!b
    }
    function g(c, e, g, i, k, m, n) {
        var o = b(c),
        p = q[o] || (q[o] = []);
        e.split(/\s/).forEach(function(b) {
            if ("ready" == b) return a(document).ready(g);
            var e = d(b);
            e.fn = g,
            e.sel = k,
            e.del = m;
            var o = m || g;
            e.proxy = function(a) {
                if (h(a) && (a = j(a), !a.isImmediatePropagationStopped())) {
                    a.data = i;
                    var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
                    return b === !1 && (a.preventDefault(), a.stopPropagation()),
                    b
                }
            },
            e.i = p.length,
            p.push(e),
            "addEventListener" in c && c.addEventListener(e.e, e.proxy, f(e, n))
        })
    }
    function h(a) {
        var b = ["", "swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap", ""].join(" ").indexOf(" " + a.type + " ") > -1;
        return b && "kimi" !== a._trigger ? !1 : !0
    }
    function i(a, d, e, g, h) {
        var i = b(a); (d || "").split(/\s/).forEach(function(b) {
            c(a, b, e, g).forEach(function(b) {
                delete q[i][b.i],
                "removeEventListener" in a && a.removeEventListener(b.e, b.proxy, f(b, h))
            })
        })
    }
    function j(b, c) {
        return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(v,
        function(a, d) {
            var e = c[a];
            b[a] = function() {
                return this[d] = s,
                e && e.apply(c, arguments)
            },
            b[d] = t
        }), (c.defaultPrevented !== l ? c.defaultPrevented: "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = s)),
        b
    }
    function k(a) {
        var b, c = {
            originalEvent: a
        };
        for (b in a) u.test(b) || a[b] === l || (c[b] = a[b]);
        return j(c, a)
    }
    var l, m = (a.zepto.qsa, 1),
    n = Array.prototype.slice,
    o = a.isFunction,
    p = function(a) {
        return "string" == typeof a
    },
    q = {},
    r = {};
    r.click = "MouseEvents",
    a.event = {
        add: g,
        remove: i
    },
    a.proxy = function(c, d) {
        if (o(c)) {
            var e = function() {
                return c.apply(d, arguments)
            };
            return e._zid = b(c),
            e
        }
        if (p(d)) return a.proxy(c[d], c);
        throw new TypeError("expected function")
    },
    a.fn.one = function(a, b, c, d) {
        return this.on(a, b, c, d, 1)
    };
    var s = function() {
        return ! 0
    },
    t = function() {
        return ! 1
    },
    u = /^([A-Z]|returnValue$|layer[XY]$)/,
    v = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    a.fn.on = function(b, c, d, e, f) {
        var h, j, m = this;
        return b && !p(b) ? (a.each(b,
        function(a, b) {
            m.on(a, c, d, b, f)
        }), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = t), m.each(function(l, m) {
            f && (h = function(a) {
                return i(m, a.type, e),
                e.apply(this, arguments)
            }),
            c && (j = function(b) {
                var d, f = a(b.target).closest(c, m).get(0);
                return f && f !== m ? (d = a.extend(k(b), {
                    currentTarget: f,
                    liveFired: m
                }), (h || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
            }),
            g(m, b, e, d, c, j || h)
        }))
    },
    a.fn.off = function(b, c, d) {
        var e = this;
        return b && !p(b) ? (a.each(b,
        function(a, b) {
            e.off(a, c, b)
        }), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = t), e.each(function() {
            i(this, b, d, c)
        }))
    },
    a.fn.trigger = function(b, c) {
        return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b),
        b._args = c,
        b._trigger = "kimi",
        this.each(function() {
            "dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
        })
    },
    a.fn.triggerHandler = function(b, d) {
        var e, f;
        return this.each(function(g, h) {
            e = k(p(b) ? a.Event(b) : b),
            e._args = d,
            e.target = h,
            a.each(c(h, b.type || b),
            function(a, b) {
                return f = b.proxy(e),
                e.isImmediatePropagationStopped() ? !1 : void 0
            })
        }),
        f
    },
    "focusin focusout load resize scroll unload click change select keydown keypress keyup error".split(" ").forEach(function(b) {
        a.fn[b] = function(a) {
            return a ? this.on(b, a) : this.trigger(b)
        }
    }),
    ["focus", "blur"].forEach(function(b) {
        a.fn[b] = function(a) {
            return a ? this.on(b, a) : this.each(function() {
                try {
                    this[b]()
                } catch(a) {}
            }),
            this
        }
    }),
    a.Event = function(a, b) {
        p(a) || (b = a, a = b.type);
        var c = document.createEvent(r[a] || "Events"),
        d = !0;
        if (b) for (var e in b)"bubbles" == e ? d = !!b[e] : c[e] = b[e];
        return c.initEvent(a, d, !0),
        j(c)
    }
} (Zepto),
function(a) {
    function b(a, b, c, d) {
        return Math.abs(a - b) >= Math.abs(c - d) ? a - b > 0 ? "Left": "Right": c - d > 0 ? "Up": "Down"
    }
    function c() {
        k = null,
        m.last && (m.el.trigger("longTap"), m = {})
    }
    function d() {
        k && clearTimeout(k),
        k = null
    }
    function e() {
        h && clearTimeout(h),
        i && clearTimeout(i),
        j && clearTimeout(j),
        k && clearTimeout(k),
        h = i = j = k = null,
        m = {}
    }
    function f(a) {
        return ("touch" == a.pointerType || a.pointerType == a.MSPOINTER_TYPE_TOUCH) && a.isPrimary
    }
    function g(a, b) {
        return a.type == "pointer" + b || a.type.toLowerCase() == "mspointer" + b
    }
    var h, i, j, k, l, m = {},
    n = 750;
    a(document).ready(function() {
        var o, p, q, r, s = 0,
        t = 0;
        "MSGesture" in window && (l = new MSGesture, l.target = document.body),
        a(document).on("MSGestureEnd",
        function(a) {
            var b = a.velocityX > 1 ? "Right": a.velocityX < -1 ? "Left": a.velocityY > 1 ? "Down": a.velocityY < -1 ? "Up": null;
            b && (m.el.trigger("swipe"), m.el.trigger("swipe" + b))
        }).on("touchstart MSPointerDown pointerdown",
        function(b) { (!(r = g(b, "down")) || f(b)) && (q = r ? b: b.touches[0], b.touches && 1 === b.touches.length && m.x2 && (m.x2 = void 0, m.y2 = void 0), o = Date.now(), p = o - (m.last || o), m.el = a("tagName" in q.target ? q.target: q.target.parentNode), h && clearTimeout(h), m.x1 = q.pageX, m.y1 = q.pageY, p > 0 && 250 >= p && (m.isDoubleTap = !0), m.last = o, k = setTimeout(c, n), l && r && l.addPointer(b.pointerId))
        }).on("touchmove MSPointerMove pointermove",
        function(a) { (!(r = g(a, "move")) || f(a)) && (q = r ? a: a.touches[0], d(), m.x2 = q.pageX, m.y2 = q.pageY, s += Math.abs(m.x1 - m.x2), t += Math.abs(m.y1 - m.y2))
        }).on("touchend MSPointerUp pointerup",
        function(c) { (!(r = g(c, "up")) || f(c)) && (d(), m.x2 && Math.abs(m.x1 - m.x2) > 30 || m.y2 && Math.abs(m.y1 - m.y2) > 30 ? j = setTimeout(function() {
                m.el.trigger("swipe"),
                m.el.trigger("swipe" + b(m.x1, m.x2, m.y1, m.y2)),
                m = {}
            },
            0) : "last" in m && (30 > s && 30 > t ? i = setTimeout(function() {
                var b = a.Event("tap");
                b.cancelTouch = e,
                m.el && m.el.trigger(b),
                m.isDoubleTap ? (m.el && m.el.trigger("doubleTap"), m = {}) : h = setTimeout(function() {
                    h = null,
                    m.el && m.el.trigger("singleTap"),
                    m = {}
                },
                250)
            },
            0) : m = {}), s = t = 0)
        }).on("touchcancel MSPointerCancel pointercancel", e),
        a(window).on("scroll", e)
    }),
    ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) {
        a.fn[b] = function(a) {
            return this.on(b, a)
        }
    })
} (Zepto),
function(a) {
    function b(a, b) {
        if ( - 1 === a.indexOf("./")) return a;
        var c, d = $._AMDMODS;
        for (var e in d) if (b === d[e].factory) {
            c = e;
            break
        }
        if (c) {
            if ( - 1 === a.indexOf("../")) return c.replace(/\/[^\/]+$/, "/") + a.replace("./", "");
            for (var f = a.split("../"), g = c.replace(/\/[^\/]+$/, "").split("/"); f.length > 1;) f.shift(),
            g.pop();
            return g.concat(f).join("/")
        }
    }
    $._AMDMODS = {},
    $.extend(a, {
        define: function(a, b, c) {
            c || (c = b, b = []),
            $._AMDMODS[a] = {
                factory: c
            }
        },
        require: function(a) {
            var c = $._AMDMODS[b(a, arguments.callee.caller)];
            return c ? (c.result || (c.result = c.factory.apply(null, [this.require])), c.result) : $
        }
    })
} (window),
function(a) {
    function b(a) {
        return a.replace(/^(.)/,
        function(a, b) {
            return b.toUpperCase()
        })
    }
    function c(c) {
        c = c.replace(/^kimi\//, ""),
        c = /\/$/.test(c) ? c + "index": c;
        var d = [];
        return (f[c] || []).concat(c).forEach(function(c) { - 1 === c.indexOf("/") ? a[b(c)] || d.push(e + c) : a._AMDMODS[c] || d.push(c)
        }),
        d
    }
    var d = /waptest|daily|taobao\.net|localhost/.test(location.host) ? "//g-assets.daily.taobao.net/": "//g.alicdn.com/",
    e = "tb/kimi/0.0.5/extend/",
    f = {
        deferred: ["callbacks"],
        fx_methods: ["fx"]
    }; - 1 !== location.search.indexOf("debug") && (a.Debug = !0),
    a.config = function(b) {
        a.extend(f, b)
    },
    a.getScript = function(b, c) {
        function d() {
            e && (clearTimeout(e), e = null)
        }
        var e, f = document.createElement("script"),
        g = a.isFunction(c);
        return (g || c && c.success) && (f.onload = function() {
            d(),
            g ? c() : c.success.call(c.context)
        }),
        !g && c && (c.error && (f.onerror = function() {
            d(),
            c.error.call(c.context)
        }), c.timeout && (e = setTimeout(function() {
            e = null,
            c.error && c.error.call(c.context)
        },
        c.timeout))),
        f.setAttribute("data-path", b),
        f.src = b,
        document.body.appendChild(f)
    },
    a.use = function(b, e) {
        a.isArray(b) || (b = b.split(","));
        var f = [],
        g = a.Debug ? ".js": "-min.js",
        h = function() {
            e || (e = function() {}),
            e.apply(null, b.map(function(a) {
                return require(a = /\/$/.test(a) ? a + "index": a)
            }))
        };
        b.forEach(function(a) {
            var b = c(a);
            b.length && (f = f.concat(b))
        }),
        f.length ? a.getScript(d + (f.length > 1 ? "??": "") + f.join(g + ",") + g, h) : h()
    }
} (Zepto),
function(a) {
    function b(c, d, e, f) {
        var g, h = a.isArray(d),
        i = a.isPlainObject(d);
        a.each(d,
        function(d, j) {
            g = a.type(j),
            f && (d = e ? f: f + "[" + (i || "object" == g || "array" == g ? d: "") + "]"),
            !f && h ? c.add(j.name, j.value) : "array" == g || !e && "object" == g ? b(c, j, e, d) : c.add(d, j)
        })
    }
    a.jsonp = a.ajaxJSONP = function(b) {
        var c, d = b.url,
        e = b.data,
        f = (b.jsonpCallback ? b.jsonpCallback: "jsonp") + (new Date).getTime() + Math.round(1e5 * Math.random()),
        g = b.success,
        h = b.jsonp ? b.jsonp: "callback";
        e && (d += ( - 1 === d.indexOf("?") ? "?": "&") + (a.isPlainObject(e) ? a.param(e) : e)),
        b.success = function() {
            delete window[f],
            a(c).remove()
        },
        window[f] = function(a) {
            g.call(b.context, a)
        },
        -1 !== d.indexOf(h + "=?") ? d = d.replace(/=\?/, "=" + f) : d += ( - 1 === d.indexOf("?") ? "?": "&") + h + "=" + f,
        c = a.getScript(d, b)
    },
    a.ajax = function(b) {
        return "jsonp" === b.dataType ? a.ajaxJSONP(b) : void a.use("ajax",
        function() {
            a.ajax(b)
        })
    };
    var c = encodeURIComponent;
    a.param = function(a, d) {
        var e = [];
        return e.add = function(a, b) {
            this.push(c(a) + "=" + c(b))
        },
        b(e, a, d),
        e.join("&").replace(/%20/g, "+")
    }
} (Zepto),
function(a) {
    function b() {
        for (var b = h.length,
        c = b - 1; c >= 0; c--) {
            var d = a(h[c]);
            d.inView() && (d.attr("data-src") && d.attr("data-lazyimg", d.attr("src")).attr("src", d.attr("data-src")).attr("data-src", ""), h.splice(c, 1))
        }
    }
    function c() {
        for (var b = i.length,
        c = b - 1; c >= 0; c--) {
            var d = a(i[c]);
            d.inView(500) || ("" === d.attr("data-src") && d.attr("data-src", d.attr("src")).attr("src", d.attr("data-lazyimg") || "about:blank"), h = h.concat(d))
        }
    }
    function d() {
        e || (e = !0, a(window).on("scroll resize",
        function() {
            f || (f = setTimeout(function() {
                f = null,
                b()
            },
            250))
        }).on("touchend",
        function() {
            g || (g = setTimeout(function() {
                g = null,
                c()
            },
            250))
        }))
    }
    var e, f, g, h = [],
    i = [];
    a.extend(a.fn, {
        inView: function(b) {
            var c = a(window).scrollTop(),
            b = b || 0,
            d = a(this).offset(),
            e = d.top,
            f = e + d.height,
            g = window.innerHeight;
            return e >= c - b && c + g + b >= e || f >= c - b && c + g + b >= f
        },
        lazyload: function(a) {
            h = h.concat(this.slice(0)),
            a || (i = i.concat(this.slice(0))),
            b(),
            d()
        }
    })
} (Zepto),
function(a, b) {
    function c(a) {
        return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }
    function d(a) {
        return e ? e + a: a.toLowerCase()
    }
    var e, f, g, h, i, j, k, l, m, n, o = "",
    p = {
        Webkit: "webkit",
        Moz: "",
        O: "o"
    },
    q = window.document,
    r = q.createElement("div"),
    s = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    t = {};
    a.each(p,
    function(a, c) {
        return r.style[a + "TransitionProperty"] !== b ? (o = "-" + a.toLowerCase() + "-", e = c, !1) : void 0
    }),
    f = o + "transform",
    t[g = o + "transition-property"] = t[h = o + "transition-duration"] = t[j = o + "transition-delay"] = t[i = o + "transition-timing-function"] = t[k = o + "animation-name"] = t[l = o + "animation-duration"] = t[n = o + "animation-delay"] = t[m = o + "animation-timing-function"] = "",
    a.fx = {
        off: e === b && r.style.transitionProperty === b,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: o,
        transitionEnd: d("TransitionEnd"),
        animationEnd: d("AnimationEnd")
    },
    a.fn.animate = function(c, d, e, f, g) {
        return a.isFunction(d) && (f = d, e = b, d = b),
        a.isFunction(e) && (f = e, e = b),
        a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration),
        d && (d = ("number" == typeof d ? d: a.fx.speeds[d] || a.fx.speeds._default) / 1e3),
        g && (g = parseFloat(g) / 1e3),
        this.anim(c, d, e, f, g)
    },
    a.fn.anim = function(d, e, o, p, q) {
        var r, u, v, w = {},
        x = "",
        y = this,
        z = a.fx.transitionEnd,
        A = !1;
        if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d) w[k] = d,
        w[l] = e + "s",
        w[n] = q + "s",
        w[m] = o || "linear",
        z = a.fx.animationEnd;
        else {
            u = [];
            for (r in d) s.test(r) ? x += r + "(" + d[r] + ") ": (w[r] = d[r], u.push(c(r)));
            x && (w[f] = x, u.push(f)),
            e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
        }
        return v = function(b) {
            if ("undefined" != typeof b) {
                if (b.target !== b.currentTarget) return;
                a(b.target).off(z, v)
            } else a(this).off(z, v);
            A = !0,
            a(this).css(t),
            p && p.call(this)
        },
        e > 0 && (this.on(z, v), setTimeout(function() {
            A || v.call(y)
        },
        1e3 * e + 25)),
        this.size() && this.get(0).clientLeft,
        this.css(w),
        0 >= e && setTimeout(function() {
            y.each(function() {
                v.call(this)
            })
        },
        0),
        this
    },
    r = null,
    a.Fx = !0
} (Zepto),
function(a, b) {
    function c(c, d, e, f, g) {
        "function" != typeof d || g || (g = d, d = b);
        var h = {
            opacity: e
        };
        return f && (h.scale = f, c.css(a.fx.cssPrefix + "transform-origin", "0 0")),
        c.animate(h, d, null, g)
    }
    function d(b, d, e, f) {
        return c(b, d, 0, e,
        function() {
            g.call(a(this)),
            f && f.call(this)
        })
    }
    var e = window.document,
    f = (e.documentElement, a.fn.show),
    g = a.fn.hide,
    h = a.fn.toggle;
    a.fn.show = function(a, d) {
        return f.call(this),
        a === b ? a = 0 : this.css("opacity", 0),
        c(this, a, 1, "1,1", d)
    },
    a.fn.hide = function(a, c) {
        return a === b ? g.call(this) : d(this, a, "0,0", c)
    },
    a.fn.toggle = function(c, d) {
        return c === b || "boolean" == typeof c ? h.call(this, c) : this.each(function() {
            var b = a(this);
            b["none" == b.css("display") ? "show": "hide"](c, d)
        })
    },
    a.fn.fadeTo = function(a, b, d) {
        return c(this, a, b, null, d)
    },
    a.fn.fadeIn = function(a, b) {
        var c = this.css("opacity");
        return c > 0 ? this.css("opacity", 0) : c = 1,
        f.call(this).fadeTo(a, c, b)
    },
    a.fn.fadeOut = function(a, b) {
        return d(this, a, null, b)
    },
    a.fn.fadeToggle = function(b, c) {
        return this.each(function() {
            var d = a(this);
            d[0 == d.css("opacity") || "none" == d.css("display") ? "fadeIn": "fadeOut"](b, c)
        })
    },
    a.Fx_methods = !0
} (Zepto),
function(a) {
    a.fn.serializeArray = function() {
        var b, c = [];
        return a([].slice.call(this.get(0).elements)).each(function() {
            b = a(this);
            var d = b.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
                name: b.attr("name"),
                value: b.val()
            })
        }),
        c
    },
    a.fn.serialize = function() {
        var a = [];
        return this.serializeArray().forEach(function(b) {
            a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
        }),
        a.join("&")
    },
    a.fn.submit = function(b) {
        if (b) this.on("submit", b);
        else if (this.length) {
            var c = a.Event("submit");
            this.eq(0).trigger(c),
            c.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    },
    a.Form = !0
} (Zepto),
function() {
    function a(a, b, c) {
        for (var d = (c || 0) - 1, e = a ? a.length: 0; ++d < e;) if (a[d] === b) return d;
        return - 1
    }
    function b(b, c) {
        var d = typeof c;
        if (b = b.cache, "boolean" == d || null == c) return b[c] ? 0 : -1;
        "number" != d && "string" != d && (d = "object");
        var e = "number" == d ? c: r + c;
        return b = (b = b[d]) && b[e],
        "object" == d ? b && a(b, c) > -1 ? 0 : -1 : b ? 0 : -1
    }
    function c(a) {
        var b = this.cache,
        c = typeof a;
        if ("boolean" == c || null == a) b[a] = !0;
        else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a: r + a,
            e = b[c] || (b[c] = {});
            "object" == c ? (e[d] || (e[d] = [])).push(a) : e[d] = !0
        }
    }
    function d(a) {
        return a.charCodeAt(0)
    }
    function e(a, b) {
        var c = a.criteria,
        d = b.criteria;
        if (c !== d) {
            if (c > d || "undefined" == typeof c) return 1;
            if (d > c || "undefined" == typeof d) return - 1
        }
        return a.index - b.index
    }
    function f(a) {
        var b = -1,
        d = a.length,
        e = a[0],
        f = a[d / 2 | 0],
        g = a[d - 1];
        if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g) return ! 1;
        var h = i();
        h["false"] = h["null"] = h["true"] = h.undefined = !1;
        var j = i();
        for (j.array = a, j.cache = h, j.push = c; ++b < d;) j.push(a[b]);
        return j
    }
    function g(a) {
        return "\\" + S[a]
    }
    function h() {
        return o.pop() || []
    }
    function i() {
        return p.pop() || {
            array: null,
            cache: null,
            criteria: null,
            "false": !1,
            index: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            value: null
        }
    }
    function j(a) {
        a.length = 0,
        o.length < t && o.push(a)
    }
    function k(a) {
        var b = a.cache;
        b && k(b),
        a.array = a.cache = a.criteria = a.object = a.number = a.string = a.value = null,
        p.length < t && p.push(a)
    }
    function l(a, b, c) {
        b || (b = 0),
        "undefined" == typeof c && (c = a ? a.length: 0);
        for (var d = -1,
        e = c - b || 0,
        f = Array(0 > e ? 0 : e); ++d < e;) f[d] = a[b + d];
        return f
    }
    function m(c) {
        function o(a) {
            return a && "object" == typeof a && !Rc(a) && Ac.call(a, "__wrapped__") ? a: new p(a)
        }
        function p(a, b) {
            this.__chain__ = !!b,
            this.__wrapped__ = a
        }
        function t(a) {
            function b() {
                if (d) {
                    var a = d.slice();
                    Cc.apply(a, arguments)
                }
                if (this instanceof b) {
                    var f = U(c.prototype),
                    g = c.apply(f, a || arguments);
                    return Aa(g) ? g: f
                }
                return c.apply(e, a || arguments)
            }
            var c = a[0],
            d = a[2],
            e = a[4];
            return b
        }
        function S(a, b, c, d, e) {
            if (c) {
                var f = c(a);
                if ("undefined" != typeof f) return f
            }
            var g = Aa(a);
            if (!g) return a;
            var i = uc.call(a);
            if (!P[i]) return a;
            var k = Pc[i];
            switch (i) {
            case I:
            case J:
                return new k( + a);
            case L:
            case O:
                return new k(a);
            case N:
                return f = k(a.source, z.exec(a)),
                f.lastIndex = a.lastIndex,
                f
            }
            var m = Rc(a);
            if (b) {
                var n = !d;
                d || (d = h()),
                e || (e = h());
                for (var o = d.length; o--;) if (d[o] == a) return e[o];
                f = m ? k(a.length) : {}
            } else f = m ? l(a) : Zc({},
            a);
            return m && (Ac.call(a, "index") && (f.index = a.index), Ac.call(a, "input") && (f.input = a.input)),
            b ? (d.push(a), e.push(f), (m ? Yc: ad)(a,
            function(a, g) {
                f[g] = S(a, b, c, d, e)
            }), n && (j(d), j(e)), f) : f
        }
        function U(a, b) {
            return Aa(a) ? Gc(a) : {}
        }
        function W(a, b, c) {
            if ("function" != typeof a) return Sb;
            if ("undefined" == typeof b || !("prototype" in a)) return a;
            switch (c) {
            case 1:
                return function(c) {
                    return a.call(b, c)
                };
            case 2:
                return function(c, d) {
                    return a.call(b, c, d)
                };
            case 3:
                return function(c, d, e) {
                    return a.call(b, c, d, e)
                };
            case 4:
                return function(c, d, e, f) {
                    return a.call(b, c, d, e, f)
                }
            }
            return Cb(a, b)
        }
        function X(a) {
            function b() {
                var a = i ? g: this;
                if (e) {
                    var o = e.slice();
                    Cc.apply(o, arguments)
                }
                if ((f || k) && (o || (o = l(arguments)), f && Cc.apply(o, f), k && o.length < h)) return d |= 16,
                X([c, m ? d: -4 & d, o, null, g, h]);
                if (o || (o = arguments), j && (c = a[n]), this instanceof b) {
                    a = U(c.prototype);
                    var p = c.apply(a, o);
                    return Aa(p) ? p: a
                }
                return c.apply(a, o)
            }
            var c = a[0],
            d = a[1],
            e = a[2],
            f = a[3],
            g = a[4],
            h = a[5],
            i = 1 & d,
            j = 2 & d,
            k = 4 & d,
            m = 8 & d,
            n = c;
            return b
        }
        function Y(c, d) {
            var e = -1,
            g = fa(),
            h = c ? c.length: 0,
            i = h >= s && g === a,
            j = [];
            if (i) {
                var l = f(d);
                l ? (g = b, d = l) : i = !1
            }
            for (; ++e < h;) {
                var m = c[e];
                g(d, m) < 0 && j.push(m)
            }
            return i && k(d),
            j
        }
        function Z(a, b, c, d) {
            for (var e = (d || 0) - 1, f = a ? a.length: 0, g = []; ++e < f;) {
                var h = a[e];
                if (h && "object" == typeof h && "number" == typeof h.length && (Rc(h) || ia(h))) {
                    b || (h = Z(h, b, c));
                    var i = -1,
                    j = h.length,
                    k = g.length;
                    for (g.length += j; ++i < j;) g[k++] = h[i]
                } else c || g.push(h)
            }
            return g
        }
        function $(a, b, c, d, e, f) {
            if (c) {
                var g = c(a, b);
                if ("undefined" != typeof g) return !! g
            }
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            var i = typeof a,
            k = typeof b;
            if (! (a !== a || a && R[i] || b && R[k])) return ! 1;
            if (null == a || null == b) return a === b;
            var l = uc.call(a),
            m = uc.call(b);
            if (l == G && (l = M), m == G && (m = M), l != m) return ! 1;
            switch (l) {
            case I:
            case J:
                return + a == +b;
            case L:
                return a != +a ? b != +b: 0 == a ? 1 / a == 1 / b: a == +b;
            case N:
            case O:
                return a == oc(b)
            }
            var n = l == H;
            if (!n) {
                var o = Ac.call(a, "__wrapped__"),
                p = Ac.call(b, "__wrapped__");
                if (o || p) return $(o ? a.__wrapped__: a, p ? b.__wrapped__: b, c, d, e, f);
                if (l != M) return ! 1;
                var q = a.constructor,
                r = b.constructor;
                if (q != r && !(za(q) && q instanceof q && za(r) && r instanceof r) && "constructor" in a && "constructor" in b) return ! 1
            }
            var s = !e;
            e || (e = h()),
            f || (f = h());
            for (var t = e.length; t--;) if (e[t] == a) return f[t] == b;
            var u = 0;
            if (g = !0, e.push(a), f.push(b), n) {
                if (t = a.length, u = b.length, g = u == a.length, !g && !d) return g;
                for (; u--;) {
                    var v = t,
                    w = b[u];
                    if (d) for (; v--&&!(g = $(a[v], w, c, d, e, f)););
                    else if (! (g = $(a[u], w, c, d, e, f))) break
                }
                return g
            }
            return _c(b,
            function(b, h, i) {
                return Ac.call(i, h) ? (u++, g = Ac.call(a, h) && $(a[h], b, c, d, e, f)) : void 0
            }),
            g && !d && _c(a,
            function(a, b, c) {
                return Ac.call(c, b) ? g = --u > -1 : void 0
            }),
            s && (j(e), j(f)),
            g
        }
        function _(a, b, c, d, e) { (Rc(b) ? Ta: ad)(b,
            function(b, f) {
                var g, h, i = b,
                j = a[f];
                if (b && ((h = Rc(b)) || bd(b))) {
                    for (var k = d.length; k--;) if (g = d[k] == b) {
                        j = e[k];
                        break
                    }
                    if (!g) {
                        var l;
                        c && (i = c(j, b), (l = "undefined" != typeof i) && (j = i)),
                        l || (j = h ? Rc(j) ? j: [] : bd(j) ? j: {}),
                        d.push(b),
                        e.push(j),
                        l || _(j, b, c, d, e)
                    }
                } else c && (i = c(j, b), "undefined" == typeof i && (i = b)),
                "undefined" != typeof i && (j = i);
                a[f] = j
            })
        }
        function aa(a, b) {
            return a + yc(Oc() * (b - a + 1))
        }
        function ba(c, d, e) {
            var g = -1,
            i = fa(),
            l = c ? c.length: 0,
            m = [],
            n = !d && l >= s && i === a,
            o = e || n ? h() : m;
            if (n) {
                var p = f(o);
                p ? (i = b, o = p) : (n = !1, o = e ? o: (j(o), m))
            }
            for (; ++g < l;) {
                var q = c[g],
                r = e ? e(q, g, c) : q; (d ? !g || o[o.length - 1] !== r: i(o, r) < 0) && ((e || n) && o.push(r), m.push(q))
            }
            return n ? (j(o.array), k(o)) : e && j(o),
            m
        }
        function ca(a) {
            return function(b, c, d) {
                var e = {};
                if (c = o.createCallback(c, d, 3), Rc(b)) for (var f = -1,
                g = b.length; ++f < g;) {
                    var h = b[f];
                    a(e, h, c(h, f, b), b)
                } else Yc(b,
                function(b, d, f) {
                    a(e, b, c(b, d, f), f)
                });
                return e
            }
        }
        function da(a, b, c, d, e, f) {
            var g = 2 & b,
            h = 16 & b,
            i = 32 & b;
            if (!g && !za(a)) throw new pc;
            h && !c.length && (b &= -17, h = c = !1),
            i && !d.length && (b &= -33, i = d = !1);
            var j = 1 == b || 17 === b ? t: X;
            return j([a, b, c, d, e, f])
        }
        function ea(a) {
            return Uc[a]
        }
        function fa() {
            var b = (b = o.indexOf) === mb ? a: b;
            return b
        }
        function ga(a) {
            var b, c;
            return a && uc.call(a) == M && (b = a.constructor, !za(b) || b instanceof b) ? (_c(a,
            function(a, b) {
                c = b
            }), "undefined" == typeof c || Ac.call(a, c)) : !1
        }
        function ha(a) {
            return Vc[a]
        }
        function ia(a) {
            return a && "object" == typeof a && "number" == typeof a.length && uc.call(a) == G || !1
        }
        function ja(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = b, b = !1),
            S(a, b, "function" == typeof c && W(c, d, 1))
        }
        function ka(a, b, c) {
            return S(a, !0, "function" == typeof b && W(b, c, 1))
        }
        function la(a, b) {
            var c = U(a);
            return b ? Zc(c, b) : c
        }
        function ma(a, b, c) {
            var d;
            return b = o.createCallback(b, c, 3),
            ad(a,
            function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }),
            d
        }
        function na(a, b, c) {
            var d;
            return b = o.createCallback(b, c, 3),
            pa(a,
            function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }),
            d
        }
        function oa(a, b, c) {
            var d = [];
            _c(a,
            function(a, b) {
                d.push(b, a)
            });
            var e = d.length;
            for (b = W(b, c, 3); e--&&b(d[e--], d[e], a) !== !1;);
            return a
        }
        function pa(a, b, c) {
            var d = Tc(a),
            e = d.length;
            for (b = W(b, c, 3); e--;) {
                var f = d[e];
                if (b(a[f], f, a) === !1) break
            }
            return a
        }
        function qa(a) {
            var b = [];
            return _c(a,
            function(a, c) {
                za(a) && b.push(c)
            }),
            b.sort()
        }
        function ra(a, b) {
            return a ? Ac.call(a, b) : !1
        }
        function sa(a) {
            for (var b = -1,
            c = Tc(a), d = c.length, e = {}; ++b < d;) {
                var f = c[b];
                e[a[f]] = f
            }
            return e
        }
        function ta(a) {
            return a === !0 || a === !1 || a && "object" == typeof a && uc.call(a) == I || !1
        }
        function ua(a) {
            return a && "object" == typeof a && uc.call(a) == J || !1
        }
        function va(a) {
            return a && 1 === a.nodeType || !1
        }
        function wa(a) {
            var b = !0;
            if (!a) return b;
            var c = uc.call(a),
            d = a.length;
            return c == H || c == O || c == G || c == M && "number" == typeof d && za(a.splice) ? !d: (ad(a,
            function() {
                return b = !1
            }), b)
        }
        function xa(a, b, c, d) {
            return $(a, b, "function" == typeof c && W(c, d, 2))
        }
        function ya(a) {
            return Ic(a) && !Jc(parseFloat(a))
        }
        function za(a) {
            return "function" == typeof a
        }
        function Aa(a) {
            return ! (!a || !R[typeof a])
        }
        function Ba(a) {
            return Da(a) && a != +a
        }
        function Ca(a) {
            return null === a
        }
        function Da(a) {
            return "number" == typeof a || a && "object" == typeof a && uc.call(a) == L || !1
        }
        function Ea(a) {
            return a && R[typeof a] && uc.call(a) == N || !1
        }
        function Fa(a) {
            return "string" == typeof a || a && "object" == typeof a && uc.call(a) == O || !1
        }
        function Ga(a) {
            return "undefined" == typeof a
        }
        function Ha(a) {
            var b = arguments,
            c = 2;
            if (!Aa(a)) return a;
            if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2]) var d = W(b[--c - 1], b[c--], 2);
            else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
            for (var e = l(arguments, 1, c), f = -1, g = h(), i = h(); ++f < c;) _(a, e[f], d, g, i);
            return j(g),
            j(i),
            a
        }
        function Ia(a, b, c) {
            var d = {};
            if ("function" != typeof b) {
                var e = [];
                _c(a,
                function(a, b) {
                    e.push(b)
                }),
                e = Y(e, Z(arguments, !0, !1, 1));
                for (var f = -1,
                g = e.length; ++f < g;) {
                    var h = e[f];
                    d[h] = a[h]
                }
            } else b = o.createCallback(b, c, 3),
            _c(a,
            function(a, c, e) {
                b(a, c, e) || (d[c] = a)
            });
            return d
        }
        function Ja(a) {
            for (var b = -1,
            c = Tc(a), d = c.length, e = fc(d); ++b < d;) {
                var f = c[b];
                e[b] = [f, a[f]]
            }
            return e
        }
        function Ka(a, b, c) {
            var d = {};
            if ("function" != typeof b) for (var e = -1,
            f = Z(arguments, !0, !1, 1), g = Aa(a) ? f.length: 0; ++e < g;) {
                var h = f[e];
                h in a && (d[h] = a[h])
            } else b = o.createCallback(b, c, 3),
            _c(a,
            function(a, c, e) {
                b(a, c, e) && (d[c] = a)
            });
            return d
        }
        function La(a, b, c, d) {
            var e = Rc(a);
            if (null == c) if (e) c = [];
            else {
                var f = a && a.constructor,
                g = f && f.prototype;
                c = U(g)
            }
            return b && (b = o.createCallback(b, d, 4), (e ? Yc: ad)(a,
            function(a, d, e) {
                return b(c, a, d, e)
            })),
            c
        }
        function Ma(a) {
            for (var b = -1,
            c = Tc(a), d = c.length, e = fc(d); ++b < d;) e[b] = a[c[b]];
            return e
        }
        function Na(a) {
            for (var b = arguments,
            c = -1,
            d = Z(b, !0, !1, 1), e = b[2] && b[2][b[1]] === a ? 1 : d.length, f = fc(e); ++c < e;) f[c] = a[d[c]];
            return f
        }
        function Oa(a, b, c) {
            var d = -1,
            e = fa(),
            f = a ? a.length: 0,
            g = !1;
            return c = (0 > c ? Lc(0, f + c) : c) || 0,
            Rc(a) ? g = e(a, b, c) > -1 : "number" == typeof f ? g = (Fa(a) ? a.indexOf(b, c) : e(a, b, c)) > -1 : Yc(a,
            function(a) {
                return++d >= c ? !(g = a === b) : void 0
            }),
            g
        }
        function Pa(a, b, c) {
            var d = !0;
            if (b = o.createCallback(b, c, 3), Rc(a)) for (var e = -1,
            f = a.length; ++e < f && (d = !!b(a[e], e, a)););
            else Yc(a,
            function(a, c, e) {
                return d = !!b(a, c, e)
            });
            return d
        }
        function Qa(a, b, c) {
            var d = [];
            if (b = o.createCallback(b, c, 3), Rc(a)) for (var e = -1,
            f = a.length; ++e < f;) {
                var g = a[e];
                b(g, e, a) && d.push(g)
            } else Yc(a,
            function(a, c, e) {
                b(a, c, e) && d.push(a)
            });
            return d
        }
        function Ra(a, b, c) {
            if (b = o.createCallback(b, c, 3), !Rc(a)) {
                var d;
                return Yc(a,
                function(a, c, e) {
                    return b(a, c, e) ? (d = a, !1) : void 0
                }),
                d
            }
            for (var e = -1,
            f = a.length; ++e < f;) {
                var g = a[e];
                if (b(g, e, a)) return g
            }
        }
        function Sa(a, b, c) {
            var d;
            return b = o.createCallback(b, c, 3),
            Ua(a,
            function(a, c, e) {
                return b(a, c, e) ? (d = a, !1) : void 0
            }),
            d
        }
        function Ta(a, b, c) {
            if (b && "undefined" == typeof c && Rc(a)) for (var d = -1,
            e = a.length; ++d < e && b(a[d], d, a) !== !1;);
            else Yc(a, b, c);
            return a
        }
        function Ua(a, b, c) {
            var d = a,
            e = a ? a.length: 0;
            if (b = b && "undefined" == typeof c ? b: W(b, c, 3), Rc(a)) for (; e--&&b(a[e], e, a) !== !1;);
            else {
                if ("number" != typeof e) {
                    var f = Tc(a);
                    e = f.length
                }
                Yc(a,
                function(a, c, g) {
                    return c = f ? f[--e] : --e,
                    b(d[c], c, g)
                })
            }
            return a
        }
        function Va(a, b) {
            var c = l(arguments, 2),
            d = -1,
            e = "function" == typeof b,
            f = a ? a.length: 0,
            g = fc("number" == typeof f ? f: 0);
            return Ta(a,
            function(a) {
                g[++d] = (e ? b: a[b]).apply(a, c)
            }),
            g
        }
        function Wa(a, b, c) {
            var d = -1,
            e = a ? a.length: 0,
            f = fc("number" == typeof e ? e: 0);
            if (b = o.createCallback(b, c, 3), Rc(a)) for (; ++d < e;) f[d] = b(a[d], d, a);
            else Yc(a,
            function(a, c, e) {
                f[++d] = b(a, c, e)
            });
            return f
        }
        function Xa(a, b, c) {
            var e = -(1 / 0),
            f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Rc(a)) for (var g = -1,
            h = a.length; ++g < h;) {
                var i = a[g];
                i > f && (f = i)
            } else b = null == b && Fa(a) ? d: o.createCallback(b, c, 3),
            Yc(a,
            function(a, c, d) {
                var g = b(a, c, d);
                g > e && (e = g, f = a)
            });
            return f
        }
        function Ya(a, b, c) {
            var e = 1 / 0,
            f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Rc(a)) for (var g = -1,
            h = a.length; ++g < h;) {
                var i = a[g];
                f > i && (f = i)
            } else b = null == b && Fa(a) ? d: o.createCallback(b, c, 3),
            Yc(a,
            function(a, c, d) {
                var g = b(a, c, d);
                e > g && (e = g, f = a)
            });
            return f
        }
        function Za(a, b, c, d) {
            var e = arguments.length < 3;
            if (b = o.createCallback(b, d, 4), Rc(a)) {
                var f = -1,
                g = a.length;
                for (e && (c = a[++f]); ++f < g;) c = b(c, a[f], f, a)
            } else Yc(a,
            function(a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            });
            return c
        }
        function $a(a, b, c, d) {
            var e = arguments.length < 3;
            return b = o.createCallback(b, d, 4),
            Ua(a,
            function(a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f)
            }),
            c
        }
        function _a(a, b, c) {
            return b = o.createCallback(b, c, 3),
            Qa(a,
            function(a, c, d) {
                return ! b(a, c, d)
            })
        }
        function ab(a, b, c) {
            if (a && "number" != typeof a.length && (a = Ma(a)), null == b || c) return a ? a[aa(0, a.length - 1)] : n;
            var d = bb(a);
            return d.length = Mc(Lc(0, b), d.length),
            d
        }
        function bb(a) {
            var b = -1,
            c = a ? a.length: 0,
            d = fc("number" == typeof c ? c: 0);
            return Ta(a,
            function(a) {
                var c = aa(0, ++b);
                d[b] = d[c],
                d[c] = a
            }),
            d
        }
        function cb(a) {
            var b = a ? a.length: 0;
            return "number" == typeof b ? b: Tc(a).length
        }
        function db(a, b, c) {
            var d;
            if (b = o.createCallback(b, c, 3), Rc(a)) for (var e = -1,
            f = a.length; ++e < f && !(d = b(a[e], e, a)););
            else Yc(a,
            function(a, c, e) {
                return ! (d = b(a, c, e))
            });
            return !! d
        }
        function eb(a, b, c) {
            var d = -1,
            f = a ? a.length: 0,
            g = fc("number" == typeof f ? f: 0);
            for (b = o.createCallback(b, c, 3), Ta(a,
            function(a, c, e) {
                var f = g[++d] = i();
                f.criteria = b(a, c, e),
                f.index = d,
                f.value = a
            }), f = g.length, g.sort(e); f--;) {
                var h = g[f];
                g[f] = h.value,
                k(h)
            }
            return g
        }
        function fb(a) {
            return a && "number" == typeof a.length ? l(a) : Ma(a)
        }
        function gb(a) {
            for (var b = -1,
            c = a ? a.length: 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        }
        function hb(a) {
            return Y(a, Z(arguments, !0, !0, 1))
        }
        function ib(a, b, c) {
            var d = -1,
            e = a ? a.length: 0;
            for (b = o.createCallback(b, c, 3); ++d < e;) if (b(a[d], d, a)) return d;
            return - 1
        }
        function jb(a, b, c) {
            var d = a ? a.length: 0;
            for (b = o.createCallback(b, c, 3); d--;) if (b(a[d], d, a)) return d;
            return - 1
        }
        function kb(a, b, c) {
            var d = 0,
            e = a ? a.length: 0;
            if ("number" != typeof b && null != b) {
                var f = -1;
                for (b = o.createCallback(b, c, 3); ++f < e && b(a[f], f, a);) d++
            } else if (d = b, null == d || c) return a ? a[0] : n;
            return l(a, 0, Mc(Lc(0, d), e))
        }
        function lb(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null: b, b = !1),
            null != c && (a = Wa(a, c, d)),
            Z(a, b)
        }
        function mb(b, c, d) {
            if ("number" == typeof d) {
                var e = b ? b.length: 0;
                d = 0 > d ? Lc(0, e + d) : d || 0
            } else if (d) {
                var f = vb(b, c);
                return b[f] === c ? f: -1
            }
            return a(b, c, d)
        }
        function nb(a, b, c) {
            var d = 0,
            e = a ? a.length: 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = o.createCallback(b, c, 3); f--&&b(a[f], f, a);) d++
            } else d = null == b || c ? 1 : b || d;
            return l(a, 0, Mc(Lc(0, e - d), e))
        }
        function ob(c) {
            for (var d = arguments,
            e = d.length,
            g = -1,
            i = h(), l = -1, m = fa(), n = c ? c.length: 0, o = [], p = h(); ++g < e;) {
                var q = d[g];
                i[g] = m === a && (q ? q.length: 0) >= s && f(g ? d[g] : p)
            }
            a: for (; ++l < n;) {
                var r = i[0];
                if (q = c[l], (r ? b(r, q) : m(p, q)) < 0) {
                    for (g = e, (r || p).push(q); --g;) if (r = i[g], (r ? b(r, q) : m(d[g], q)) < 0) continue a;
                    o.push(q)
                }
            }
            for (; e--;) r = i[e],
            r && k(r);
            return j(i),
            j(p),
            o
        }
        function pb(a, b, c) {
            var d = 0,
            e = a ? a.length: 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = o.createCallback(b, c, 3); f--&&b(a[f], f, a);) d++
            } else if (d = b, null == d || c) return a ? a[e - 1] : n;
            return l(a, Lc(0, e - d))
        }
        function qb(a, b, c) {
            var d = a ? a.length: 0;
            for ("number" == typeof c && (d = (0 > c ? Lc(0, d + c) : Mc(c, d - 1)) + 1); d--;) if (a[d] === b) return d;
            return - 1
        }
        function rb(a) {
            for (var b = arguments,
            c = 0,
            d = b.length,
            e = a ? a.length: 0; ++c < d;) for (var f = -1,
            g = b[c]; ++f < e;) a[f] === g && (Fc.call(a, f--, 1), e--);
            return a
        }
        function sb(a, b, c) {
            a = +a || 0,
            c = "number" == typeof c ? c: +c || 1,
            null == b && (b = a, a = 0);
            for (var d = -1,
            e = Lc(0, wc((b - a) / (c || 1))), f = fc(e); ++d < e;) f[d] = a,
            a += c;
            return f
        }
        function tb(a, b, c) {
            var d = -1,
            e = a ? a.length: 0,
            f = [];
            for (b = o.createCallback(b, c, 3); ++d < e;) {
                var g = a[d];
                b(g, d, a) && (f.push(g), Fc.call(a, d--, 1), e--)
            }
            return f
        }
        function ub(a, b, c) {
            if ("number" != typeof b && null != b) {
                var d = 0,
                e = -1,
                f = a ? a.length: 0;
                for (b = o.createCallback(b, c, 3); ++e < f && b(a[e], e, a);) d++
            } else d = null == b || c ? 1 : Lc(0, b);
            return l(a, d)
        }
        function vb(a, b, c, d) {
            var e = 0,
            f = a ? a.length: e;
            for (c = c ? o.createCallback(c, d, 1) : Sb, b = c(b); f > e;) {
                var g = e + f >>> 1;
                c(a[g]) < b ? e = g + 1 : f = g
            }
            return e
        }
        function wb(a) {
            return ba(Z(arguments, !0, !0))
        }
        function xb(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null: b, b = !1),
            null != c && (c = o.createCallback(c, d, 3)),
            ba(a, b, c)
        }
        function yb(a) {
            return Y(a, l(arguments, 1))
        }
        function zb() {
            for (var a = arguments.length > 1 ? arguments: arguments[0], b = -1, c = a ? Xa(fd(a, "length")) : 0, d = fc(0 > c ? 0 : c); ++b < c;) d[b] = fd(a, b);
            return d
        }
        function Ab(a, b) {
            for (var c = -1,
            d = a ? a.length: 0, e = {}; ++c < d;) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1])
            }
            return e
        }
        function Bb(a, b) {
            if (!za(b)) throw new pc;
            return function() {
                return--a < 1 ? b.apply(this, arguments) : void 0
            }
        }
        function Cb(a, b) {
            return arguments.length > 2 ? da(a, 17, l(arguments, 2), null, b) : da(a, 1, null, null, b)
        }
        function Db(a) {
            for (var b = arguments.length > 1 ? Z(arguments, !0, !1, 1) : qa(a), c = -1, d = b.length; ++c < d;) {
                var e = b[c];
                a[e] = da(a[e], 1, null, null, a)
            }
            return a
        }
        function Eb(a, b) {
            return arguments.length > 2 ? da(b, 19, l(arguments, 2), null, a) : da(b, 3, null, null, a)
        }
        function Fb() {
            for (var a = arguments,
            b = a.length; b--;) if (!za(a[b])) throw new pc;
            return function() {
                for (var b = arguments,
                c = a.length; c--;) b = [a[c].apply(this, b)];
                return b[0]
            }
        }
        function Gb(a, b, c) {
            var d = typeof a;
            if (null == a || "function" == d) return W(a, b, c);
            if ("object" != d) return function(b) {
                return b[a]
            };
            var e = Tc(a),
            f = e[0],
            g = a[f];
            return 1 != e.length || g !== g || Aa(g) ?
            function(b) {
                for (var c = e.length,
                d = !1; c--&&(d = $(b[e[c]], a[e[c]], null, !0)););
                return d
            }: function(a) {
                var b = a[f];
                return g === b && (0 !== g || 1 / g == 1 / b)
            }
        }
        function Hb(a, b) {
            return b = "number" == typeof b ? b: +b || a.length,
            da(a, 4, null, null, null, b)
        }
        function Ib(a, b, c) {
            var d, e, f, g, h, i, j, k = 0,
            l = !1,
            m = !0;
            if (!za(a)) throw new pc;
            if (b = Lc(0, b) || 0, c === !0) {
                var o = !0;
                m = !1
            } else Aa(c) && (o = c.leading, l = "maxWait" in c && (Lc(b, c.maxWait) || 0), m = "trailing" in c ? c.trailing: m);
            var p = function() {
                var c = b - (Bc() - g);
                if (0 >= c) {
                    e && xc(e);
                    var l = j;
                    e = i = j = n,
                    l && (k = Bc(), f = a.apply(h, d), i || e || (d = h = null))
                } else i = Ec(p, c)
            },
            q = function() {
                i && xc(i),
                e = i = j = n,
                (m || l !== b) && (k = Bc(), f = a.apply(h, d), i || e || (d = h = null))
            };
            return function() {
                if (d = arguments, g = Bc(), h = this, j = m && (i || !o), l === !1) var c = o && !i;
                else {
                    e || o || (k = g);
                    var n = l - (g - k),
                    r = 0 >= n;
                    r ? (e && (e = xc(e)), k = g, f = a.apply(h, d)) : e || (e = Ec(q, n))
                }
                return r && i ? i = xc(i) : i || b === l || (i = Ec(p, b)),
                c && (r = !0, f = a.apply(h, d)),
                !r || i || e || (d = h = null),
                f
            }
        }
        function Jb(a) {
            if (!za(a)) throw new pc;
            var b = l(arguments, 1);
            return Ec(function() {
                a.apply(n, b)
            },
            1)
        }
        function Kb(a, b) {
            if (!za(a)) throw new pc;
            var c = l(arguments, 2);
            return Ec(function() {
                a.apply(n, c)
            },
            b)
        }
        function Lb(a, b) {
            if (!za(a)) throw new pc;
            var c = function() {
                var d = c.cache,
                e = b ? b.apply(this, arguments) : r + arguments[0];
                return Ac.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
            };
            return c.cache = {},
            c
        }
        function Mb(a) {
            var b, c;
            if (!za(a)) throw new pc;
            return function() {
                return b ? c: (b = !0, c = a.apply(this, arguments), a = null, c)
            }
        }
        function Nb(a) {
            return da(a, 16, l(arguments, 1))
        }
        function Ob(a) {
            return da(a, 32, null, l(arguments, 1))
        }
        function Pb(a, b, c) {
            var d = !0,
            e = !0;
            if (!za(a)) throw new pc;
            return c === !1 ? d = !1 : Aa(c) && (d = "leading" in c ? c.leading: d, e = "trailing" in c ? c.trailing: e),
            Q.leading = d,
            Q.maxWait = b,
            Q.trailing = e,
            Ib(a, b, Q)
        }
        function Qb(a, b) {
            return da(b, 16, [a])
        }
        function Rb(a) {
            return null == a ? "": oc(a).replace(Xc, ea)
        }
        function Sb(a) {
            return a
        }
        function Tb(a, b) {
            var c = a,
            d = !b || za(c);
            b || (c = p, b = a, a = o),
            Ta(qa(b),
            function(e) {
                var f = a[e] = b[e];
                d && (c.prototype[e] = function() {
                    var b = this.__wrapped__,
                    d = [b];
                    Cc.apply(d, arguments);
                    var e = f.apply(a, d);
                    return b && "object" == typeof b && b === e ? this: (e = new c(e), e.__chain__ = this.__chain__, e)
                })
            })
        }
        function Ub() {
            return c._ = tc,
            this
        }
        function Vb() {}
        function Wb(a, b, c) {
            var d = null == a,
            e = null == b;
            if (null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0, c || a % 1 || b % 1) {
                var f = Oc();
                return Mc(a + f * (b - a + parseFloat("1e-" + ((f + "").length - 1))), b)
            }
            return aa(a, b)
        }
        function Xb(a, b) {
            if (a) {
                var c = a[b];
                return za(c) ? a[b]() : c
            }
        }
        function Yb(a, b, c) {
            var d = o.templateSettings;
            a = oc(a || ""),
            c = $c({},
            c, d);
            var e, f = $c({},
            c.imports, d.imports),
            h = Tc(f),
            i = Ma(f),
            j = 0,
            k = c.interpolate || C,
            l = "__p += '",
            m = nc((c.escape || C).source + "|" + k.source + "|" + (k === A ? y: C).source + "|" + (c.evaluate || C).source + "|$", "g");
            a.replace(m,
            function(b, c, d, f, h, i) {
                return d || (d = f),
                l += a.slice(j, i).replace(D, g),
                c && (l += "' +\n__e(" + c + ") +\n'"),
                h && (e = !0, l += "';\n" + h + ";\n__p += '"),
                d && (l += "' +\n((__t = (" + d + ")) == null ? '' : __t) +\n'"),
                j = i + b.length,
                b
            }),
            l += "';\n";
            var p = c.variable,
            q = p;
            q || (p = "obj", l = "with (" + p + ") {\n" + l + "\n}\n"),
            l = (e ? l.replace(v, "") : l).replace(w, "$1").replace(x, "$1;"),
            l = "function(" + p + ") {\n" + (q ? "": p + " || (" + p + " = {});\n") + "var __t, __p = '', __e = _.escape" + (e ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n": ";\n") + l + "return __p\n}";
            var r = "\n/*\n//# sourceURL=" + (c.sourceURL || "/lodash/template/source[" + F+++"]") + "\n*/";
            try {
                var s = jc(h, "return " + l + r).apply(n, i)
            } catch(t) {
                throw t.source = l,
                t
            }
            return b ? s(b) : (s.source = l, s)
        }
        function Zb(a, b, c) {
            a = (a = +a) > -1 ? a: 0;
            var d = -1,
            e = fc(a);
            for (b = W(b, c, 1); ++d < a;) e[d] = b(d);
            return e
        }
        function $b(a) {
            return null == a ? "": oc(a).replace(Wc, ha)
        }
        function _b(a) {
            var b = ++q;
            return oc(null == a ? "": a) + b
        }
        function ac(a) {
            return a = new p(a),
            a.__chain__ = !0,
            a
        }
        function bc(a, b) {
            return b(a),
            a
        }
        function cc() {
            return this.__chain__ = !0,
            this
        }
        function dc() {
            return oc(this.__wrapped__)
        }
        function ec() {
            return this.__wrapped__
        }
        c = c ? V.defaults(T.Object(), c, V.pick(T, E)) : T;
        var fc = c.Array,
        gc = c.Boolean,
        hc = c.Date,
        ic = c.Error,
        jc = c.Function,
        kc = c.Math,
        lc = c.Number,
        mc = c.Object,
        nc = c.RegExp,
        oc = c.String,
        pc = c.TypeError,
        qc = [],
        rc = ic.prototype,
        sc = mc.prototype,
        tc = c._,
        uc = sc.toString,
        vc = nc("^" + oc(uc).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
        wc = kc.ceil,
        xc = c.clearTimeout,
        yc = kc.floor,
        zc = vc.test(zc = mc.getPrototypeOf) && zc,
        Ac = sc.hasOwnProperty,
        Bc = vc.test(Bc = hc.now) && Bc ||
        function() {
            return + new hc
        },
        Cc = qc.push,
        Dc = sc.propertyIsEnumerable,
        Ec = c.setTimeout,
        Fc = qc.splice,
        Gc = vc.test(Gc = mc.create) && Gc,
        Hc = vc.test(Hc = fc.isArray) && Hc,
        Ic = c.isFinite,
        Jc = c.isNaN,
        Kc = vc.test(Kc = mc.keys) && Kc,
        Lc = kc.max,
        Mc = kc.min,
        Nc = c.parseInt,
        Oc = kc.random,
        Pc = {};
        Pc[H] = fc,
        Pc[I] = gc,
        Pc[J] = hc,
        Pc[K] = jc,
        Pc[M] = mc,
        Pc[L] = lc,
        Pc[N] = nc,
        Pc[O] = oc,
        p.prototype = o.prototype;
        var Qc = o.support = {};
        Qc.enumErrorProps = Dc.call(rc, "message") || Dc.call(rc, "name"),
        Qc.enumPrototypes = !0,
        Qc.nonEnumArgs = !0,
        o.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: A,
            variable: "",
            imports: {
                _: o
            }
        },
        Gc || (U = function() {
            function a() {}
            return function(b) {
                if (Aa(b)) {
                    a.prototype = b;
                    var d = new a;
                    a.prototype = null
                }
                return d || c.Object()
            }
        } ());
        var Rc = Hc ||
        function(a) {
            return a && "object" == typeof a && "number" == typeof a.length && uc.call(a) == H || !1
        },
        Sc = function(a) {
            var b, c = a,
            d = [];
            if (!c) return d;
            if (!R[typeof a]) return d;
            var e = c.length;
            if (b = -1, e && ia(c)) for (; ++b < e;) b += "",
            d.push(b);
            else {
                var f = "function" == typeof c;
                for (b in c) f && "prototype" == b || !Ac.call(c, b) || d.push(b)
            }
            return d
        },
        Tc = Kc ?
        function(a) {
            return Aa(a) ? Qc.enumPrototypes && "function" == typeof a || Qc.nonEnumArgs && a.length && ia(a) ? Sc(a) : Kc(a) : []
        }: Sc,
        Uc = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        },
        Vc = sa(Uc),
        Wc = nc("(" + Tc(Vc).join("|") + ")", "g"),
        Xc = nc("[" + Tc(Uc).join("") + "]", "g"),
        Yc = function(a, b, c) {
            var d, e = a,
            f = e;
            if (!e) return f;
            b = b && "undefined" == typeof c ? b: W(b, c, 3);
            var g = e.length;
            if (d = -1, "number" == typeof g) {
                for (; ++d < g;) if (b(e[d], d, a) === !1) return f
            } else {
                var h = "function" == typeof e;
                for (d in e) if ((!h || "prototype" != d) && Ac.call(e, d) && b(e[d], d, a) === !1) return f
            }
            return f
        },
        Zc = function(a, b, c) {
            var d, e = a,
            f = e;
            if (!e) return f;
            var g = arguments,
            h = 0,
            i = "number" == typeof c ? 2 : g.length;
            if (i > 3 && "function" == typeof g[i - 2]) var j = W(g[--i - 1], g[i--], 2);
            else i > 2 && "function" == typeof g[i - 1] && (j = g[--i]);
            for (; ++h < i;) if (e = g[h], e && R[typeof e]) {
                var k = e.length;
                if (d = -1, k && ia(e)) for (; ++d < k;) d += "",
                f[d] = j ? j(f[d], e[d]) : e[d];
                else {
                    var l = "function" == typeof e;
                    for (d in e) l && "prototype" == d || !Ac.call(e, d) || (f[d] = j ? j(f[d], e[d]) : e[d])
                }
            }
            return f
        },
        $c = function(a, b, c) {
            var d, e = a,
            f = e;
            if (!e) return f;
            for (var g = arguments,
            h = 0,
            i = "number" == typeof c ? 2 : g.length; ++h < i;) if (e = g[h], e && R[typeof e]) {
                var j = e.length;
                if (d = -1, j && ia(e)) for (; ++d < j;) d += "",
                "undefined" == typeof f[d] && (f[d] = e[d]);
                else {
                    var k = "function" == typeof e;
                    for (d in e) k && "prototype" == d || !Ac.call(e, d) || "undefined" == typeof f[d] && (f[d] = e[d])
                }
            }
            return f
        },
        _c = function(a, b, c) {
            var d, e = a,
            f = e;
            if (!e) return f;
            if (!R[typeof e]) return f;
            b = b && "undefined" == typeof c ? b: W(b, c, 3);
            var g = e.length;
            if (d = -1, g && ia(e)) {
                for (; ++d < g;) if (d += "", b(e[d], d, a) === !1) return f
            } else {
                var h = "function" == typeof e;
                for (d in e) if ((!h || "prototype" != d) && b(e[d], d, a) === !1) return f
            }
            return f
        },
        ad = function(a, b, c) {
            var d, e = a,
            f = e;
            if (!e) return f;
            if (!R[typeof e]) return f;
            b = b && "undefined" == typeof c ? b: W(b, c, 3);
            var g = e.length;
            if (d = -1, g && ia(e)) {
                for (; ++d < g;) if (d += "", b(e[d], d, a) === !1) return f
            } else {
                var h = "function" == typeof e;
                for (d in e) if ((!h || "prototype" != d) && Ac.call(e, d) && b(e[d], d, a) === !1) return f
            }
            return f
        };
        za(/x/) && (za = function(a) {
            return "function" == typeof a && uc.call(a) == K
        });
        var bd = zc ?
        function(a) {
            if (!a || uc.call(a) != M) return ! 1;
            var b = a.valueOf,
            c = "function" == typeof b && (c = zc(b)) && zc(c);
            return c ? a == c || zc(a) == c: ga(a)
        }: ga,
        cd = ca(function(a, b, c) {
            Ac.call(a, c) ? a[c]++:a[c] = 1
        }),
        dd = ca(function(a, b, c) { (Ac.call(a, c) ? a[c] : a[c] = []).push(b)
        }),
        ed = ca(function(a, b, c) {
            a[c] = b
        }),
        fd = Wa,
        gd = Qa,
        hd = 8 == Nc(u + "08") ? Nc: function(a, b) {
            return Nc(Fa(a) ? a.replace(B, "") : a, b || 0)
        };
        return o.after = Bb,
        o.assign = Zc,
        o.at = Na,
        o.bind = Cb,
        o.bindAll = Db,
        o.bindKey = Eb,
        o.chain = ac,
        o.compact = gb,
        o.compose = Fb,
        o.countBy = cd,
        o.create = la,
        o.createCallback = Gb,
        o.curry = Hb,
        o.debounce = Ib,
        o.defaults = $c,
        o.defer = Jb,
        o.delay = Kb,
        o.difference = hb,
        o.filter = Qa,
        o.flatten = lb,
        o.forEach = Ta,
        o.forEachRight = Ua,
        o.forIn = _c,
        o.forInRight = oa,
        o.forOwn = ad,
        o.forOwnRight = pa,
        o.functions = qa,
        o.groupBy = dd,
        o.indexBy = ed,
        o.initial = nb,
        o.intersection = ob,
        o.invert = sa,
        o.invoke = Va,
        o.keys = Tc,
        o.map = Wa,
        o.max = Xa,
        o.memoize = Lb,
        o.merge = Ha,
        o.min = Ya,
        o.omit = Ia,
        o.once = Mb,
        o.pairs = Ja,
        o.partial = Nb,
        o.partialRight = Ob,
        o.pick = Ka,
        o.pluck = fd,
        o.pull = rb,
        o.range = sb,
        o.reject = _a,
        o.remove = tb,
        o.rest = ub,
        o.shuffle = bb,
        o.sortBy = eb,
        o.tap = bc,
        o.throttle = Pb,
        o.times = Zb,
        o.toArray = fb,
        o.transform = La,
        o.union = wb,
        o.uniq = xb,
        o.values = Ma,
        o.where = gd,
        o.without = yb,
        o.wrap = Qb,
        o.zip = zb,
        o.zipObject = Ab,
        o.collect = Wa,
        o.drop = ub,
        o.each = Ta,
        o.eachRight = Ua,
        o.extend = Zc,
        o.methods = qa,
        o.object = Ab,
        o.select = Qa,
        o.tail = ub,
        o.unique = xb,
        o.unzip = zb,
        Tb(o),
        o.clone = ja,
        o.cloneDeep = ka,
        o.contains = Oa,
        o.escape = Rb,
        o.every = Pa,
        o.find = Ra,
        o.findIndex = ib,
        o.findKey = ma,
        o.findLast = Sa,
        o.findLastIndex = jb,
        o.findLastKey = na,
        o.has = ra,
        o.identity = Sb,
        o.indexOf = mb,
        o.isArguments = ia,
        o.isArray = Rc,
        o.isBoolean = ta,
        o.isDate = ua,
        o.isElement = va,
        o.isEmpty = wa,
        o.isEqual = xa,
        o.isFinite = ya,
        o.isFunction = za,
        o.isNaN = Ba,
        o.isNull = Ca,
        o.isNumber = Da,
        o.isObject = Aa,
        o.isPlainObject = bd,
        o.isRegExp = Ea,
        o.isString = Fa,
        o.isUndefined = Ga,
        o.lastIndexOf = qb,
        o.mixin = Tb,
        o.noConflict = Ub,
        o.noop = Vb,
        o.parseInt = hd,
        o.random = Wb,
        o.reduce = Za,
        o.reduceRight = $a,
        o.result = Xb,
        o.runInContext = m,
        o.size = cb,
        o.some = db,
        o.sortedIndex = vb,
        o.template = Yb,
        o.unescape = $b,
        o.uniqueId = _b,
        o.all = Pa,
        o.any = db,
        o.detect = Ra,
        o.findWhere = Ra,
        o.foldl = Za,
        o.foldr = $a,
        o.include = Oa,
        o.inject = Za,
        ad(o,
        function(a, b) {
            o.prototype[b] || (o.prototype[b] = function() {
                var b = [this.__wrapped__],
                c = this.__chain__;
                Cc.apply(b, arguments);
                var d = a.apply(o, b);
                return c ? new p(d, c) : d
            })
        }),
        o.first = kb,
        o.last = pb,
        o.sample = ab,
        o.take = kb,
        o.head = kb,
        ad(o,
        function(a, b) {
            var c = "sample" !== b;
            o.prototype[b] || (o.prototype[b] = function(b, d) {
                var e = this.__chain__,
                f = a(this.__wrapped__, b, d);
                return e || null != b && (!d || c && "function" == typeof b) ? new p(f, e) : f
            })
        }),
        o.VERSION = "2.3.0",
        o.prototype.chain = cc,
        o.prototype.toString = dc,
        o.prototype.value = ec,
        o.prototype.valueOf = ec,
        Yc(["join", "pop", "shift"],
        function(a) {
            var b = qc[a];
            o.prototype[a] = function() {
                var a = this.__chain__,
                c = b.apply(this.__wrapped__, arguments);
                return a ? new p(c, a) : c
            }
        }),
        Yc(["push", "reverse", "sort", "unshift"],
        function(a) {
            var b = qc[a];
            o.prototype[a] = function() {
                return b.apply(this.__wrapped__, arguments),
                this
            }
        }),
        Yc(["concat", "slice", "splice"],
        function(a) {
            var b = qc[a];
            o.prototype[a] = function() {
                return new p(b.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),
        o
    }
    var n, o = [],
    p = [],
    q = 0,
    r = +new Date + "",
    s = 75,
    t = 40,
    u = " 	\f \ufeff\n\r\u2028\u2029 ᠎             　",
    v = /\b__p \+= '';/g,
    w = /\b(__p \+=) '' \+/g,
    x = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
    y = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
    z = /\w*$/,
    A = /<%=([\s\S]+?)%>/g,
    B = RegExp("^[" + u + "]*0+(?=.$)"),
    C = /($^)/,
    D = /['\n\r\t\u2028\u2029\\]/g,
    E = ["Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setImmediate", "setTimeout"],
    F = 0,
    G = "[object Arguments]",
    H = "[object Array]",
    I = "[object Boolean]",
    J = "[object Date]",
    K = "[object Function]",
    L = "[object Number]",
    M = "[object Object]",
    N = "[object RegExp]",
    O = "[object String]",
    P = {};
    P[K] = !1,
    P[G] = P[H] = P[I] = P[J] = P[L] = P[M] = P[N] = P[O] = !0;
    var Q = {
        leading: !1,
        maxWait: 0,
        trailing: !1
    },
    R = {
        "boolean": !1,
        "function": !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    },
    S = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    },
    T = R[typeof window] && window || this,
    U = R[typeof global] && global; ! U || U.global !== U && U.window !== U || (T = U);
    var V = m();
    T._ = V
}.call(this),
function() {
    var freeGlobal = "object" == typeof global && global && global.Object === Object && global,
    freeSelf = "object" == typeof self && self && self.Object === Object && self,
    root = freeGlobal || freeSelf || Function("return this")(),
    freeExports = "object" == typeof exports && exports && !exports.nodeType && exports,
    freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module,
    _ = root._ || {},
    templates = {
        "tpl-body": {},
        "tpl-filterbar": {},
        "tpl-listview-container": {},
        "tpl-listview-item": {},
        "tpl-listview-pagenav": {},
        "tpl-listview-smarttips": {},
        "tpl-page-baghead": {},
        "tpl-relkey": {},
        "tpl-sift-cat": {},
        "tpl-sift-prop": {},
        "tpl-sift-row": {},
        "tpl-sift": {},
        "tpl-tip": {}
    };
    templates["tpl-body"] = function(obj) {
        obj || (obj = {});
        var __p = "";
        with(obj) __p += '<div id="tbh5v0" class="mytaobao"><div class="toolbar"><header class="top-bar" id="J_Header"><div class="top-bar-w"><div class="top-bar-c"><div class="s-input-select"><div class="s-input-tab"><div class="s-input-tab-txt">宝贝</div><div class="s-input-tab-nav off" id="J_TabNav"><ul><li class="all"><span class="icon icons-baobei"></span>宝贝</li><li class="shop"><span class="icon icons-shop"></span>店铺</li><li class="mall"><span class="icon icons-tmall"></span>天猫</li></ul></div></div><div class="s-input-frame"><form class="c-form-suggest" id="J_Search" method="get" action="/h5"><div class="s-form-search search-form"><input type="search" name="q" class="J_autocomplete" autocomplete="off" value=""/><button><span/></button></div><div class="c-form-btn"><input type="submit" name="search" class="icons-search"/></div></form></div></div></div><a class="logo" href="//m.taobao.com"><div class="icons-home"></div></a><div class="top-bar-btn closed">取消</div></div></header><div class="rellkey-container"></div><div class="onesearch-container" ></div><div class="filterbar-container"></div><div class="tip-container"></div></div><div id="bodyCont" class="screen-wrap fullscreen searchlist"><section class="searchcontent"><div class="search-content"><div class="c-more-nomal" id="J_Loading"><p class="loading"><span></span></p></div></div><input id="J_Page_Url" type="hidden" value="//s.m.taobao.com/search_turn_page_iphone.htm?q=s&amp;sst=1&amp;wlsort=10&amp;abtestNick=&amp;bagtype=&amp;bagvalue=&amp;sid=b905f8677e3fce29&amp;abtest=10"></section></div></div><div id="J_SiftContainer" class="m-sift"></div><div id="J_PageNavContainer"></div>';
        return __p
    },
    templates["tpl-filterbar"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with(obj) __p += '<div class="filter-bar J_sortTab"><div class="viewtype-switch J_SwitchViewtype"><div class="icons-' + (null == (__t = viewtype) ? "": __t) + '"></div></div><ul class="sort-tab"><li class="droplist-trigger selected"><span class="text">综合排序</span><span class="arrow"></span><span class="bar"></span></li><li class="sort" data-value="_sale" >销量优先<span class="bar"></span></li><li><div class="top-bar-e"><span id="J_Sift"><i class="icons-sift"></i>筛选</span></div></li></ul><div class="droplist"><ul class="sorts"><li class="sort selected" data-value="">综合排序<span class="icons-checked-icon"></span></li><li class="sort" data-value="_bid">价格从高到低<span class="icons-checked-icon"></span></li><li class="sort" data-value="bid">价格从低到高<span class="icons-checked-icon"></span></li><li class="sort" data-value="_ratesum">信用排序<span class="icons-checked-icon"></span></li></ul></div></div>';
        return __p
    },
    templates["tpl-listview-container"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with(obj) __p += '<div class="search-list ' + (null == (__t = viewtype) ? "": __t) + '-view" id="J_SearchList"><div class="J_TopLoading loading" style="display: none"><span></span>努力加载中</div><ul></ul><div class="J_BottomLoading loading" style="display: none"><span></span>努力加载中</div></div>';
        return __p
    },
    templates["tpl-listview-item"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "",
        __e = _.escape;
        Array.prototype.join;
        with(obj) {
            1 == pageIndex && 5 == index && (__p += '<li class="install-app"><div><div class="install-app-inner"><img src="//img.alicdn.com/tps/i3/TB1CGzaHXXXXXaaaXXXSr92FVXX-559-210.jpg" /></div></div></li>'),
            __p += "<li ",
            (index + 1) % 2 == 0 && (__p += ' class="mark" '),
            __p += '><div class="list-item"><div class="p"><a href="' + (null == (__t = url) ? "": __t) + '" title=""><img  class="p-pic lazy" src="//assets.alicdn.com/mw/s/common/icons/nopic/no-90.png" dataimg="' + __e(img2 + "_" + size + ".jpg") + '"/>',
            icon && icon.length > 0 && !apply && (__p += '<span class="flag ' + (null == (__t = icon[0]) ? "": __t) + '"></span>'),
            __p += '</a></div><div class="d"><a href="' + (null == (__t = url) ? "": __t) + '" title=""><h3 class="d-title">' + (null == (__t = name) ? "": __t) + '</h3></a><p class="d-price"><em class="h"><span class="price-icon">&yen;</span><span class="font-num">' + (null == (__t = price || originalPrice) ? "": __t) + "</span></em><del>",
            originalPrice != price && (__p += '<span class="price-icon">&yen;</span><span class="font-num">' + (null == (__t = originalPrice) ? "": __t)),
            __p += '</span></del></p><div class="d-main">',
            "" == freight || apply || (__p += '<p class="d-freight">' + (null == (__t = Number(freight) > 0 ? "运费" + freight: "免运费") ? "": __t) + "</p>"),
            __p += '<p class="d-num">',
            "" != sold && (__p += '<span class="font-num">' + (null == (__t = sold) ? "": __t) + "</span>人付款"),
            __p += '</p><p class="d-area">' + (null == (__t = area) ? "": __t) + '</p></div></div></div><div class="icons-group">';
            for (var i = 0; i < iconlist.length; i++) __p += '<div class="' + (null == (__t = iconlist[i].className) ? "": __t) + '">',
            iconlist[i].icon && (__p += '<div class="item-icon icons-' + (null == (__t = iconlist[i].icon) ? "": __t) + '"></div>'),
            __p += (null == (__t = iconlist[i].text) ? "": __t) + "</div>";
            __p += "</div></li>"
        }
        return __p
    },
    templates["tpl-listview-pagenav"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with(obj) __p += '<div class="pagenav expanded"><div class="pagenav-normal"><div class="J_PagePrev disabled">上一页</div><div class="J_PageNavMain pagenav-main"><span class="currentPage">1</span>/' + (null == (__t = pageCount) ? "": __t) + '<div class="close"><div class="icons-arrow-down"></div></div></div><div class="J_PageNext">下一页</div></div><div class="pagenav-slider"><div class="slidebar"><div class="slidebar-filled"><div class="icons-slider-block"></div></div></div></div></div><div class="gotop"><div class="icons-gotop"></div></div>';
        return __p
    },
    templates["tpl-listview-smarttips"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        Array.prototype.join;
        with(obj) {
            __p += '<li class="type-tip-text"><div class="list-item"><ul class="tip-content">';
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                __p += '<li><a href="' + (null == (__t = item.url) ? "": __t) + '">' + (null == (__t = item.show) ? "": __t) + "</a></li>"
            }
            __p += "</ul></div></li>"
        }
        return __p
    },
    templates["tpl-page-baghead"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with(obj) __p += '<div class="bag-page-bar"><a class="back-btn" onclick="history.back()"><span>返回</span></a><span class="bag-title">' + (null == (__t = bagshow) ? "": __t) + "</span></div>";
        return __p
    },
    templates["tpl-relkey"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        Array.prototype.join;
        with(obj) {
            __p += '<div class="rellkey" ><ul>';
            for (var i = 0,
            len = list.length; len > i; i++) {
                var item = list[i];
                __p += '<li data-name="' + (null == (__t = item.name) ? "": __t) + '">' + (null == (__t = item.name) ? "": __t) + "</li>"
            }
            __p += "</ul></div>"
        }
        return __p
    },
    templates["tpl-sift-cat"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        Array.prototype.join;
        with(obj) {
            __p += '<div class="row-head"><span class="title">类目分类：</span><span class="selected-items">test</span><span class="icons-sift-up switch-btn"></span></div><div class="row-body"><ul class="clearfix">';
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                __p += item ? '<li class="sift-item" data-value=' + (null == (__t = item.value) ? "": __t) + ' ><i class="icons-sift-select"></i>' + (null == (__t = item.name) ? "": __t) + "</li>": "<li></li>"
            }
            __p += "</ul></div>"
        }
        return __p
    },
    templates["tpl-sift-prop"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        Array.prototype.join;
        with(obj) for (var i = 0; i < data.length; i++) {
            var item = data[i];
            __p += '<div class="sift-default sift-hide sift-row4 J_SiftConditionBox"><h3>' + (null == (__t = item.propName) ? "": __t) + '</h3><div class="sift-condition"><ul class="clearfix">';
            for (var list = item.list,
            j = 0; j < list.length; j++) {
                var valueItem = list[j];
                __p += valueItem ? '<li data-value="' + (null == (__t = valueItem.value) ? "": __t) + '"><i class="icons-sift-select"></i>' + (null == (__t = valueItem.name) ? "": __t) + "</li>": "<li></li>"
            }
            __p += '</ul></div><div class="icons-sift-down"><div class="icons-sift-up"></div></div></div>'
        }
        return __p
    },
    templates["tpl-sift-row"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        Array.prototype.join;
        with(obj) {
            if (__p += '<div class="sift-row ', isLast && (__p += "sift-row-last"), __p += '"><div class="row-head J_siftRowExpand"><span class="title">' + (null == (__t = title) ? "": __t) + '：</span><span class="selected-items">' + (null == (__t = selectedItems) ? "": __t) + '</span><span class="icons-sift-down switch-btn"></span></div>', items) {
                __p += '<div class="row-body"><ul class="clearfix">';
                for (var i = 0,
                l = items.length; l > i; i++) {
                    var item = items[i],
                    name = item.name ? item.name: item,
                    value = item.value ? item.value: item;
                    __p += '<li class="sift-item J_siftItem"data-type="' + (null == (__t = type) ? "": __t) + '"data-key="' + (null == (__t = key) ? "": __t) + '"data-name="' + (null == (__t = name) ? "": __t) + '"data-value="' + (null == (__t = value) ? "": __t) + '">' + (null == (__t = name) ? "": __t) + "</li>"
                }
                __p += "</ul></div>"
            }
            if (innerRows) for (var r = 0,
            rL = innerRows.length; rL > r; r++) {
                var innerRow = innerRows[r];
                __p += '<div class="row-head J_siftRowExpand"><span class="title">' + (null == (__t = innerRow.title) ? "": __t) + '</span></div><div class="row-body"><ul class="clearfix">';
                for (var ii = 0,
                l = innerRow.items.length; l > ii; ii++) {
                    var item = innerRow.items[ii],
                    name = item.name ? item.name: item,
                    value = item.value ? item.value: item;
                    __p += '<li class="sift-item J_siftItem"data-type="' + (null == (__t = type) ? "": __t) + '"data-key="' + (null == (__t = key) ? "": __t) + '"data-name="' + (null == (__t = name) ? "": __t) + '"data-value="' + (null == (__t = value) ? "": __t) + '">' + (null == (__t = name) ? "": __t) + "</li>"
                }
                __p += "</ul></div>"
            }
            __p += "</div>"
        }
        return __p
    },
    templates["tpl-sift"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        Array.prototype.join;
        with(obj) {
            __p += '<div class="sift-mask" id="J_SiftMask" style="display:none"></div><div class="sort-droplist-mask" id="J_DroplistMask" style="display:none"></div><div class="sift-panel" id="J_SiftContent" style="display:none;"><div class="content"><div class="sift-row price-range-row"><div class="row-head"><span class="title">价格区间（元）</span><span class="two-input"><input id="J_siftStartPrice" class="price-range-item" name="start_price" type="number" min="0" placeholder="最低价" ><span class="divider">-</span><input id="J_siftEndPrice" class="price-range-item" name="end_price" type="number" min="0" placeholder="最高价" ></span></div></div>';
            for (var rowIndex = 0,
            rowLength = rows.length; rowLength > rowIndex; rowIndex++) {
                var row = rows[rowIndex],
                rowStr = _.templates["tpl-sift-row"](row);
                __p += null == (__t = rowStr) ? "": __t
            }
            __p += '</div><div class="sift-bottom"><div class="sift-clear sift-btn" id="J_SiftClear">重置</div><div class="sift-btn-ok sift-btn" id="J_SiftCommit">确定</div></div></div>'
        }
        return __p
    },
    templates["tpl-tip"] = function(obj) {
        obj || (obj = {});
        var __t, __p = "";
        with(obj) __p += '<p id="J_TipSearchHint" class="tip-search-hint">' + (null == (__t = title) ? "": __t) + "</p>";
        return __p
    },
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(["lodash"],
    function(a) {
        _ = a,
        a.templates = a.extend(a.templates || {},
        templates)
    }) : freeModule ? (_ = require("lodash"), (freeModule.exports = templates).templates = templates, freeExports.templates = templates) : _ && (_.templates = _.extend(_.templates || {},
    templates))
}.call(this),
define("searchH5/pages/searchlist/_.index", ["./deps/components/data-manager/index", "./deps/components/lazyload/index", "./deps/components/util/index", "./mods/listview/index", "./mods/searchbox/index", "./mods/sift/index", "./js/main", "./js/onesearch"],
function(a, b, c) {
    var d = window.deps = {
        components: {},
        mods: {}
    };
    d.components["data-manager"] = a("./deps/components/data-manager/index"),
    d.components.lazyload = a("./deps/components/lazyload/index"),
    d.components.util = a("./deps/components/util/index"),
    d.mods.listview = a("./mods/listview/index"),
    d.mods.searchbox = a("./mods/searchbox/index"),
    d.mods.sift = a("./mods/sift/index"),
    a("./js/main")
}),
define("searchH5/pages/searchlist/deps/components/data-manager/index", [],
function(a, b, c) {
    function d(a) {
        this.params = a.data,
        this.url = a.url;
        var b = {
            type: "get",
            url: this.url,
            dataType: "json",
            timeout: 6e4
        },
        c = $.extend(b, a);
        this.opt = c,
        this.dataListenerList = []
    }
    function e(a, b) {
        var c;
        for (var d in b) c = b[d],
        "" === c || null === c ? delete a[d] : a[d] = c
    }
    return d.params = {},
    d.setParam = function(a) {
        e(this.params, a),
        this.trigger("set", a)
    },
    d.removeParam = function(a) {
        delete this.params[a]
    },
    d.prototype = {
        setParam: function(a) {
            e(this.params, a),
            this.trigger("set", a)
        },
        removeParam: function(a) {
            delete this.params[a]
        },
        getData: function(a) {
            var b = this;
            a = a || {},
            a.data = $.extend(_.clone(d.params), this.params, a.data);
            var c = a.success;
            a.success = function(a, d, e) {
                c && c(a, d, e);
                var f = b.dataListenerList.slice();
                f.forEach(function(c) {
                    var d = c;
                    if ("/" == d.indexOf(0) && (d = d.slice(1)), "/" == c) return void b.trigger(c, a);
                    var e = d.split("/"),
                    f = a;
                    e.forEach(function(a) {
                        "object" == typeof f && "" !== a && (f = f[a])
                    }),
                    void 0 !== f && b.trigger(c, f)
                })
            };
            var e = a.error;
            a.error = function(a, c, d) {
                e && e(d, c),
                b.trigger("error", d, c)
            };
            var f = $.extend(_.clone(this.opt), a);
            f.data && f.data.q && ( - 1 !== location.search.indexOf("__debug_forceOnlineData__") && (lib.mtop.config.subDomain = "m"), lib.mtop.request({
                api: "mtop.taobao.wsearch.h5search",
                v: "1.0",
                H5Request: !0,
                data: JSON.stringify(f.data),
                ecode: 1,
                AntiCreep: !0,
                AntiFlool: !0
            },
            function(a) {
                f.success(a.data)
            },
            function(a) {
                f.error(a),
                console.log("fail", a)
            }))
        },
        onData: function(a, b) {
            this.dataListenerList.push(a),
            this.on(a, b)
        },
        offData: function(a, b) {
            if (this.off(a, b), !this.hasListeners(a)) {
                for (var c = 0; c < this.dataListenerList.length; c++) this.dataListenerList[c] === a && this.dataListenerList.splice(c, 1);
                this.off(a, b)
            }
        }
    },
    Emitter(d),
    Emitter(d.prototype),
    d
}),
function(a) {
    if (void 0 == window.define) {
        var b = {},
        c = b.exports = {};
        a(null, c, b),
        window.lazyload = b.exports
    } else define("searchH5/pages/searchlist/deps/components/lazyload/index", [], a)
} (function(a, b, c) {
    function d(a, b) {
        var c = b.right > a.left && b.left < a.right,
        d = b.bottom > a.top && b.top < a.bottom;
        return c && d
    }
    function e(a, b) {
        if (a) {
            var c, d, e, g, h;
            if (a != f) h = a.offset ? a: $(a),
            h = h.offset(),
            c = h.width,
            d = h.height,
            e = h.left,
            g = h.top;
            else {
                var i = b && b.y || 0,
                j = b && b.x || 0;
                c = a.innerWidth + j,
                d = a.innerHeight + i,
                e = a.pageXOffset,
                g = a.pageYOffset
            }
            return {
                left: e,
                top: g,
                right: e + c,
                bottom: g + d
            }
        }
    }
    var f = window;
    return lazyload = {
        init: function(a) {
            this.img.init(a)
        },
        img: {
            init: function(a) {
                var b = this;
                if (!b.isload) {
                    var c = {
                        lazyHeight: 400,
                        lazyWidth: 0,
                        definition: !1,
                        size: null
                    },
                    a = a || {};
                    $.extend(b, c, a);
                    var d = b.definition,
                    e = f.devicePixelRatio;
                    b.definition = d && e && e > 1 || !1,
                    b.DPR = e;
                    var g = 5,
                    h = 200,
                    i = b.isPhone = b.fetchVersion();
                    if (i) {
                        var j, k;
                        $(f).on("touchstart",
                        function(a) {
                            j = {
                                sy: f.pageYOffset,
                                time: Date.now()
                            },
                            k && clearTimeout(k)
                        }).on("touchend",
                        function(a) {
                            if (a && a.changedTouches) {
                                var c = Math.abs(f.pageYOffset - j.sy);
                                if (c > g) {
                                    var d = Date.now() - j.time;
                                    k = setTimeout(function() {
                                        b.changeimg(),
                                        j = {},
                                        clearTimeout(k),
                                        k = null
                                    },
                                    d > h ? 0 : 200)
                                }
                            } else b.changeimg()
                        }).on("touchcancel",
                        function() {
                            k && clearTimeout(k),
                            j = null
                        })
                    } else $(f).on("scroll",
                    function() {
                        b.changeimg()
                    });
                    b.isload = !0
                }
            },
            trigger: function(a) {
                var b = this,
                c = b.isPhone,
                d = c && "touchend" || "scroll";
                b.imglist && b.imglist.each(function(a, b) {
                    b && (b.onerror = b.onload = null)
                }),
                a && (b.size = a),
                b.imglist = $("img.lazy"),
                $(window).trigger(d)
            },
            fetchVersion: function() {
                var a = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
                b = a && !0 || !1,
                c = b && a[2].split("_");
                return c = c && parseFloat(c.length > 1 ? c.splice(0, 2).join(".") : c[0], 10),
                b && 6 > c
            },
            setImgSrc: function(a, b) {
                if (a) {
                    b = b || this.size,
                    b = b && ("string" == typeof b ? b: b[this.DPR]) || null,
                    b && (b = ["_", b, ".jpg"].join(""));
                    var c = a.lastIndexOf("_."),
                    d = -1 != c ? a.slice(c + 2) : null,
                    e = d && "webp" == d.toLowerCase() ? !0 : !1,
                    f = e ? a.slice(0, c) : a,
                    g = f.replace(/_\d+x\d+\.jpg?/g, "");
                    return g += b,
                    e && g + "_.webp" || g
                }
            },
            getCoord: e,
            changeimg: function() {
                function a(a, c) {
                    var d = a.attr("dataimg"),
                    e = a.attr("datasize");
                    d && ((g || e) && (d = b.setImgSrc(d, e)), a.attr("src", d), a.css("visibility", "visible"), a[0].onload || (a[0].onload = a[0].onerror = function() {
                        $(this).removeClass("lazy").removeAttr("dataimg"),
                        b.imglist[c] = null,
                        this.onerror = this.onload = null
                    }))
                }
                var b = this,
                c = window,
                f = {
                    x: b.lazyWidth,
                    y: b.lazyHeight
                },
                g = b.definition;
                b.imglist.each(function(b, g) {
                    if (g) {
                        var h = $(g);
                        d(e(c, f), e(h)) && a(h, b)
                    }
                })
            }
        }
    },
    c ? void(c.exports = lazyload) : lazyload
}),
define("searchH5/pages/searchlist/deps/components/util/index", [],
function(a, b, c) {
    function d(a) {
        a || (a = location.href);
        var b, c, d = {},
        e = a.split("?")[1];
        if (e) {
            e = e.split("#")[0],
            c = e.split("&");
            for (var f = 0; f < c.length; f++) b = c[f].split("="),
            d[b[0]] = decodeURIComponent(b[1])
        }
        return d
    }
    function e(a, b) {
        var c, d = "first";
        return function() {
            var e = arguments,
            f = this;
            clearTimeout(c),
            "first" === d ? (a.apply(f, e), d = null) : d || (d = setTimeout(function() {
                a.apply(f, e),
                d = null,
                c = setTimeout(function() {
                    d = "first"
                },
                b)
            },
            b))
        }
    }
    return $ && ($.fn.siblings = function(a) {
        var b = this.map(function(a, b) {
            return [].filter.call($(b).parent().children(),
            function(a) {
                return a !== b
            })
        });
        return a ? b.filter(a) : b
    }),
    {
        getUrlParams: d,
        once: e
    }
}),
define("searchH5/pages/searchlist/mods/listview/index", [],
function(require, exports, module) {
    function ListView(a) {
        this.listItemData = "",
        this.currentPageIndex = 1,
        this.totalPage = 0,
        this.currentItemIndex = 0,
        this.listItemTpl = _.templates["tpl-listview-item"],
        this.containerTpl = _.templates["tpl-listview-container"];
        var b = window.devicePixelRatio || 1;
        b >= 2 ? this.sizeMap = {
            list: 210,
            larger: 250,
            largest: 430
        }: this.sizeMap = {
            list: 100,
            larger: 130,
            largest: 300
        },
        this.container = $(a),
        this.toploading = null,
        this.bottomloading = null,
        this.defaultLoading = $("#J_Loading"),
        this.listContainer = null,
        this.pageDataMap = {},
        this.dataList = [],
        this.isUserScroll = !0,
        this.currentViewType,
        this.init()
    }
    function PageNav(a) {
        this.$container = $(a.container),
        this.pageCount = a.pageCount,
        this.init()
    }
    var Util = {
        once: function(a, b) {
            var c, d = "first";
            return function() {
                var e = arguments,
                f = this;
                clearTimeout(c),
                "first" === d ? (a.apply(f, e), d = null) : d || (d = setTimeout(function() {
                    a.apply(f, e),
                    d = null,
                    c = setTimeout(function() {
                        d = "first"
                    },
                    b)
                },
                b))
            }
        }
    },
    DEFAULT_IMG_URL = "//assets.alicdn.com/mw/s/common/icons/nopic/no-90.png",
    lazyload = deps.components.lazyload,
    STORY_KEY = "viewtype";
    return ListView.prototype = {
        init: function() {
            this.dataManager = window.globle.dataManagers.list,
            lazyload.img.init({
                definition: !0
            }),
            this.initAppInstall()
        },
        initAppInstall: function() {
            var a = window.lib && window.lib.env && window.lib.env.aliapp;
            return a && "TB" === a.appname ? void $(".install-app").hide() : void(this.__appInstallExecuted || (this.__appInstallExecuted = !0, $(document).on("click", ".install-app",
            function() {
                lib.env.aliapp && "TB" === lib.env.aliapp.appname || app.jump.tip(location.href, {
                    text: "正在打开手机淘宝",
                    altText: "如果您未安装手机淘宝，还可以：",
                    downText: "下载手机淘宝",
                    goText: "继续访问"
                })
            })))
        },
        initWithData: function() {
            this.listContainer = this.container.append(this.containerTpl({
                viewtype: this.getViewType()
            })).find("ul").first(),
            this.toploading = this.container.find(".J_TopLoading"),
            this.bottomloading = this.container.find(".J_BottomLoading"),
            this.events()
        },
        _calculate: function() {
            this.toolBarHeight = $(".toolbar").height(),
            this.pageHeight = $(".page-container").height(),
            this.windowHeight = window.screen.height
        },
        events: function() {
            this._dragDownEvent = _.bind(this._dragDownEvent, this),
            this._hammerListContainer = Hammer(this.listContainer[0], {
                swipe_velocity: 0
            }),
            $(document).on("scroll", _.bind(this._scrollEvent, this)),
            this.listContainer.on("click", ".type-tip li",
            function(a) {
                $("#tbh5v0").addClass("fixed"),
                $(a.target).animate({
                    position: "relative",
                    top: "-800px",
                    opacity: "0.2"
                },
                {
                    duration: 800,
                    complete: function() {
                        location.href = location.href
                    }
                }),
                a.stopPropagation()
            }),
            this.listContainer.on("tap", ".list-item a",
            function(a) {
                a.preventDefault(),
                location.href = $(this).attr("href")
            }).on("click", ".list-item a",
            function(a) {
                a.preventDefault()
            })
        },
        _scrollEvent: function() {
            var a = document.body.scrollTop;
            20 > a ? this._hammerListContainer.on("dragend", this._dragDownEvent) : this._hammerListContainer.off("dragend", this._dragDownEvent),
            this.isUserScroll && (this.currentPageIndex < this.totalPage && this.bottomloading.offset().top - (a + window.screen.height) < 320 && this.loadPage(this.currentPageIndex + 1), this._updatePageIndex())
        },
        _getPageItemOffset: function(a) {
            return Math.floor((a + this.windowHeight / 2 - this.toolBarHeight) / this.pageHeight)
        },
        _updatePageIndex: Util.once(function() {
            if (this.isUserScroll) {
                var a = document.body.scrollTop,
                b = this.listContainer.find(".page-container"),
                c = this._getPageItemOffset(a),
                d = ~~b.first().attr("data-page");
                this.currentPageIndex = d + c,
                this.resumePageItem(b.slice(c >= 2 ? c - 2 : 0, c + 2)),
                this.opage && this.opage.setIndex(this.currentPageIndex),
                this.currentPageIndex < this.totalPage && this.bottomloading.offset().top - (a + window.screen.height) < 320 && this.loadPage(this.currentPageIndex + 1)
            }
        },
        200),
        _dragDownEvent: Util.once(function(a) {
            this.currentPageIndex > 1 && "down" == a.gesture.direction && this.loadPage(this.currentPageIndex - 1,
            function(a) {
                a.success && window.scrollTo(0, $(".page-container").height())
            })
        },
        200),
        query: function(a) {
            var b = this,
            c = this.defaultLoading;
            a && b.dataManager.setParam(a),
            b.listContainer && b.listContainer.html(""),
            b.pageDataMap = {},
            c.show(),
            this.gotopage(1,
            function(a) {
                b.__oldInterfaceAdapter(a),
                b._calculate(),
                c.hide(),
                null == a.listItem || a.listItem.length <= 0 ? b.listContainer.html('<div id="noresult"><div class="icons-noresult"></div><p class="detail">没搜索到相关宝贝</p></div>') : this.currentPageIndex = 1
            })
        },
        handleListItemsdata: function(a) {
            var b = a.listItem;
            a.view;
            return b
        },
        _getParamFromUrl: function(a) {
            var b = location.search && location.search.split("?")[1].match(new RegExp("(^| )" + a + "=([^&]*)(&|$)"));
            return b ? unescape(b[2]) : null
        },
        renderListItems: function(a, b) {
            var c = "";
            if (void 0 === a) return c;
            for (var d = 0,
            e = a.length; e > d; d++) c += this.renderListItem(a[d], d, b);
            return c
        },
        renderListItem: function(a, b, c) {
            function d(a) {
                if (a) {
                    var b = a.split(".");
                    if ("00" == b[1]) return b[0]
                }
                return a
            }
            function e(a, b, c) {
                if (b > a) return a;
                a /= b;
                var d = a.toString(),
                e = d.indexOf(".");
                return e > -1 && (d = "0" == d[e + 1] ? d.slice(0, e) : d.slice(0, e + 2)),
                d = d + c || ""
            }
            a.icon || (a.icon = []),
            "true" == a.isP4p && a.icon.push("c-icon-p4p"),
            "1" == a.userType && a.icon.push("c-icon-pt");
            var f = [];
            if (a.mobileDiscount && f.push({
                className: "item-icons-zx",
                text: a.mobileDiscount,
                icon: "miniphone"
            }), a.coinLimit && "0" != a.coinLimit) {
                var g = parseInt(a.coinLimit) / 100;
                f.push({
                    className: "item-icons-jinbi",
                    text: "金币抵" + g + "%"
                })
            }
            return "聚划算" == a.zkType && f.push({
                className: "item-icons-ju",
                text: "聚"
            }),
            _.extend(a, {
                pageIndex: c,
                index: b,
                apply: !1,
                size: this._getImgSize(),
                iconlist: f,
                id: a.itemNumId || null,
                wwurl: a.wwimUrl || null,
                price: d(a.price),
                originalPrice: d(a.originalPrice),
                act: e(a.act, 1e4, "万")
            }),
            _.templates["tpl-listview-item"](a)
        },
        changeViewType: function(a) {
            function b(a, b) {
                for (var c, d, e = 0,
                f = a.length; f > e; e++) d = a.eq(e),
                d.hasClass("lazy") ? c = d.attr("dataimg") : (d.addClass("lazy"), c = d.attr("src"), d.attr("src", DEFAULT_IMG_URL)),
                c = c.replace(/_\d+x\d+\.jpg?/g, "_" + b + ".jpg"),
                d.attr("dataimg", c)
            }
            var c = $("#J_SearchList"),
            d = this.currentViewType;
            if (d !== a) {
                c.removeClass(d + "-view"),
                c.addClass(a + "-view"),
                this.currentViewType = a;
                var e = this._getImgSize();
                b(c.find("img.p-pic"), e),
                lazyload.img.trigger(e);
                try {
                    localStorage && localStorage.setItem(STORY_KEY, a)
                } catch(f) {}
                this._calculate()
            }
        },
        getViewType: function(a) {
            a = a || "list";
            var b = this.currentViewType,
            c = {
                list: "list",
                larger: "mid",
                largest: "grid"
            };
            return b || (b = localStorage && localStorage.getItem(STORY_KEY)),
            b ? this.dataManager.setParam({
                style: c[b]
            }) : b = a,
            this.currentViewType = b,
            b
        },
        _getImgSize: function() {
            var a = this.sizeMap[this.getViewType()];
            return a + "x" + a
        },
        fetchData: function(pageindex, callback) {
            var self = this;
            return self.fetching ? void(callback && callback({})) : (self.fetching = !0, void this.dataManager.getData({
                data: {
                    page: pageindex
                },
                success: function(json) {
                    "string" == typeof json && (json = window.JSON ? JSON.parse(json) : eval("(" + json + ")")),
                    json.view = self.getViewType(json.defaultViewType),
                    callback && callback({
                        success: {
                            data: json
                        }
                    }),
                    self.fetching = !1
                },
                error: function(a, b) {
                    self.fetching = !1,
                    callback && callback({
                        error: {
                            msg: "网络连接失败，请检查网络或刷新重试"
                        }
                    }),
                    console.log("err")
                }
            }))
        },
        getData: function(a, b) {
            var c = this;
            c.pageDataMap[a] ? b({
                success: c.pageDataMap[a]
            }) : c.fetchData(a,
            function(d) {
                if (d && d.success) {
                    var e = d.success.data;
                    c.pageDataMap[a] = {
                        pageData: d.success.pageData = c.handleListItemsdata(e),
                        data: e
                    },
                    c.totalPage = Number(e.totalPage)
                }
                b(d)
            })
        },
        getPageDom: function(a, b) {
            var c = this;
            this.getData(a,
            function(d) {
                if (d && d.success) {
                    var e = d.success.data,
                    f = d.success.pageData,
                    g = c.renderListItems(f, a),
                    h = $("<div/>", {
                        "class": "page-container J_PageContainer_" + a,
                        "data-page": a
                    }).append(g);
                    e.smart_tips && c.renderSmartTips(h, e.smart_tips),
                    d.success.pageDom = h
                }
                b && b(d)
            })
        },
        renderSmartTips: function(a, b) {
            var c = b.type;
            _.each(b.items,
            function(a) {
                a.url = [location.href, "bagtype=" + c, "bagvalue=" + encodeURIComponent(a.value), "bagshow=" + encodeURIComponent(a.show)].join("&")
            }),
            a.prepend(_.templates["tpl-listview-smarttips"](b))
        },
        recyclePageItem: function(a) {
            var b = $(".page-container");
            if (a > 0) b.slice(a).remove();
            else {
                var c = b.slice(0, a);
                c.length > 0 && (c.addClass("recycle"), c.css("height", c.first().height()), c.html(""))
            }
        },
        resumePageItem: function(a) {
            for (var b, c = this,
            d = a.filter(".recycle"), e = d.length - 1; e >= 0; e--) b = d.eq(e),
            c.getPageDom(b.attr("data-page"),
            function(a) {
                a.success && (b.removeClass("recycle"), b.replaceWith(a.success.pageDom), b.css("height", "auto"), lazyload.img.trigger(c._getImgSize())),
                c.initAppInstall()
            })
        },
        loadPage: function(a, b) {
            if (! ($(".J_PageContainer_" + a).length > 0)) {
                var c = this,
                d = c.listContainer;
                if (d) switch (a) {
                case c.currentPageIndex - 1 : c.toploading.show();
                    break;
                case c.currentPageIndex + 1 : break;
                default:
                    c.bottomloading.hide(),
                    d && d.empty(),
                    c.defaultLoading.show()
                }
                this.getPageDom(a,
                function(e) {
                    var f;
                    if (d || (c.initWithData(), d = c.listContainer), !e || !e.success) {
                        if (c.toploading.hide(), c.bottomloading.hide(), c.defaultLoading.hide(), !e) return;
                        return void(e.error && d.html('<div class="c-msg"><section class="c-msg-img warn"></section><section class="c-msg-info"><p>' + e.error.msg + "</p></section></div>"))
                    }
                    switch (f = e.success.pageDom, a) {
                    case c.currentPageIndex - 1 : c.toploading.hide(),
                        d.prepend(f),
                        !(a % 5) && c.recyclePageItem(5);
                        break;
                    default:
                        d.append(f),
                        !(a % 5) && c.recyclePageItem( - 5),
                        a >= c.totalPage ? c.bottomloading.hide() : c.bottomloading.show(),
                        c.defaultLoading.hide()
                    }
                    lazyload.img.trigger(c._getImgSize()),
                    c.initAppInstall(),
                    b && b(e)
                })
            }
        },
        gotopage: function(a, b) {
            var c = this,
            d = !1,
            e = $(".J_PageContainer_" + a);
            e.length ? (c._scrollIntoView(e), c.currentPageIndex = a) : d || (d = !0, c.isUserScroll = !1, this.loadPage(a,
            function(e) {
                e.success && (c.currentPageIndex = a, 1 != a && c._scrollIntoView($(".J_PageContainer_" + a), -34), b && b(e.success.data)),
                c.isUserScroll = !0,
                d = !1
            }))
        },
        _scrollIntoView: function(a, b) {
            var c = this;
            b = a.offset().top + (b || 0),
            c.isUserScroll = !1,
            clearTimeout(c.isUserScrollTimer),
            c.isUserScrollTimer = setTimeout(function() {
                c.isUserScroll = !0
            },
            500);
            var d = this.listContainer.find(".page-container"),
            e = this._getPageItemOffset(b);
            c.resumePageItem(d.slice(e >= 2 ? e - 2 : 0, e + 2)),
            window.scrollTo(0, b)
        },
        __oldInterfaceAdapter: function(a, b) {
            function c(a) {
                d.opage && d.opage.$container.empty(),
                d.opage = new PageNav({
                    container: "#J_PageNavContainer",
                    pageCount: a.totalPage
                }),
                d.opage.$container.on("page:change",
                function(a, b) {
                    d.gotopage(b.index)
                })
            }
            var d = this;
            c(a),
            d.noFirst || (d.noFirst = !0)
        }
    },
    PageNav.prototype = {
        init: function() {
            this.$container.append(_.templates["tpl-listview-pagenav"]({
                pageCount: this.pageCount
            })),
            this.$prev = this.$container.find(".J_PagePrev"),
            this.$next = this.$container.find(".J_PageNext"),
            this.$currentPage = this.$container.find(".currentPage"),
            this.$filledBar = this.$container.find(".slidebar-filled"),
            this.$bar = this.$container.find(".slidebar"),
            this.$slider = this.$container.find(".pagenav-slider"),
            this.$sliderblock = this.$container.find(".icons-slider-block"),
            this.$main = this.$container.find(".J_PageNavMain"),
            this.eventAttach()
        },
        eventAttach: function() {
            var a = this,
            b = null,
            c = null,
            d = 1,
            e = 0;
            a.$slider.on("touchstart touchmove",
            function(f) {
                c || (c = setTimeout(function() {
                    var g = f.touches[0].clientX - e,
                    h = a.pageCount;
                    b || (b = parseInt(a.$bar.css("width"))),
                    d = g / b * h,
                    d = d >= 1 && h >= d ? Math.ceil(d) : 1 > d ? 1 : h,
                    a.$filledBar.css("width", g + "px"),
                    a.$currentPage.text(d),
                    c = null
                },
                100)),
                f.preventDefault()
            }).on("touchend",
            function(b) {
                clearTimeout(c),
                c = null,
                a.gotoPage(d),
                b.preventDefault()
            }),
            this.$prev.on("tap",
            function() {
                a.gotoPage(~~a.$currentPage.text() - 1)
            }),
            this.$next.on("tap",
            function() {
                a.gotoPage(~~a.$currentPage.text() + 1)
            }),
            this.$main.on("tap",
            function() {
                a.$container.toggleClass("expended"),
                e = a.$filledBar.attr("offsetLeft")
            }),
            $(".gotop").on("tap",
            function() {
                window.scrollTo(0, 0)
            })
        },
        gotoPage: function(a) {
            this.setIndex(a),
            this.$container.triggerHandler("page:change", {
                index: ~~this.$currentPage.text()
            })
        },
        setIndex: function(a) {
            1 > a || a > this.pageCount || (1 == a ? this.$prev.addClass("disabled") : this.$prev.removeClass("disabled"), a == this.pageCount ? this.$next.addClass("disabled") : this.$next.removeClass("disabled"), this.$currentPage.text(a), this.$filledBar.css("width", 100 * a / this.pageCount + "%"))
        }
    },
    ListView
}),
define("searchH5/pages/searchlist/mods/searchbox/index", [],
function(a, b, c) {
    function d(a) {
        var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
        return b ? b[1] : void 0
    }
    function e(a) {
        this.defaultParams = {
            nick: f.getNickFromCookie(),
            sid: f.getParam("sid")
        },
        this.q = a.q || "",
        this.tab = a.tab || "all",
        this.suggestCache = {},
        this.init()
    }
    var f = {
        getCookie: function(a) {
            var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
            return null != b ? b[2] : null
        },
        getParam: function(a) {
            var b = location.search && location.search.split("?")[1].match(new RegExp("(^|&)" + a + "=([^&]*)(&|$)"));
            return b ? unescape(b[2]) : null
        },
        getNickFromCookie: function() {
            var a = "",
            b = d("_w_tb_nick"),
            c = d("_nk_") || d("snk");
            return b && b.length > 0 && "null" != b ? a = decodeURIComponent(b) : c && c.length > 0 && "null" != c && (a = unescape(unescape(c).replace(/\\u/g, "%u"))),
            a
        }
    };
    return e.prototype = {
        init: function() {
            var a = this;
            a._findNodes(),
            a.$searchInput.val(a.q),
            a._tabInit(),
            a._eventAttach(),
            a.on("search",
            function(b, c) {
                a.q = b,
                a.close()
            }),
            a.$form.on("submit",
            function(b) {
                var c = a.$searchInput.val();
                if (!c) return b.preventDefault(),
                !1;
                "/searchh5/index.php" === location.pathname && (a.$form.attr("action", location.pathname), a.$form.append('<input type="hidden" name="mode" value="dev"' + d + '" />'));
                var d = a.tabTxt && a.tabTxt.attr("data-tab") || "all";
                a.$form.append('<input type="hidden" name="tab" value="' + d + '" />')
            })
        },
        _findNodes: function() {
            this.$topBar = $(".top-bar"),
            this.tabTxt = $(".s-input-tab-txt"),
            this.$searchInput = this.$topBar.find(".J_autocomplete"),
            this.$mainContainer = this.$topBar.find(".top-bar-c"),
            this.$suggestContainer = $('<div class="suggest-container"></div>').insertAfter(this.$topBar),
            this.$closeBtn = this.$topBar.find(".closed"),
            this.$form = this.$topBar.find("#J_Search"),
            this.$clearQueryBtn = $(".s-form-search button")
        },
        _eventAttach: function() {
            var a = this;
            $(".searchbtn").on("tap",
            function(b) {
                b.preventDefault();
                var c = a.$searchInput.val();
                c && a.trigger("search", c, {
                    top_search: 1
                })
            }),
            this.$searchInput.on("search",
            function(b) {
                var c = a.$searchInput.val();
                c && a.trigger("search", c)
            }),
            this.$searchInput.on("click",
            function() {}).on("focus",
            function() {
                $(".s-input-tab-nav").removeClass("on").addClass("off"),
                a.open()
            }).on("input focus",
            function(b) {
                a._inputChangeEvent.call(a, b)
            }),
            this.$suggestContainer.on("tap", ".J_AddToQuery",
            function(b) {
                return a.$searchInput.val($(b.currentTarget).parent("li").text()),
                b.preventDefault(),
                !1
            }).on("tap", "li",
            function(b) {
                var c = $(b.currentTarget);
                "DIV" !== b.target.tagName && (a.$searchInput.val(c.text()), a.trigger("search", a.$searchInput.val(), {
                    sugg: a.$searchInput.val() + "_" + c.index() + "_" + c.parent("ul").attr("data-sugg-type")
                }))
            }).on("tap", ".J_ClearHistory",
            function() {
                delete a.suggestCache[""],
                a.$suggestContainer.html(""),
                a._cleanHistory()
            }),
            this.$clearQueryBtn.on("tap",
            function(b) {
                a.$searchInput.val(""),
                a._inputChangeEvent.call(a),
                a.$clearQueryBtn.hide(),
                b.preventDefault()
            }).click(function(a) {
                a.preventDefault()
            }),
            this.$closeBtn.on("click",
            function(b) {
                a.close()
            }),
            this.$suggestContainer.on("touchstart",
            function() {
                a.$searchInput.blur()
            })
        },
        showAutoComplete: function() {
            $(".s-input-tab-nav").removeClass("on").addClass("off"),
            this.open(),
            this._inputChangeEvent()
        },
        open: function() {
            if ("open" !== this.status) {
                $(document.body).addClass("status-suggest"),
                this.$topBar.addClass("on"),
                this.$suggestContainer.show(),
                $("#bodyCont").hide(),
                $(".filterbar-container").hide(),
                $(".rellkey-container").hide(),
                $(".onesearch-container").hide(),
                $(".tip-container").hide(),
                $("#J_PageNavContainer").hide();
                var a = this;
                setTimeout(function() {
                    a.$searchInput[0].value = "",
                    a.$searchInput[0].value = a.q
                },
                0),
                this.$mainContainer.siblings().hide(),
                this.$mainContainer.siblings(".closed").show(),
                this.status = "open"
            }
        },
        close: function() {
            "close" !== this.status && ($(document.body).removeClass("status-suggest"), this.$topBar.removeClass("on"), this.$suggestContainer.hide(), $("#bodyCont").show(), $(".filterbar-container").show(), $(".rellkey-container").show(), $(".onesearch-container").show(), $(".tip-container").show(), $("#J_PageNavContainer").show(), this.$searchInput.val(this.q), this.$mainContainer.siblings().show(), this.$clearQueryBtn.hide(), this.$mainContainer.siblings(".closed").hide(), this.status = "close")
        },
        _inputChangeEvent: function(a) {
            var b = this.$searchInput.val().replace(/(^\s+)|(\s+$)/g, ""),
            c = this;
            "" != b ? this.$clearQueryBtn.show() : this.$clearQueryBtn.hide(),
            this._getSuggestItems(b,
            function(a) {
                c.$suggestContainer.html(a)
            })
        },
        _tabInit: function() {
            var a = this,
            b = $(".s-input-tab-txt"),
            c = $(".s-input-tab-nav");
            b.text(c.find("." + a.tab).text()),
            b.click(function(a) {
                c.hasClass("on") ? c.removeClass("on").addClass("off") : c.removeClass("off").addClass("on")
            }),
            c.find("li").click(function(c) {
                var d = $(this),
                e = d.attr("class");
                b.text(d.text()),
                b.attr("data-tab", e),
                a.trigger("tab", {
                    tab: e,
                    q: $(".J_autocomplete").val()
                })
            })
        },
        _getSuggestItems: function(a, b) {
            var c, d = this;
            "undefined" != typeof this.suggestCache[a] ? b(this.suggestCache[a]) : (c = function(c) {
                b(d.suggestCache[a] = c)
            },
            a ? this._getSug(a, c) : this._getHistory(function(a) {
                a ? c(a) : d._getHotkey(c)
            }))
        },
        _getSug: function(a, b) {
            var c = this;
            $.ajax({
                type: "get",
                url: "//suggest.taobao.com/sug",
                data: $.extend({
                    q: a,
                    code: "utf-8",
                    area: "c2c"
                },
                this.defaultParams),
                dataType: "jsonp",
                timeout: 6e4,
                success: function(a) {
                    b(c._renderSug(a.result))
                },
                error: function() {
                    b("")
                }
            })
        },
        _cleanHistory: function() {
            $.ajax({
                type: "get",
                url: "//suggest.m.taobao.com/rpc/history/clean.json?nick=" + this.defaultParams.nick,
                data: {
                    sid: this.defaultParams.sid
                },
                dataType: "jsonp",
                timeout: 6e4
            })
        },
        _getHistory: function(a) {
            var b = this;
            $.ajax({
                type: "get",
                url: "//suggest.m.taobao.com/rpc/history/get.json?nick=" + this.defaultParams.nick,
                data: {
                    sid: this.defaultParams.sid
                },
                dataType: "jsonp",
                timeout: 6e4,
                success: function(c) {
                    a(c.content && c.content.length > 0 ? b._renderHistory(c.content) : "")
                },
                error: function() {
                    a("")
                }
            })
        },
        _getHotkey: function(a) {
            var b = this;
            $.ajax({
                type: "get",
                url: "//suggest.m.taobao.com/rpc/hot_key.json?nick=" + this.defaultParams.nick,
                data: {
                    sid: this.defaultParams.sid
                },
                dataType: "jsonp",
                timeout: 6e4,
                success: function(c) {
                    a(b._renderHotkey(c.querys))
                },
                error: function() {
                    a("")
                }
            })
        },
        _renderSug: function(a) {
            var b = [],
            c = this.$searchInput.val();
            b.push('<ul class="suggest-sug" data-sugg-type="0">');
            for (var d = 0; d < a.length; d++) {
                var e = a[d][0];
                0 == e.indexOf(c) && (e = '<span class="match-word">' + c + "</span>" + e.slice(c.length)),
                b.push("<li>" + e + '<div class="add J_AddToQuery"><div class="icons-suggest-addto"></div></div></li>')
            }
            return b.push("</ul>"),
            b.join("")
        },
        _renderHistory: function(a) {
            var b = [];
            b.push("<h3>最近搜过</h3>"),
            b.push('<ul class="suggest-history" data-sugg-type="1">');
            for (var c = a.length > 10 ? 10 : a.length, d = 0; c > d; d++) b.push("<li>" + a[d].key + '<div class="add J_AddToQuery"><div class="icons-suggest-addto"></div></div></li>');
            return b.push("</ul>"),
            b.push('<div class="clearHistory J_ClearHistory">清空搜索历史</div>'),
            b.join("")
        },
        _renderHotkey: function(a) {
            var b = [];
            b.push("<h3>大家都在搜</h3>"),
            b.push('<ul class="suggest-hotkey" data-sugg-type="2">');
            for (var c = 0; c < a.length; c++) b.push("<li>" + a[c] + "</li>");
            return b.push("</ul>"),
            b.join("")
        }
    },
    Emitter(e.prototype),
    e
}),
define("searchH5/pages/searchlist/mods/sift/index", [],
function(a, b, c) {
    function d(a) {
        var b = this;
        b.container = $(a.container).eq(0)
    }
    var e = {
        rows: [{
            title: "折扣和服务",
            selectedItems: "",
            type: "multi",
            key: "filter",
            isLast: 0,
            items: [{
                name: "免运费",
                value: "service_myf"
            },
            {
                name: "天猫",
                value: "tab_mall"
            },
            {
                name: "全球购",
                value: "service_hwsp"
            },
            {
                name: "消费者保障",
                value: "service_xfzbz"
            },
            {
                name: "手机专享价",
                value: "service_sjzx"
            },
            {
                name: "淘金币",
                value: "service_tjb"
            },
            {
                name: "货到付款",
                value: "service_hdfk"
            },
            {
                name: "7天退换",
                value: "service_qtth"
            },
            {
                name: "促销",
                value: "tab_discount"
            }],
            innerRows: []
        },
        {
            title: "区域",
            type: "single",
            key: "loc",
            selectedItems: "",
            isLast: 1,
            items: ["江浙沪", "珠三角", "北京", "上海", "广州", "深圳", "杭州", "成都", "厦门", "海外"],
            innerRows: [{
                title: "城市",
                items: ["长沙", "长春", "成都", "重庆", "大连", "东莞", "杭州", "合肥", "哈尔滨", "济南", "昆明", "宁波", "南京", "南昌", "青岛", "苏州", "石家庄", "沈阳", "天津", "温州", "无锡", "武汉", "西安", "厦门", "郑州"]
            },
            {
                title: "省份",
                items: ["安徽", "澳门", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "湖北", "湖南", "黑龙江", "江苏", "吉林", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "四川", "台湾", "西藏", "新疆", "香港", "云南", "浙江"]
            }]
        }]
    };
    return d.prototype = {
        show: function() {
            $("#J_SiftContent").show(),
            $("#J_SiftMask").css("display", "block"),
            $("html").addClass("sift-move"),
            $("#tbh5v0").hasClass("fixed") && $("#tbh5v0").removeClass("fixed")
        },
        hide: function() {
            $("#J_SiftMask").hide(),
            $("html").addClass("sift-back"),
            setTimeout(function() {
                $("#J_SiftContent").hide(),
                $("html").removeClass("sift-move"),
                $("html").removeClass("sift-back")
            },
            200)
        },
        addRow: function(a) {
            for (var b = 0,
            c = a.length; c > b; b++) e.rows.push(a[b])
        },
        render: function() {
            var a = this.container,
            b = _.templates["tpl-sift"];
            a.append(b(e))
        },
        updateParam: function(a, b, c, d, e) {
            var f = this._dataMap = this._dataMap || {},
            g = this._nameMap = this._nameMap || {};
            this._updateItem(a, b, d, e, f),
            this._updateItem(a, b, c, e, g)
        },
        _updateItem: function(a, b, c, d, e) {
            if ("single" === a && d) e[b] = c;
            else if ("single" == a) e[b] = "";
            else if ("multi" === a && d) e[b] = e[b] || [],
            e[b].push(c);
            else if ("multi" === a && e[b] && e[b].length) {
                for (var f = e[b], g = [], h = 0, i = f.length; i > h; h++) f[h] !== c && g.push(f[h]);
                e[b] = g
            }
        },
        updateSelectedItems: function(a, b) {
            var c = this._nameMap[b],
            d = $.isArray(c) ? c.join("，") : c;
            a.html(d)
        },
        _getParams: function() {
            var a = this._dataMap || {},
            b = {},
            c = Number($("#J_siftStartPrice").val()),
            d = Number($("#J_siftEndPrice").val());
            return b.start_price = isNaN(c) || 0 == c ? "": c,
            b.end_price = isNaN(d) || c >= d ? "": d,
            $.each(e.rows,
            function(a, c) {
                b[c.key] = ""
            }),
            $.each(a,
            function(a, c) {
                c && a && (b[a] = $.isArray(c) ? c.join(";") : c)
            }),
            b
        },
        clear: function() {
            this._dataMap = {},
            this._nameMap = {},
            $(".sift-item-selected").removeClass("sift-item-selected"),
            $(".sift-row .selected-items").html(""),
            $("#J_siftStartPrice").val(""),
            $("#J_siftEndPrice").val("")
        }
    },
    d.EVENT = {
        ".J_siftRowExpand": {
            tap: function(a) {
                var b = $(a.currentTarget).parent(),
                c = b.find(".switch-btn");
                b.hasClass("sift-row-expand") ? (b.removeClass("sift-row-expand"), c.addClass("icons-sift-down"), c.removeClass("icons-sift-up")) : (b.addClass("sift-row-expand"), c.removeClass("icons-sift-down"), c.addClass("icons-sift-up"))
            }
        },
        ".J_siftItem": {
            tap: function(a) {
                var b = this,
                c = $(a.currentTarget),
                d = c.attr("data-type"),
                e = c.attr("data-key"),
                f = c.attr("data-name"),
                g = c.attr("data-value"),
                h = b._cacheNode = b._cacheNode || {};
                c.hasClass("sift-item-selected") ? (c.removeClass("sift-item-selected"), b.updateParam(d, e, f, g, 0)) : ("single" === d && h[e] && h[e].removeClass("sift-item-selected"), c.addClass("sift-item-selected"), h[e] = c, b.updateParam(d, e, f, g, 1)),
                b.updateSelectedItems(c.parent().parent().parent().find(".selected-items"), e)
            }
        },
        "#J_SiftCommit": {
            click: function(a) {
                a.preventDefault(),
                this.hide(),
                this.trigger("commit", this._getParams())
            }
        },
        "#J_SiftClear": {
            click: function(a) {
                this.clear()
            }
        }
    },
    d.DOCEVENT = {
        "#J_SiftMask": {
            tap: function(a) {
                a.preventDefault(),
                this.hide()
            }
        }
    },
    Emitter(d.prototype),
    d
}),
define("searchH5/pages/searchlist/js/main", ["searchH5/pages/searchlist/js/onesearch"],
function(a) {
    function b() {
        $("body").prepend(_.templates["tpl-body"]())
    }
    function c(a) {
        if (!a) return "";
        var b = "";
        for (var c in a) b = b + "&" + c + "=" + encodeURIComponent(a[c]);
        return b.slice(1)
    }
    function d() {
        var a = c(w.params),
        b = "m";
        location.href = "//s." + b + ".taobao.com/h5?" + a
    }
    function e() {
        z = new t.mods.searchbox({
            q: w.params.q,
            tab: w.params.tab
        }),
        z.on("tab",
        function(a) {
            var b = a.tab;
            "shop" == b ? location.href = "//shop.m.taobao.com/shop/shop_search.htm?topSearch=1&q=" + a.q: a.q ? a.q != w.params.q ? (w.setParam({
                q: a.q,
                tab: b
            }), d()) : ($(".s-input-tab-nav").removeClass("on").addClass("off"), w.setParam({
                tab: b
            }), y.query()) : w.setParam({
                tab: b
            })
        }),
        z.on("search",
        function(a, b) {
            w.setParam({
                q: a
            }),
            x.setParam(b),
            d()
        })
    }
    function f(a) {
        var b = g(t.mods.sift, {
            container: "#J_SiftContainer"
        });
        b.on("commit",
        function(a) {
            x.setParam(a),
            y.query()
        }),
        $("#J_Sift").on("tap",
        function(a) {
            A.close(),
            a.preventDefault(),
            a.stopImmediatePropagation(),
            b.show()
        }),
        a && b.addRow(a),
        b.render()
    }
    function g(a, b) {
        var c = new a(b),
        d = a.EVENT,
        e = a.DOCEVENT;
        if (d) {
            var f = c.container;
            _.forIn(d,
            function(a, b) {
                _.forIn(a,
                function(a, d) {
                    f.on(d, b, $.proxy(a, c))
                })
            })
        }
        if (e) {
            var g = $(document.body);
            a.docEventBinded || (_.forIn(e,
            function(a, b) {
                _.forIn(a,
                function(a, d) {
                    g.on(d, b, $.proxy(a, c))
                })
            }), a.docEventBinded = !0)
        }
        return c
    }
    function h() {
        var a = window["@ali/lib-smartbanner-plus-loader"];
        a && (a.init({
            bizKey: "taobao"
        }), a.ready(function(a) {
            var b = a.getBizText("mainSearch");
            b.href = window.location.href;
            a.sbLogic(b, 2)
        }))
    }
    function i() {
        j(),
        h(),
        k(),
        r(),
        l(),
        s()
    }
    function j() {
        x.onData("/",
        function a(b) {
            m(b.defaultViewType),
            f(b.siftRows),
            x.offData("/", a)
        })
    }
    function k() {
        var a = w.params.bagvalue;
        a && ($("#tbh5v0").addClass("bag-page"), $(".top-bar-w").prepend(_.templates["tpl-page-baghead"]({
            bagshow: a.split(",")[0]
        })))
    }
    function l() {
        x.onData("/searchHint",
        function(a) {
            var b = $(".tip-container");
            if (a && a.title) {
                var c = a.words[0],
                e = c.params.auction_tag,
                f = _.templates["tpl-tip"]({
                    title: a.title.replace(c.word, '<span style="color:' + c.color + '">' + c.word + "</span>")
                });
                b.html(f),
                $("#J_TipSearchHint").on("tap",
                function(a) {
                    w.setParam({
                        auction_tag: e
                    }),
                    d()
                })
            }
        })
    }
    function m(a) {
        function b(a) {
            A.close();
            var b = a.currentTarget.children[0],
            d = {
                "icons-list": "larger",
                "icons-larger": "largest",
                "icons-largest": "list"
            },
            e = d[b.className];
            c(b.className.split("-")[1]),
            y.changeViewType(e);
            var f = $(".currentItem");
            f.length > 0 && window.scrollTo(0, f.offset().top - $(".top-bar").height() - $(".filter-bar").height()),
            b.className = "icons-" + e
        }
        function c(a) {
            var b, c, d = $(".searchlist ul"),
            e = d.find("li"),
            f = e.first().height(),
            g = $(".toolbar").height();
            c = Math.floor((document.body.scrollTop - g + $(".top-bar").height() + $(".filter-bar").height()) / f),
            b = "larger" === a ? 2 * c: c,
            b > 0 && (e.filter(".currentItem").removeClass("currentItem"), e.eq(b).addClass("currentItem"))
        }
        var d = $(".filterbar-container"),
        e = _.templates["tpl-filterbar"]({
            viewtype: localStorage && localStorage.getItem("viewtype") || a || "list"
        });
        d.html(e),
        d.on("tap", ".J_SwitchViewtype", b).on("click",
        function(a) {
            a.preventDefault(),
            a.stopPropagation()
        }),
        n(d)
    }
    function n(a) {
        function b() {
            h = $(".J_sortTab .droplist"),
            a.on("tap", ".J_sortTab .droplist-trigger",
            function(a) {
                if (i || (i = $(this)), k) c();
                else {
                    j || (j = $(".text", $(this)));
                    var b = j.position().left;
                    $(".sorts", h).css("margin-left", b),
                    d()
                }
            })
        }
        function c() {
            h.removeClass("droplist-expand"),
            k = !1,
            $("#J_DroplistMask").css("display", "none"),
            $("html").removeClass("html-unscrollable")
        }
        function d() {
            h.addClass("droplist-expand"),
            k = !0,
            $("#J_DroplistMask").css("display", "block"),
            $("html").addClass("html-unscrollable"),
            e()
        }
        function e() {
            e.__executed || (e.__executed = !0, $("#J_DroplistMask").on("tap", c))
        }
        function f(a) {
            var b = a.text();
            j.text(b),
            i.addClass("selected")
        }
        function g(b) {
            var d, e = $(this),
            g = e.attr("data-value");
            e.hasClass("selected") || (d = $(".J_sortTab .selected"), d.removeClass("selected"), e.addClass("selected")),
            c(),
            e.parents(".droplist").length && f(e),
            $("#tbh5v0").removeClass("fixed"),
            x.setParam({
                sort: g
            }),
            y.query(),
            window.scrollTo(0, a.offset().top)
        }
        a.on("tap", ".J_sortTab .sort", g);
        var h, i, j, k = !1;
        b(),
        A = {
            close: c
        }
    }
    function o() {
        p()
    }
    function p() {
        var a = Hammer(document.body, {
            swipe_velocity: 0
        });
        a.on("swipedown",
        function(a) {
            document.body.scrollTop < 400 ? $("#tbh5v0").removeClass("fixed") : $("#tbh5v0").addClass("fixed")
        }).on("swipeup",
        function(a) {
            $("#tbh5v0").removeClass("fixed")
        }),
        $(document).on("scroll",
        function(a) {
            $(".top-bar").hasClass("on") || window.scrollY < 300 && $("#tbh5v0").removeClass("fixed")
        })
    }
    function q() {
        navigator.userAgent.indexOf("Chrome") > -1 && ($("#J_SearchList").on("click", "a",
        function(a) {
            try {
                sessionStorage.setItem("listContent", $("#J_SearchList ul").html()),
                sessionStorage.setItem("sortBar", $(".J_sortTab").html()),
                sessionStorage.setItem("scrollTop", document.body.scrollTop)
            } catch(b) {
                console.log("sessionStorage error")
            }
        }), window.addEventListener("popstate",
        function() {
            var a = sessionStorage.getItem("listContent"),
            b = sessionStorage.getItem("sortBar"),
            c = sessionStorage.getItem("scrollTop");
            a && $("#J_SearchList ul").html(a),
            b && $(".J_sortTab").html(b),
            c && window.scrollTo(0, c),
            sessionStorage.removeItem("listContent"),
            sessionStorage.removeItem("sortBar"),
            sessionStorage.removeItem("scrollTop")
        }))
    }
    function r() {
        x.onData("/selecthot",
        function(a) {
            var b = $(".rellkey-container");
            a.length > 9 && (a.length = 9);
            var c = {
                list: a
            };
            b.html(_.templates["tpl-relkey"](c))
        })
    }
    function s() {
        x.onData("/oneSearch",
        function(a) {
            var b = $(".onesearch-container");
            b.html("");
            var c = a.width ? window.innerWidth * a.height / a.width: a.height,
            d = screen.height - 45,
            e = "true" === a.isFull || a.isFull === !0;
            e && (c = d),
            $('<iframe id="J_OneSearchIframe" class="onesearch-iframe"></iframe>', {
                src: a.url.replace(/^https?:/g, ""),
                height: "starShop" === a.alias ? c + "px": "0px",
                width: "100%",
                "data-height": c,
                scrolling: e ? "yes": "no"
            }).appendTo(b),
            a.isFull && $("#J_OneSearchIframe").height(c);
            var f = window.innerWidth,
            g = window.innerHeight;
            $(window).on("resize",
            function(b) {
                var c = window.innerWidth,
                d = window.innerHeight;
                if (c === f || d === g);
                else {
                    var e = a.width ? window.innerWidth * a.height / a.width: a.height;
                    $("#J_OneSearchIframe").css("height", "starShop" === a.alias ? e + "px": "0px")
                }
                f = c,
                g = d
            })
        })
    }
    var t = window.deps,
    u = window.SearchH5.apiConfig,
    v = u.listApi,
    w = t.components["data-manager"];
    w.setParam(u.params);
    var x = new w({
        url: v.url,
        data: v.params
    });
    window.globle = {},
    window.globle.dataManagers = {
        list: x
    },
    b(),
    a("searchH5/pages/searchlist/js/onesearch");
    var y = new t.mods.listview(".search-content");
    x.onData("/",
    function() {
        x.setParam({
            closeModues: "nav,selecthot,onesearch"
        })
    }),
    w.on("set",
    function(a) {
        a.q && x.setParam({
            sugg: "",
            loc: "",
            filter: "",
            catmap: "",
            ppath: "",
            start_price: "",
            end_price: "",
            sort: "",
            top_search: "",
            closeModues: ""
        })
    });
    var z;
    e();
    var A, B = {
        init: function() {
            var a = this;
            i();
            var b = window.SearchH5 || {};
            b && b.apiConfig && b.apiConfig.params && b.apiConfig.params && !b.apiConfig.params.q && (b.autocomplete = !0),
            b.autocomplete ? (z.showAutoComplete(), z.$closeBtn.off("click").on("click",
            function() {
                location.href = "//m.taobao.com"
            })) : y.query(),
            a.events(),
            q(),
            o()
        },
        events: function() {
            var a = ($(".searchlist"), $(".J_autocomplete"));
            $(".rellkey-container").on("tap", "li",
            function(b) {
                b.preventDefault();
                var c = $(this);
                w.setParam({
                    q: a.val() + " " + c.attr("data-name")
                }),
                d()
            })
        }
    };
    return B.init()
}),
define("searchH5/pages/searchlist/js/onesearch", [],
function(a, b, c) {
    window.addEventListener("message",
    function(a) {
        var b = a.data;
        if (b && b.command) {
            var c = d[b.command](b.params);
            "number" == typeof b.cbKey && a.source.postMessage({
                result: c,
                cbKey: b.cbKey
            },
            "*")
        }
    });
    var d = {
        redirect: function(a) {
            var b = a.url; (0 === b.indexOf("http") || 0 === b.indexOf("//")) && (location.href = b)
        },
        show: function() {
            var a = $(".onesearch-container").find("iframe");
            a.animate({
                height: a.attr("data-height") + "px"
            })
        },
        getData: function(a) {
            var b;
            switch (a.key) {
            case "location":
                b = location.href
            }
            return b
        }
    }
});