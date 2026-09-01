/* ==========================================================================
   GarmentERP — Application Script
   All data below is randomly generated dummy/demo data for presentation only.
   No backend, no persistence — state lives in memory for the session.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 1. UTILITIES
   * ------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randf = (min, max, dp = 1) => (Math.random() * (max - min) + min).toFixed(dp) * 1;
  const pick = (arr) => arr[rand(0, arr.length - 1)];
  const money = (n) => '₹' + n.toLocaleString('en-IN');
  const pad = (n) => String(n).padStart(2, '0');

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function initials(name) {
    return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  }

  function statusPill(status) {
    const map = {
      'Completed': 'green', 'Delivered': 'green', 'Active': 'green', 'Paid': 'green', 'Approved': 'green', 'Good': 'green', 'Passed': 'green', 'In Stock': 'green',
      'In Progress': 'blue', 'Processing': 'blue', 'Shipped': 'blue', 'Scheduled': 'blue', 'Running': 'blue',
      'Pending': 'amber', 'On Hold': 'amber', 'Low Stock': 'amber', 'Review': 'amber', 'Partial': 'amber',
      'Delayed': 'red', 'Rejected': 'red', 'Inactive': 'red', 'Out of Stock': 'red', 'Overdue': 'red', 'Failed': 'red',
      'Draft': 'gray', 'Closed': 'gray'
    };
    const cls = map[status] || 'gray';
    return `<span class="status-pill status-${cls}">${status}</span>`;
  }

  // Expose toast globally
  window.toast = function(message, type = 'info', icon) {
    const container = $('#toastContainer');
    if (!container) return;
    const icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fa-solid ${icon || icons[type]}"></i><span>${message}</span>`;
    container.appendChild(el);
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.classList.add('hide');
        setTimeout(() => el.remove(), 300);
      }, 3400);
    });
  };

  function animateCounter(el, target, prefix = '', suffix = '', duration = 1000) {
    const isFloat = target % 1 !== 0;
    let start = 0;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current).toLocaleString('en-IN')) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------ *
   * 2. DUMMY DATA GENERATION (optimized)
   * ------------------------------------------------------------------ */
  const FIRST_NAMES = ['Arjun', 'Priya', 'Rohit', 'Sneha', 'Vikram', 'Anita', 'Karan', 'Divya', 'Suresh', 'Kavita', 'Manoj', 'Pooja', 'Ravi', 'Neha', 'Ajay', 'Meena', 'Sanjay', 'Rita', 'Deepak', 'Shalini'];
  const LAST_NAMES = ['Mehta', 'Sharma', 'Patel', 'Verma', 'Reddy', 'Nair', 'Iyer', 'Gupta', 'Joshi', 'Kulkarni', 'Singh', 'Rao', 'Chatterjee', 'Desai', 'Kapoor'];
  const CITIES = ['Bengaluru', 'Tirupur', 'Ludhiana', 'Surat', 'Delhi', 'Mumbai', 'Chennai', 'Coimbatore', 'Kolkata', 'Ahmedabad'];
  const SCHOOLS = ['St. Xavier School', 'Delhi Public School', 'Kendriya Vidyalaya', 'Ryan International', 'DAV Public School', 'Bishop Cotton School', 'Vidya Mandir', 'Sacred Heart School'];
  const CORPORATES = ['Infosys Ltd', 'TCS Uniforms Div', 'Wipro Facilities', 'HDFC Bank Ops', 'Reliance Retail', 'Tata Motors', 'L&T Construction', 'Air India Cabin Crew'];
  const DEALERS = ['Shree Textiles', 'Balaji Garments', 'National Uniform Co.', 'Metro Fabric House', 'Sunrise Apparel Dist.', 'Om Sai Traders'];
  const FABRIC_TYPES = ['Cotton Poplin', 'Polyester Twill', 'Cotton-Poly Blend', 'Terry Cotton', 'Denim 12oz', 'Pique Knit', 'Fleece', 'Rib Knit'];
  const COLORS = [
    { name: 'Navy Blue', hex: '#1e3a8a' }, { name: 'Sky Blue', hex: '#38bdf8' }, { name: 'Maroon', hex: '#7f1d1d' },
    { name: 'Forest Green', hex: '#166534' }, { name: 'Charcoal', hex: '#374151' }, { name: 'White', hex: '#f9fafb' },
    { name: 'Sunflower Yellow', hex: '#facc15' }, { name: 'Grey Melange', hex: '#9ca3af' }, { name: 'Beige', hex: '#e7d7b1' }
  ];
  const STYLES = ['School Shirt SS26', 'Corporate Blazer CB12', 'Polo Tee PT08', 'Cargo Trouser CT21', 'Winter Sweater WS04', 'Sports Track Suit TS15', 'Formal Shirt FS33', 'Denim Jacket DJ09'];
  const DEPTS = ['Cutting', 'Stitching', 'Finishing', 'Quality Control', 'Dispatch', 'Warehouse'];
  const LINES = ['Line A', 'Line B', 'Line C', 'Line D', 'Line E', 'Line F'];

  function fullName() { return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`; }
  function avatarUrl(seed, bg = '2563eb') { return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}&textColor=ffffff`; }
  function orderId(i) { return `ORD-${2600 + i}`; }
  function poId(i) { return `PO-${7700 + i}`; }
  function empId(i) { return `EMP-${1200 + i}`; }

  const DATA = {
    customers: [],
    quotations: [],
    salesOrders: [],
    styles: [],
    bom: [],
    fabricRolls: [],
    inspection: [],
    inventory: { raw: [], acc: [], wip: [], fg: [] },
    warehouses: [],
    employees: [],
    operators: [],
    bundles: [],
    vendors: [],
    purchaseOrders: [],
    dispatch: [],
    defects: [],
    recentOrders: [],
    recentDispatch: [],
    lowStock: []
  };

  function buildData() {
    return new Promise((resolve) => {
      // Customers: schools, corporate, dealers combined pool
      DATA.customers = [];
      let idc = 1;
      SCHOOLS.forEach((n) => DATA.customers.push({ id: `CUS-${1000 + idc++}`, name: n, type: 'School', city: pick(CITIES), contact: fullName(), orders: rand(3, 40), value: rand(80000, 950000), status: pick(['Active', 'Active', 'Active', 'Pending', 'Inactive']) }));
      CORPORATES.forEach((n) => DATA.customers.push({ id: `CUS-${1000 + idc++}`, name: n, type: 'Corporate', city: pick(CITIES), contact: fullName(), orders: rand(3, 60), value: rand(200000, 2500000), status: pick(['Active', 'Active', 'Pending']) }));
      DEALERS.forEach((n) => DATA.customers.push({ id: `CUS-${1000 + idc++}`, name: n, type: 'Dealer', city: pick(CITIES), contact: fullName(), orders: rand(3, 25), value: rand(50000, 700000), status: pick(['Active', 'Inactive', 'Active']) }));

      // Quotations
      DATA.quotations = Array.from({ length: 12 }, (_, i) => ({
        id: `QT-${4400 + i}`, customer: pick(DATA.customers).name, style: pick(STYLES), qty: rand(100, 5000),
        amount: rand(40000, 900000), date: `${rand(1, 22)} Jul 2026`, status: pick(['Draft', 'Pending', 'Approved', 'Rejected'])
      }));

      // Sales orders / Order history
      DATA.salesOrders = Array.from({ length: 18 }, (_, i) => ({
        id: orderId(i), customer: pick(DATA.customers).name, style: pick(STYLES), qty: rand(200, 8000),
        amount: rand(60000, 1800000), date: `${rand(1, 22)} Jul 2026`, status: pick(['Processing', 'In Progress', 'Completed', 'Delayed', 'Pending'])
      }));

      // Merchandising styles
      DATA.styles = STYLES.map((s, i) => ({
        code: `STY-${300 + i}`, name: s, category: pick(['Uniform', 'Corporate Wear', 'Casual', 'Sportswear']),
        season: pick(['SS26', 'AW26', 'SS27']), status: pick(['Active', 'Draft', 'Approved']),
        sample: pick(['Approved', 'Pending', 'Review']), moq: rand(500, 5000)
      }));

      // BOM
      DATA.bom = Array.from({ length: 10 }, (_, i) => ({
        style: pick(STYLES), component: pick(['Main Fabric', 'Lining', 'Buttons', 'Zipper', 'Thread', 'Interlining', 'Label', 'Elastic']),
        qty: randf(0.5, 3.5, 2), unit: pick(['mtr', 'pcs', 'cone']), rate: rand(5, 450), supplier: pick(DEALERS)
      }));

      // Fabric rolls
      DATA.fabricRolls = Array.from({ length: 8 }, (_, i) => ({
        id: `RL-${5500 + i}`, type: pick(FABRIC_TYPES), color: pick(COLORS), gsm: rand(120, 320),
        length: rand(80, 400), status: pick(['In Stock', 'In Stock', 'Reserved', 'Low Stock']),
        barcode: `8901${rand(100000, 999999)}`
      }));
      DATA.inspection = Array.from({ length: 8 }, (_, i) => ({
        roll: `RL-${5500 + i}`, type: pick(FABRIC_TYPES), inspector: fullName(), date: `${rand(1, 22)} Jul 2026`,
        defects: rand(0, 6), grade: pick(['A', 'A', 'B', 'C']), status: pick(['Passed', 'Passed', 'Review', 'Rejected'])
      }));

      // Inventory - Improved with more variety and realistic data
      const rawMaterials = [
        'Cotton Poplin White', 'Cotton Poplin Blue', 'Polyester Twill Black', 
        'Polyester Twill Navy', 'Cotton-Poly Blend Grey', 'Terry Cotton White',
        'Denim 12oz Indigo', 'Denim 10oz Light', 'Pique Knit Red', 
        'Fleece Yellow', 'Rib Knit Black', 'Rib Knit White'
      ];
      
      const accessories = [
        'Sewing Thread White', 'Sewing Thread Black', 'Zipper 14" Silver',
        'Zipper 16" Brass', 'Buttons 4-Hole White', 'Buttons 2-Hole Black',
        'Elastic Band 2"', 'Elastic Band 1.5"', 'Interlining Fusible',
        'Printed Labels', 'Rivets Brass', 'Hook & Loop Tape'
      ];
      
      const wipItems = [
        'School Shirt SS26 (WIP)', 'Corporate Blazer CB12 (WIP)', 
        'Polo Tee PT08 (WIP)', 'Cargo Trouser CT21 (WIP)'
      ];
      
      const fgItems = [
        'School Shirt SS26 - Blue', 'School Shirt SS26 - White',
        'Corporate Blazer CB12 - Black', 'Polo Tee PT08 - Red',
        'Cargo Trouser CT21 - Khaki', 'Denim Jacket DJ09 - Indigo'
      ];

      function invRows(items, n, prefix) {
        const result = [];
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        for (let i = 0; i < Math.min(n, shuffled.length); i++) {
          const qty = rand(50, 5000);
          const min = rand(20, 400);
          const statuses = qty < min ? 'Low Stock' : qty < min * 2 ? 'Pending' : 'In Stock';
          const warehouses = ['WH-01 Bengaluru', 'WH-02 Tirupur', 'WH-03 Delhi', 'WH-04 Surat'];
          result.push({
            sku: `${prefix}-${rand(1000, 9999)}`,
            name: shuffled[i],
            qty,
            unit: pick(['pcs', 'mtr', 'kg', 'set']),
            min,
            warehouse: pick(warehouses),
            status: statuses
          });
        }
        // If we need more items, duplicate with variations
        while (result.length < n) {
          const item = pick(items);
          const qty = rand(50, 5000);
          const min = rand(20, 400);
          const statuses = qty < min ? 'Low Stock' : qty < min * 2 ? 'Pending' : 'In Stock';
          result.push({
            sku: `${prefix}-${rand(1000, 9999)}`,
            name: `${item} ${rand(1, 99)}`,
            qty,
            unit: pick(['pcs', 'mtr', 'kg', 'set']),
            min,
            warehouse: pick(['WH-01 Bengaluru', 'WH-02 Tirupur', 'WH-03 Delhi', 'WH-04 Surat']),
            status: statuses
          });
        }
        return result.slice(0, n);
      }

      DATA.inventory = {
        raw: invRows(rawMaterials, 10, 'RM'),
        acc: invRows(accessories, 10, 'AC'),
        wip: invRows(wipItems, 6, 'WIP'),
        fg: invRows(fgItems, 8, 'FG')
      };
      
      DATA.warehouses = [
        { name: 'WH-01 Bengaluru', fill: rand(55, 92), items: rand(1200, 4000) },
        { name: 'WH-02 Tirupur', fill: rand(40, 88), items: rand(900, 3500) },
        { name: 'WH-03 Delhi', fill: rand(30, 75), items: rand(600, 2800) },
        { name: 'WH-04 Surat (FG)', fill: rand(50, 95), items: rand(1000, 3000) }
      ];

      // Employees
      DATA.employees = Array.from({ length: 24 }, (_, i) => {
        const name = fullName();
        return {
          id: empId(i), name, dept: pick(DEPTS), designation: pick(['Operator', 'Supervisor', 'Line Manager', 'Quality Inspector', 'Helper', 'Machine Technician']),
          attendance: rand(85, 100), salary: rand(14000, 55000), pf: rand(800, 3000), esi: rand(100, 500),
          status: pick(['Active', 'Active', 'Active', 'On Hold']), avatar: avatarUrl(name, pick(['2563eb', '4f46e5', '10b981', 'f59e0b']))
        };
      });

      // Operators for stitching
      DATA.operators = Array.from({ length: 8 }, () => {
        const name = fullName();
        return { name, line: pick(LINES), efficiency: rand(68, 99), target: rand(400, 900), achieved: 0, avatar: avatarUrl(name, pick(['2563eb', '4f46e5', '10b981'])) };
      }).map((o) => ({ ...o, achieved: Math.round(o.target * (o.efficiency / 100)) }));

      // Bundles (cutting)
      DATA.bundles = Array.from({ length: 12 }, (_, i) => ({
        id: `BDL-${9000 + i}`, style: pick(STYLES), size: pick(['S', 'M', 'L', 'XL', 'XXL']), qty: rand(20, 60),
        line: pick(LINES), stage: pick(['Cutting', 'Stitching', 'Finishing', 'QC', 'Packed']),
        progress: rand(10, 100), status: pick(['In Progress', 'Completed', 'Pending'])
      }));

      // Vendors / Purchase
      DATA.vendors = DEALERS.concat(['Global Trims Co.', 'Prime Textile Mills']).map((n, i) => ({
        name: n, category: pick(['Fabric', 'Trims', 'Accessories', 'Packaging']), rating: randf(3.2, 5, 1),
        onTimeRate: rand(72, 99), totalOrders: rand(10, 80)
      }));
      DATA.purchaseOrders = Array.from({ length: 12 }, (_, i) => ({
        id: poId(i), vendor: pick(DATA.vendors).name, item: pick(FABRIC_TYPES.concat(['Buttons', 'Zippers', 'Cartons'])),
        qty: rand(100, 8000), amount: rand(20000, 600000), grn: pick(['Received', 'Partial', 'Pending']),
        payment: pick(['Paid', 'Pending', 'Partial']), date: `${rand(1, 22)} Jul 2026`
      }));

      // Dispatch
      DATA.dispatch = Array.from({ length: 10 }, (_, i) => ({
        id: `DSP-${3300 + i}`, customer: pick(DATA.customers).name, invoice: `INV-${8800 + i}`, vehicle: `KA-${rand(10, 55)}-${['AB', 'CD', 'EF', 'GH'][rand(0, 3)]}-${rand(1000, 9999)}`,
        qty: rand(100, 4000), status: pick(['Dispatched', 'In Progress', 'Delivered', 'Pending']).replace('Dispatched', 'Shipped'),
        date: `${rand(1, 22)} Jul 2026`
      }));

      // Defects
      DATA.defects = Array.from({ length: 10 }, () => ({
        type: pick(['Stitch Skip', 'Uneven Hem', 'Broken Button', 'Colour Shade Variation', 'Open Seam', 'Fabric Hole', 'Size Mismatch', 'Print Defect']),
        style: pick(STYLES), line: pick(LINES), count: rand(1, 25), severity: pick(['Minor', 'Major', 'Critical'])
      }));

      // Recent orders / dispatch (dashboard)
      DATA.recentOrders = DATA.salesOrders.slice(0, 6);
      DATA.recentDispatch = DATA.dispatch.slice(0, 6);
      
      // Low stock - filter from inventory
      const allInventory = [...DATA.inventory.raw, ...DATA.inventory.acc];
      DATA.lowStock = allInventory.filter(r => r.status === 'Low Stock').slice(0, 6);
      if (DATA.lowStock.length < 4) {
        DATA.lowStock = allInventory.slice(0, 6);
      }
      
      resolve();
    });
  }

  // Initialize data immediately (async)
  let dataReady = false;
  buildData().then(() => {
    dataReady = true;
  });

  /* ------------------------------------------------------------------ *
   * 3. CANVAS CHART ENGINE (lightweight, no external libraries)
   * ------------------------------------------------------------------ */
  // Remembers the last draw call made for each canvas (id -> replay fn) so
  // that a resize/breakpoint change can simply redraw the SAME data at the
  // new size, instead of re-running the whole page renderer and rolling a
  // brand new set of random numbers (which is what made charts appear to
  // "jump"/"extend" when switching between mobile and desktop widths).
  const chartRegistry = {};
  function registerChart(canvasId, replay) { chartRegistry[canvasId] = replay; }

  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    // Prefer the parent's layout width (clientWidth) over
    // getBoundingClientRect(), which reflects the element's current
    // painted box and can report a transient/incorrect value while a CSS
    // transform or entrance animation on an ancestor is still in flight.
    // clientWidth is purely a layout measurement and isn't affected by
    // that, so it stays reliable no matter when a redraw happens to fire.
    const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
    const rectWidth = canvas.getBoundingClientRect().width;
    const w = Math.max(1, Math.floor(parentWidth || rectWidth || 400));
    // IMPORTANT: canvas.height (set below) reflects back into the 'height'
    // attribute as the DPR-scaled physical pixel value. If we read the
    // intended CSS height from that same attribute on the next redraw,
    // we'd be scaling an already-scaled number — compounding a bit bigger
    // every single redraw until the chart balloons off-screen. Cache the
    // original CSS height once, the first time this canvas is set up, and
    // always read from that stable cache afterward.
    if (canvas.dataset.cssHeight === undefined) {
      canvas.dataset.cssHeight = canvas.getAttribute('height') || '220';
    }
    const h = parseInt(canvas.dataset.cssHeight, 10) || 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = '100%';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    // Guard against any compounding of the DPR scale on repeated redraws.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    return { ctx, w, h };
  }

  function isDark() { return document.body.classList.contains('dark-mode'); }
  function gridColor() { return isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)'; }
  function textColor() { return isDark() ? '#8b98bd' : '#6b7690'; }

  function drawLineChart(canvasId, series) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    registerChart(canvasId, () => drawLineChart(canvasId, series));
    const { ctx, w, h } = setupCanvas(canvas);
    const padL = 34, padR = 14, padT = 14, padB = 26;
    const chartW = w - padL - padR, chartH = h - padT - padB;
    if (chartW < 20 || chartH < 20) return;
    const allVals = series.datasets.flatMap((d) => d.data);
    const maxV = Math.max(...allVals) * 1.15;
    const minV = 0;

    ctx.clearRect(0, 0, w, h);

    // Soft dashed grid lines keep the chart readable without competing with
    // the data. The same treatment is shared by every module chart.
    ctx.strokeStyle = gridColor();
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 5]);
    ctx.font = '10px Poppins';
    ctx.fillStyle = textColor();
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const y = padT + (chartH / steps) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      const val = Math.round(maxV - (maxV / steps) * i);
      ctx.fillText(val, 2, y + 3);
    }
    ctx.setLineDash([]);
    ctx.strokeStyle = gridColor();
    ctx.beginPath();
    ctx.moveTo(padL, padT + chartH);
    ctx.lineTo(w - padR, padT + chartH);
    ctx.stroke();

    // x labels
    const n = series.labels.length;
    const labelStep = n > 24 ? 5 : n > 14 ? 3 : n > 10 ? 2 : 1;
    series.labels.forEach((lab, i) => {
      if (i !== n - 1 && i % labelStep !== 0) return;
      const x = padL + (chartW / (n - 1)) * i;
      ctx.fillText(lab, x - 8, h - 6);
    });

    // datasets
    series.datasets.forEach((ds) => {
      const points = ds.data.map((v, i) => ({
        x: padL + (chartW / (n - 1)) * i,
        y: padT + chartH - ((v - minV) / (maxV - minV)) * chartH
      }));

      // area fill
      if (ds.fill) {
        const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        grad.addColorStop(0, ds.color + '33');
        grad.addColorStop(1, ds.color + '00');
        ctx.beginPath();
        ctx.moveTo(points[0].x, padT + chartH);
        points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, padT + chartH);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // line
      ctx.beginPath();
      points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.strokeStyle = ds.color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();

      // points
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, n > 24 ? 2.25 : 3, 0, Math.PI * 2);
        ctx.fillStyle = ds.color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, n > 24 ? 4 : 5, 0, Math.PI * 2);
        ctx.strokeStyle = ds.color + '33';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });
  }

  function drawBarChart(canvasId, labels, values, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    registerChart(canvasId, () => drawBarChart(canvasId, labels, values, color));
    const { ctx, w, h } = setupCanvas(canvas);
    const padL = 34, padR = 14, padT = 14, padB = 26;
    const chartW = w - padL - padR, chartH = h - padT - padB;
    if (chartW < 20 || chartH < 20) return;
    const maxV = Math.max(...values) * 1.2;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = gridColor();
    ctx.setLineDash([4, 5]);
    ctx.font = '10px Poppins';
    ctx.fillStyle = textColor();
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const y = padT + (chartH / steps) * i;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
      ctx.fillText(Math.round(maxV - (maxV / steps) * i), 2, y + 3);
    }
    ctx.setLineDash([]);
    ctx.strokeStyle = gridColor();
    ctx.beginPath();
    ctx.moveTo(padL, padT + chartH);
    ctx.lineTo(w - padR, padT + chartH);
    ctx.stroke();

    const n = labels.length;
    const slot = chartW / n;
    const barW = Math.min(slot * 0.5, 40);
    values.forEach((v, i) => {
      const x = padL + slot * i + (slot - barW) / 2;
      const barH = (v / maxV) * chartH;
      const y = padT + chartH - barH;
      const grad = ctx.createLinearGradient(0, y, 0, padT + chartH);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '88');
      ctx.fillStyle = grad;
      roundRect(ctx, x, y, barW, barH, 5);
      ctx.fill();
      ctx.fillStyle = textColor();
      ctx.font = '600 10px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText(v, x + barW / 2, Math.max(y - 6, 11));
      ctx.fillStyle = textColor();
      ctx.font = '10px Poppins';
      ctx.fillText(labels[i], x + barW / 2, h - 6);
    });
    ctx.textAlign = 'left';
  }

  function roundRect(ctx, x, y, w, h, r) {
    if (h < r) r = h;
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
  }

  function drawDonutChart(canvasId, segments) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    registerChart(canvasId, () => drawDonutChart(canvasId, segments));
    const { ctx, w, h } = setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    const radius = Math.min(w, h) / 2 - 10;
    if (radius < 10) return;
    const inner = radius * 0.62;
    if (inner < 1) return;
    const total = segments.reduce((s, x) => s + x.value, 0);
    if (total === 0) return;
    let start = -Math.PI / 2;
    segments.forEach((seg) => {
      const angle = (seg.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, start, start + angle);
      ctx.arc(cx, cy, inner, start + angle, start, true);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = isDark() ? '#212529' : '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      start += angle;
    });
    ctx.fillStyle = isDark() ? '#eef1f8' : '#12172a';
    ctx.font = '700 20px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(total, cx, cy + 4);
    ctx.font = '10px Poppins';
    ctx.fillStyle = textColor();
    ctx.fillText('total', cx, cy + 18);
    ctx.textAlign = 'left';
  }

  /* ------------------------------------------------------------------ *
   * 4. PAGE RENDERERS (optimized)
   * ------------------------------------------------------------------ */
  const KPI_COLORS = ['blue', 'indigo', 'green', 'amber', 'red'];
  function kpiIconStyle(color) {
    const map = {
      blue: ['#2563eb', 'var(--blue-50)'], indigo: ['#4f46e5', '#eef0ff'], green: ['#059669', 'var(--green-100)'],
      amber: ['#b45309', 'var(--amber-100)'], red: ['#dc2626', 'var(--red-100)']
    };
    const [fg, bg] = map[color] || map.blue;
    return `color:${fg}; background:${isDark() ? fg + '22' : bg};`;
  }

  function kpiCard({ icon, label, value, prefix = '', suffix = '', delta, color = 'blue', progress }) {
    const deltaHtml = delta !== undefined
      ? `<span class="kpi-delta ${delta >= 0 ? 'up' : 'down'}"><i class="fa-solid fa-arrow-${delta >= 0 ? 'up' : 'down'}"></i> ${Math.abs(delta)}% vs last month</span>`
      : '';
    const progressHtml = progress !== undefined
      ? `<div class="kpi-progress"><div class="kpi-progress-bar" data-progress="${progress}" style="background:${kpiIconStyle(color).match(/color:(.*?);/)[1]}"></div></div>`
      : '';
    return `<div class="kpi-card">
      <div class="kpi-icon" style="${kpiIconStyle(color)}"><i class="fa-solid ${icon}"></i></div>
      <div class="kpi-label">${label}</div>
      <div class="kpi-value" data-count="${value}" data-prefix="${prefix}" data-suffix="${suffix}">${prefix}0${suffix}</div>
      ${deltaHtml}${progressHtml}
    </div>`;
  }

  function runCounters(container) {
    requestAnimationFrame(() => {
      $$('.kpi-value[data-count]', container).forEach((el) => {
        animateCounter(el, Number(el.dataset.count), el.dataset.prefix, el.dataset.suffix);
      });
      $$('.kpi-progress-bar', container).forEach((el) => {
        setTimeout(() => { el.style.width = el.dataset.progress + '%'; }, 50);
      });
    });
  }

  /* ---- DASHBOARD ---- */
  function renderDashboard() {
    if (!dataReady) {
      setTimeout(renderDashboard, 100);
      return;
    }

    const kpis = [
      { icon: 'fa-industry', label: "Today's Production", value: rand(3200, 4800), suffix: ' pcs', delta: randf(2, 14), color: 'blue', progress: rand(60, 92) },
      { icon: 'fa-cart-shopping', label: 'Pending Orders', value: rand(18, 46), delta: -randf(1, 8), color: 'amber' },
      { icon: 'fa-scroll', label: 'Fabric Stock', value: rand(12000, 45000), suffix: ' mtr', delta: randf(1, 6), color: 'indigo', progress: rand(45, 80) },
      { icon: 'fa-gauge-high', label: 'Efficiency', value: rand(78, 96), suffix: '%', delta: randf(0.5, 5), color: 'green', progress: rand(78, 96) },
      { icon: 'fa-truck', label: 'Dispatch Status', value: rand(65, 98), suffix: '%', delta: randf(1, 4), color: 'blue', progress: rand(65, 98) },
      { icon: 'fa-sack-dollar', label: 'Profit (MTD)', value: rand(8, 42), prefix: '₹', suffix: 'L', delta: randf(2, 18), color: 'green' }
    ];
    $('#kpiGrid').innerHTML = kpis.map((k) => kpiCard(k)).join('');

    const orderStatus = [
      { label: 'Completed', value: rand(30, 60), color: '#10b981' },
      { label: 'In Progress', value: rand(20, 40), color: '#2563eb' },
      { label: 'Pending', value: rand(10, 25), color: '#f59e0b' },
      { label: 'Delayed', value: rand(3, 12), color: '#ef4444' }
    ];
    drawDonutChart('chartOrderStatus', orderStatus);
    $('#orderStatusLegend').innerHTML = orderStatus.map((s) => `<div class="legend-item"><span class="legend-dot" style="background:${s.color}"></span>${s.label} (${s.value})</div>`).join('');

    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    drawBarChart('chartRevenue', months, months.map(() => rand(28, 78)), '#4f46e5');

    $('#deptPerformance').innerHTML = DEPTS.map((d) => {
      const val = rand(68, 98);
      const color = val > 90 ? '#10b981' : val > 78 ? '#2563eb' : '#f59e0b';
      return `<div class="dept-bar-row"><div class="dept-bar-label"><span>${d}</span><span>${val}%</span></div><div class="dept-bar-track"><div class="dept-bar-fill" style="width:${val}%; background:${color}"></div></div></div>`;
    }).join('');

    $('#tblRecentOrders').innerHTML = tableHtml(
      ['Order ID', 'Customer', 'Style', 'Qty', 'Status'],
      DATA.recentOrders.map((o) => [o.id, o.customer, o.style, o.qty.toLocaleString('en-IN'), statusPill(o.status)])
    );
    $('#tblLowStock').innerHTML = tableHtml(
      ['SKU', 'Item', 'Qty Left', 'Warehouse', 'Status'],
      DATA.lowStock.map((s) => [s.sku, s.name, `${s.qty} ${s.unit}`, s.warehouse, statusPill(s.status)])
    );

    const activities = [
      { icon: 'fa-check', color: '#10b981', text: 'Bundle BDL-9004 completed stitching', time: '5 min ago' },
      { icon: 'fa-truck', color: '#2563eb', text: 'Dispatch DSP-3305 left warehouse', time: '22 min ago' },
      { icon: 'fa-triangle-exclamation', color: '#f59e0b', text: 'Fabric roll RL-5502 flagged low stock', time: '48 min ago' },
      { icon: 'fa-user-plus', color: '#4f46e5', text: 'New operator allocated to Line C', time: '1 hr ago' },
      { icon: 'fa-file-invoice', color: '#10b981', text: 'Invoice INV-8804 generated', time: '2 hr ago' },
      { icon: 'fa-magnifying-glass', color: '#ef4444', text: 'QC flagged 3 defects on style PT08', time: '3 hr ago' }
    ];
    $('#activityFeed').innerHTML = activities.map((a) => `
      <div class="activity-item">
        <div class="activity-icon" style="background:${a.color}22; color:${a.color}"><i class="fa-solid ${a.icon}"></i></div>
        <div class="activity-text"><strong>${a.text}</strong><br><time>${a.time}</time></div>
      </div>`).join('');

    runCounters($('#page-dashboard'));
  }

  function tableHtml(headers, rows) {
    return `<thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }

  /* ---- CUSTOMERS ---- */
  let customerTab = 'schools';
  function renderCustomers() {
    if (!dataReady) { setTimeout(renderCustomers, 100); return; }
    
    const search = ($('#customerSearch')?.value || '').toLowerCase();
    const filter = $('#customerFilter')?.value || 'all';

    if (customerTab === 'quotation') {
      $('#tblCustomers').innerHTML = tableHtml(
        ['Quote ID', 'Customer', 'Style', 'Qty', 'Amount', 'Date', 'Status', ''],
        DATA.quotations.map((q) => [q.id, q.customer, q.style, q.qty.toLocaleString('en-IN'), money(q.amount), q.date, statusPill(q.status), rowActions()])
      );
    } else if (customerTab === 'salesorders' || customerTab === 'orderhistory') {
      $('#tblCustomers').innerHTML = tableHtml(
        ['Order ID', 'Customer', 'Style', 'Qty', 'Amount', 'Date', 'Status', ''],
        DATA.salesOrders.map((o) => [o.id, o.customer, o.style, o.qty.toLocaleString('en-IN'), money(o.amount), o.date, statusPill(o.status), rowActions()])
      );
    } else {
      const typeMap = { schools: 'School', corporate: 'Corporate', dealers: 'Dealer' };
      let rows = DATA.customers.filter((c) => c.type === typeMap[customerTab]);
      if (search) rows = rows.filter((c) => c.name.toLowerCase().includes(search) || c.id.toLowerCase().includes(search) || c.city.toLowerCase().includes(search));
      if (filter !== 'all') rows = rows.filter((c) => c.status === filter);
      $('#customerCount').textContent = `Showing ${rows.length} records`;
      $('#tblCustomers').innerHTML = tableHtml(
        ['Customer', 'ID', 'City', 'Contact', 'Orders', 'Value', 'Status', ''],
        rows.map((c) => [
          `<div class="cell-main"><div class="cell-avatar">${initials(c.name)}</div><div><div>${c.name}</div><div class="cell-sub">${c.type}</div></div></div>`,
          c.id, c.city, c.contact, c.orders, money(c.value), statusPill(c.status), rowActions()
        ])
      );
    }
  }
  function rowActions() {
    return `<div class="row-actions">
      <button title="View" onclick="ERP.actionToast('view')"><i class="fa-regular fa-eye"></i></button>
      <button title="Edit" onclick="ERP.actionToast('edit')"><i class="fa-regular fa-pen-to-square"></i></button>
      <button title="Delete" class="danger" onclick="ERP.actionToast('delete')"><i class="fa-regular fa-trash-can"></i></button>
    </div>`;
  }

  /* ---- MERCHANDISING ---- */
  let merchTab = 'style';
  function renderMerchandising() {
    if (!dataReady) { setTimeout(renderMerchandising, 100); return; }
    
    $('#merchKpis').innerHTML = [
      kpiCard({ icon: 'fa-swatchbook', label: 'Active Styles', value: DATA.styles.length, color: 'blue' }),
      kpiCard({ icon: 'fa-vial', label: 'Samples In Progress', value: rand(4, 14), color: 'amber' }),
      kpiCard({ icon: 'fa-list-check', label: 'BOM Approved', value: rand(60, 95), suffix: '%', color: 'green', progress: rand(60, 95) }),
      kpiCard({ icon: 'fa-palette', label: 'Colorways', value: COLORS.length * rand(2, 4), color: 'indigo' })
    ].join('');
    runCounters($('#merchKpis'));

    const el = $('#merchContent');
    if (merchTab === 'style') {
      el.innerHTML = `<div class="panel"><div class="table-scroll"><table class="data-table">${tableHtml(
        ['Style Code', 'Name', 'Category', 'Season', 'Sample Status', 'MOQ', 'Status', ''],
        DATA.styles.map((s) => [s.code, s.name, s.category, s.season, statusPill(s.sample), s.moq.toLocaleString('en-IN'), statusPill(s.status), rowActions()])
      )}</table></div></div>`;
    } else if (merchTab === 'sample') {
      el.innerHTML = `<div class="roll-grid">${DATA.styles.map((s) => `
        <div class="roll-card">
          <div class="roll-card-head"><h4>${s.name}</h4>${statusPill(s.sample)}</div>
          <div class="barcode-txt">${s.code}</div>
          <div class="roll-meta"><span>Round: ${rand(1, 3)}</span><span>Due: ${rand(1, 20)} Aug</span></div>
        </div>`).join('')}</div>`;
    } else if (merchTab === 'bom') {
      el.innerHTML = `<div class="panel"><div class="table-scroll"><table class="data-table">${tableHtml(
        ['Style', 'Component', 'Qty', 'Unit', 'Rate', 'Supplier'],
        DATA.bom.map((b) => [b.style, b.component, b.qty, b.unit, money(b.rate), b.supplier])
      )}</table></div></div>`;
    } else if (merchTab === 'techpack') {
      el.innerHTML = `<div class="report-grid">${DATA.styles.slice(0, 6).map((s) => `
        <div class="report-card">
          <div class="report-card-icon"><i class="fa-solid fa-file-lines"></i></div>
          <h4>${s.name}</h4>
          <p>Tech pack v2.1 · Construction, trims &amp; measurement spec</p>
          <div class="report-card-actions">
            <button onclick="ERP.actionToast('preview')"><i class="fa-regular fa-eye"></i> Preview</button>
            <button onclick="ERP.actionToast('download')"><i class="fa-solid fa-download"></i> PDF</button>
          </div>
        </div>`).join('')}</div>`;
    } else if (merchTab === 'sizechart') {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      el.innerHTML = `<div class="panel"><div class="table-scroll"><table class="data-table">${tableHtml(
        ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)', 'Shoulder (in)'],
        sizes.map((sz, i) => [sz, 36 + i * 2, 27 + i, 8 + i * 0.5, 16 + i * 0.4])
      )}</table></div></div>`;
    } else if (merchTab === 'colorway') {
      el.innerHTML = `<div class="roll-grid">${COLORS.map((c) => `
        <div class="roll-card">
          <div class="roll-card-head"><div class="roll-swatch" style="background:${c.hex}"></div>${statusPill(pick(['Approved', 'Pending']))}</div>
          <h4>${c.name}</h4>
          <div class="barcode-txt">${c.hex.toUpperCase()}</div>
        </div>`).join('')}</div>`;
    }
  }

  /* ---- FABRIC & ACCESSORIES ---- */
  function renderFabric() {
    if (!dataReady) { setTimeout(renderFabric, 100); return; }
    
    $('#fabricKpis').innerHTML = [
      kpiCard({ icon: 'fa-scroll', label: 'Total Rolls', value: DATA.fabricRolls.length * rand(8, 15), color: 'blue' }),
      kpiCard({ icon: 'fa-ruler', label: 'Total Length', value: rand(18000, 42000), suffix: ' mtr', color: 'indigo' }),
      kpiCard({ icon: 'fa-clipboard-check', label: 'Inspected Today', value: rand(12, 40), color: 'green' }),
      kpiCard({ icon: 'fa-triangle-exclamation', label: 'Shade Issues', value: rand(1, 8), color: 'amber' })
    ].join('');
    runCounters($('#fabricKpis'));

    $('#fabricRollGrid').innerHTML = DATA.fabricRolls.map((r) => `
      <div class="roll-card">
        <div class="roll-card-head"><div class="roll-swatch" style="background:${r.color.hex}"></div>${statusPill(r.status)}</div>
        <h4>${r.id} — ${r.type}</h4>
        <div class="barcode-txt"><i class="fa-solid fa-barcode"></i> ${r.barcode}</div>
        <div class="roll-meta"><span>GSM: ${r.gsm}</span><span>${r.length} mtr</span></div>
      </div>`).join('');

    $('#tblInspection').innerHTML = tableHtml(
      ['Roll ID', 'Fabric', 'Inspector', 'Date', 'Defects', 'Grade', 'Status'],
      DATA.inspection.map((i) => [i.roll, i.type, i.inspector, i.date, i.defects, i.grade, statusPill(i.status)])
    );

    const stockByType = FABRIC_TYPES.map((t) => rand(800, 6000));
    drawBarChart('chartFabricStock', FABRIC_TYPES.slice(0, 6).map((t) => t.split(' ')[0]), stockByType.slice(0, 6), '#2563eb');
  }

  /* ---- INVENTORY ---- */
  let invTab = 'raw';
  function renderInventory() {
    if (!dataReady) { setTimeout(renderInventory, 100); return; }
    
    const totalItems = Object.values(DATA.inventory).flat().length * rand(15, 40);
    $('#inventoryKpis').innerHTML = [
      kpiCard({ icon: 'fa-boxes-stacked', label: 'Total SKUs', value: totalItems, color: 'blue' }),
      kpiCard({ icon: 'fa-triangle-exclamation', label: 'Low Stock Items', value: Object.values(DATA.inventory).flat().filter((r) => r.status === 'Low Stock').length, color: 'amber' }),
      kpiCard({ icon: 'fa-warehouse', label: 'Warehouses', value: DATA.warehouses.length, color: 'indigo' }),
      kpiCard({ icon: 'fa-right-left', label: 'Transfers This Week', value: rand(6, 22), color: 'green' })
    ].join('');
    runCounters($('#inventoryKpis'));

    $('#warehouseGrid').innerHTML = DATA.warehouses.map((w) => `
      <div class="warehouse-card">
        <h4><i class="fa-solid fa-warehouse" style="color:var(--blue-600)"></i> ${w.name}</h4>
        <div class="wh-fill">${w.fill}%</div>
        <div class="dept-bar-track"><div class="dept-bar-fill" style="width:${w.fill}%; background:${w.fill > 80 ? '#ef4444' : w.fill > 60 ? '#f59e0b' : '#10b981'}"></div></div>
        <div class="roll-meta"><span>${w.items.toLocaleString('en-IN')} items</span><span>Capacity used</span></div>
      </div>`).join('');

    renderInventoryTable();
  }
  function renderInventoryTable() {
    if (!dataReady) { setTimeout(renderInventoryTable, 100); return; }
    
    const search = ($('#invSearch')?.value || '').toLowerCase();
    let rows = DATA.inventory[invTab];
    if (search) rows = rows.filter((r) => r.name.toLowerCase().includes(search) || r.sku.toLowerCase().includes(search));
    $('#tblInventory').innerHTML = tableHtml(
      ['SKU', 'Item', 'Quantity', 'Min Level', 'Warehouse', 'Status', ''],
      rows.map((r) => [
        r.sku, r.name,
        `<span class="mini-progress"><span class="mini-progress-fill" style="width:${Math.min(100, (r.qty / (r.min * 2)) * 100)}%"></span></span>${r.qty} ${r.unit}`,
        `${r.min} ${r.unit}`, r.warehouse, statusPill(r.status), rowActions()
      ])
    );
  }

  /* ---- PRODUCTION PLANNING ---- */
  function renderPlanning() {
    $('#planningKpis').innerHTML = [
      kpiCard({ icon: 'fa-diagram-project', label: 'Active Plans', value: rand(8, 22), color: 'blue' }),
      kpiCard({ icon: 'fa-gauge', label: 'Capacity Utilized', value: rand(70, 96), suffix: '%', color: 'green', progress: rand(70, 96) }),
      kpiCard({ icon: 'fa-bullseye', label: "Today's Target", value: rand(3800, 5200), suffix: ' pcs', color: 'indigo' }),
      kpiCard({ icon: 'fa-clock', label: 'On-Time Lines', value: rand(4, 6), suffix: '/6', color: 'amber' })
    ].join('');
    runCounters($('#planningKpis'));

    const daysInMonth = 31;
    let cal = '';
    const dowOffset = 3; // July 1 2026 is a Wednesday
    for (let i = 0; i < dowOffset; i++) cal += `<div class="calendar-cell faded"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const load = rand(40, 100);
      const color = load > 85 ? 'status-red' : load > 65 ? 'status-amber' : 'status-green';
      const isToday = d === 22;
      cal += `<div class="calendar-cell" style="${isToday ? 'border-color:var(--blue-600); box-shadow:0 0 0 2px var(--blue-100);' : ''}">
        <span class="cal-day">${d}</span>
        <span class="cal-load status-pill ${color}">${load}%</span>
      </div>`;
    }
    $('#prodCalendar').innerHTML = cal;

    $('#tblLinePlanning').innerHTML = tableHtml(
      ['Line', 'Style', 'Order Qty', 'Start Date', 'End Date', 'Progress', 'Status'],
      LINES.map((l) => {
        const progress = rand(15, 100);
        return [l, pick(STYLES), rand(500, 4000).toLocaleString('en-IN'), `${rand(1, 10)} Jul`, `${rand(15, 30)} Jul`,
          `<span class="mini-progress"><span class="mini-progress-fill" style="width:${progress}%"></span></span>${progress}%`,
          statusPill(progress === 100 ? 'Completed' : progress > 60 ? 'In Progress' : 'Scheduled')];
      })
    );
  }

  /* ---- CUTTING ---- */
  function renderCutting() {
    if (!dataReady) { setTimeout(renderCutting, 100); return; }
    
    $('#cuttingKpis').innerHTML = [
      kpiCard({ icon: 'fa-scissors', label: 'Bundles Created', value: DATA.bundles.length * rand(8, 20), color: 'blue' }),
      kpiCard({ icon: 'fa-scroll', label: 'Fabric Consumed', value: rand(2000, 8000), suffix: ' mtr', color: 'indigo' }),
      kpiCard({ icon: 'fa-percent', label: 'Marker Efficiency', value: rand(80, 96), suffix: '%', color: 'green', progress: rand(80, 96) }),
      kpiCard({ icon: 'fa-barcode', label: 'Barcodes Printed Today', value: rand(120, 480), color: 'amber' })
    ].join('');
    runCounters($('#cuttingKpis'));

    $('#tblBundles').innerHTML = tableHtml(
      ['Bundle ID', 'Style', 'Size', 'Qty', 'Line', 'Stage', 'Progress', 'Status', ''],
      DATA.bundles.map((b) => [
        b.id, b.style, b.size, b.qty, b.line, b.stage,
        `<span class="mini-progress"><span class="mini-progress-fill" style="width:${b.progress}%"></span></span>${b.progress}%`,
        statusPill(b.status), rowActions()
      ])
    );
  }

  /* ---- STITCHING ---- */
  function renderStitching() {
    if (!dataReady) { setTimeout(renderStitching, 100); return; }
    
    $('#stitchingKpis').innerHTML = [
      kpiCard({ icon: 'fa-industry', label: 'Daily Output', value: rand(2800, 4200), suffix: ' pcs', color: 'blue' }),
      kpiCard({ icon: 'fa-gauge-high', label: 'Avg Efficiency', value: rand(75, 95), suffix: '%', color: 'green', progress: rand(75, 95) }),
      kpiCard({ icon: 'fa-people-group', label: 'Operators Active', value: rand(120, 220), color: 'indigo' }),
      kpiCard({ icon: 'fa-rotate-left', label: 'Rework Rate', value: randf(1, 6, 1), suffix: '%', color: 'amber' })
    ].join('');
    runCounters($('#stitchingKpis'));

    $('#operatorCards').innerHTML = DATA.operators.map((o) => `
      <div class="operator-card">
        <img class="operator-avatar" src="${o.avatar}" alt="${o.name}">
        <div class="operator-info"><strong>${o.name}</strong><span>${o.line} · Target ${o.target}</span></div>
        <div class="operator-eff" style="color:${o.efficiency > 90 ? '#10b981' : o.efficiency > 75 ? '#2563eb' : '#f59e0b'}">${o.efficiency}%</div>
      </div>`).join('');

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    drawLineChart('chartStitchingEff', {
      labels: days,
      datasets: [{ data: days.map(() => rand(72, 96)), color: '#10b981', fill: true }]
    });

    $('#tblStitching').innerHTML = tableHtml(
      ['Line', 'Operator', 'Style', 'Target', 'Achieved', 'Rework', 'Efficiency'],
      DATA.operators.map((o) => [o.line, o.name, pick(STYLES), o.target, o.achieved, rand(0, 15), `${o.efficiency}%`])
    );
  }

  /* ---- FINISHING ---- */
  function renderFinishing() {
    const flow = [
      { icon: 'fa-scissors', name: 'Thread Cutting', val: `${rand(85, 100)}% done` },
      { icon: 'fa-fire-flame-simple', name: 'Ironing', val: `${rand(70, 98)}% done` },
      { icon: 'fa-layer-group', name: 'Folding', val: `${rand(60, 95)}% done` },
      { icon: 'fa-box', name: 'Packing', val: `${rand(50, 90)}% done` },
      { icon: 'fa-boxes-packing', name: 'Carton Mgmt', val: `${rand(1, 20)} cartons ready` }
    ];
    $('#finishingFlow').innerHTML = flow.map((f) => `<div class="flow-step"><i class="fa-solid ${f.icon}"></i><h4>${f.name}</h4><span>${f.val}</span></div>`).join('');

    $('#tblPackingStatus').innerHTML = tableHtml(
      ['Style', 'Order Qty', 'Packed', 'Pending', 'Status'],
      STYLES.slice(0, 6).map((s) => {
        const total = rand(500, 4000), packed = rand(100, total);
        return [s, total.toLocaleString('en-IN'), packed.toLocaleString('en-IN'), (total - packed).toLocaleString('en-IN'), statusPill(packed === total ? 'Completed' : 'In Progress')];
      })
    );

    $('#tblCartonList').innerHTML = tableHtml(
      ['Carton No.', 'Style', 'Qty/Carton', 'Weight', 'Destination'],
      Array.from({ length: 8 }, (_, i) => [`CTN-${6600 + i}`, pick(STYLES), rand(20, 60), `${randf(8, 22)} kg`, pick(CITIES)])
    );
  }

  /* ---- QUALITY CONTROL ---- */
  function renderQuality() {
    if (!dataReady) { setTimeout(renderQuality, 100); return; }
    
    $('#qcKpis').innerHTML = [
      kpiCard({ icon: 'fa-clipboard-check', label: 'Inline QC Passed', value: rand(85, 98), suffix: '%', color: 'green', progress: rand(85, 98) }),
      kpiCard({ icon: 'fa-flag', label: 'End Line Rejects', value: randf(1, 5, 1), suffix: '%', color: 'amber' }),
      kpiCard({ icon: 'fa-chart-simple', label: 'AQL Pass Rate', value: rand(88, 99), suffix: '%', color: 'blue', progress: rand(88, 99) }),
      kpiCard({ icon: 'fa-triangle-exclamation', label: 'Open Defect Reports', value: DATA.defects.length, color: 'red' })
    ].join('');
    runCounters($('#qcKpis'));

    drawDonutChart('chartQCPie', [
      { label: 'Minor', value: rand(30, 60), color: '#f59e0b' },
      { label: 'Major', value: rand(10, 30), color: '#ef4444' },
      { label: 'Critical', value: rand(2, 10), color: '#7f1d1d' },
      { label: 'Passed Clean', value: rand(60, 120), color: '#10b981' }
    ]);

    $('#tblDefects').innerHTML = tableHtml(
      ['Defect Type', 'Style', 'Line', 'Count', 'Severity'],
      DATA.defects.map((d) => [d.type, d.style, d.line, d.count, statusPill(d.severity === 'Critical' ? 'Rejected' : d.severity === 'Major' ? 'Pending' : 'Approved').replace(/>[\w\s]+</, `>${d.severity}<`)])
    );
  }

  /* ---- DISPATCH ---- */
  function renderDispatch() {
    if (!dataReady) { setTimeout(renderDispatch, 100); return; }
    
    $('#dispatchKpis').innerHTML = [
      kpiCard({ icon: 'fa-truck-fast', label: 'Dispatched Today', value: rand(4, 14), color: 'blue' }),
      kpiCard({ icon: 'fa-box-open', label: 'Pending Packing List', value: rand(2, 10), color: 'amber' }),
      kpiCard({ icon: 'fa-file-invoice-dollar', label: 'Invoices Generated', value: rand(10, 40), color: 'indigo' }),
      kpiCard({ icon: 'fa-circle-check', label: 'Delivered This Week', value: rand(20, 60), color: 'green' })
    ].join('');
    runCounters($('#dispatchKpis'));

    const steps = [
      { title: 'Packing List Generated', time: '22 Jul, 08:10 AM', done: true },
      { title: 'Invoice Raised', time: '22 Jul, 09:05 AM', done: true },
      { title: 'E-Way Bill Created', time: '22 Jul, 09:40 AM', done: true },
      { title: 'Vehicle Loaded & Dispatched', time: '22 Jul, 11:20 AM', done: true },
      { title: 'In Transit', time: 'Expected 23 Jul', done: false },
      { title: 'Delivery Confirmation', time: 'Pending', done: false }
    ];
    $('#dispatchTimeline').innerHTML = steps.map((s) => `
      <div class="timeline-item ${s.done ? 'done' : ''}">
        <div class="timeline-dot"><i class="fa-solid ${s.done ? 'fa-check' : 'fa-clock'}"></i></div>
        <h4>${s.title}</h4><span>${s.time}</span>
      </div>`).join('');

    $('#tblDispatch').innerHTML = tableHtml(
      ['Dispatch ID', 'Customer', 'Invoice', 'Vehicle No.', 'Qty', 'Date', 'Status', ''],
      DATA.dispatch.map((d) => [d.id, d.customer, d.invoice, d.vehicle, d.qty.toLocaleString('en-IN'), d.date, statusPill(d.status), rowActions()])
    );
  }

  /* ---- PURCHASE ---- */
  function renderPurchase() {
    if (!dataReady) { setTimeout(renderPurchase, 100); return; }
    
    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    drawLineChart('chartPurchase', { labels: months, datasets: [{ data: months.map(() => rand(20, 70)), color: '#4f46e5', fill: true }] });

    $('#tblVendors').innerHTML = tableHtml(
      ['Vendor', 'Category', 'Rating', 'On-Time %', 'Orders'],
      DATA.vendors.map((v) => [v.name, v.category, `<i class="fa-solid fa-star" style="color:#f59e0b"></i> ${v.rating}`, `${v.onTimeRate}%`, v.totalOrders])
    );

    $('#tblPurchaseOrders').innerHTML = tableHtml(
      ['PO ID', 'Vendor', 'Item', 'Qty', 'Amount', 'GRN Status', 'Payment', 'Date'],
      DATA.purchaseOrders.map((p) => [p.id, p.vendor, p.item, p.qty.toLocaleString('en-IN'), money(p.amount), statusPill(p.grn === 'Received' ? 'Completed' : p.grn), statusPill(p.payment), p.date])
    );
  }

  /* ---- HR & PAYROLL ---- */
  function renderHR() {
    if (!dataReady) { setTimeout(renderHR, 100); return; }
    
    $('#hrKpis').innerHTML = [
      kpiCard({ icon: 'fa-users', label: 'Total Employees', value: DATA.employees.length * rand(10, 20), color: 'blue' }),
      kpiCard({ icon: 'fa-fingerprint', label: 'Present Today', value: rand(88, 99), suffix: '%', color: 'green', progress: rand(88, 99) }),
      kpiCard({ icon: 'fa-money-bill-wave', label: 'Payroll (MTD)', value: rand(18, 55), prefix: '₹', suffix: 'L', color: 'indigo' }),
      kpiCard({ icon: 'fa-shield-heart', label: 'PF + ESI Compliance', value: rand(95, 100), suffix: '%', color: 'amber', progress: rand(95, 100) })
    ].join('');
    runCounters($('#hrKpis'));

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    drawBarChart('chartAttendance', days, days.map(() => rand(85, 99)), '#2563eb');
    drawDonutChart('chartPayroll', [
      { label: 'Salary', value: rand(60, 80), color: '#2563eb' },
      { label: 'PF', value: rand(8, 16), color: '#4f46e5' },
      { label: 'ESI', value: rand(4, 10), color: '#10b981' },
      { label: 'Bonus', value: rand(4, 12), color: '#f59e0b' }
    ]);

    $('#tblEmployees').innerHTML = tableHtml(
      ['Employee', 'ID', 'Department', 'Designation', 'Attendance', 'Salary', 'Status', ''],
      DATA.employees.map((e) => [
        `<div class="cell-main"><div class="cell-avatar">${initials(e.name)}</div><div>${e.name}</div></div>`,
        e.id, e.dept, e.designation,
        `<span class="mini-progress"><span class="mini-progress-fill ${e.attendance >= 90 ? 'good' : e.attendance >= 75 ? 'warn' : 'bad'}" style="width:${e.attendance}%"></span></span><span class="mini-progress-label">${e.attendance}%</span>`,
        money(e.salary), statusPill(e.status), rowActions()
      ])
    );
  }

  /* ---- FINANCE ---- */
  function renderFinance() {
    $('#financeKpis').innerHTML = [
      kpiCard({ icon: 'fa-sack-dollar', label: 'Revenue (MTD)', value: rand(80, 220), prefix: '₹', suffix: 'L', delta: randf(2, 15), color: 'green' }),
      kpiCard({ icon: 'fa-file-invoice', label: 'GST Payable', value: rand(4, 22), prefix: '₹', suffix: 'L', color: 'amber' }),
      kpiCard({ icon: 'fa-chart-line', label: 'Net Profit Margin', value: randf(8, 22, 1), suffix: '%', delta: randf(0.5, 3), color: 'blue' }),
      kpiCard({ icon: 'fa-building-columns', label: 'Bank Balance', value: rand(45, 180), prefix: '₹', suffix: 'L', color: 'indigo' })
    ].join('');
    runCounters($('#financeKpis'));

    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    drawLineChart('chartIncome', {
      labels: months,
      datasets: [
        { data: months.map(() => rand(60, 140)), color: '#10b981', fill: false },
        { data: months.map(() => rand(30, 90)), color: '#ef4444', fill: false }
      ]
    });
    drawDonutChart('chartExpense', [
      { label: 'Raw Material', value: rand(30, 50), color: '#2563eb' },
      { label: 'Payroll', value: rand(20, 35), color: '#4f46e5' },
      { label: 'Utilities', value: rand(8, 18), color: '#f59e0b' },
      { label: 'Logistics', value: rand(6, 14), color: '#10b981' },
      { label: 'Others', value: rand(4, 10), color: '#9ca3af' }
    ]);

    $('#tblBalanceSheet').innerHTML = tableHtml(
      ['Head', 'Category', 'Amount'],
      [
        ['Fixed Assets', 'Assets', money(rand(5000000, 25000000))],
        ['Current Assets', 'Assets', money(rand(2000000, 12000000))],
        ['Inventory', 'Assets', money(rand(1500000, 8000000))],
        ['Long Term Liabilities', 'Liabilities', money(rand(1000000, 9000000))],
        ['Current Liabilities', 'Liabilities', money(rand(500000, 4000000))],
        ["Owner's Equity", 'Equity', money(rand(6000000, 22000000))]
      ]
    );
  }

  /* ---- REPORTS ---- */
  function renderReports() {
    const reports = [
      { icon: 'fa-gauge-high', title: 'Production Efficiency', desc: 'Line-wise and factory-wide efficiency trends' },
      { icon: 'fa-scroll', title: 'Fabric Consumption', desc: 'Actual vs planned fabric usage by style' },
      { icon: 'fa-calculator', title: 'Costing Report', desc: 'Cost breakdown per style and per order' },
      { icon: 'fa-chart-pie', title: 'Order Profitability', desc: 'Margin analysis across customers and styles' },
      { icon: 'fa-gears', title: 'Machine Utilization', desc: 'Uptime, downtime and maintenance summary' },
      { icon: 'fa-file-lines', title: 'Daily MIS', desc: 'Consolidated daily management report' }
    ];
    $('#reportGrid').innerHTML = reports.map((r) => `
      <div class="report-card">
        <div class="report-card-icon"><i class="fa-solid ${r.icon}"></i></div>
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
        <div class="report-card-actions">
          <button onclick="ERP.actionToast('pdf')"><i class="fa-regular fa-file-pdf"></i> PDF</button>
          <button onclick="ERP.actionToast('excel')"><i class="fa-regular fa-file-excel"></i> Excel</button>
          <button onclick="ERP.actionToast('print')"><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>`).join('');
  }

  /* ---- DIRECTOR DASHBOARD ---- */
  function renderDirector() {
    if (!dataReady) { setTimeout(renderDirector, 100); return; }
    
    $('#directorKpis').innerHTML = [
      { icon: 'fa-industry', label: 'Live Production', value: rand(3200, 5200), suffix: ' pcs', color: 'blue' },
      { icon: 'fa-percent', label: 'Factory Efficiency', value: rand(80, 96), suffix: '%', color: 'green' },
      { icon: 'fa-sack-dollar', label: 'Profit / Order (avg)', value: rand(6, 22), prefix: '₹', suffix: 'K', color: 'indigo' },
      { icon: 'fa-triangle-exclamation', label: 'Delayed Orders', value: rand(2, 9), color: 'amber' }
    ].map((k) => kpiCard(k)).join('');
    runCounters($('#directorKpis'));

    $('#liveLines').innerHTML = LINES.map((l) => {
      const pct = rand(55, 99);
      return `<div class="live-line-row"><span class="pulse-dot"></span><span class="line-name">${l}</span><div class="line-track"><div class="line-fill" style="width:${pct}%"></div></div><span class="line-pct">${pct}%</span></div>`;
    }).join('');

    const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    drawLineChart('chartCashflow', {
      labels: months,
      datasets: [
        { data: months.map(() => rand(70, 160)), color: '#38bdf8', fill: true },
        { data: months.map(() => rand(40, 100)), color: '#f87171', fill: false }
      ]
    });

    $('#tblDelayed').innerHTML = tableHtml(
      ['Order ID', 'Customer', 'Days Late', 'Reason'],
      DATA.salesOrders.filter((o) => o.status === 'Delayed').slice(0, 5).map((o) => [o.id, o.customer, rand(1, 9), pick(['Fabric shortage', 'Machine breakdown', 'Labour shortage', 'QC rejection', 'Power outage'])])
    );
    $('#tblLeaderboard').innerHTML = tableHtml(
      ['Rank', 'Employee', 'Line', 'Efficiency'],
      DATA.operators.slice().sort((a, b) => b.efficiency - a.efficiency).map((o, i) => [`#${i + 1}`, o.name, o.line, `${o.efficiency}%`])
    );
  }

  /* ---- SETTINGS ---- */
  let settingsTab = 'company';
  function renderSettings() {
    const el = $('#settingsContent');
    if (settingsTab === 'company') {
      el.innerHTML = `<h3>Company Information</h3><div class="form-grid">
        <div class="form-field"><label>Company Name</label><input value="Your Company Pvt. Ltd."></div>
        <div class="form-field"><label>GSTIN</label><input value="29AACG1234B1Z5"></div>
        <div class="form-field"><label>Contact Email</label><input value="ops@yourcompany.com"></div>
        <div class="form-field"><label>Phone</label><input value="+91 80 4123 5678"></div>
        <div class="form-field full"><label>Registered Address</label><textarea rows="3">Plot 42, Peenya Industrial Area, Bengaluru, Karnataka 560058</textarea></div>
      </div><div class="settings-save-row"><button class="btn-ghost">Cancel</button><button class="btn-primary" onclick="ERP.actionToast('save')"><i class="fa-solid fa-check"></i> Save Changes</button></div>`;
    } else if (settingsTab === 'factory') {
      el.innerHTML = `<h3>Factory Details</h3><div class="form-grid">
        <div class="form-field"><label>Factory Name</label><input value="Unit-1 Peenya"></div>
        <div class="form-field"><label>Total Machines</label><input value="212"></div>
        <div class="form-field"><label>Production Lines</label><input value="6"></div>
        <div class="form-field"><label>Shift Timing</label><input value="08:00 AM – 05:00 PM"></div>
      </div><div class="settings-save-row"><button class="btn-primary" onclick="ERP.actionToast('save')"><i class="fa-solid fa-check"></i> Save Changes</button></div>`;
    } else if (settingsTab === 'profile') {
      el.innerHTML = `<h3>My Profile</h3><div class="form-grid">
        <div class="form-field"><label>Full Name</label><input value="Arjun Mehta"></div>
        <div class="form-field"><label>Role</label><input value="Plant Manager"></div>
        <div class="form-field"><label>Email</label><input value="arjun.mehta@yourcompany.com"></div>
        <div class="form-field"><label>Phone</label><input value="+91 98450 12345"></div>
      </div><div class="settings-save-row"><button class="btn-primary" onclick="ERP.actionToast('save')"><i class="fa-solid fa-check"></i> Save Changes</button></div>`;
    } else if (settingsTab === 'notif') {
      const rows = [
        ['Low stock alerts', 'Get notified when raw material falls below threshold', true],
        ['Order status updates', 'Notify on order stage changes', true],
        ['Dispatch confirmations', 'Email when a shipment leaves the warehouse', false],
        ['Payroll processed', 'Notify HR when payroll run completes', true]
      ];
      el.innerHTML = `<h3>Notification Preferences</h3>` + rows.map((r) => `
        <div class="toggle-row"><div><strong>${r[0]}</strong><span>${r[1]}</span></div><div class="switch ${r[2] ? 'on' : ''}" onclick="this.classList.toggle('on')"></div></div>`).join('');
    } else if (settingsTab === 'theme') {
      el.innerHTML = `<h3>Theme</h3><div class="theme-swatches">
        <div class="theme-swatch selected" onclick="ERP.selectSwatch(this)"><div class="swatch-preview" style="background:linear-gradient(135deg,#2563eb,#4f46e5)"></div><span>Blue Indigo</span></div>
        <div class="theme-swatch" onclick="ERP.selectSwatch(this)"><div class="swatch-preview" style="background:linear-gradient(135deg,#0f172a,#334155)"></div><span>Slate</span></div>
        <div class="theme-swatch" onclick="ERP.selectSwatch(this)"><div class="swatch-preview" style="background:linear-gradient(135deg,#059669,#10b981)"></div><span>Emerald</span></div>
      </div><p class="muted" style="display:block;margin-top:16px;font-size:0.82rem;">Use the moon icon in the top bar to toggle dark mode instantly.</p>`;
    } else if (settingsTab === 'language') {
      el.innerHTML = `<h3>Language</h3><div class="form-grid"><div class="form-field"><label>Interface Language</label>
        <select><option>English (India)</option><option>Hindi</option><option>Tamil</option><option>Kannada</option></select></div></div>`;
    } else if (settingsTab === 'backup') {
      el.innerHTML = `<h3>Backup</h3><div class="toggle-row"><div><strong>Automatic daily backup</strong><span>Last backup: Today, 03:00 AM</span></div><div class="switch on" onclick="this.classList.toggle('on')"></div></div>
        <div class="settings-save-row" style="justify-content:flex-start; margin-top:20px;"><button class="btn-ghost" onclick="ERP.actionToast('backup')"><i class="fa-solid fa-cloud-arrow-down"></i> Backup Now</button></div>`;
    } else if (settingsTab === 'security') {
      el.innerHTML = `<h3>Security</h3>
        <div class="accordion-item open">
          <div class="accordion-head" onclick="this.parentElement.classList.toggle('open')"><span>Change Password</span><i class="fa-solid fa-chevron-down"></i></div>
          <div class="accordion-body"><div class="accordion-body-inner form-grid">
            <div class="form-field"><label>Current Password</label><input type="password" value="••••••••"></div>
            <div class="form-field"><label>New Password</label><input type="password" placeholder="Enter new password"></div>
          </div></div>
        </div>
        <div class="accordion-item">
          <div class="accordion-head" onclick="this.parentElement.classList.toggle('open')"><span>Two-Factor Authentication</span><i class="fa-solid fa-chevron-down"></i></div>
          <div class="accordion-body"><div class="accordion-body-inner">Add an extra layer of security using an authenticator app.</div></div>
        </div>
        <div class="settings-save-row"><button class="btn-primary" onclick="ERP.actionToast('save')"><i class="fa-solid fa-check"></i> Update Security</button></div>`;
    } else if (settingsTab === 'account') {
      el.innerHTML = `<h3>Account</h3>
        <div class="toggle-row"><div><strong>Signed in as</strong><span>${$('#userNameDisplay') ? $('#userNameDisplay').textContent : ''} · ${$('#userRoleDisplay') ? $('#userRoleDisplay').textContent : ''}</span></div></div>
        <div class="settings-save-row" style="justify-content:flex-start; margin-top:20px;">
          <button class="btn-danger" id="settingsLogoutBtn"><i class="fa-solid fa-right-from-bracket"></i> Log Out</button>
        </div>`;
      const logoutBtn = $('#settingsLogoutBtn');
      if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
    }
  }

  /* ------------------------------------------------------------------ *
   * 5. PAGE REGISTRY + NAVIGATION
   * ------------------------------------------------------------------ */
  const RENDERERS = {
    dashboard: renderDashboard, customers: renderCustomers, merchandising: renderMerchandising, fabric: renderFabric,
    inventory: renderInventory, planning: renderPlanning, cutting: renderCutting, stitching: renderStitching,
    finishing: renderFinishing, quality: renderQuality, dispatch: renderDispatch, purchase: renderPurchase,
    hr: renderHR, finance: renderFinance, reports: renderReports, director: renderDirector, settings: renderSettings,
    // Employee-role pages: these render via the `Employee` module (defined in
    // the inline script in index.html, loaded after this file). Without
    // these entries, goToPage swaps which .page is visible but never
    // populates the table/lists inside it, so the page appears empty.
    'employee-dashboard': () => typeof Employee !== 'undefined' && Employee.renderDashboard(),
    tasks: () => typeof Employee !== 'undefined' && Employee.renderTasks(),
    attendance: () => typeof Employee !== 'undefined' && Employee.renderAttendance(),
    leaves: () => typeof Employee !== 'undefined' && Employee.renderLeaveManagement()
  };

  // Expose goToPage globally
  window.goToPage = function(pageId) {
    $$('.page').forEach((p) => p.classList.remove('active'));
    const target = $('#page-' + pageId);
    if (!target) return;
    target.classList.add('active');

    $$('.nav-item[data-page]').forEach((n) => n.classList.toggle('active', n.dataset.page === pageId));
    $('#breadcrumbCurrent').innerHTML = target.dataset.title;
    document.title = `${target.dataset.title.replace(/&amp;/g, '&')} · Production Manufacturing ERP`;

    if (RENDERERS[pageId]) RENDERERS[pageId]();

    // Reset the app's only scroll surface whenever the user changes pages.
    const pageContent = $('#pageContent');
    if (pageContent) pageContent.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Close the mobile sidebar when present.
    const sidebar = $('#sidebar');
    const overlay = $('#sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('show');
  };

  /* ------------------------------------------------------------------ *
   * 6. EVENT WIRING (optimized)
   * ------------------------------------------------------------------ */
  function initRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-primary');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      btn.appendChild(ripple);
      requestAnimationFrame(() => {
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  function initLogin() {
    // NOTE: The actual login submit handler lives in the inline script at the
    // bottom of index.html, since it needs to know which role was selected.
    // A second handler used to live here too, which caused BOTH to fire on
    // every submit and race each other - duplicate "welcome" toasts, the
    // wrong dashboard/role being activated, and overlapping page content
    // (the bug where the admin and employee dashboards appeared stacked on
    // top of each other). Do not re-add a submit listener here.
    // renderNotifications is exposed globally so the index.html handler can
    // call it after a successful login.
    window.renderNotifications = renderNotifications;

    $('#pwToggle').addEventListener('click', () => {
      const pw = $('#password');
      const icon = $('#pwToggle i');
      const show = pw.type === 'password';
      pw.type = show ? 'text' : 'password';
      icon.className = show ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });
  }

  function initSidebar() {
    $('#sidebarCollapseBtn').addEventListener('click', () => $('#sidebar').classList.toggle('collapsed'));
    const mobileMenuBtn = $('#mobileMenuBtn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        $('#sidebar').classList.add('mobile-open');
        $('#sidebarOverlay').classList.add('show');
      });
    }
    const sidebarOverlay = $('#sidebarOverlay');
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        $('#sidebar').classList.remove('mobile-open');
        sidebarOverlay.classList.remove('show');
      });
    }
    $$('.nav-item[data-page]').forEach((btn) => btn.addEventListener('click', () => window.goToPage(btn.dataset.page)));
    $$('.dropdown-item[data-page]').forEach((btn) => btn.addEventListener('click', () => window.goToPage(btn.dataset.page)));
    $('#userLogoutBtn').addEventListener('click', doLogout);
    const sidebarLogoutBtn = $('#sidebarLogoutBtn');
    if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener('click', doLogout);
  }

  function doLogout() {
    $('#appShell').classList.add('hidden');
    document.body.classList.remove('admin-mode', 'employee-mode');
    const loginPage = $('#loginPage');
    loginPage.classList.remove('hidden');
    loginPage.style.opacity = '1';
    loginPage.style.transform = 'scale(1)';
    $('#signInBtn .btn-label').textContent = 'Sign In';
    $('#signInBtn i').className = 'fa-solid fa-arrow-right';
    window.toast('You have been signed out.', 'info', 'fa-right-from-bracket');
  }

  function initTopbar() {
    function toggleDropdown(btnId, panelId) {
      const btn = $(btnId), panel = $(panelId);
      if (!btn || !panel) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = panel.classList.contains('show');
        $$('.dropdown-panel').forEach((p) => p.classList.remove('show'));
        if (!wasOpen) panel.classList.add('show');
      });
    }
    toggleDropdown('#notifBtn', '#notifPanel');
    toggleDropdown('#userChipBtn', '#userPanel');
    document.addEventListener('click', () => $$('.dropdown-panel').forEach((p) => p.classList.remove('show')));

    $('#markAllRead').addEventListener('click', (e) => {
      e.preventDefault();
      $$('.notif-item').forEach((n) => n.classList.remove('unread'));
      $('#notifBadge').style.display = 'none';
      window.toast('All notifications marked as read.', 'success');
    });
  }

  function renderNotifications() {
    const items = [
      { icon: 'fa-triangle-exclamation', color: '#f59e0b', title: 'Low stock: Cotton Poplin', time: '10 min ago', unread: true },
      { icon: 'fa-truck', color: '#2563eb', title: 'Dispatch DSP-3308 delivered', time: '35 min ago', unread: true },
      { icon: 'fa-clipboard-check', color: '#ef4444', title: 'QC flagged 4 defects — Line C', time: '1 hr ago', unread: true },
      { icon: 'fa-user-plus', color: '#10b981', title: 'New employee onboarded', time: '3 hr ago', unread: true },
      { icon: 'fa-file-invoice', color: '#4f46e5', title: 'Invoice INV-8809 overdue', time: 'Yesterday', unread: true }
    ];
    $('#notifList').innerHTML = items.map((n) => `
      <div class="notif-item ${n.unread ? 'unread' : ''}">
        <div class="notif-icon" style="background:${n.color}22; color:${n.color}"><i class="fa-solid ${n.icon}"></i></div>
        <div class="notif-text"><strong>${n.title}</strong><span>${n.time}</span></div>
      </div>`).join('');
  }

  function initTabs() {
    // Customer tabs
    $$('#customerTabs .tab').forEach((t) => t.addEventListener('click', () => {
      $$('#customerTabs .tab').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      customerTab = t.dataset.tab;
      renderCustomers();
    }));
    $('#customerSearch').addEventListener('input', renderCustomers);
    $('#customerFilter').addEventListener('change', renderCustomers);
    $('#addCustomerBtn').addEventListener('click', () => window.toast('Add Customer form would open here.', 'info', 'fa-user-plus'));

    // Merch tabs
    $$('#merchTabs .tab').forEach((t) => t.addEventListener('click', () => {
      $$('#merchTabs .tab').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      merchTab = t.dataset.tab;
      renderMerchandising();
    }));

    // Inventory tabs
    $$('#invTabs .tab').forEach((t) => t.addEventListener('click', () => {
      $$('#invTabs .tab').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      invTab = t.dataset.tab;
      renderInventoryTable();
    }));
    $('#invSearch').addEventListener('input', renderInventoryTable);

    // Settings nav
    $$('.settings-nav-item').forEach((t) => t.addEventListener('click', () => {
      $$('.settings-nav-item').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      settingsTab = t.dataset.tab;
      renderSettings();
    }));

  }

  function initLiveClock() {
    function tick() {
      const now = new Date();
      const opts = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
      const dateStr = now.toLocaleDateString('en-IN', opts);
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const clock = $('#liveClock');
      if (clock) clock.textContent = `${dateStr} · ${timeStr}`;
    }
    tick();
    setInterval(tick, 1000);
  }

  function initModal() {
    $('#modalCloseBtn').addEventListener('click', closeModal);
    $('#modalOverlay').addEventListener('click', (e) => { if (e.target.id === 'modalOverlay') closeModal(); });
  }
  function closeModal() { $('#modalOverlay').classList.remove('show'); }

  function initResize() {
    // Redraw every chart currently on screen at its new size, reusing the
    // exact data it was last drawn with. We deliberately do NOT call
    // RENDERERS[id]() here — that regenerates fresh random KPI/chart values
    // on every call, which is what caused charts to look completely
    // different (different totals, different bar heights, a differently
    // scaled axis) whenever the viewport crossed a breakpoint or was
    // resized, making it look like the chart itself was "extending"/broken.
    function redrawVisibleCharts() {
      $$('.page.active canvas').forEach((canvas) => {
        const replay = chartRegistry[canvas.id];
        if (replay) replay();
      });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(redrawVisibleCharts, 200);
    });
  }

  /* ------------------------------------------------------------------ *
   * 7. PUBLIC API (used by inline onclick handlers)
   * ------------------------------------------------------------------ */
  window.ERP = {
    actionToast(kind) {
      const map = {
        view: ['Opening record details…', 'info', 'fa-eye'],
        edit: ['Edit form would open here.', 'info', 'fa-pen'],
        delete: ['Record removed (demo only).', 'success', 'fa-trash'],
        preview: ['Loading tech pack preview…', 'info', 'fa-file-lines'],
        download: ['Preparing PDF download…', 'success', 'fa-download'],
        pdf: ['Exporting report as PDF…', 'success', 'fa-file-pdf'],
        excel: ['Exporting report as Excel…', 'success', 'fa-file-excel'],
        print: ['Sending to printer…', 'info', 'fa-print'],
        save: ['Changes saved successfully.', 'success', 'fa-check'],
        backup: ['Backup completed successfully.', 'success', 'fa-cloud-arrow-down']
      };
      const [msg, type, icon] = map[kind] || ['Action completed.', 'info', 'fa-check'];
      window.toast(msg, type, icon);
    },
    selectSwatch(el) {
      $$('.theme-swatch').forEach((s) => s.classList.remove('selected'));
      el.classList.add('selected');
      window.toast('Theme preference saved.', 'success');
    }
  };

  /* ------------------------------------------------------------------ *
   * 8. INIT (optimized)
   * ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      initLogin();
      initSidebar();
      initTopbar();
      initTabs();
      initModal();
      initRipple();
      initLiveClock();
      initResize();
      
      setTimeout(() => {
        const overlay = $('#loadingOverlay');
        if (overlay) overlay.classList.add('fade-out');
      }, 600);
    });
  });
})();