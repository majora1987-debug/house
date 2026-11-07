// Firestore Database Service for Adam's House Showcase
// Manages rooms, timeline project updates, and wishlist registry

(function(window) {
  "use strict";

  const LOCAL_UPDATES_KEY = "house_local_updates_v1";
  const LOCAL_WISHLIST_KEY = "house_local_wishlist_v1";
  const LOCAL_ROOMS_KEY = "house_local_rooms_v1";

  function getLocal(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  function generateId(prefix) {
    if (window.crypto && crypto.randomUUID) return (prefix || "id-") + crypto.randomUUID();
    return (prefix || "id-") + Math.random().toString(36).substring(2, 9);
  }

  // --- Rooms ---
  async function getRooms() {
    const fallbackRooms = window.DEFAULT_DATA ? window.DEFAULT_DATA.rooms : [];
    const db = window.HouseAuth.getDb();
    if (!db) {
      const localOverrides = getLocal(LOCAL_ROOMS_KEY, {});
      return fallbackRooms.map(r => ({
        ...r,
        vision: localOverrides[r.id] || r.vision
      }));
    }

    try {
      const snapshot = await db.collection("house_rooms").get();
      const overrides = {};
      snapshot.forEach(doc => {
        overrides[doc.id] = doc.data().vision;
      });
      setLocal(LOCAL_ROOMS_KEY, overrides);
      return fallbackRooms.map(r => ({
        ...r,
        vision: overrides[r.id] || r.vision
      }));
    } catch (err) {
      console.warn("Firestore getRooms failed, using local/fallback:", err);
      const localOverrides = getLocal(LOCAL_ROOMS_KEY, {});
      return fallbackRooms.map(r => ({
        ...r,
        vision: localOverrides[r.id] || r.vision
      }));
    }
  }

  async function saveRoomVision(roomId, visionText) {
    const clean = String(visionText || "").trim();
    const localOverrides = getLocal(LOCAL_ROOMS_KEY, {});
    localOverrides[roomId] = clean;
    setLocal(LOCAL_ROOMS_KEY, localOverrides);

    const db = window.HouseAuth.getDb();
    if (db && window.HouseAuth.isAdmin()) {
      await db.collection("house_rooms").doc(roomId).set({
        vision: clean,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
    return clean;
  }

  // --- Project Updates / Timeline ---
  async function getUpdates() {
    const fallbackUpdates = window.DEFAULT_DATA ? window.DEFAULT_DATA.initialUpdates : [];
    const db = window.HouseAuth.getDb();

    if (!db) {
      return getLocal(LOCAL_UPDATES_KEY, fallbackUpdates);
    }

    try {
      const snapshot = await db.collection("house_updates").orderBy("date", "desc").get();
      if (snapshot.empty) {
        return fallbackUpdates;
      }
      const list = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setLocal(LOCAL_UPDATES_KEY, list);
      return list;
    } catch (err) {
      console.warn("Firestore getUpdates failed, using local/fallback:", err);
      return getLocal(LOCAL_UPDATES_KEY, fallbackUpdates);
    }
  }

  async function addUpdate(entry) {
    const id = generateId("upd-");
    const record = {
      id,
      roomId: entry.roomId || "general",
      title: entry.title || "Project Note",
      status: entry.status || "Planning",
      date: entry.date || new Date().toISOString(),
      content: entry.content || "",
      createdAt: new Date().toISOString()
    };

    const localList = await getUpdates();
    localList.unshift(record);
    setLocal(LOCAL_UPDATES_KEY, localList);

    const db = window.HouseAuth.getDb();
    if (db && window.HouseAuth.isAdmin()) {
      await db.collection("house_updates").doc(id).set(record);
    }
    return record;
  }

  async function deleteUpdate(id) {
    let localList = await getUpdates();
    localList = localList.filter(u => u.id !== id);
    setLocal(LOCAL_UPDATES_KEY, localList);

    const db = window.HouseAuth.getDb();
    if (db && window.HouseAuth.isAdmin()) {
      await db.collection("house_updates").doc(id).delete();
    }
    return true;
  }

  // --- Wishlist / Gift Registry ---
  async function getWishlist() {
    const fallback = window.DEFAULT_DATA && Array.isArray(window.DEFAULT_DATA.initialWishlist) ? window.DEFAULT_DATA.initialWishlist : [];
    const db = window.HouseAuth.getDb();

    if (!db) {
      return getLocal(LOCAL_WISHLIST_KEY, fallback);
    }

    try {
      const snapshot = await db.collection("house_wishlist").get();
      if (snapshot.empty) {
        setLocal(LOCAL_WISHLIST_KEY, []);
        return [];
      }
      const list = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setLocal(LOCAL_WISHLIST_KEY, list);
      return list;
    } catch (err) {
      console.warn("Firestore getWishlist failed, using local/fallback:", err);
      return getLocal(LOCAL_WISHLIST_KEY, fallback);
    }
  }

  async function addWishlistItem(item) {
    const id = generateId("wl-");
    const record = {
      id,
      name: item.name || "Wishlist Item",
      room: item.room || "General",
      status: item.status || "must-have", // must-have | nice-to-have | could-have | purchased
      notes: item.notes || "",
      link: item.link || "",
      estCost: item.estCost || "",
      createdAt: new Date().toISOString()
    };

    const list = await getWishlist();
    list.unshift(record);
    setLocal(LOCAL_WISHLIST_KEY, list);

    const db = window.HouseAuth.getDb();
    if (db && window.HouseAuth.isAdmin()) {
      await db.collection("house_wishlist").doc(id).set(record);
    }
    return record;
  }

  async function updateWishlistStatus(id, newStatus) {
    const list = await getWishlist();
    const item = list.find(w => w.id === id);
    if (!item) return false;

    item.status = newStatus;
    item.updatedAt = new Date().toISOString();
    setLocal(LOCAL_WISHLIST_KEY, list);

    const db = window.HouseAuth.getDb();
    if (db && window.HouseAuth.isAdmin()) {
      await db.collection("house_wishlist").doc(id).update({
        status: newStatus,
        updatedAt: item.updatedAt
      });
    }
    return true;
  }

  async function deleteWishlistItem(id) {
    let list = await getWishlist();
    list = list.filter(w => w.id !== id);
    setLocal(LOCAL_WISHLIST_KEY, list);

    const db = window.HouseAuth.getDb();
    if (db && window.HouseAuth.isAdmin()) {
      await db.collection("house_wishlist").doc(id).delete();
    }
    return true;
  }

  window.HouseDB = {
    getRooms,
    saveRoomVision,
    getUpdates,
    addUpdate,
    deleteUpdate,
    getWishlist,
    addWishlistItem,
    updateWishlistStatus,
    deleteWishlistItem
  };

})(window);
