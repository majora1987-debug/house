// Main Single Page Application Controller for Adam's House Showcase
// Unslopped craft-first architecture

(function() {
  "use strict";

  const $ = id => document.getElementById(id);

  // App State
  let currentRoute = "rooms";
  let activeRoomId = null;
  let activePhotoIdx = 0;
  let currentRooms = [];
  let currentUpdates = [];
  let currentWishlist = [];
  let wishlistFilter = "all";
  let timelineFilter = "all";

  // Helpers
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(isoStr) {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function safeUrl(url) {
    if (!url) return "";
    const trimmed = String(url).trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return escapeHtml(trimmed);
    }
    return "";
  }

  function safeId(id) {
    return String(id || "").replace(/[^a-zA-Z0-9_-]/g, "");
  }

  // --- Router ---
  function parseHash() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (!hash || hash === "rooms") {
      return { route: "rooms", param: null };
    }
    if (hash.startsWith("room/")) {
      return { route: "room", param: hash.substring(5) };
    }
    if (hash === "blueprint") {
      return { route: "blueprint", param: null };
    }
    if (hash === "wishlist") {
      return { route: "wishlist", param: null };
    }
    if (hash === "timeline") {
      return { route: "timeline", param: null };
    }
    return { route: "rooms", param: null };
  }

  async function handleRouting() {
    const { route, param } = parseHash();
    currentRoute = route;
    activeRoomId = param;

    // Update Nav Active States
    document.querySelectorAll(".nav-link").forEach(link => {
      const linkRoute = link.getAttribute("data-route");
      link.classList.toggle("active", linkRoute === route || (route === "room" && linkRoute === "rooms"));
    });

    // Hide all view screens
    $("roomsView").classList.add("hidden");
    $("roomDetailView").classList.add("hidden");
    $("blueprintView").classList.add("hidden");
    $("wishlistView").classList.add("hidden");
    $("timelineView").classList.add("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (route === "rooms") {
      await renderRoomsHub();
      $("roomsView").classList.remove("hidden");
    } else if (route === "room") {
      await renderRoomDetail(param);
      $("roomDetailView").classList.remove("hidden");
    } else if (route === "blueprint") {
      renderBlueprint();
      $("blueprintView").classList.remove("hidden");
    } else if (route === "wishlist") {
      await renderWishlist();
      $("wishlistView").classList.remove("hidden");
    } else if (route === "timeline") {
      await renderTimeline();
      $("timelineView").classList.remove("hidden");
    }
  }

  // --- Views ---

  // 1. Rooms Hub
  async function renderRoomsHub() {
    currentRooms = await window.HouseDB.getRooms();
    const container = $("roomsGrid");
    if (!container) return;

    const countLabel = $("roomsCountLabel");
    if (countLabel) {
      countLabel.textContent = `${currentRooms.length} Planning Zones`;
    }

    let html = "";
    currentRooms.forEach(room => {
      const photosCount = room.gallery ? room.gallery.length : 1;
      html += `
        <div class="room-card" onclick="location.hash='#room/${room.id}'">
          <div class="room-card-media">
            <img src="${room.heroImage}" alt="${escapeHtml(room.name)}" loading="lazy">
            <span class="room-index-tag">${escapeHtml(room.badge)}</span>
            <span class="room-photos-count">${photosCount} ${photosCount === 1 ? 'view' : 'views'}</span>
          </div>
          <div class="room-card-body">
            <div class="room-card-header">
              <h3 class="room-card-name">${escapeHtml(room.name)}</h3>
              <div class="room-card-sub">${escapeHtml(room.subtitle)}</div>
            </div>
            <p class="room-card-vision">${escapeHtml(room.vision)}</p>
            <div class="room-card-footer">
              <span class="room-card-status">Bare Canvas</span>
              <span class="room-card-cta">Inspect &rarr;</span>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // 2. Room Detail View
  async function renderRoomDetail(roomId) {
    if (!currentRooms.length) {
      currentRooms = await window.HouseDB.getRooms();
    }
    const room = currentRooms.find(r => r.id === roomId) || currentRooms[0];
    if (!room) return;

    $("roomDetailTitle").textContent = room.name;
    $("roomDetailSub").textContent = room.subtitle;
    $("roomBadge").textContent = room.badge;
    $("roomVisionContent").textContent = room.vision;

    // Admin inline edit button
    const isAdmin = window.HouseAuth.isAdmin();
    $("editVisionBtn").classList.toggle("hidden", !isAdmin);
    $("addRoomUpdateBtn").classList.toggle("hidden", !isAdmin);

    // Gallery
    activePhotoIdx = 0;
    renderGallery(room);

    // Specs
    renderRoomSpecs(room);

    // Room Updates Timeline
    await renderRoomUpdates(room.id);
  }

  function renderGallery(room) {
    const gallery = room.gallery || [{ src: room.heroImage, caption: room.name }];
    const mainImg = $("roomMainImg");
    const captionEl = $("roomMainCaption");
    const thumbsBar = $("roomThumbsBar");

    function updateMain(idx) {
      activePhotoIdx = idx;
      const photo = gallery[idx];
      mainImg.src = photo.src;
      mainImg.alt = photo.caption;
      captionEl.textContent = photo.caption;
      document.querySelectorAll(".room-thumb").forEach((t, i) => {
        t.classList.toggle("active", i === idx);
      });
    }

    let thumbsHtml = "";
    gallery.forEach((photo, idx) => {
      thumbsHtml += `
        <div class="room-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
          <img src="${photo.src}" alt="${escapeHtml(photo.caption)}" loading="lazy">
        </div>
      `;
    });
    thumbsBar.innerHTML = thumbsHtml;

    thumbsBar.querySelectorAll(".room-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        const idx = parseInt(thumb.getAttribute("data-idx"), 10);
        updateMain(idx);
      });
    });

    updateMain(0);

    // Click main image to open Lightbox
    $("roomGalleryMain").onclick = () => {
      openLightbox(gallery[activePhotoIdx].src, gallery[activePhotoIdx].caption);
    };
  }

  function renderRoomSpecs(room) {
    const specsContainer = $("roomSpecsList");
    if (!specsContainer) return;
    const specs = room.specs || {};
    let html = "";
    for (const [key, value] of Object.entries(specs)) {
      const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
      html += `
        <div class="spec-item">
          <span class="spec-label">${escapeHtml(label)}</span>
          <span class="spec-value">${escapeHtml(value)}</span>
        </div>
      `;
    }
    specsContainer.innerHTML = html;
  }

  async function renderRoomUpdates(roomId) {
    const updatesContainer = $("roomUpdatesFeed");
    if (!updatesContainer) return;
    currentUpdates = await window.HouseDB.getUpdates();
    const roomUpdates = currentUpdates.filter(u => u.roomId === roomId);

    if (!roomUpdates.length) {
      updatesContainer.innerHTML = `
        <div style="color: var(--text-muted); font-size: 13px; padding: 12px 0;">
          No logged projects yet for this room.
        </div>
      `;
      return;
    }

    const isAdmin = window.HouseAuth.isAdmin();
    let html = "";
    roomUpdates.forEach(u => {
      const badgeClass = `badge-${(u.status || 'planning').toLowerCase().replace(/\s+/g, '-')}`;
      html += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-item-card">
            <div class="timeline-meta">
              <span class="timeline-date">${formatDate(u.date)}</span>
              <span class="timeline-badge ${badgeClass}">${escapeHtml(u.status)}</span>
            </div>
            <h4 class="timeline-item-title">${escapeHtml(u.title)}</h4>
            <div class="timeline-item-content">${escapeHtml(u.content)}</div>
            ${isAdmin ? `
              <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                <button class="inline-delete-btn" onclick="window.appDeleteUpdate('${safeId(u.id)}')" title="Delete update">Delete</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });
    updatesContainer.innerHTML = html;
  }

  // 3. Blueprint & Utilities View
  function renderBlueprint() {
    const bp = window.DEFAULT_DATA ? window.DEFAULT_DATA.blueprint : null;
    if (!bp) return;

    // Switchboard circuit rows
    const tableBody = $("circuitTableBody");
    if (tableBody) {
      let rowsHtml = "";
      bp.switchboard.circuits.forEach(c => {
        const isSpare = String(c.pole).includes("12-15") || c.name.includes("SPARE");
        rowsHtml += `
          <tr class="${isSpare ? 'spare-row' : ''}">
            <td><strong style="font-family: var(--font-mono);">#${c.pole}</strong></td>
            <td><strong>${escapeHtml(c.name)}</strong></td>
            <td><span class="timeline-badge badge-planning">${escapeHtml(c.rating)}</span></td>
            <td>${escapeHtml(c.rcd)}</td>
            <td>${isSpare ? '<span class="spare-tag">4 Spare DIN Poles Available</span>' : escapeHtml(c.scope)}</td>
          </tr>
        `;
      });
      tableBody.innerHTML = rowsHtml;
    }
  }

  // 4. Wishlist & Gift Registry View
  async function renderWishlist() {
    currentWishlist = await window.HouseDB.getWishlist();
    const container = $("wishlistGrid");
    if (!container) return;

    const isAdmin = window.HouseAuth.isAdmin();
    $("addWishlistBtn").classList.toggle("hidden", !isAdmin);

    if (!currentWishlist.length) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 56px 0; font-size: 14px;">
          The wishlist is currently empty. ${isAdmin ? 'Use "+ Add Item" above to start adding items.' : 'Check back soon to see items on the wishlist.'}
        </div>
      `;
      return;
    }

    const filtered = currentWishlist.filter(item => {
      if (wishlistFilter === "all") return true;
      return item.status === wishlistFilter;
    });

    if (!filtered.length) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 48px 0; font-size: 13.5px;">
          No items found with status &ldquo;${escapeHtml(wishlistFilter.replace(/-/g, " "))}&rdquo;.
        </div>
      `;
      return;
    }

    let html = "";
    filtered.forEach(item => {
      const isPurchased = item.status === "purchased";
      const statusClass = `status-${item.status}`;
      const statusLabel = item.status.replace(/-/g, " ");

      html += `
        <div class="wishlist-card ${isPurchased ? 'purchased-card' : ''}">
          <div class="wishlist-card-top">
            <span class="wishlist-room-tag">${escapeHtml(item.room)}</span>
            <span class="wishlist-status-pill ${statusClass}">${escapeHtml(statusLabel)}</span>
          </div>
          <h4 class="wishlist-card-name">${escapeHtml(item.name)}</h4>
          <p class="wishlist-card-notes">${escapeHtml(item.notes)}</p>
          <div class="wishlist-card-footer">
            <span class="wishlist-cost">${escapeHtml(item.estCost || '')}</span>
            ${safeUrl(item.link) ? `<a class="wishlist-link" href="${safeUrl(item.link)}" target="_blank" rel="noopener noreferrer">Supplier Link &nearr;</a>` : '<span></span>'}
          </div>
          ${isAdmin ? `
            <div class="wishlist-admin-ctrls">
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">Set:</span>
              <button class="inline-edit-btn" onclick="window.appUpdateWishlist('${safeId(item.id)}', 'must-have')">Must</button>
              <button class="inline-edit-btn" onclick="window.appUpdateWishlist('${safeId(item.id)}', 'nice-to-have')">Nice</button>
              <button class="inline-edit-btn" onclick="window.appUpdateWishlist('${safeId(item.id)}', 'could-have')">Could</button>
              <button class="inline-edit-btn" onclick="window.appUpdateWishlist('${safeId(item.id)}', 'purchased')">Purchased</button>
              <button class="inline-delete-btn" style="margin-left: auto;" onclick="window.appDeleteWishlist('${safeId(item.id)}')">Remove</button>
            </div>
          ` : ''}
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // 5. Master Timeline View
  async function renderTimeline() {
    currentUpdates = await window.HouseDB.getUpdates();
    const container = $("masterTimelineFeed");
    if (!container) return;

    const filtered = currentUpdates.filter(u => {
      if (timelineFilter === "all") return true;
      return u.roomId === timelineFilter;
    });

    const isAdmin = window.HouseAuth.isAdmin();
    $("addTimelineUpdateBtn").classList.toggle("hidden", !isAdmin);

    if (!filtered.length) {
      container.innerHTML = `<div style="color: var(--text-muted); padding: 24px 0; font-size: 13.5px;">No project entries recorded for this selection.</div>`;
      return;
    }

    let html = "";
    filtered.forEach(u => {
      const room = currentRooms.find(r => r.id === u.roomId);
      const roomName = room ? room.name : (u.roomId === "blueprint" ? "House Blueprint & Utilities" : "General House");
      const badgeClass = `badge-${(u.status || 'planning').toLowerCase().replace(/\s+/g, '-')}`;

      html += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-item-card">
            <div class="timeline-meta">
              <span class="timeline-date">${formatDate(u.date)} &bull; <strong style="color: var(--text-primary);">${escapeHtml(roomName)}</strong></span>
              <span class="timeline-badge ${badgeClass}">${escapeHtml(u.status)}</span>
            </div>
            <h4 class="timeline-item-title">${escapeHtml(u.title)}</h4>
            <div class="timeline-item-content">${escapeHtml(u.content)}</div>
            ${isAdmin ? `
              <div style="margin-top: 10px; display: flex; justify-content: flex-end;">
                <button class="inline-delete-btn" onclick="window.appDeleteUpdate('${safeId(u.id)}')">Delete</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // --- Lightbox ---
  function openLightbox(src, caption) {
    $("lightboxImg").src = src;
    $("lightboxCaption").textContent = caption || "";
    $("lightboxBackdrop").classList.add("open");
  }

  function closeLightbox() {
    $("lightboxBackdrop").classList.remove("open");
  }

  // --- Admin Modal Actions ---
  function openAddUpdateModal(defaultRoomId) {
    $("updateTitleInput").value = "";
    $("updateContentInput").value = "";
    $("updateStatusSelect").value = "Planning";
    $("updateRoomSelect").value = defaultRoomId || (activeRoomId || "general");
    $("updateModalBackdrop").classList.add("open");
  }

  function closeAddUpdateModal() {
    $("updateModalBackdrop").classList.remove("open");
  }

  async function submitAddUpdate() {
    const title = $("updateTitleInput").value.trim();
    const content = $("updateContentInput").value.trim();
    const status = $("updateStatusSelect").value;
    const roomId = $("updateRoomSelect").value;

    if (!title) {
      alert("Please enter a title for the update.");
      return;
    }

    closeAddUpdateModal();
    await window.HouseDB.addUpdate({
      title,
      content,
      status,
      roomId,
      date: new Date().toISOString()
    });

    if (currentRoute === "room" && activeRoomId) {
      await renderRoomUpdates(activeRoomId);
    } else if (currentRoute === "timeline") {
      await renderTimeline();
    }
  }

  // Vision Edit Modal
  function openEditVisionModal() {
    const room = currentRooms.find(r => r.id === activeRoomId);
    if (!room) return;
    $("visionTextarea").value = room.vision || "";
    $("visionModalBackdrop").classList.add("open");
  }

  function closeEditVisionModal() {
    $("visionModalBackdrop").classList.remove("open");
  }

  async function submitEditVision() {
    const text = $("visionTextarea").value.trim();
    if (!activeRoomId) return;

    closeEditVisionModal();
    const saved = await window.HouseDB.saveRoomVision(activeRoomId, text);
    const room = currentRooms.find(r => r.id === activeRoomId);
    if (room) room.vision = saved;
    $("roomVisionContent").textContent = saved;
  }

  // Wishlist Modal
  function openAddWishlistModal() {
    $("wlNameInput").value = "";
    $("wlNotesInput").value = "";
    $("wlCostInput").value = "";
    $("wlLinkInput").value = "";
    $("wlStatusSelect").value = "must-have";
    $("wishlistModalBackdrop").classList.add("open");
  }

  function closeAddWishlistModal() {
    $("wishlistModalBackdrop").classList.remove("open");
  }

  async function submitAddWishlist() {
    const name = $("wlNameInput").value.trim();
    const room = $("wlRoomSelect").value;
    const status = $("wlStatusSelect").value;
    const notes = $("wlNotesInput").value.trim();
    const estCost = $("wlCostInput").value.trim();
    const link = $("wlLinkInput").value.trim();

    if (!name) {
      alert("Please enter an item name.");
      return;
    }

    closeAddWishlistModal();
    await window.HouseDB.addWishlistItem({ name, room, status, notes, estCost, link });
    await renderWishlist();
  }

  // Global window functions for inline onclick handlers
  window.appDeleteUpdate = async function(id) {
    if (!confirm("Delete this project update?")) return;
    await window.HouseDB.deleteUpdate(id);
    if (currentRoute === "room" && activeRoomId) {
      await renderRoomUpdates(activeRoomId);
    } else if (currentRoute === "timeline") {
      await renderTimeline();
    }
  };

  window.appUpdateWishlist = async function(id, status) {
    await window.HouseDB.updateWishlistStatus(id, status);
    await renderWishlist();
  };

  window.appDeleteWishlist = async function(id) {
    if (!confirm("Delete this item from the wishlist?")) return;
    await window.HouseDB.deleteWishlistItem(id);
    await renderWishlist();
  };

  // --- Initialization ---
  function init() {
    window.addEventListener("hashchange", handleRouting);

    // Lightbox events
    $("lightboxCloseBtn").onclick = closeLightbox;
    $("lightboxBackdrop").onclick = e => {
      if (e.target === $("lightboxBackdrop")) closeLightbox();
    };

    // Modal close clicks
    $("closeUpdateModalBtn").onclick = closeAddUpdateModal;
    $("cancelUpdateModalBtn").onclick = closeAddUpdateModal;
    $("saveUpdateModalBtn").onclick = submitAddUpdate;

    $("closeVisionModalBtn").onclick = closeEditVisionModal;
    $("cancelVisionModalBtn").onclick = closeEditVisionModal;
    $("saveVisionModalBtn").onclick = submitEditVision;

    $("closeWlModalBtn").onclick = closeAddWishlistModal;
    $("cancelWlModalBtn").onclick = closeAddWishlistModal;
    $("saveWlModalBtn").onclick = submitAddWishlist;

    // Trigger buttons
    $("editVisionBtn").onclick = openEditVisionModal;
    $("addRoomUpdateBtn").onclick = () => openAddUpdateModal(activeRoomId);
    $("addWishlistBtn").onclick = openAddWishlistModal;
    $("addTimelineUpdateBtn").onclick = () => openAddUpdateModal("general");

    // Wishlist status filter chips
    document.querySelectorAll(".chip-btn").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        wishlistFilter = chip.getAttribute("data-status");
        renderWishlist();
      });
    });

    // Timeline room filter
    if ($("timelineRoomFilter")) {
      $("timelineRoomFilter").addEventListener("change", e => {
        timelineFilter = e.target.value;
        renderTimeline();
      });
    }

    // Admin Auth Button
    const adminBtn = $("adminAuthBtn");
    adminBtn.onclick = () => {
      if (window.HouseAuth.isAdmin()) {
        if (confirm("You are currently signed in as Adam (" + window.HouseAuth.ADMIN_EMAIL + "). Sign out?")) {
          window.HouseAuth.signOut();
        }
      } else {
        window.HouseAuth.signInWithGoogle();
      }
    };

    // Auth state listener
    window.HouseAuth.onAuth((user, isAdmin) => {
      if (isAdmin) {
        adminBtn.classList.add("logged-in");
        adminBtn.innerHTML = `
          <span class="admin-pill-dot"></span>
          <span>Admin Active</span>
        `;
        $("adminModeBanner").classList.remove("hidden");
      } else {
        adminBtn.classList.remove("logged-in");
        adminBtn.innerHTML = `
          <svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Admin Access</span>
        `;
        $("adminModeBanner").classList.add("hidden");
      }

      // Refresh current view to show/hide admin buttons
      handleRouting();
    });

    // Initialize Firebase
    window.HouseAuth.init();

    // Initial Route
    handleRouting();
  }

  // Run on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
