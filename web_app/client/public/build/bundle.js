
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function isEmpty(obj) {
        if (obj)
            return Object.keys(obj).length === 0
        else
            return false
    }

    function post(params) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", params.endpoint, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                console.log(json);
            }
        };
        xhr.send(JSON.stringify(params.data));
    }

    function items(obj) {
        return Object.entries(obj)
    }

    /* src\components\Tiers\Tier.svelte generated by Svelte v3.23.0 */
    const file = "src\\components\\Tiers\\Tier.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (47:8) {:else}
    function create_else_block(ctx) {
    	let div;
    	let p0;
    	let t0;
    	let p1;
    	let t2;
    	let p2;
    	let t4;
    	let p3;
    	let t6;
    	let p4;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = space();
    			p1 = element("p");
    			p1.textContent = "-";
    			t2 = space();
    			p2 = element("p");
    			p2.textContent = "-";
    			t4 = space();
    			p3 = element("p");
    			p3.textContent = "-";
    			t6 = space();
    			p4 = element("p");
    			p4.textContent = "-";
    			attr_dev(p0, "class", "svelte-y4l14i");
    			add_location(p0, file, 48, 12, 1309);
    			attr_dev(p1, "class", "svelte-y4l14i");
    			add_location(p1, file, 49, 12, 1328);
    			attr_dev(p2, "class", "svelte-y4l14i");
    			add_location(p2, file, 50, 12, 1350);
    			attr_dev(p3, "class", "svelte-y4l14i");
    			add_location(p3, file, 51, 12, 1372);
    			attr_dev(p4, "class", "svelte-y4l14i");
    			add_location(p4, file, 52, 12, 1394);
    			attr_dev(div, "class", div_class_value = "row grid " + /*tier*/ ctx[5] + " svelte-y4l14i");
    			add_location(div, file, 47, 10, 1266);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(div, t0);
    			append_dev(div, p1);
    			append_dev(div, t2);
    			append_dev(div, p2);
    			append_dev(div, t4);
    			append_dev(div, p3);
    			append_dev(div, t6);
    			append_dev(div, p4);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(47:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#each tierData[tier] as match}
    function create_each_block_1(ctx) {
    	let div;
    	let p0;
    	let t0_value = /*match*/ ctx[8].match + "";
    	let t0;
    	let t1;
    	let t2_value = /*match*/ ctx[8].date + "";
    	let t2;
    	let t3;
    	let t4;
    	let p1;
    	let t5_value = /*match*/ ctx[8].outcome + "";
    	let t5;
    	let t6;
    	let p2;
    	let t7_value = /*match*/ ctx[8].marathon + "";
    	let t7;
    	let t8;
    	let t9_value = /*match*/ ctx[8].pinnacle + "";
    	let t9;
    	let t10;
    	let t11;
    	let p3;
    	let b;
    	let t12_value = /*match*/ ctx[8].coeff + "";
    	let t12;
    	let t13;
    	let p4;
    	let t14;
    	let t15_value = /*match*/ ctx[8].stake + "";
    	let t15;
    	let div_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = text(" (");
    			t2 = text(t2_value);
    			t3 = text(")");
    			t4 = space();
    			p1 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			p2 = element("p");
    			t7 = text(t7_value);
    			t8 = text(" (");
    			t9 = text(t9_value);
    			t10 = text(")");
    			t11 = space();
    			p3 = element("p");
    			b = element("b");
    			t12 = text(t12_value);
    			t13 = space();
    			p4 = element("p");
    			t14 = text("€ ");
    			t15 = text(t15_value);
    			attr_dev(p0, "class", "svelte-y4l14i");
    			add_location(p0, file, 38, 12, 955);
    			attr_dev(p1, "class", "svelte-y4l14i");
    			add_location(p1, file, 39, 12, 1004);
    			attr_dev(p2, "class", "svelte-y4l14i");
    			add_location(p2, file, 40, 12, 1040);
    			attr_dev(b, "class", "svelte-y4l14i");
    			toggle_class(b, "alert", /*match*/ ctx[8].coeff > 2);
    			add_location(b, file, 42, 14, 1115);
    			attr_dev(p3, "class", "svelte-y4l14i");
    			add_location(p3, file, 41, 12, 1096);
    			attr_dev(p4, "class", "svelte-y4l14i");
    			add_location(p4, file, 44, 12, 1197);
    			attr_dev(div, "class", div_class_value = "row grid " + /*tier*/ ctx[5] + " svelte-y4l14i");
    			toggle_class(div, "tie", /*match*/ ctx[8].outcome == "X");
    			add_location(div, file, 37, 10, 856);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			append_dev(p0, t2);
    			append_dev(p0, t3);
    			append_dev(div, t4);
    			append_dev(div, p1);
    			append_dev(p1, t5);
    			append_dev(div, t6);
    			append_dev(div, p2);
    			append_dev(p2, t7);
    			append_dev(p2, t8);
    			append_dev(p2, t9);
    			append_dev(p2, t10);
    			append_dev(div, t11);
    			append_dev(div, p3);
    			append_dev(p3, b);
    			append_dev(b, t12);
    			append_dev(div, t13);
    			append_dev(div, p4);
    			append_dev(p4, t14);
    			append_dev(p4, t15);

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"click",
    					function () {
    						if (is_function(/*save*/ ctx[3](/*match*/ ctx[8]))) /*save*/ ctx[3](/*match*/ ctx[8]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*tierData*/ 2 && t0_value !== (t0_value = /*match*/ ctx[8].match + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*tierData*/ 2 && t2_value !== (t2_value = /*match*/ ctx[8].date + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*tierData*/ 2 && t5_value !== (t5_value = /*match*/ ctx[8].outcome + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*tierData*/ 2 && t7_value !== (t7_value = /*match*/ ctx[8].marathon + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*tierData*/ 2 && t9_value !== (t9_value = /*match*/ ctx[8].pinnacle + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*tierData*/ 2 && t12_value !== (t12_value = /*match*/ ctx[8].coeff + "")) set_data_dev(t12, t12_value);

    			if (dirty & /*tierData*/ 2) {
    				toggle_class(b, "alert", /*match*/ ctx[8].coeff > 2);
    			}

    			if (dirty & /*tierData*/ 2 && t15_value !== (t15_value = /*match*/ ctx[8].stake + "")) set_data_dev(t15, t15_value);

    			if (dirty & /*tierData*/ 2) {
    				toggle_class(div, "tie", /*match*/ ctx[8].outcome == "X");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(37:8) {#each tierData[tier] as match}",
    		ctx
    	});

    	return block;
    }

    // (35:4) {#each ['tier_1', 'tier_2', 'tier_3'] as tier, i}
    function create_each_block(ctx) {
    	let div;
    	let t;
    	let each_value_1 = /*tierData*/ ctx[1][/*tier*/ ctx[5]];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_1_else = null;

    	if (!each_value_1.length) {
    		each_1_else = create_else_block(ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			t = space();
    			attr_dev(div, "class", "tier svelte-y4l14i");
    			add_location(div, file, 35, 6, 785);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div, null);
    			}

    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tierData, save*/ 10) {
    				each_value_1 = /*tierData*/ ctx[1][/*tier*/ ctx[5]];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;

    				if (each_value_1.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block(ctx);
    					each_1_else.c();
    					each_1_else.m(div, t);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(35:4) {#each ['tier_1', 'tier_2', 'tier_3'] as tier, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div2;
    	let h2;
    	let img;
    	let img_src_value;
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let div0;
    	let p0;
    	let t4;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let p3;
    	let t10;
    	let p4;
    	let t12;
    	let each_value = ["tier_1", "tier_2", "tier_3"];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 3; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			h2 = element("h2");
    			img = element("img");
    			t0 = space();
    			t1 = text(/*country*/ ctx[0]);
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Evento (Data)";
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Esito";
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "Quota*";
    			t8 = space();
    			p3 = element("p");
    			p3.textContent = "Coeff.";
    			t10 = space();
    			p4 = element("p");
    			p4.textContent = "Stake";
    			t12 = space();

    			for (let i = 0; i < 3; i += 1) {
    				each_blocks[i].c();
    			}

    			if (img.src !== (img_src_value = /*srcFlag*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "flag");
    			attr_dev(img, "class", "svelte-y4l14i");
    			add_location(img, file, 23, 4, 486);
    			attr_dev(h2, "class", "svelte-y4l14i");
    			add_location(h2, file, 22, 2, 476);
    			attr_dev(p0, "class", "svelte-y4l14i");
    			add_location(p0, file, 28, 6, 608);
    			attr_dev(p1, "class", "svelte-y4l14i");
    			add_location(p1, file, 29, 6, 636);
    			attr_dev(p2, "class", "svelte-y4l14i");
    			add_location(p2, file, 30, 6, 656);
    			attr_dev(p3, "class", "svelte-y4l14i");
    			add_location(p3, file, 31, 6, 677);
    			attr_dev(p4, "class", "svelte-y4l14i");
    			add_location(p4, file, 32, 6, 698);
    			attr_dev(div0, "class", "table-head grid svelte-y4l14i");
    			add_location(div0, file, 27, 4, 571);
    			attr_dev(div1, "class", "table svelte-y4l14i");
    			add_location(div1, file, 26, 2, 546);
    			add_location(div2, file, 21, 0, 467);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, h2);
    			append_dev(h2, img);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t4);
    			append_dev(div0, p1);
    			append_dev(div0, t6);
    			append_dev(div0, p2);
    			append_dev(div0, t8);
    			append_dev(div0, p3);
    			append_dev(div0, t10);
    			append_dev(div0, p4);
    			append_dev(div1, t12);

    			for (let i = 0; i < 3; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*srcFlag*/ 4 && img.src !== (img_src_value = /*srcFlag*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*country*/ 1) set_data_dev(t1, /*country*/ ctx[0]);

    			if (dirty & /*tierData, save*/ 10) {
    				each_value = ["tier_1", "tier_2", "tier_3"];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < 3; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < 3; i += 1) {
    					each_blocks[i].d(1);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { country } = $$props;
    	let { tierData } = $$props;

    	const codiciPaesi = {
    		inghilterra: "gb",
    		italia: "it",
    		spagna: "es",
    		portogallo: "pt",
    		russia: "ru"
    	};

    	const save = data => {
    		const allow = confirm(`Vuoi giocare €${data.stake} su ${data.match}?`);
    		if (allow) post({ endpoint: "/save_bet", data });
    	};

    	const writable_props = ["country", "tierData"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tier> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Tier", $$slots, []);

    	$$self.$set = $$props => {
    		if ("country" in $$props) $$invalidate(0, country = $$props.country);
    		if ("tierData" in $$props) $$invalidate(1, tierData = $$props.tierData);
    	};

    	$$self.$capture_state = () => ({
    		post,
    		country,
    		tierData,
    		codiciPaesi,
    		save,
    		srcFlag
    	});

    	$$self.$inject_state = $$props => {
    		if ("country" in $$props) $$invalidate(0, country = $$props.country);
    		if ("tierData" in $$props) $$invalidate(1, tierData = $$props.tierData);
    		if ("srcFlag" in $$props) $$invalidate(2, srcFlag = $$props.srcFlag);
    	};

    	let srcFlag;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*country*/ 1) {
    			 $$invalidate(2, srcFlag = `https://www.countryflags.io/${codiciPaesi[country]}/flat/64.png`);
    		}
    	};

    	return [country, tierData, srcFlag, save];
    }

    class Tier extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { country: 0, tierData: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tier",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*country*/ ctx[0] === undefined && !("country" in props)) {
    			console.warn("<Tier> was created without expected prop 'country'");
    		}

    		if (/*tierData*/ ctx[1] === undefined && !("tierData" in props)) {
    			console.warn("<Tier> was created without expected prop 'tierData'");
    		}
    	}

    	get country() {
    		throw new Error("<Tier>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set country(value) {
    		throw new Error("<Tier>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tierData() {
    		throw new Error("<Tier>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tierData(value) {
    		throw new Error("<Tier>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Tiers\Tiers.svelte generated by Svelte v3.23.0 */
    const file$1 = "src\\components\\Tiers\\Tiers.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i][0];
    	child_ctx[8] = list[i][1];
    	return child_ctx;
    }

    // (158:6) {#if tierData.tier_1.length || tierData.tier_2.length || tierData.tier_3.length}
    function create_if_block_1(ctx) {
    	let t;
    	let br;
    	let current;

    	const tier = new Tier({
    			props: {
    				country: /*country*/ ctx[7],
    				tierData: /*tierData*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tier.$$.fragment);
    			t = space();
    			br = element("br");
    			add_location(br, file$1, 159, 8, 3435);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tier, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, br, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tier_changes = {};
    			if (dirty & /*tiers*/ 1) tier_changes.country = /*country*/ ctx[7];
    			if (dirty & /*tiers*/ 1) tier_changes.tierData = /*tierData*/ ctx[8];
    			tier.$set(tier_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tier.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tier.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tier, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(158:6) {#if tierData.tier_1.length || tierData.tier_2.length || tierData.tier_3.length}",
    		ctx
    	});

    	return block;
    }

    // (157:4) {#each items(tiers) as [country, tierData]}
    function create_each_block$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = (/*tierData*/ ctx[8].tier_1.length || /*tierData*/ ctx[8].tier_2.length || /*tierData*/ ctx[8].tier_3.length) && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*tierData*/ ctx[8].tier_1.length || /*tierData*/ ctx[8].tier_2.length || /*tierData*/ ctx[8].tier_3.length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*tiers*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(157:4) {#each items(tiers) as [country, tierData]}",
    		ctx
    	});

    	return block;
    }

    // (163:4) {#if !isEmpty(items)}
    function create_if_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("*: Quota Marathon (Quota Pinnacle)");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(163:4) {#if !isEmpty(items)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let button;
    	let t1;
    	let t2;
    	let show_if = !isEmpty(items);
    	let t3;
    	let br0;
    	let t4;
    	let br1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = items(/*tiers*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block = show_if && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "AGGIORNA TIERS";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			br0 = element("br");
    			t4 = space();
    			br1 = element("br");
    			attr_dev(button, "class", "btn btn-light");
    			add_location(button, file$1, 154, 6, 3164);
    			attr_dev(div0, "class", "main-btn-container svelte-4i7dlg");
    			add_location(div0, file$1, 153, 4, 3124);
    			add_location(br0, file$1, 163, 4, 3539);
    			add_location(br1, file$1, 164, 4, 3551);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$1, 152, 2, 3095);
    			add_location(div2, file$1, 151, 0, 3086);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, button);
    			append_dev(div1, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, br0);
    			append_dev(div1, t4);
    			append_dev(div1, br1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*getTiers*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*items, tiers*/ 1) {
    				each_value = items(/*tiers*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, t2);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	const backupTiers = {
    		portogallo: { tier_1: [], tier_2: [], tier_3: [] },
    		spagna: {
    			tier_1: [],
    			tier_2: [],
    			tier_3: [
    				{
    					match: "Valencia - Espanyol",
    					outcome: "1",
    					date: "16 Lug 21:00",
    					marathon: 1.6,
    					pinnacle: 1.546,
    					coeff: 0.781,
    					stake: 14,
    					esps: 0.25
    				},
    				{
    					match: "Athletic Bilbao - Leganes",
    					outcome: "1",
    					date: "16 Lug 21:00",
    					marathon: 1.86,
    					pinnacle: 1.787,
    					coeff: 0.874,
    					stake: 12,
    					esps: 0.325
    				}
    			]
    		},
    		italia: {
    			tier_1: [
    				{
    					match: "Parma - Sampdoria",
    					outcome: "1",
    					date: "19 Lug 17:15",
    					marathon: 2.83,
    					pinnacle: 2.46,
    					coeff: 4.174,
    					stake: 42,
    					esps: 2.363
    				}
    			],
    			tier_2: [
    				{
    					match: "Milan - Bologna",
    					outcome: "1",
    					date: "18 Lug 21:45",
    					marathon: 1.63,
    					pinnacle: 1.565,
    					coeff: 1.128,
    					stake: 18,
    					esps: 0.368
    				},
    				{
    					match: "Fiorentina - Torino",
    					outcome: "X",
    					date: "19 Lug 19:30",
    					marathon: 4,
    					pinnacle: 3.71,
    					coeff: 1.009,
    					stake: 8,
    					esps: 0.807
    				}
    			],
    			tier_3: [
    				{
    					match: "SPAL - Inter",
    					outcome: "2",
    					date: "16 Lug 21:45",
    					marathon: 1.4,
    					pinnacle: 1.355,
    					coeff: 0.859,
    					stake: 20,
    					esps: 0.24
    				},
    				{
    					match: "Roma - Verona",
    					outcome: "1",
    					date: "15 Lug 21:45",
    					marathon: 1.69,
    					pinnacle: 1.625,
    					coeff: 0.971,
    					stake: 16,
    					esps: 0.328
    				},
    				{
    					match: "Lecce - Fiorentina",
    					outcome: "1",
    					date: "15 Lug 21:45",
    					marathon: 3.88,
    					pinnacle: 3.63,
    					coeff: 0.782,
    					stake: 6,
    					esps: 0.607
    				},
    				{
    					match: "Roma - Inter",
    					outcome: "X",
    					date: "19 Lug 21:45",
    					marathon: 3.96,
    					pinnacle: 3.68,
    					coeff: 0.845,
    					stake: 8,
    					esps: 0.67
    				}
    			]
    		},
    		russia: { tier_1: [], tier_2: [], tier_3: [] },
    		inghilterra: {
    			tier_1: [
    				{
    					match: "Crystal Palace - Man United",
    					outcome: "X",
    					date: "16 Lug 21:15",
    					marathon: 5.7,
    					pinnacle: 5.06,
    					coeff: 1.286,
    					stake: 10,
    					esps: 1.466
    				}
    			],
    			tier_2: [],
    			tier_3: []
    		}
    	};

    	let tiers = {};

    	// let tiers = backupTiers;
    	let showTiers = false;

    	async function getTiers() {
    		$$invalidate(0, tiers = await (await fetch("/get_tiers")).json());
    	} // tiers = backupTiers;

    	let username = "";
    	let password = "";

    	function login() {
    		if (username == "los puercos" && password == "rivombrosa1") showTiers = true;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Tiers> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Tiers", $$slots, []);

    	$$self.$capture_state = () => ({
    		Tier,
    		post,
    		items,
    		isEmpty,
    		backupTiers,
    		tiers,
    		showTiers,
    		getTiers,
    		username,
    		password,
    		login
    	});

    	$$self.$inject_state = $$props => {
    		if ("tiers" in $$props) $$invalidate(0, tiers = $$props.tiers);
    		if ("showTiers" in $$props) showTiers = $$props.showTiers;
    		if ("username" in $$props) username = $$props.username;
    		if ("password" in $$props) password = $$props.password;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [tiers, getTiers];
    }

    class Tiers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tiers",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\components\History\History.svelte generated by Svelte v3.23.0 */
    const file$2 = "src\\components\\History\\History.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (118:4) {#each bets as bet}
    function create_each_block$2(ctx) {
    	let div;
    	let p0;
    	let t0_value = /*bet*/ ctx[1].id + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*bet*/ ctx[1].date_played + "";
    	let t2;
    	let t3;
    	let p2;
    	let t4_value = /*bet*/ ctx[1].match + "";
    	let t4;
    	let t5;
    	let p3;
    	let t6_value = /*bet*/ ctx[1].outcome + "";
    	let t6;
    	let t7;
    	let p4;
    	let t8_value = /*bet*/ ctx[1].odd + "";
    	let t8;
    	let t9;
    	let p5;
    	let t10_value = /*bet*/ ctx[1].coeff + "";
    	let t10;
    	let t11;
    	let p6;
    	let t12_value = /*bet*/ ctx[1].esps + "";
    	let t12;
    	let t13;
    	let p7;
    	let t14;
    	let t15_value = /*bet*/ ctx[1].stake + "";
    	let t15;
    	let t16;
    	let p8;
    	let t18;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p2 = element("p");
    			t4 = text(t4_value);
    			t5 = space();
    			p3 = element("p");
    			t6 = text(t6_value);
    			t7 = space();
    			p4 = element("p");
    			t8 = text(t8_value);
    			t9 = space();
    			p5 = element("p");
    			t10 = text(t10_value);
    			t11 = space();
    			p6 = element("p");
    			t12 = text(t12_value);
    			t13 = space();
    			p7 = element("p");
    			t14 = text("€ ");
    			t15 = text(t15_value);
    			t16 = space();
    			p8 = element("p");
    			p8.textContent = `${"?"}`;
    			t18 = space();
    			attr_dev(p0, "class", "svelte-5clxuw");
    			add_location(p0, file$2, 119, 8, 2264);
    			attr_dev(p1, "class", "svelte-5clxuw");
    			add_location(p1, file$2, 120, 8, 2289);
    			attr_dev(p2, "class", "svelte-5clxuw");
    			add_location(p2, file$2, 121, 8, 2323);
    			attr_dev(p3, "class", "svelte-5clxuw");
    			add_location(p3, file$2, 122, 8, 2351);
    			attr_dev(p4, "class", "svelte-5clxuw");
    			add_location(p4, file$2, 123, 8, 2381);
    			attr_dev(p5, "class", "svelte-5clxuw");
    			add_location(p5, file$2, 124, 8, 2407);
    			attr_dev(p6, "class", "svelte-5clxuw");
    			add_location(p6, file$2, 125, 8, 2435);
    			attr_dev(p7, "class", "svelte-5clxuw");
    			add_location(p7, file$2, 126, 8, 2462);
    			attr_dev(p8, "class", "svelte-5clxuw");
    			add_location(p8, file$2, 127, 8, 2492);
    			attr_dev(div, "class", "row grid svelte-5clxuw");
    			add_location(div, file$2, 118, 6, 2232);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(p1, t2);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(p2, t4);
    			append_dev(div, t5);
    			append_dev(div, p3);
    			append_dev(p3, t6);
    			append_dev(div, t7);
    			append_dev(div, p4);
    			append_dev(p4, t8);
    			append_dev(div, t9);
    			append_dev(div, p5);
    			append_dev(p5, t10);
    			append_dev(div, t11);
    			append_dev(div, p6);
    			append_dev(p6, t12);
    			append_dev(div, t13);
    			append_dev(div, p7);
    			append_dev(p7, t14);
    			append_dev(p7, t15);
    			append_dev(div, t16);
    			append_dev(div, p8);
    			append_dev(div, t18);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(118:4) {#each bets as bet}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let p2;
    	let t5;
    	let p3;
    	let t7;
    	let p4;
    	let t9;
    	let p5;
    	let t11;
    	let p6;
    	let t13;
    	let p7;
    	let t15;
    	let p8;
    	let t17;
    	let each_value = /*bets*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "ID";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Data giocata";
    			t3 = space();
    			p2 = element("p");
    			p2.textContent = "Evento";
    			t5 = space();
    			p3 = element("p");
    			p3.textContent = "Esito";
    			t7 = space();
    			p4 = element("p");
    			p4.textContent = "Quota";
    			t9 = space();
    			p5 = element("p");
    			p5.textContent = "Coeff.";
    			t11 = space();
    			p6 = element("p");
    			p6.textContent = "ESPS";
    			t13 = space();
    			p7 = element("p");
    			p7.textContent = "Stake";
    			t15 = space();
    			p8 = element("p");
    			p8.textContent = "Vinta";
    			t17 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p0, "class", "svelte-5clxuw");
    			add_location(p0, file$2, 107, 6, 2010);
    			attr_dev(p1, "class", "svelte-5clxuw");
    			add_location(p1, file$2, 108, 6, 2027);
    			attr_dev(p2, "class", "svelte-5clxuw");
    			add_location(p2, file$2, 109, 6, 2054);
    			attr_dev(p3, "class", "svelte-5clxuw");
    			add_location(p3, file$2, 110, 6, 2075);
    			attr_dev(p4, "class", "svelte-5clxuw");
    			add_location(p4, file$2, 111, 6, 2095);
    			attr_dev(p5, "class", "svelte-5clxuw");
    			add_location(p5, file$2, 112, 6, 2115);
    			attr_dev(p6, "class", "svelte-5clxuw");
    			add_location(p6, file$2, 113, 6, 2136);
    			attr_dev(p7, "class", "svelte-5clxuw");
    			add_location(p7, file$2, 114, 6, 2155);
    			attr_dev(p8, "class", "svelte-5clxuw");
    			add_location(p8, file$2, 115, 6, 2175);
    			attr_dev(div0, "class", "table-head grid svelte-5clxuw");
    			add_location(div0, file$2, 106, 4, 1973);
    			attr_dev(div1, "class", "table svelte-5clxuw");
    			add_location(div1, file$2, 105, 2, 1948);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$2, 104, 0, 1921);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, p1);
    			append_dev(div0, t3);
    			append_dev(div0, p2);
    			append_dev(div0, t5);
    			append_dev(div0, p3);
    			append_dev(div0, t7);
    			append_dev(div0, p4);
    			append_dev(div0, t9);
    			append_dev(div0, p5);
    			append_dev(div0, t11);
    			append_dev(div0, p6);
    			append_dev(div0, t13);
    			append_dev(div0, p7);
    			append_dev(div0, t15);
    			append_dev(div0, p8);
    			append_dev(div1, t17);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*bets*/ 1) {
    				each_value = /*bets*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let bets = [
    		{
    			odd: 2.45,
    			success: null,
    			coeff: 1.593,
    			outcome: "2",
    			id: 7,
    			esps: 0.78,
    			match: "Norwich - Burnley",
    			date_played: "14 Lug 2020",
    			tier: "tier_0",
    			stake: 18,
    			league: "inghilterra"
    		},
    		{
    			odd: 1.8,
    			success: null,
    			coeff: 0.785,
    			outcome: "1",
    			id: 6,
    			esps: 0.283,
    			match: "Juventus - Lazio",
    			date_played: "14 Lug 2020",
    			tier: "tier_2",
    			stake: 12,
    			league: "italia"
    		},
    		{
    			odd: 1.53,
    			success: null,
    			coeff: 1.011,
    			outcome: "1",
    			id: 5,
    			esps: 0.309,
    			match: "Wolves - Crystal Palace",
    			date_played: "14 Lug 2020",
    			tier: "tier_1",
    			stake: 18,
    			league: "inghilterra"
    		},
    		{
    			odd: 4.2,
    			success: null,
    			coeff: 0.754,
    			outcome: "1",
    			id: 4,
    			esps: 0.634,
    			match: "Arsenal - Liverpool",
    			date_played: "14 Lug 2020",
    			tier: "tier_2",
    			stake: 6,
    			league: "inghilterra"
    		},
    		{
    			odd: 1.8,
    			success: null,
    			coeff: 0.785,
    			outcome: "1",
    			id: 3,
    			esps: 0.283,
    			match: "Juventus - Lazio",
    			date_played: "14 Lug 2020",
    			tier: "tier_2",
    			stake: 12,
    			league: "italia"
    		},
    		{
    			odd: 3.98,
    			success: null,
    			coeff: 1.622,
    			outcome: "X",
    			id: 2,
    			esps: 1.291,
    			match: "Fiorentina - Torino",
    			date_played: "14 Lug 2020",
    			tier: "tier_0",
    			stake: 14,
    			league: "italia"
    		},
    		{
    			odd: 2.45,
    			success: null,
    			coeff: 1.624,
    			outcome: "2",
    			id: 1,
    			esps: 0.796,
    			match: "Norwich - Burnley",
    			date_played: "14 Lug 2020",
    			tier: "tier_0",
    			stake: 18,
    			league: "inghilterra"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<History> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("History", $$slots, []);
    	$$self.$capture_state = () => ({ onMount, bets });

    	$$self.$inject_state = $$props => {
    		if ("bets" in $$props) $$invalidate(0, bets = $$props.bets);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [bets];
    }

    class History extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "History",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.23.0 */
    const file$3 = "src\\App.svelte";

    // (32:38) 
    function create_if_block_1$1(ctx) {
    	let current;
    	const history = new History({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(history.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(history, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(history.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(history.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(history, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(32:38) ",
    		ctx
    	});

    	return block;
    }

    // (30:4) {#if activePage == 'tiers'}
    function create_if_block$1(ctx) {
    	let current;
    	const tiers = new Tiers({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(tiers.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tiers, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tiers.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tiers.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tiers, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(30:4) {#if activePage == 'tiers'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div2;
    	let header;
    	let h2;
    	let t1;
    	let div0;
    	let ul;
    	let li0;
    	let t3;
    	let li1;
    	let t5;
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block$1, create_if_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*activePage*/ ctx[0] == "tiers") return 0;
    		if (/*activePage*/ ctx[0] == "history") return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			header = element("header");
    			h2 = element("h2");
    			h2.textContent = "SHINNY PORK SOCIETY";
    			t1 = space();
    			div0 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Tiers";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "Storico";
    			t5 = space();
    			div1 = element("div");
    			if (if_block) if_block.c();
    			add_location(h2, file$3, 9, 4, 191);
    			attr_dev(li0, "class", "svelte-ox2lcc");
    			add_location(li0, file$3, 12, 8, 266);
    			attr_dev(li1, "class", "svelte-ox2lcc");
    			add_location(li1, file$3, 18, 8, 390);
    			attr_dev(ul, "class", "svelte-ox2lcc");
    			add_location(ul, file$3, 11, 6, 252);
    			attr_dev(div0, "class", "links svelte-ox2lcc");
    			add_location(div0, file$3, 10, 4, 225);
    			attr_dev(header, "class", "svelte-ox2lcc");
    			add_location(header, file$3, 8, 2, 177);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$3, 28, 2, 552);
    			add_location(div2, file$3, 7, 0, 168);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, header);
    			append_dev(header, h2);
    			append_dev(header, t1);
    			append_dev(header, div0);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(div2, t5);
    			append_dev(div2, div1);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(li0, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(li1, "click", /*click_handler_1*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let activePage = "history";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	const click_handler = () => {
    		$$invalidate(0, activePage = "tiers");
    	};

    	const click_handler_1 = () => {
    		$$invalidate(0, activePage = "history");
    	};

    	$$self.$capture_state = () => ({ Tiers, History, activePage });

    	$$self.$inject_state = $$props => {
    		if ("activePage" in $$props) $$invalidate(0, activePage = $$props.activePage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [activePage, click_handler, click_handler_1];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
      },
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
